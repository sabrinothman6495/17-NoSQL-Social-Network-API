const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, match: [/.+\@.+\..+/, 'Invalid email address'] },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    toJSON: { virtuals: true },
    id: false
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = mongoose.model('User', userSchema);
