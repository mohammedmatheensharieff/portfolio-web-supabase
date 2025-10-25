import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blog.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import adminAuthRoutes from './routes/adminAuth.js';
import newsRoutes from './routes/news.js';
import { cookieMiddleware } from './middleware/admin.js';

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const normalizeOrigin = (origin) => {
  if (!origin) return null;
  try {
    const url = new URL(origin);
    return `${url.protocol}//${url.host}`;
  } catch (_error) {
    return origin.trim();
  }
};

const allowedOrigins = CLIENT_ORIGIN.split(',').map(normalizeOrigin).filter(Boolean);
const allowAll = allowedOrigins.includes('*');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowAll) return callback(null, true);
    if (!origin) return callback(null, true);
    const normalized = normalizeOrigin(origin);
    if (normalized && allowedOrigins.includes(normalized)) {
      return callback(null, true);
    }
    console.warn(`Blocked origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
});

export default app;
