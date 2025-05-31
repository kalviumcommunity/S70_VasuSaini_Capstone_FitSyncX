import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import passport from './config/passport.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import progressRoutes from './routes/progressRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/progress', progressRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 