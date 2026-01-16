import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

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
            backgroundColor: '#fff',
            borderRadius: '24px',
            padding: '2rem',
            width: '90%',
            maxWidth: '400px',
            boxShadow: 'var(--shadow-lg)',
            animation: 'popIn 0.3s ease',
            textAlign: 'center',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#2d3748',
        },
        message: {
            fontSize: '1rem',
            color: '#4a5568',
            marginBottom: '2rem',
        },
        actions: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
        },
        btn: {
            padding: '0.8rem 1.5rem',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'var(--transition)',
            minWidth: '100px',
        },
        cancelBtn: {
            backgroundColor: '#edf2f7',
            color: '#4a5568',
        },
        deleteBtn: {
            backgroundColor: '#e53e3e',
            color: '#fff',
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <h3 style={styles.title}>Delete Note?</h3>
                <p style={styles.message}>Are you sure you want to delete this note? This action cannot be undone.</p>

                <div style={styles.actions}>
                    <button
                        style={{ ...styles.btn, ...styles.cancelBtn }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        style={{ ...styles.btn, ...styles.deleteBtn }}
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
