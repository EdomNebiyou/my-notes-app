import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { MONGO_URI } from './config/keys.js';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Use cookie-parser

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});