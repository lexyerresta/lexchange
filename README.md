# 🚀 Lexchange - The Future of Crypto Trading

> **A revolutionary cryptocurrency exchange platform with AI-powered trading, automated bots, and real-time market intelligence.**

![Lexchange Banner](https://img.shields.io/badge/Lexchange-v1.0.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Three.js](https://img.shields.io/badge/Three.js-Latest-green)

---

## ✨ What Makes Lexchange Different?

Lexchange isn't just another crypto exchange. It's a **next-generation trading platform** that combines:

- 🤖 **Real AI Integration** (Google Gemini API)
- 🎮 **Interactive 3D Visualizations** (Three.js)
- 🤝 **Social Copy Trading**
- 🐋 **Whale Activity Tracking**
- ⚡ **Automated Trading Bots**
- 📊 **Multi-Chart Analysis**
- 🔔 **Smart Price Alerts**

---

## 🎯 Key Features

### 🏠 Landing Page Experience
- **Full-Screen Animated Landing** - No sidebar, pure visual experience
- **3D Crypto Universe** - Interactive Three.js showcase with 5 major cryptocurrencies
- **Live Price Tickers** - Real-time price updates with trend indicators
- **Particle Effects** - 3000+ animated particles with dynamic lighting
- **Parallax Scrolling** - Smooth scroll-based animations
- **Hidden Navbar** - Appears only when scrolling

### 🤖 AI-Powered Trading (REVOLUTIONARY!)

#### AI Trader Chat
- **Real Google Gemini Integration** - Not mock responses!
- **Context-Aware Conversations** - Knows your portfolio and trading history
- **Smart Recommendations** - Entry/exit points, risk analysis, technical indicators
- **Executable Actions** - Trade directly from chat, set alerts
- **Natural Language** - Ask anything about crypto in plain English

#### Auto-Trading Bots
- **4 Professional Strategies**:
  - 📊 **DCA (Dollar Cost Averaging)** - Low risk, steady growth
  - 🎯 **Grid Trading** - Profit from volatility
  - 🚀 **Momentum Trading** - Ride the trends
  - ⚡ **Arbitrage Bot** - Cross-exchange opportunities
- **Live Performance Tracking** - Real-time profit/loss, win rates
- **One-Click Setup** - Start trading in seconds

### 📈 Advanced Trading Tools

#### Multi-Chart Analysis
- **Up to 6 Charts Simultaneously**
- **4 Layout Options** - Single, dual, quad, grid
- **TradingView Integration** - Professional charting
- **Fullscreen Mode** - Focus on what matters

#### Market Intelligence
- **Whale Tracking** - Monitor large transactions in real-time
- **Sentiment Analysis** - Bull/bear market indicators
- **Live Alerts** - Instant notifications for whale movements
- **Volume Analysis** - Track market momentum

#### Social Trading
- **Top Traders Leaderboard** - See who's winning
- **One-Click Copy Trading** - Mirror successful strategies
- **Detailed Statistics** - Win rates, ROI, trade history
- **Follow System** - Track your favorite traders

#### Price Alerts
- **Multi-Channel Notifications**:
  - 📱 In-app alerts
  - 💬 Telegram integration
  - 🎮 Discord integration
- **Smart Conditions** - Above/below price targets
- **Unlimited Alerts** - Set as many as you need

### 💼 Core Trading Features
- **Real-Time Market Data** - Live prices from CoinGecko API
- **Portfolio Management** - Track all your assets
- **Transaction History** - Complete trade records
- **Watchlist System** - Monitor your favorite coins
- **Swap Interface** - Easy token swapping with MAX button
- **Gas Reservation** - Smart balance management

---

## 🎨 Premium UI/UX

### Design Philosophy
- **Apple-Level Aesthetics** - Glassmorphism, gradients, smooth animations
- **60 FPS Animations** - Buttery smooth performance
- **Dark Mode First** - Easy on the eyes
- **Mobile Responsive** - Works on all devices
- **Accessibility** - WCAG compliant

### Visual Effects
- **Animated Particle Background** - 100+ interactive particles
- **Mouse Parallax** - Elements respond to cursor
- **Scroll Animations** - Staggered reveals, parallax
- **Gradient Orbs** - Dynamic floating elements
- **Shimmer Effects** - Hover interactions
- **Smooth Transitions** - 0.3s easing on everything

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.8 (App Router)
- **Language**: TypeScript 5.0
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: CSS Modules + Vanilla CSS

### Backend & APIs
- **AI**: Google Gemini Pro API
- **Market Data**: CoinGecko API
- **Charts**: TradingView Widgets
- **Authentication**: Context API (expandable to NextAuth)

### Performance
- **SSR**: Server-Side Rendering
- **Code Splitting**: Automatic route-based
- **Image Optimization**: Next.js Image
- **Lazy Loading**: Dynamic imports

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ (20.11.0 recommended)
npm 10+
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/lexyerresta/lexchange.git
cd lexchange
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```env
# Google Gemini API Key (Required for AI features)
# Get it from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

---

## 📖 Usage Guide

### For New Users (Landing Page)
1. Visit homepage - Full animated experience, NO sidebar
2. Scroll to see 3D Crypto Universe showcase
3. View live price tickers
4. Click "Start Trading" to register

### For Logged-In Users
1. **Sidebar appears** - Access all features
2. **Floating menu button** - Toggle sidebar visibility
3. **Full feature access** - Trading, AI, bots, analytics

### Using AI Trader Chat
1. Navigate to `/ai-trader`
2. Type your question: "Should I buy BTC?"
3. Get AI-powered analysis with entry/exit points
4. Click suggestions for quick actions
5. Execute trades or set alerts directly from chat

### Setting Up Trading Bots
1. Go to `/trading-bots`
2. Choose a strategy (DCA, Grid, Momentum, Arbitrage)
3. Configure parameters
4. Click "Create Bot"
5. Monitor performance in real-time

---

## 🧪 Testing

### Manual Testing Checklist

#### Landing Page (Not Logged In)
- [ ] No sidebar visible
- [ ] Navbar hidden initially
- [ ] Navbar appears on scroll
- [ ] 3D showcase loads and animates
- [ ] Live price tickers update
- [ ] Particle background animates
- [ ] Parallax effects work
- [ ] All animations smooth (60fps)

#### Registration & Login
- [ ] Can register new user
- [ ] Redirects to homepage after registration
- [ ] User balance shows $1000
- [ ] Sidebar appears after login
- [ ] Floating menu button works

#### AI Features
- [ ] AI Trader Chat loads
- [ ] Can send messages
- [ ] AI responds (with Gemini API key)
- [ ] Suggestions appear
- [ ] Trading Bots page loads
- [ ] Can view bot strategies
- [ ] Bot stats display correctly

#### Trading Features
- [ ] Market table loads with real data
- [ ] Can navigate to token detail pages
- [ ] Charts load correctly
- [ ] Swap interface works
- [ ] MAX button calculates correctly
- [ ] Portfolio displays assets
- [ ] Transaction history shows trades

#### Advanced Features
- [ ] Multi-charts loads
- [ ] Can add/remove charts
- [ ] Layout switching works
- [ ] Market Intel shows whale alerts
- [ ] Social Trading leaderboard loads
- [ ] Price Alerts can be created

### Automated Testing
```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production (tests compilation)
npm run build
```

---

## 📁 Project Structure

```
lexchange/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage (landing)
│   │   ├── login/             # Authentication
│   │   ├── ai-trader/         # AI Chat interface
│   │   ├── trading-bots/      # Bot management
│   │   ├── market-intel/      # Whale tracking
│   │   ├── social-trading/    # Copy trading
│   │   ├── price-alerts/      # Alert management
│   │   ├── multicharts/       # Multi-chart view
│   │   ├── portfolio/         # Portfolio page
│   │   ├── transactions/      # Transaction history
│   │   ├── watchlist/         # Watchlist page
│   │   ├── pair/[symbol]/     # Token detail pages
│   │   └── api/               # API routes
│   │       ├── market/        # Market data API
│   │       └── ai-chat/       # AI chat API
│   ├── components/            # React components
│   │   ├── Navbar.tsx         # Hidden navbar
│   │   ├── Hero.tsx           # Landing hero
│   │   ├── ThreeJSShowcase.tsx # 3D visualization
│   │   ├── AnimatedBackground.tsx # Particle system
│   │   ├── AITraderChat.tsx   # AI chat component
│   │   ├── MarketTable.tsx    # Market data table
│   │   ├── TradingChart.tsx   # Chart component
│   │   ├── SwapInterface.tsx  # Trading interface
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   └── AppShell.tsx       # Layout wrapper
│   ├── context/               # React Context
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── ToastContext.tsx   # Notifications
│   └── styles/                # CSS modules
├── public/                    # Static assets
├── .env.example              # Environment template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── next.config.js            # Next.js config
```

---

## 🔑 Environment Variables

### Required
```env
GEMINI_API_KEY=your_key_here
```
Get your free API key: https://makersuite.google.com/app/apikey

### Optional (Future)
```env
NEXT_PUBLIC_COINGECKO_API_KEY=your_key_here
TELEGRAM_BOT_TOKEN=your_token_here
DISCORD_WEBHOOK_URL=your_webhook_here
```

---

## 🎯 Roadmap

### Phase 1: Core Platform ✅
- [x] Landing page with 3D showcase
- [x] User authentication
- [x] Real-time market data
- [x] Trading interface
- [x] Portfolio management

### Phase 2: AI Integration ✅
- [x] Google Gemini API integration
- [x] AI Trader Chat
- [x] Automated trading bots
- [x] Smart recommendations

### Phase 3: Advanced Features ✅
- [x] Multi-chart analysis
- [x] Whale tracking
- [x] Social copy trading
- [x] Price alerts

### Phase 4: Production (In Progress)
- [ ] Real exchange integration
- [ ] KYC/AML compliance
- [ ] Fiat on/off ramps
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced order types
- [ ] Margin trading

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript
- Follow existing patterns
- Add comments for complex logic
- Test before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Lexy Erresta**
- GitHub: [@lexyerresta](https://github.com/lexyerresta)

---

## 🙏 Acknowledgments

- **Google Gemini** - AI capabilities
- **CoinGecko** - Market data API
- **TradingView** - Professional charts
- **Three.js** - 3D graphics
- **Next.js Team** - Amazing framework
- **Vercel** - Deployment platform

---

## 📞 Support

Need help? Have questions?

- 📧 Email: support@lexchange.com
- 💬 Discord: [Join our community](#)
- 🐦 Twitter: [@lexchange](#)
- 📖 Docs: [docs.lexchange.com](#)

---

## ⚠️ Disclaimer

**This is a demonstration project.** Lexchange is not a real cryptocurrency exchange. Do not use real funds or expect actual trading functionality. This project is for educational and portfolio purposes only.

For real cryptocurrency trading, please use licensed and regulated exchanges.

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and Three.js**

⭐ Star this repo if you found it helpful!

</div>
