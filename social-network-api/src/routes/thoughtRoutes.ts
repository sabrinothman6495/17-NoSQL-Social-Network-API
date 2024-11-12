import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../controllers/thoughtController';

const router = Router();

// Route to get all thoughts
router.get('/', getAllThoughts);

// Route to get a single thought by ID
router.get('/:thoughtId', getThoughtById);

// Route to create a new thought
router.post('/', createThought);

// Route to update a thought by ID
router.put('/:thoughtId', updateThought);

// Route to delete a thought by ID
router.delete('/:thoughtId', deleteThought);

// Route to add a reaction to a thought
router.post('/:thoughtId/reactions', addReaction);

// Route to remove a reaction by reaction ID from a thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
