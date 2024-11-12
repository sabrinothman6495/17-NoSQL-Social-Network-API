import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

// Get all thoughts
export const getAllThoughts = async (req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving thoughts', details: err });
  }
};

// Get a single thought by its ID
export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this ID' });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving thought', details: err });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;
    const newThought = await Thought.create({ thoughtText, username });

    // Push the thought's _id to the associated user's thoughts array
    await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json({ error: 'Error creating thought', details: err });
  }
};

// Update a thought by its ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: 'No thought found with this ID' });
      return;
    }

    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json({ error: 'Error updating thought', details: err });
  }
};

// Delete a thought by its ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) {
      res.status(404).json({ message: 'No thought found with this ID' });
      return;
    }

    // Remove thought reference from user's thoughts array
    await User.findByIdAndUpdate(
      deletedThought.userId,
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    res.status(200).json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting thought', details: err });
  }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought found with this ID' });
      return;
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Error adding reaction', details: err });
  }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought found with this ID' });
      return;
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Error removing reaction', details: err });
  }
};
