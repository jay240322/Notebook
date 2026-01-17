import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

import Navbar from './components/Navbar';
import NotesGrid from './components/NotesGrid';
import AddNoteModal from './components/AddNoteModal';
import ViewNoteModal from './components/ViewNoteModal';
import Login from './components/Login';
import Signup from './components/Signup';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import LandingPage from './components/LandingPage';

function Dashboard({ user, onLogout, theme, toggleTheme }) {
  const [notes, setNotes] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  // New state for delete confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Fetch all notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      if (user && user.uid) {
        try {
          const baseUrl = process.env.REACT_APP_BACKEND_URL;
          // alert(`Attempting to fetch notes from: ${baseUrl}`); // Uncomment if needed, but let's rely on error first

          if (!baseUrl) {
            alert("Error: REACT_APP_BACKEND_URL is not set!");
          }

          let response = await fetch(`${baseUrl}/api/notes/fetchallnotes?firebase_uid=${user.uid}`, {
            method: 'GET'
          });

          // SELF-HEALING: If user not found (404), try to sync/create user in MongoDB and retry
          if (response.status === 404 || response.status === 401) {
            console.log("User missing in MongoDB. Attempting auto-sync...");
            await fetch(`${baseUrl}/api/auth/google`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: user.displayName || user.email.split('@')[0],
                email: user.email,
                firebaseUid: user.uid
              })
            });
            // Retry fetch
            response = await fetch(`${baseUrl}/api/notes/fetchallnotes?firebase_uid=${user.uid}`, {
              method: 'GET'
            });
          }

          if (!response.ok) {
            throw new Error(`Server returned ${response.status} ${response.statusText}`);
          }

          const json = await response.json();
          if (Array.isArray(json)) {
            setNotes(json);
          }
        } catch (error) {
          console.error("Failed to fetch notes", error);
        }
      }
    };
    fetchNotes();
  }, [user]);

  const addNote = async (note) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notes/addnote?firebase_uid=${user.uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const noteData = await response.json();
      setNotes([noteData, ...notes]);
    } catch (error) {
      console.error("Error adding note", error);
      alert("Error saving note: " + error.message);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notes/updatenote/${updatedNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'firebase-uid': user.uid
        },
        body: JSON.stringify(updatedNote)
      });

      setNotes(notes.map(n => n._id === updatedNote._id ? updatedNote : n));
      setEditingNote(null);
    } catch (error) {
      console.error("Error updating note", error);
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleViewClick = (note) => {
    setViewingNote(note);
  };

  // Triggered when trash icon is clicked
  const initiateDelete = (id) => {
    setNoteToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Triggered when user confirms in the modal
  const confirmDelete = async () => {
    if (!noteToDelete) return;

    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notes/deletenote/${noteToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'firebase-uid': user.uid
        }
      });
      setNotes(notes.filter(n => n._id !== noteToDelete));
      setIsDeleteModalOpen(false);
      setNoteToDelete(null);
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  const styles = {
    fab: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '60px',
      height: '60px',
      borderRadius: '30%',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      fontSize: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      zIndex: 100,
    }
  };

  return (
    <div className="Dashboard">
      <Navbar
        appName="KeepIt"
        profileName={user.displayName || user.email.split('@')[0]}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={onLogout}
      />

      <main style={{ paddingBottom: '100px' }}>
        <NotesGrid
          notes={notes}
          onDelete={(id) => initiateDelete(id)}
          onEdit={handleEditClick}
          onView={handleViewClick}
        />
      </main>

      <button
        style={styles.fab}
        onClick={() => {
          setEditingNote(null);
          setIsModalOpen(true);
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
      >
        +
      </button>

      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onAdd={addNote}
        onUpdate={updateNote}
        noteToEdit={editingNote}
      />

      <ViewNoteModal
        isOpen={!!viewingNote}
        onClose={() => setViewingNote(null)}
        note={viewingNote}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleUserLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUserSignup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      // Save user to MongoDB
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          firebaseUid: userCredential.user.uid
        })
      });

      const json = await response.json();
      console.log("Backend response:", json); // DEBUG LOG
      if (!json.success) {
        console.error("Failed to save user to backend:", json.error);
        alert("Backend Save Failed: " + json.error); // ALERT USER
      } else {
        console.log("User saved to backend successfully");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Sync with MongoDB
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          firebaseUid: user.uid
        })
      });

      const json = await response.json();
      if (!json.success) {
        console.error("Failed to sync google user:", json.error);
        alert("Backend Sync Failed");
      }

    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={!user ? <Login onLogin={handleUserLogin} onGoogleLogin={handleGoogleLogin} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup onSignup={handleUserSignup} onGoogleLogin={handleGoogleLogin} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
