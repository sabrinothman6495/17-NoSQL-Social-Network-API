import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from '../models/User';
import { deleteMany } from '../models/Thought';

export async function getAllUsers(req, res) {
    try {
        const users = await find().populate('friends').populate('thoughts');
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function getUserById(req, res) {
    try {
        const user = await findById(req.params.id).populate('friends').populate('thoughts');
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function createUser(req, res) {
    try {
        const user = await create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function updateUser(req, res) {
    try {
        const user = await findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function deleteUser(req, res) {
    try {
        const user = await findByIdAndDelete(req.params.id);
        if (user) {
            await deleteMany({ _id: { $in: user.thoughts } });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function addFriend(req, res) {
    try {
        const user = await findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        ).populate('friends');
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function removeFriend(req, res) {
    try {
        const user = await findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        ).populate('friends');
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
