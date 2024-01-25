const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps: true
});

module.exports = model('User', userSchema); 