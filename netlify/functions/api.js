import serverless from 'serverless-http';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from '../../backend/config/db.js';
import auth from '../../backend/routes/authRoutes.js';
import books from '../../backend/routes/bookRoutes.js';
import categories from '../../backend/routes/categoryRoutes.js';
import transactions from '../../backend/routes/transactionRoutes.js';
import admin from '../../backend/routes/adminRoutes.js';
import { notFound, errorHandler } from '../../backend/middleware/errorMiddleware.js';

const app = express();

// CORS — allow the Netlify site itself (same origin) and localhost for dev
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow same-origin requests (no origin header) and listed origins
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by CORS'));
  },
}));

app.use(express.json());

// Health check
app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'LibraryHub API is running' })
);

// Routes
app.use('/api/auth', auth);
app.use('/api/books', books);
app.use('/api/categories', categories);
app.use('/api/transactions', transactions);
app.use('/api/admin', admin);

app.use(notFound);
app.use(errorHandler);

// Cache the DB connection across warm Lambda invocations
let dbConnected = false;
const rawHandler = serverless(app);

export const handler = async (event, context) => {
  // Netlify functions reuse containers — only connect once
  context.callbackWaitsForEmptyEventLoop = false;
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  return rawHandler(event, context);
};
