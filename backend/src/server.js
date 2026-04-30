const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const getPort = require('get-port');

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Automatic Port Detection
  const PORT = await getPort({
    port: [process.env.PORT ? parseInt(process.env.PORT) : 5000, 5001, 5002, 5003]
  });

  const server = http.createServer(app);

  // Socket.io setup
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Make io accessible in controllers
  app.set('io', io);

  server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });

  // Graceful Shutdown
  const shutdown = () => {
    console.log('\nShutting down server...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
