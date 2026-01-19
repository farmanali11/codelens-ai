# 🔍 CodeLens AI

> **Professional AI-powered code review platform with real-time analysis**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

CodeLens AI is a modern, production-ready code review application that leverages Google Gemini AI to provide comprehensive code analysis, security audits, and performance recommendations.

---

## ✨ **Features**

### **Core Capabilities**
- 🤖 **AI-Powered Reviews** - Leverages Google Gemini 1.5 Flash for intelligent code analysis
- 🔒 **Security Analysis** - Detects vulnerabilities and security best practices
- ⚡ **Performance Insights** - Identifies bottlenecks and optimization opportunities
- 📊 **Code Quality Metrics** - Severity-based issue classification (Critical → Low)
- 🎨 **Modern UI** - Beautiful glassmorphism design with premium 2026 aesthetics
- ⌨️ **Keyboard Shortcuts** - Power user features (Ctrl+Enter to review)
- 🌙 **Syntax Highlighting** - Multi-language support with Prism.js

### **Advanced Features**
- Real-time code metrics (lines, complexity, comments)
- Detailed improvement suggestions with code examples
- Empty state guidance for new users
- Responsive design (mobile, tablet, desktop)
- Professional error handling
- Loading states with animated indicators

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js >= 18.0.0
- npm >= 9.0.0
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/codelens-ai.git
cd codelens-ai
```

2. **Install dependencies**

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

3. **Configure environment variables**

Create `.env` in the `backend` directory:
```bash
cp backend/.env.example backend/.env
```

Add your Google Gemini API key:
```env
GOOGLE_GEMINI_KEY=your_api_key_here
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

4. **Start the application**

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

5. **Open your browser**
```
http://localhost:5173
```

---

## 📖 **Documentation**

### **Project Structure**
```
codelens-ai/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   └── App.css       # Premium 2026 styling
│   └── package.json
│
├── backend/               # Express.js API server
│   ├── src/
│   │   ├── app.js        # Express configuration
│   │   ├── routes/       # API routes
│   │   └── services/     # Business logic
│   ├── server.js         # Entry point
│   └── package.json
│
└── docs/                  # Documentation
```

### **Tech Stack**

**Frontend:**
- React 18.3 - UI library
- Vite - Build tool
- Framer Motion - Animations
- Prism.js - Syntax highlighting
- Axios - HTTP client
- React Markdown - Review rendering

**Backend:**
- Node.js - Runtime
- Express.js - Web framework
- Google Gemini AI - AI model
- CORS - Cross-origin requests
- dotenv - Environment configuration

---

## 🎯 **Usage**

### **Basic Review**
1. Paste your code in the left editor
2. Click "Run AI Review" (or press `Ctrl+Enter`)
3. View comprehensive analysis in the right panel

### **Keyboard Shortcuts**
| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Run AI review |

### **Understanding Reviews**

Reviews are classified by severity:
- 🔴 **Critical** - Security risks, crashes, data loss
- 🟠 **High** - Performance issues, major bugs
- 🟡 **Medium** - Code quality, maintainability
- 🟢 **Low** - Style, minor improvements

---

## 🔧 **Configuration**

### **Environment Variables**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `3000` |
| `GOOGLE_GEMINI_KEY` | Google Gemini API key | Required |
| `CORS_ORIGIN` | Allowed frontend URL | `http://localhost:5173` |

### **API Limits**

**Google Gemini Free Tier:**
- 15 requests per minute
- 1,500 requests per day
- Optimized prompts to minimize token usage

---

## 📊 **API Reference**

### **POST** `/ai/get-review`
Generate AI code review

**Request:**
```json
{
  "code": "function example() { return true; }"
}
```

**Response:**
```json
{
  "review": "## Summary\nQuality: Good\n...",
  "success": true,
  "timestamp": "2026-01-19T12:00:00.000Z",
  "responseTime": "1234ms",
  "codeLength": 42
}
```

### **GET** `/health`
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2026-01-19T12:00:00.000Z"
}
```

---

## 🐛 **Troubleshooting**

### **Common Issues**

**"Cannot connect to server"**
- ✅ Ensure backend is running: `npm start`
- ✅ Check if port 3000 is available
- ✅ Verify CORS_ORIGIN matches frontend URL

**"Invalid API key"**
- ✅ Check `.env` file exists in backend directory
- ✅ Verify API key has no extra spaces
- ✅ Get a new key from [Google AI Studio](https://makersuite.google.com/app/apikey)

**"API quota exceeded"**
- ✅ Wait for quota reset (resets daily)
- ✅ Check usage at [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)

---

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author**

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

---

## 🙏 **Acknowledgments**

- [Google Gemini AI](https://ai.google.dev/) - AI model provider
- [React](https://react.dev/) - UI framework
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

## 🗺️ **Roadmap**

- [ ] Support for more programming languages
- [ ] Review history with local storage
- [ ] Export reviews as PDF/Markdown
- [ ] VS Code extension
- [ ] GitHub integration for PR reviews
- [ ] Team collaboration features

---

## ⭐ **Show Your Support**

Give a ⭐️ if this project helped you!

---

<div align="center">
  <sub>Built with ❤️ by developers, for developers</sub>
</div>