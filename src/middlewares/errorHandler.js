// Global Err Handler Middlewares
// ------------------------------
// Menangkap semua error dari route atau middleware lain
// Gunakan next(err) di tempat lain kalo mau trigger global err handler ini

export const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
