import express from 'express';
import cors from 'cors';
import { connectDB, disconnectDB } from './config/db.js';
import foodRouter from './Routes/foodRoute.js';
import userRouter from './Routes/userRoute.js';
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoute.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'https://noshdash-80k0q2nsn-lewis-projects-1f0875cf.vercel.app',
    credentials: true,
  })
);

// Database Connection
connectDB();

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Health Check
app.get('/', (req, res) => {
  res.send('API working');
});

// Start Server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Graceful Shutdown
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  try {
    await disconnectDB();
    server.close(() => {
      console.log('Server closed successfully.');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
