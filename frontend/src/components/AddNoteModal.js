import React, { useState, useEffect } from 'react';

const AddNoteModal = ({ isOpen, onClose, onAdd, onUpdate, noteToEdit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleColor, setTitleColor] = useState('#000000'); // Default black
    const [images, setImages] = useState([]); // Array of base64 strings

    // Pastel colors for background
    const colors = ['#ffffff', '#ffcfd2', '#f1c0e8', '#cfbaf0', '#a3c4f3', '#90dbf4', '#8eecf5', '#98f5e1', '#b9fbc0'];
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
            setSelectedColor(noteToEdit.color);
            setTitleColor(noteToEdit.titleColor || '#000000');
            setImages(noteToEdit.images || []);
        } else {
            setTitle('');
            setContent('');
            setSelectedColor(colors[0]);
            setTitleColor('#000000');
            setImages([]);
        }
    }, [noteToEdit, isOpen]);

    if (!isOpen) return null;

    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImages(prev => [...prev, event.target.result]);
                };
                reader.readAsDataURL(blob);
                // Prevent default paste behavior if it's an image to avoid garbage in textarea
                e.preventDefault();
            }
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() && !content.trim() && images.length === 0) return;

        const noteData = {
            title,
            content,
            color: selectedColor,
            titleColor: titleColor,
            images,
            timestamp: Date.now(),
        };

        if (noteToEdit) {
            onUpdate({ ...noteToEdit, ...noteData });
        } else {
            onAdd(noteData);
        }

        onClose();
    };

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
            padding: '2vh',
            width: '95%',
            maxWidth: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-lg)',
            animation: 'popIn 0.3s ease',
        },
        input: {
            width: '100%',
            border: 'none',
            fontSize: '3vh',
            fontWeight: '600',
            marginBottom: '2vh',
            outline: 'none',
            fontFamily: 'var(--font-main)',
            color: titleColor,
            backgroundColor: 'transparent',
        },
        textarea: {
            width: '100%',
            border: 'none',
            fontSize: '2vh',
            resize: 'none',
            minHeight: '20vh',
            outline: 'none',
            fontFamily: 'var(--font-main)',
            marginBottom: '3vh',
            backgroundColor: 'transparent',
        },
        sectionLabel: {
            fontSize: '1.8vh',
            fontWeight: '600',
            marginBottom: '1vh',
            color: '#666',
            display: 'block',
        },
        colorPicker: {
            display: 'flex',
            gap: '1vw',
            marginBottom: '2vh',
            flexWrap: 'wrap',
        },
        colorBtn: {
            width: '4vh',
            height: '4vh',
            borderRadius: '50%',
            border: '2px solid transparent',
            cursor: 'pointer',
            transition: 'transform 0.2s',
        },
        titleColorInput: {
            border: 'none',
            width: '5vh',
            height: '5vh',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            padding: 0,
        },
        controls: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '3vh',
            alignItems: 'center'
        },
        actions: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
        },
        btn: {
            padding: '1.5vh 3vw',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '2vh',
            transition: 'var(--transition)',
        },
        cancelBtn: {
            backgroundColor: '#f0f2f5',
            color: '#333',
        },
        addBtn: {
            backgroundColor: '#333',
            color: '#fff',
        },
        imageConfig: {
            display: 'flex',
            gap: '1rem',
            marginBottom: '2vh',
            overflowX: 'auto',
            padding: '1vh 0',
        },
        imagePreview: {
            height: '10vh',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
        },
        removeImgBtn: {
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <input
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    autoFocus
                />

                {/* Images Preview Section */}
                {images.length > 0 && (
                    <div style={styles.imageConfig}>
                        {images.map((img, idx) => (
                            <div key={idx} style={{ position: 'relative' }}>
                                <img src={img} alt="preview" style={styles.imagePreview} />
                                <button style={styles.removeImgBtn} onClick={() => removeImage(idx)}>×</button>
                            </div>
                        ))}
                    </div>
                )}

                <textarea
                    style={styles.textarea}
                    placeholder="Type to take a note... (Paste images here to attach)"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onPaste={handlePaste}
                />

                <div style={styles.controls}>
                    <div>
                        <span style={styles.sectionLabel}>Background</span>
                        <div style={styles.colorPicker}>
                            {colors.map(color => (
                                <button
                                    key={color}
                                    style={{
                                        ...styles.colorBtn,
                                        backgroundColor: color,
                                        borderColor: selectedColor === color ? '#333' : 'transparent',
                                        transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
                                    }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                    <div>
                        <span style={styles.sectionLabel}>Title Color</span>
                        <input
                            type="color"
                            style={styles.titleColorInput}
                            value={titleColor}
                            onChange={(e) => setTitleColor(e.target.value)}
                            title="Choose Title Color"
                        />
                    </div>
                </div>

                <div style={styles.actions}>
                    <button
                        style={{ ...styles.btn, ...styles.cancelBtn }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        style={{ ...styles.btn, ...styles.addBtn }}
                        onClick={handleSubmit}
                    >
                        {noteToEdit ? 'Update Note' : 'Add Note'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNoteModal;
