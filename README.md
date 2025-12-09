# Lexchange - Modern Crypto Trading Platform

A full-featured cryptocurrency trading platform built with Next.js 16, featuring real-time market data, portfolio management, and trading capabilities.

## Features

### Core Functionality
- User authentication with wallet connection simulation
- Real-time cryptocurrency market data from CoinGecko API
- Live TradingView charts for detailed price analysis
- Portfolio management with asset tracking
- Watchlist system for favorite cryptocurrencies
- Buy/Sell trading interface with balance validation
- Price display in USD and IDR (Indonesian Rupiah)

### Pages
- **Homepage**: Market overview with live data and filtering
- **Login/Register**: User authentication with custom username support
- **Portfolio**: Asset management and balance tracking
- **Watchlist**: Starred cryptocurrencies with live prices
- **Token Details**: Individual coin pages with charts and trading
- **Multicharts**: Grid layout for multiple chart viewing

### Technical Features
- Server-side rendering with Next.js App Router
- TypeScript for type safety
- Responsive design for all devices
- Persistent user data with localStorage
- Real-time price updates every 60 seconds
- Pagination and search functionality
- Filter by market cap, volume, and trending

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Default User Credentials
```
Username: LexyTrader
Address: 0x71C...9A21
Starting Balance: $4,120.69
Preset Assets: BTC, ETH, USDT
```

### Quick Start Guide

1. **Register a New Account**
   - Click "Sign Up" in the navigation
   - Enter a custom username
   - Start with $1,000 USDT balance

2. **Browse Market**
   - View live cryptocurrency prices
   - Use filters: Top 100, High Volume, Trending, New Pairs
   - Search for specific coins
   - Star coins to add to watchlist

3. **Trade Cryptocurrencies**
   - Click "Details" on any coin
   - View live TradingView chart
   - Enter amount to buy or sell
   - Confirm transaction
   - Portfolio updates automatically

4. **Manage Portfolio**
   - View total portfolio value
   - See all owned assets
   - Track individual asset performance
   - Quick access to trade each asset

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules with glassmorphism effects
- **Charts**: react-ts-tradingview-widgets
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Data Source**: CoinGecko API
- **State Management**: React Context API

## Project Structure

```
src/
├── app/
│   ├── api/market/          # API routes
│   ├── pair/[symbol]/       # Dynamic token pages
│   ├── portfolio/           # Portfolio management
│   ├── watchlist/           # Watchlist page
│   └── login/               # Authentication
├── components/
│   ├── Navbar.tsx           # Navigation with auth
│   ├── MarketTable.tsx      # Market data table
│   ├── TradingChart.tsx     # TradingView integration
│   ├── SwapInterface.tsx    # Trading interface
│   └── Sidebar.tsx          # Side navigation
└── context/
    └── AuthContext.tsx      # Authentication state
```

## API Integration

The application uses the CoinGecko API for cryptocurrency data:
- Market data endpoint: `/api/v3/coins/markets`
- Rate limit: 10-30 calls per minute (free tier)
- Data refresh interval: 60 seconds

## Known Limitations

- IDR conversion uses approximate static exchange rate
- Some fields use placeholder data (contract addresses, audit status)
- Gas fees displayed but not calculated
- CoinGecko API rate limits may apply

## Future Enhancements

- Real wallet integration (MetaMask, WalletConnect)
- WebSocket for live price updates
- Advanced charting tools
- Order history tracking
- Price alerts system
- Multi-language support
- Theme customization

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For questions or feedback, please open an issue on GitHub.
