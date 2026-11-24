import mongoose from 'mongoose';

export function requireDB(_req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message:
        'Database is not connected yet. Start MongoDB locally or set MONGODB_URI in backend/.env.',
    });
  }
  return next();
}
