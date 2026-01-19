const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.route");

const app = express();

// =============================================================================
// Middleware Configuration
// =============================================================================

// CORS - Allow frontend to communicate with backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body Parser - Parse JSON with size limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// =============================================================================
// Routes
// =============================================================================

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "AI Code Reviewer API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Health endpoint for monitoring
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// AI routes
app.use("/ai", aiRoutes);

// =============================================================================
// Error Handling
// =============================================================================

// 404 Handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  // Log error details
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Send error response
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.name || "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "An error occurred while processing your request"
        : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
