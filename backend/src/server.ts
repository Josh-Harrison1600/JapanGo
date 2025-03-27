import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/menuRoutes';
import hoursRoute from './routes/hoursRoute';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/menu-items', routes);
app.use('/hours', hoursRoute);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
