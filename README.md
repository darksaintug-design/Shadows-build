# 🔷 SHADOWS/BUILD - Expert Advisor & Indicator Studio

A **professional-grade** EA and indicator builder platform inspired by LuxAlgo's premium interface. Built with React, deployed for free, ready for monetization.

![Status](https://img.shields.io/badge/status-ready%20to%20deploy-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue)

---

## 🎯 What You Get

✅ **Interactive Strategy Builder** - Drag-and-drop indicator composition
✅ **Real-time Code Generation** - Auto-generates MQL5 code for MetaTrader 5
✅ **Premium UI** - Dark theme with cyan/emerald gradients (LuxAlgo inspired)
✅ **Risk Management Tools** - Built-in risk percentage calculator
✅ **Multiple Indicators** - RSI, MACD, Bollinger Bands, EMA, Stochastic, ATR
✅ **Copy-to-Clipboard** - One-click code export
✅ **Mobile Responsive** - Works on all devices
✅ **Zero Cost Deployment** - Free forever on Vercel/Netlify
✅ **Production Ready** - Professional code, no fluff

---

## 🚀 Deploy in 5 Minutes

### **Option 1: Vercel (Recommended)**

```bash
# 1. Create GitHub repo
mkdir shadows-build && cd shadows-build
git init

# 2. Copy files
cp path/to/App.jsx src/App.jsx
cp path/to/package.json .
cp path/to/index.html public/

# 3. Push to GitHub
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/shadows-build.git
git push -u origin main

# 4. Deploy
# Go to vercel.com → Import your GitHub repo → Click Deploy
# Done! Your site is live at shadows-build.vercel.app
```

### **Option 2: Netlify (Drag & Drop)**

```bash
# 1. Build locally
npm install
npm run build

# 2. Go to netlify.com
# 3. Drag the 'build' folder onto the page
# 4. Done! Instant deployment
```

### **Option 3: Use StackBlitz (No Install Needed)**

1. Go to https://stackblitz.com/fork/react
2. Replace `src/App.jsx` with our code
3. Click "Deploy" → Instant live URL

---

## 📁 Project Structure

```
shadows-build/
├── public/
│   ├── index.html              # Main HTML (Tailwind, Analytics)
│   ├── favicon.ico             # Your branding
│   └── og-image.png            # Social media preview
│
├── src/
│   ├── App.jsx                 # Main component (all the logic)
│   ├── App.css                 # Custom styles (if any)
│   └── index.js                # React entry point
│
├── package.json                # Dependencies & scripts
├── .gitignore                  # Git ignore list
└── README.md                   # This file
```

---

## 🛠️ Setup Locally

### Prerequisites
- Node.js 14+ (download from nodejs.org)
- Git
- A text editor (VS Code recommended)

### Installation

```bash
# 1. Create React app
npx create-react-app shadows-build
cd shadows-build

# 2. Install dependencies
npm install lucide-react

# 3. Copy our App.jsx to src/
cp path/to/App.jsx src/App.jsx

# 4. Start development server
npm start
# Opens http://localhost:3000

# 5. Build for production
npm run build
# Creates optimized build/ folder
```

---

## 🎨 Features Explained

### **Strategy Builder**
- Drag indicators from left panel
- See real-time preview
- Configure each indicator
- Adjust risk percentage
- One-click code export

### **Indicator Library**
- **Momentum**: RSI, MACD, Stochastic
- **Trend**: EMA (easily add SMA, WMA)
- **Volatility**: Bollinger Bands, ATR

Add more indicators by updating:
```javascript
const indicators = [
  { id: 'your-indicator', name: 'Your Name', category: 'category', icon: '🔷' },
  // ...
];
```

### **Code Generation**
- Generates production-ready MQL5
- Includes risk management
- Magic number support
- Buy/Sell logic templates
- Ready to compile in MT5

### **Dark Premium Theme**
- Slate 950 background
- Cyan/Emerald accents
- Animated gradients
- Smooth transitions
- Professional animations

---

## 💡 Customization

### Change Colors
Edit the color classes in `App.jsx`:
```javascript
// Current: cyan-400, emerald-500
// Try: blue-400, purple-500 or pink-400, orange-500
<div className="bg-gradient-to-r from-cyan-500 to-emerald-500">
```

### Add More Indicators
```javascript
indicators.push({
  id: 'your-id',
  name: 'Your Indicator Name',
  category: 'momentum', // or trend, volatility
  icon: '📊' // Any emoji
});
```

### Modify Code Generation
Edit the `generateCode()` function to output your preferred format (Python, Pine Script, etc.)

### Add Real Database
```javascript
// Firebase example
import { getFirestore, collection, addDoc } from 'firebase/firestore';

async function saveStrategy(strategy) {
  const db = getFirestore();
  await addDoc(collection(db, 'strategies'), strategy);
}
```

---

## 📊 Analytics & Monitoring

### Add Google Analytics
```javascript
// Already set up in index.html
// Replace 'G-XXXXXXXXXX' with your tracking ID from google.com/analytics
```

### Enable Vercel Analytics
- In Vercel Dashboard → Settings → Analytics
- Track pageviews, users, performance

### Uptime Monitoring
- Sign up at uptimerobot.com
- Monitor your site 24/7 for free

---

## 🔐 Environment Variables

Create `.env.local` for sensitive data:

```env
REACT_APP_API_KEY=your_key_here
REACT_APP_FIREBASE_CONFIG=your_config
```

Use in code:
```javascript
const apiKey = process.env.REACT_APP_API_KEY;
```

---

## 🚢 Deployment Checklist

- [ ] Build runs locally without errors: `npm run build`
- [ ] Mobile responsive (test on phone)
- [ ] All indicators load correctly
- [ ] Code generation works
- [ ] Copy button copies to clipboard
- [ ] No console errors (check F12)
- [ ] Fast loading (Lighthouse >85)
- [ ] Custom domain configured
- [ ] Analytics tracking active
- [ ] Favicon & metadata updated

---

## 💰 Monetization Ideas

### 1. **Premium Features** ($9-29/mo)
```javascript
if (user.isPremium) {
  // Advanced backtesting
  // Multi-timeframe analysis
  // Advanced risk calculations
  // Private strategy library
}
```

### 2. **API Access** ($99-499/mo)
- Sell API keys for strategy integration
- Connect with trading bots
- Real-time signal generation

### 3. **Strategy Marketplace**
- Users upload strategies
- You take 30% commission
- Community-driven library

### 4. **Affiliate Programs**
- MetaTrader 5 broker affiliates
- Trading VPS affiliates
- Tool recommendations

### 5. **Consulting / Custom Development**
- $500-2000 for custom strategies
- Custom indicator development
- Trading system setup

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| `React not found` | Run `npm install` in project folder |
| Build fails | Clear node_modules: `rm -rf node_modules && npm install` |
| Localhost 3000 won't open | Kill port: `npx kill-port 3000` |
| Vercel deploy fails | Ensure `npm run build` works locally first |
| Slow performance | Enable Vercel caching & image optimization |
| Can't connect to GitHub | Use Personal Access Token (PAT) instead |

---

## 🔗 Useful Links

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Vercel Deploy**: https://vercel.com
- **Netlify Deploy**: https://netlify.com
- **Firebase**: https://firebase.google.com
- **MetaTrader 5**: https://www.metatrader5.com/
- **MQL5 Documentation**: https://www.mql5.com/en/docs

---

## 📝 License

MIT License - Free to use, modify, and deploy commercially.

---

## 🎯 Next Steps

1. **Deploy Today** - Get it live in 5 minutes
2. **Test & Refine** - Gather user feedback
3. **Add Features** - Database, authentication, backtesting
4. **Market It** - Trading communities, social media
5. **Monetize** - Premium features, marketplace, API

---

## 🤝 Support

Need help? Check:
- **Docs folder** - DEPLOYMENT_GUIDE.md, QUICK_START.md
- **GitHub Issues** - Post questions
- **React Docs** - react.dev
- **Vercel Docs** - vercel.com/docs

---

**Built with ❤️ for professional traders.**

**Ready to ship. Ready to scale. Ready to make money. 🚀**
