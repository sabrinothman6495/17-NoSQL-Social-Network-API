import { Request, Response } from 'express';
import Thought from '../models/Thought.js';

export const getThoughts = async  (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const createThought = async  (_req: Request, res: Response) => {
  try {
    const thought = await Thought.create(_req.body);
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async  (_req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(_req.params.thoughtId);
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async  (_req: Request, res: Response) => {
  try {
    console.log(_req.params);
    const thought = await Thought.findByIdAndUpdate(_req.params.thoughtId, _req.body, { new: true });
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }

};

export const deleteThought = async  (_req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(_req.params.thoughtId);
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};