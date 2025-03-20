import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB, disconnectDB } from './config/db.js';
import foodRouter from './Routes/foodRoute.js';
import userRouter from './Routes/userRoute.js';
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoute.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 10000;

// Create HTTP server
const httpServer = createServer(app);

// Setup Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://nosh-dash.vercel.app' 
      : 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  
  // Track a specific order
  socket.on('track_order', (orderId) => {
    console.log(`Client ${socket.id} tracking order ${orderId}`);
    // Add client to a room specific to this order
    socket.join(`order_${orderId}`);
  });
  
  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

// Export io to be used in other files
export { io };

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://nosh-dash.vercel.app' 
      : 'http://localhost:5173',
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
const server = httpServer.listen(port, () => {
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
