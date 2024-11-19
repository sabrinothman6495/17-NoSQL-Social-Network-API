import { Request, Response } from 'express';
import User from '../models/User.js';

export const getUsers = async  (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);

  }
};
export const createUser = async  (_req: Request, res: Response) => {

  try {
      const user = await User.create(_req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
export const deleteUser = async  (_req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(_req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async  (_req: Request, res: Response) => {

  try {
    const user = await User.findByIdAndUpdate(_req.params.userId, _req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getSingleUser = async  (_req: Request, res: Response) => {
  try {
    const user = await User.findById(_req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);

  }
};