'use strict';

// These are CJS-compatible — require() works fine
const serverless = require('serverless-http');
require('dotenv/config');

let cachedHandler = null;

exports.handler = async (event, context) => {
  // Prevent Lambda from waiting for the event loop to drain
  context.callbackWaitsForEmptyEventLoop = false;

  if (!cachedHandler) {
    // Backend files are ES Modules ("type":"module" in backend/package.json)
    // so we MUST use dynamic import() — not require() — to load them
    const [{ default: connectDB }, { default: app }] = await Promise.all([
      import('../../backend/config/db.js'),
      import('../../backend/app.js'),
    ]);

    await connectDB();
    cachedHandler = serverless(app);
  }

  return cachedHandler(event, context);
};
