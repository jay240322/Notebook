import React from 'react';
import NoteCard from './NoteCard';

const NotesGrid = ({ notes, onDelete, onEdit, onView }) => {
    const styles = {
        grid: {
            columnCount: 3,
            columnGap: '1.5rem',
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        emptyState: {
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
        },
        emptyIcon: {
            fontSize: '4rem',
            marginBottom: '1rem',
            opacity: 0.5,
        }
    };

    // Responsive column count hack for inline styles (ideally use media queries in CSS)
    // But since we want to avoid complex CSS files for now, we'll stick to a simple strategy or add a class.
    // Actually, let's inject a style tag or rely on valid CSS in index.css for media queries.
    // For now, I'll use a wrapper class defined in index.css or just inline style with assumption.
    // Let's add the media query logic to index.css later or here via a fast style tag.

    // NOTE: Ideally `column-count` should be responsive. 
    // I will return a div with a className 'notes-masonry' and define the responsiveness in index.css for better control.

    if (notes.length === 0) {
        return (
            <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📝</div>
                <h2>No notes yet</h2>
                <p>Click the + button to add your first note!</p>
            </div>
        );
    }

    return (
        <div className="notes-grid">
            {notes.map(note => (
                <NoteCard
                    key={note._id}
                    note={note}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onView={onView}
                />
            ))}
        </div>
    );
};

export default NotesGrid;
