import { Router } from 'express';
import {
  getThoughts,
 createThought,
 getSingleThought,
 updateThought,
 deleteThought,

 
} from '../controllers/thoughtsController.js';

const router = Router();

router.route('/')
  .get(getThoughts)
 .post(createThought);

router.put('/api/thoughts/:thoughtId', updateThought);

router.route('/:thoughtId')

.get(getSingleThought)

  .put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
 // .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
// .delete(removeReaction);

export default router;
