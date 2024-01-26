const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next()
});

userSchema.method('checkPassword', (password) => {
    return bcrypt.compareSync(password, this.password)
})

module.exports = model('User', userSchema); 