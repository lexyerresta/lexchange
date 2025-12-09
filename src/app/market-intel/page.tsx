'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { TrendingUp, TrendingDown, AlertTriangle, Zap, DollarSign, Activity, Eye, Flame } from 'lucide-react';

interface WhaleAlert {
    id: string;
    type: 'buy' | 'sell' | 'transfer';
    token: string;
    amount: number;
    usdValue: number;
    from: string;
    to: string;
    timestamp: number;
    exchange?: string;
}

interface SentimentData {
    token: string;
    score: number;
    trend: 'bullish' | 'bearish' | 'neutral';
    volume24h: number;
    socialMentions: number;
    whaleActivity: number;
}

const MOCK_WHALE_ALERTS: WhaleAlert[] = [
    {
        id: '1',
        type: 'buy',
        token: 'BTC',
        amount: 247.5,
        usdValue: 24750000,
        from: '0x742d...3a9f',
        to: 'Binance',
        timestamp: Date.now() - 120000,
        exchange: 'Binance'
    },
    {
        id: '2',
        type: 'sell',
        token: 'ETH',
        amount: 5420,
        usdValue: 26500000,
        from: 'Coinbase',
        to: '0x8f2c...4b1e',
        timestamp: Date.now() - 300000,
        exchange: 'Coinbase'
    },
    {
        id: '3',
        type: 'transfer',
        token: 'USDT',
        amount: 50000000,
        usdValue: 50000000,
        from: '0x1a2b...9c8d',
        to: '0x3e4f...7a6b',
        timestamp: Date.now() - 480000
    }
];

const MOCK_SENTIMENT: SentimentData[] = [
    { token: 'BTC', score: 78, trend: 'bullish', volume24h: 28500000000, socialMentions: 125430, whaleActivity: 89 },
    { token: 'ETH', score: 72, trend: 'bullish', volume24h: 15200000000, socialMentions: 89234, whaleActivity: 76 },
    { token: 'SOL', score: 85, trend: 'bullish', volume24h: 3400000000, socialMentions: 67890, whaleActivity: 92 },
    { token: 'XRP', score: 45, trend: 'bearish', volume24h: 2100000000, socialMentions: 34567, whaleActivity: 38 }
];

export default function MarketIntelPage() {
    const [whaleAlerts, setWhaleAlerts] = useState<WhaleAlert[]>(MOCK_WHALE_ALERTS);
    const [sentiment, setSentiment] = useState<SentimentData[]>(MOCK_SENTIMENT);
    const [liveMode, setLiveMode] = useState(true);

    useEffect(() => {
        if (!liveMode) return;

        const interval = setInterval(() => {
            // Simulate new whale alert
            const newAlert: WhaleAlert = {
                id: Date.now().toString(),
                type: ['buy', 'sell', 'transfer'][Math.floor(Math.random() * 3)] as any,
                token: ['BTC', 'ETH', 'SOL', 'BNB'][Math.floor(Math.random() * 4)],
                amount: Math.random() * 1000,
                usdValue: Math.random() * 50000000 + 1000000,
                from: `0x${Math.random().toString(36).substr(2, 4)}...${Math.random().toString(36).substr(2, 4)}`,
                to: `0x${Math.random().toString(36).substr(2, 4)}...${Math.random().toString(36).substr(2, 4)}`,
                timestamp: Date.now()
            };

            setWhaleAlerts(prev => [newAlert, ...prev.slice(0, 19)]);
        }, 8000);

        return () => clearInterval(interval);
    }, [liveMode]);

    const formatTime = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        return `${Math.floor(seconds / 3600)}h ago`;
    };

    const getSentimentColor = (score: number) => {
        if (score >= 70) return '#4ade80';
        if (score >= 50) return '#fbbf24';
        return '#f87171';
    };

    return (
        <AppShell>
            <div style={{ padding: '2rem', color: 'white' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #f87171, #fbbf24)',
                                padding: '0.75rem',
                                borderRadius: '1rem',
                                display: 'flex'
                            }}>
                                <Eye size={28} />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Market Intelligence</h1>
                                <p style={{ color: '#94a3b8' }}>Real-time whale tracking & sentiment analysis</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setLiveMode(!liveMode)}
                            style={{
                                background: liveMode ? '#4ade80' : 'rgba(255,255,255,0.1)',
                                color: liveMode ? 'black' : 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {liveMode && <Activity className="animate-pulse" size={18} />}
                            {liveMode ? 'LIVE' : 'Paused'}
                        </button>
                    </div>
                </div>

                {/* Market Sentiment Cards */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Flame size={20} color="#fbbf24" /> Market Sentiment
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        {sentiment.map(s => (
                            <div
                                key={s.token}
                                className="glass-card"
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    border: `1px solid ${getSentimentColor(s.score)}33`
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{s.token}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'capitalize' }}>
                                            {s.trend}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        color: getSentimentColor(s.score)
                                    }}>
                                        {s.score}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#94a3b8' }}>Volume 24h</span>
                                        <span>${(s.volume24h / 1000000000).toFixed(2)}B</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#94a3b8' }}>Social Mentions</span>
                                        <span>{s.socialMentions.toLocaleString()}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#94a3b8' }}>Whale Activity</span>
                                        <span style={{ color: getSentimentColor(s.whaleActivity) }}>
                                            {s.whaleActivity}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Whale Alerts */}
                <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap size={20} color="#fbbf24" /> Whale Alerts
                        <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '400' }}>
                            (Transactions &gt; $1M)
                        </span>
                    </h2>

                    <div className="glass-card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {whaleAlerts.map((alert, idx) => (
                                <div
                                    key={alert.id}
                                    style={{
                                        padding: '1.25rem',
                                        borderBottom: idx < whaleAlerts.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                        background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                                        animation: idx === 0 && liveMode ? 'slideIn 0.5s ease-out' : 'none'
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        {/* Type Icon */}
                                        <div style={{
                                            background: alert.type === 'buy' ? 'rgba(74,222,128,0.2)' :
                                                alert.type === 'sell' ? 'rgba(248,113,113,0.2)' :
                                                    'rgba(167,139,250,0.2)',
                                            padding: '0.75rem',
                                            borderRadius: '0.75rem',
                                            display: 'flex'
                                        }}>
                                            {alert.type === 'buy' && <TrendingUp size={24} color="#4ade80" />}
                                            {alert.type === 'sell' && <TrendingDown size={24} color="#f87171" />}
                                            {alert.type === 'transfer' && <DollarSign size={24} color="#a78bfa" />}
                                        </div>

                                        {/* Details */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <span style={{
                                                    fontWeight: '700',
                                                    fontSize: '1.1rem',
                                                    color: alert.type === 'buy' ? '#4ade80' :
                                                        alert.type === 'sell' ? '#f87171' : '#a78bfa',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {alert.type}
                                                </span>
                                                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                                                    {alert.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {alert.token}
                                                </span>
                                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                                    (${(alert.usdValue / 1000000).toFixed(2)}M)
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                                {alert.from} → {alert.to}
                                                {alert.exchange && (
                                                    <span style={{
                                                        marginLeft: '0.5rem',
                                                        background: 'rgba(167,139,250,0.2)',
                                                        padding: '0.2rem 0.5rem',
                                                        borderRadius: '0.3rem',
                                                        color: '#a78bfa'
                                                    }}>
                                                        {alert.exchange}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Time */}
                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'right' }}>
                                            {formatTime(alert.timestamp)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(-20px);
                        opacity: 0;
                        background: rgba(74, 222, 128, 0.2);
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </AppShell>
    );
}
