import React from 'react';

const ViewNoteModal = ({ isOpen, onClose, note }) => {
    if (!isOpen || !note) return null;

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
        },
        modal: {
            backgroundColor: note.color || '#fff',
            borderRadius: '24px',
            padding: '2.5rem',
            width: '90%',
            maxWidth: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-lg)',
            animation: 'popIn 0.3s ease',
            position: 'relative',
        },
        title: {
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: note.titleColor || 'inherit',
            lineHeight: '1.2',
        },
        content: {
            fontSize: '1.1rem',
            lineHeight: '1.7',
            color: 'rgba(0,0,0,0.85)',
            whiteSpace: 'pre-wrap',
        },
        date: {
            position: 'absolute',
            top: '1.5rem',
            right: '2rem',
            fontSize: '0.85rem',
            color: 'rgba(0,0,0,0.5)',
        },
        closeBtn: {
            position: 'absolute',
            top: '1rem',
            left: '1rem', // Changed to left to not conflict with date
            background: 'rgba(255,255,255,0.4)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: '#333',
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <button style={styles.closeBtn} onClick={onClose}>✕</button>
                <span style={styles.date}>{new Date(note.timestamp).toLocaleDateString()}</span>
                <h2 style={styles.title}>{note.title}</h2>

                {note.images && note.images.length > 0 && (
                    <div style={{ marginBottom: '2vh' }}>
                        {note.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`attachment-${idx}`}
                                style={{
                                    width: '100%',
                                    maxHeight: '40vh',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    marginBottom: '1vh'
                                }}
                            />
                        ))}
                    </div>
                )}

                <p style={styles.content}>{note.content}</p>
            </div>
        </div>
    );
};

export default ViewNoteModal;
