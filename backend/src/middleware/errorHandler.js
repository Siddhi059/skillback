export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  if (status >= 500) {
    console.error('[API Error]', err);
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
