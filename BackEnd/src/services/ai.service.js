const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

/**
 * ULTRA-MINIMAL System Instructions for Free Tier
 * Reduced to absolute minimum to save tokens
 */
const SYSTEM_INSTRUCTIONS = `Senior code reviewer. Find bugs, security issues, performance problems. 

Rate: Critical/High/Medium/Low

Format:
## Summary
Quality: [rating]
Issues: [list]

## Problems
[issue]: [fix]

## Code Fix
\`\`\`
[corrected code]
\`\`\`

Be brief.`;

/**
 * Generate code review using Google Gemini Free Tier
 * @param {string} code - The code to review
 * @returns {Promise<string>} - The review text
 */
async function generateCodeReview(code) {
  if (!code || typeof code !== "string") {
    throw new Error("Code must be a non-empty string");
  }

  if (!process.env.GOOGLE_GEMINI_KEY) {
    throw new Error("GOOGLE_GEMINI_KEY environment variable is not set");
  }

  try {
    // Use gemini-1.5-flash (FREE TIER MODEL)
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_INSTRUCTIONS,
    });

    // Ultra-minimal prompt to save tokens
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Review:\n\`\`\`\n${code}\n\`\`\``,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.5, // Lower = more focused
        topK: 10, // Reduced for free tier
        topP: 0.7, // Reduced for free tier
        maxOutputTokens: 1500, // Reduced to 1024 (was 2048)
      },
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating code review:", error);

    // Better error messages
    if (error.message?.includes("API key")) {
      throw new Error("Invalid Google Gemini API key");
    } else if (error.message?.includes("quota") || error.status === 429) {
      throw new Error("API quota exceeded. Please try again later.");
    } else if (error.message?.includes("model") || error.status === 404) {
      throw new Error(
        "Model not found. Make sure you are using gemini-1.5-flash",
      );
    } else {
      throw new Error(`Failed to generate review: ${error.message}`);
    }
  }
}

module.exports = generateCodeReview;
