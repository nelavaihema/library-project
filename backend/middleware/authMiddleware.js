import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Authentication required' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ success: false, message: 'User no longer exists' });
    next();
  } catch { res.status(401).json({ success: false, message: 'Invalid or expired token' }); }
}
export function admin(req, res, next) { if (req.user?.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' }); next(); }
