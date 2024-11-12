import 'dotenv/config';
import express, { Application } from 'express';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
