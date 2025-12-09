'use client';

import dynamic from 'next/dynamic';

const AdvancedRealTimeChart = dynamic(
    () => import("react-ts-tradingview-widgets").then((mod) => mod.AdvancedRealTimeChart),
    { ssr: false }
);

interface TradingChartProps {
    symbol: string;
}

export default function TradingChart({ symbol }: TradingChartProps) {
    // Yahoo/CoinGecko symbols often need mapping to TradingView symbols.
    // e.g., "BTC" -> "BINANCE:BTCUSDT" for best data.

    // Simple heuristic: if it looks like a crypto symbol, append USDT and try BINANCE
    const tvSymbol = symbol.toUpperCase().includes('USD')
        ? `BINANCE:${symbol.toUpperCase().replace('-', '')}` // BTC-USD -> BINANCE:BTCUSD (or BTCUSDT usually)
        : `BINANCE:${symbol.toUpperCase()}USDT`;

    const finalSymbol = tvSymbol
        .replace('BINANCE:BTC-USDQD', 'BINANCE:BTCUSDT')
        .replace('BINANCE:BTC-USD', 'BINANCE:BTCUSDT')
        .replace('-USD', 'USDT')
        .replace('BINANCE:BITCOINUSDT', 'BINANCE:BTCUSDT'); // Just in case name is full

    return (
        <div style={{ width: "100%", height: "600px" }}>
            <AdvancedRealTimeChart
                theme="dark"
                symbol={finalSymbol}
                autosize
                hide_side_toolbar={false}
                allow_symbol_change={true}
                interval="15"
            />
        </div>
    );
}
