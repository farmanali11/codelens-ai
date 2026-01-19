require("dotenv").config();
const app = require("./src/app.js");

// =============================================================================
// Configuration
// =============================================================================

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Validate required environment variables
if (!process.env.GOOGLE_GEMINI_KEY) {
  console.error(
    "❌ ERROR: GOOGLE_GEMINI_KEY  is not set in environment variables",
  );
  console.error("Please create a .env file with your Anthropic API key");
  process.exit(1);
}

// =============================================================================
// Start Server
// =============================================================================

const server = app.listen(PORT, () => {
  console.log("=".repeat(60));
  console.log("🚀 AI Code Reviewer API Server");
  console.log("=".repeat(60));
  console.log(`📡 Environment: ${NODE_ENV}`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 API endpoint: http://localhost:${PORT}/ai/get-review`);
  console.log("=".repeat(60));
  console.log("Press Ctrl+C to stop the server");
  console.log("");
});

// =============================================================================
// Error Handling
// =============================================================================

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ ERROR: Port ${PORT} is already in use`);
    console.error("Please stop the other process or use a different port");
  } else {
    console.error("❌ Server error:", error.message);
  }
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error.message);
  console.error(error.stack);
  // Give server time to finish ongoing requests
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
  // Give server time to finish ongoing requests
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// =============================================================================
// Graceful Shutdown
// =============================================================================

const gracefulShutdown = (signal) => {
  console.log("");
  console.log(`\n⚠️  ${signal} received. Starting graceful shutdown...`);

  server.close(() => {
    console.log("✅ Server closed successfully");
    console.log("👋 Goodbye!");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("❌ Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// =============================================================================
// Export for testing
// =============================================================================

module.exports = server;
