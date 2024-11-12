import { find, findById, create, findByIdAndUpdate, findByIdAndDelete } from '../models/Thought';
import { findByIdAndUpdate as _findByIdAndUpdate } from '../models/User';

export async function getAllThoughts(req, res) {
    try {
        const thoughts = await find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function getThoughtById(req, res) {
    try {
        const thought = await findById(req.params.id);
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function createThought(req, res) {
    try {
        const thought = await create(req.body);
        await _findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function updateThought(req, res) {
    try {
        const thought = await findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function deleteThought(req, res) {
    try {
        const thought = await findByIdAndDelete(req.params.id);
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function addReaction(req, res) {
    try {
        const thought = await findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function removeReaction(req, res) {
    try {
        const thought = await findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}
