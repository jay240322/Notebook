const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#ffffff'
    },
    titleColor: {
        type: String,
        default: '#000000'
    },
    timestamp: {
        type: Number,
        default: Date.now
    },
    images: {
        type: [String],
        default: []
    }
}, { collection: 'notes' });

module.exports = mongoose.model('Note', NoteSchema);
