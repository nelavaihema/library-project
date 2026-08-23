import serverless from 'serverless-http';
import 'dotenv/config';
import connectDB from '../../backend/config/db.js';
import app from '../../backend/app.js';

// Cache the DB connection across warm Lambda invocations
let dbConnected = false;
const rawHandler = serverless(app);

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
  return rawHandler(event, context);
};
