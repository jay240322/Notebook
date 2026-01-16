import React from 'react';

const NoteCard = ({ note, onDelete, onEdit, onView }) => {
    const styles = {
        card: {
            backgroundColor: note.color || '#fff',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            transition: 'var(--transition)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            breakInside: 'avoid', /* For masonry layout */
            animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        },
        date: {
            fontSize: '0.75rem',
            color: 'rgba(0,0,0,0.5)',
            marginBottom: '0.5rem',
            display: 'block',
        },
        title: {
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.75rem',
            lineHeight: '1.3',
            color: note.titleColor || 'inherit', // Use custom color
        },
        content: {
            fontSize: '0.95rem',
            lineHeight: '1.6',
            color: 'rgba(0,0,0,0.8)',
            whiteSpace: 'pre-wrap',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        actions: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: 'flex',
            gap: '8px',
            opacity: 0,
            transition: 'all 0.2s ease',
        },
        iconBtn: {
            background: 'rgba(255,255,255,0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
        }
    };

    // Hover effect
    const [isHovered, setIsHovered] = React.useState(false);

    // Dynamic Width Logic
    const getSpanClass = () => {
        const len = note.content ? note.content.length : 0;
        if (len > 300) return 'note-span-3'; // Super long notes
        if (len > 120) return 'note-span-2'; // Medium long notes
        return '';
    };

    return (
        <div
            className={getSpanClass()}
            style={{
                ...styles.card,
                transform: isHovered ? 'translateY(-5px)' : 'none',
                boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                marginBottom: 0, /* Grid handles gap */
                height: '100%', /* Stretch to fill grid cell */
                display: 'flex',
                flexDirection: 'column',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onView(note)}
        >
            <div style={{ ...styles.actions, opacity: isHovered ? 1 : 0 }}>
                <button
                    style={{ ...styles.iconBtn, color: '#2d3748' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(note);
                    }}
                    title="Edit Note"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button
                    style={{ ...styles.iconBtn, color: '#e53e3e' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note._id);
                    }}
                    title="Delete Note"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>

            {note.images && note.images.length > 0 && (
                <img
                    src={note.images[0]}
                    alt="attachment"
                    style={{
                        width: '100%',
                        height: '15vh',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '1vh'
                    }}
                />
            )}

            <span style={styles.date}>{new Date(note.timestamp).toLocaleDateString()}</span>
            <h3 style={styles.title}>{note.title}</h3>
            <p style={styles.content}>{note.content}</p>
        </div>
    );
};

export default NoteCard;
