import express from 'express';
import cors from 'cors';
import auth from './routes/authRoutes.js';
import books from './routes/bookRoutes.js';
import categories from './routes/categoryRoutes.js';
import transactions from './routes/transactionRoutes.js';
import admin from './routes/adminRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Origin not allowed by CORS'));
  },
}));

app.use(express.json());

app.get('/api/health', (_req, res) =>
  res.json({ success: true, message: 'LibraryHub API is running' })
);

app.use('/api/auth', auth);
app.use('/api/books', books);
app.use('/api/categories', categories);
app.use('/api/transactions', transactions);
app.use('/api/admin', admin);

app.use(notFound);
app.use(errorHandler);

export default app;
