const express = require("express");
const router = express.Router();
const generateCodeReview = require("../services/ai.service");

/**
 * POST /ai/get-review
 * Generate AI code review
 *
 * Request body:
 * {
 *   "code": "function example() { return true; }"
 * }
 *
 * Response:
 * {
 *   "review": "## Code Review\n...",
 *   "success": true,
 *   "timestamp": "2025-01-19T12:00:00.000Z"
 * }
 */
router.post("/get-review", async (req, res) => {
  const startTime = Date.now();

  try {
    // Validate request body
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Code is required in request body",
        success: false,
        timestamp: new Date().toISOString(),
      });
    }

    if (typeof code !== "string") {
      return res.status(400).json({
        error: "Validation Error",
        message: "Code must be a string",
        success: false,
        timestamp: new Date().toISOString(),
      });
    }

    if (code.trim().length === 0) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Code cannot be empty",
        success: false,
        timestamp: new Date().toISOString(),
      });
    }

    if (code.length > 50000) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Code is too large (max 50,000 characters)",
        success: false,
        timestamp: new Date().toISOString(),
      });
    }

    // Generate review
    console.log(`Generating review for code (${code.length} characters)...`);
    const review = await generateCodeReview(code);

    // Calculate response time
    const responseTime = Date.now() - startTime;
    console.log(`Review generated successfully in ${responseTime}ms`);

    // Send response
    res.json({
      review,
      success: true,
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      codeLength: code.length,
    });
  } catch (error) {
    // Log error details
    console.error("Error in /ai/get-review:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    // Send error response
    const statusCode = error.message?.includes("API key")
      ? 500
      : error.message?.includes("quota")
        ? 429
        : error.message?.includes("Validation")
          ? 400
          : 500;

    res.status(statusCode).json({
      error: error.name || "Internal Server Error",
      message: error.message || "An error occurred while generating the review",
      success: false,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * GET /ai/status
 * Check if AI service is configured correctly
 */
router.get("/status", (req, res) => {
  const hasApiKey = !!process.env.GOOGLE_GEMINI_KEY;

  res.json({
    status: hasApiKey ? "ready" : "not configured",
    message: hasApiKey
      ? "AI service is ready to process requests"
      : "GOOGLE_GEMINI_KEY is not set in environment variables",
    hasApiKey,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
