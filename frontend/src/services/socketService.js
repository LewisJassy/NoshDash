import { io } from 'socket.io-client';

let socket;

// URL of our socket server
const URL = process.env.NODE_ENV === 'production'
  ? 'https://noshdash-api.vercel.app' // Production URL
  : 'http://localhost:10000'; // Development URL

/**
 * Initialize Socket.io connection
 */
const initializeSocket = () => {
  // Only initialize once
  if (!socket) {
    socket = io(URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection events
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason);
    });
  }

  return socket;
};

/**
 * Track a specific order with real-time updates
 * @param {string} orderId - ID of the order to track
 * @param {function} callback - Function to call when updates are received
 * @return {function} - Cleanup function to stop tracking
 */
const trackOrder = (orderId, callback) => {
  const socket = initializeSocket();

  // Join the order tracking room
  socket.emit('track_order', orderId);

  // Listen for order updates
  const handleOrderUpdate = (data) => {
    callback(data);
  };

  socket.on('order_updated', handleOrderUpdate);

  // Return cleanup function
  return () => {
    socket.off('order_updated', handleOrderUpdate);
    socket.emit('leave_order', orderId);
  };
};

/**
 * Subscribe to all order updates for a specific user
 * @param {string} userId - ID of the user
 * @param {function} callback - Function to call when user's orders are updated
 * @return {function} - Cleanup function to stop subscription
 */
const subscribeToUserOrders = (userId, callback) => {
  const socket = initializeSocket();

  // Event channel specific to this user's orders
  const channel = `user_${userId}_orders`;

  // Listen for user order updates
  const handleUserOrderUpdate = (data) => {
    callback(data);
  };

  socket.on(channel, handleUserOrderUpdate);

  // Return cleanup function
  return () => {
    socket.off(channel, handleUserOrderUpdate);
  };
};

// Export socket service functions
const socketService = {
  initializeSocket,
  trackOrder,
  subscribeToUserOrders,
  getSocket: () => socket
};

export default socketService;