import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return res.status(401).json({ message: 'Invalid authentication token.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'skillback_local_dev_jwt_secret_2026';
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({ message: 'User account not found.' });
    }
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: 'Token expired or invalid.' });
  }
}

export function signToken(userId) {
  const secret = process.env.JWT_SECRET || 'skillback_local_dev_jwt_secret_2026';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ sub: userId.toString() }, secret, { expiresIn });
}
