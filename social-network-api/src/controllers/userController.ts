import { Request, Response } from 'express';
import User from '../models/User';
import Thought from '../models/Thought';

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate('friends').populate('thoughts');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving users', details: err });
  }
};

// Get a single user by its ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('friends')
      .populate('thoughts');
    if (!user) {
      res.status(404).json({ message: 'No user found with this ID' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user', details: err });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user', details: err });
  }
};

// Update a user by its ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'No user found with this ID' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error updating user', details: err });
  }
};

// Delete a user by its ID and remove their associated thoughts
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'No user found with this ID' });
      return;
    }

    // Delete associated thoughts
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.status(200).json({ message: 'User and associated thoughts deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user', details: err });
  }
};

// Add a friend to a user's friend list
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');
    
    if (!user) {
      res.status(404).json({ message: 'No user found with this ID' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error adding friend', details: err });
  }
};

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).populate('friends');

    if (!user) {
      res.status(404).json({ message: 'No user found with this ID' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error removing friend', details: err });
  }
};
