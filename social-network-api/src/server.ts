import express, { Application } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtsRoutes.js';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  //useNewUrlParser: true,
 // useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('Database connection error:', err);
});
