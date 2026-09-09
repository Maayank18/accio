import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import healthRoutes from './routes/healthRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import earlyAccessRoutes from './routes/earlyAccessRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Allows flexible local dev loading
  crossOriginEmbedderPolicy: false,
}));

const allowedOrigins = [
  process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for local dev
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/early-access', earlyAccessRoutes);

// Root fallback
app.get('/', (_req, res) => {
  res.json({
    name: 'Accio Digital Accessibility API',
    description: 'Voice-powered digital accessibility layer',
    status: 'online',
    endpoints: ['/api/health', '/api/contact', '/api/community/join', '/api/early-access'],
  });
});

// Centralized Error Handling
app.use(errorHandler);

// Connect DB & Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Accio Server] Running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('[Accio Server] Startup failed:', err);
});

export default app;
