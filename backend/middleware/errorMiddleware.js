export function notFound(req, res) { res.status(404).json({ success: false, message: 'Route not found' }); }
export function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.name, err.message, err.stack);
  const status = err.name === 'ValidationError' ? 400 : (err.code === 11000 || err.code === '11000') ? 409 : 500;
  res.status(status).json({
    success: false,
    message: status === 500
      ? err.message || 'Server error'
      : (Object.values(err.errors || {})[0]?.message || 'Request failed')
  });
}

