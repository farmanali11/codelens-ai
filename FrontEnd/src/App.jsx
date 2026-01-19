import { useEffect, useState, useCallback } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import Markdown from "react-markdown";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import "./App.css";

// Production backend URL
const API_URL = "https://codelens-ai-backend.vercel.app";

function App() {
  const [code, setCode] = useState(
    `function sum(a, b) {
  return a + b;
}`,
  );

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const reviewCode = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter some code to review");
      return;
    }

    setLoading(true);
    setReview("");
    setError(null);

    try {
      const { data } = await axios.post(
        `${API_URL}/ai/get-review`,
        { code },
        { timeout: 60000 },
      );
      setReview(data.review);
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("⏱️ Request timeout. Please try again.");
      } else if (err.response) {
        setError(`⚠️ Server error: ${err.response.statusText}`);
      } else if (err.request) {
        setError(
          "🔌 Cannot connect to server. Please ensure the backend is running.",
        );
      } else {
        setError("⚠️ Failed to generate review. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [code]);

  // Keyboard shortcut: Ctrl/Cmd + Enter to review
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        reviewCode();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [reviewCode]);

  return (
    <main>
      <motion.section
        className="left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={18}
            tabSize={2}
            insertSpaces
            style={{
              fontFamily: "Fira Code, monospace",
              fontSize: 14,
              lineHeight: 1.6,
              minHeight: "100%",
              backgroundColor: "transparent",
              color: "#e6e6eb",
              outline: "none",
            }}
            placeholder="// Paste or type your code here..."
          />
        </div>

        <motion.button
          className="review"
          onClick={reviewCode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          disabled={loading || !code.trim()}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Analyzing...
            </>
          ) : (
            "Run AI Review"
          )}
        </motion.button>
      </motion.section>

      <motion.section
        className="right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="review-error"
            >
              {error}
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="review-loading-container"
            >
              <div className="loading-spinner-wrapper">
                <div className="pulse-ring"></div>
                <div className="pulse-ring delay-1"></div>
                <div className="pulse-ring delay-2"></div>
              </div>
              <p className="review-loading">
                Analyzing code quality, security, and best practices…
              </p>
            </motion.div>
          )}

          {review && !loading && !error && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="review-content"
            >
              <Markdown>{review}</Markdown>
            </motion.div>
          )}

          {!review && !loading && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state"
            >
              <div className="empty-icon">🤖</div>
              <h3>Ready to Review Your Code</h3>
              <p>Enter your code on the left and click "Run AI Review"</p>
              <div className="tip">
                💡 <strong>Tip:</strong> Press <kbd>Ctrl+Enter</kbd> to quickly
                run a review
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </main>
  );
}

export default App;
