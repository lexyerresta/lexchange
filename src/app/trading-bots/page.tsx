'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { useAuth } from '@/context/AuthContext';
import { Bot, Play, Pause, Settings, TrendingUp, Zap, DollarSign, Target, AlertCircle, Plus } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface TradingBot {
    id: string;
    name: string;
    strategy: 'dca' | 'grid' | 'momentum' | 'arbitrage';
    status: 'active' | 'paused' | 'stopped';
    token: string;
    invested: number;
    profit: number;
    profitPercent: number;
    trades: number;
    winRate: number;
    createdAt: number;
    settings: any;
}

const MOCK_BOTS: TradingBot[] = [
    {
        id: '1',
        name: 'BTC DCA Bot',
        strategy: 'dca',
        status: 'active',
        token: 'BTC',
        invested: 5000,
        profit: 847.50,
        profitPercent: 16.95,
        trades: 24,
        winRate: 87.5,
        createdAt: Date.now() - 2592000000,
        settings: { interval: '24h', amount: 100 }
    },
    {
        id: '2',
        name: 'ETH Grid Trading',
        strategy: 'grid',
        status: 'active',
        token: 'ETH',
        invested: 3000,
        profit: 421.30,
        profitPercent: 14.04,
        trades: 156,
        winRate: 92.3,
        createdAt: Date.now() - 1296000000,
        settings: { gridLevels: 10, range: '5%' }
    }
];

const STRATEGIES = [
    {
        id: 'dca',
        name: 'Dollar Cost Averaging',
        description: 'Buy fixed amounts at regular intervals',
        icon: '📊',
        riskLevel: 'Low',
        profitPotential: 'Medium'
    },
    {
        id: 'grid',
        name: 'Grid Trading',
        description: 'Place buy/sell orders at set price levels',
        icon: '🎯',
        riskLevel: 'Medium',
        profitPotential: 'High'
    },
    {
        id: 'momentum',
        name: 'Momentum Trading',
        description: 'Follow strong price trends',
        icon: '🚀',
        riskLevel: 'High',
        profitPotential: 'Very High'
    },
    {
        id: 'arbitrage',
        name: 'Arbitrage Bot',
        description: 'Exploit price differences across exchanges',
        icon: '⚡',
        riskLevel: 'Low',
        profitPotential: 'Medium'
    }
];

export default function TradingBotsPage() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [bots, setBots] = useState<TradingBot[]>(MOCK_BOTS);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const toggleBot = (id: string) => {
        setBots(bots.map(bot => {
            if (bot.id === id) {
                const newStatus = bot.status === 'active' ? 'paused' : 'active';
                showToast(
                    `Bot ${newStatus === 'active' ? 'activated' : 'paused'}`,
                    newStatus === 'active' ? 'success' : 'info'
                );
                return { ...bot, status: newStatus };
            }
            return bot;
        }));
    };

    const getStrategyInfo = (strategy: string) => {
        return STRATEGIES.find(s => s.id === strategy);
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'Low': return '#4ade80';
            case 'Medium': return '#fbbf24';
            case 'High': return '#f87171';
            default: return '#94a3b8';
        }
    };

    if (!user) {
        return (
            <AppShell>
                <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    <Bot size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>Please login to access trading bots</p>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div style={{ padding: '2rem', color: 'white' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                                padding: '0.75rem',
                                borderRadius: '1rem',
                                display: 'flex'
                            }}>
                                <Bot size={28} />
                            </div>
                            <div>
                                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Trading Bots</h1>
                                <p style={{ color: '#94a3b8' }}>Automate your trading strategies 24/7</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            style={{
                                background: '#4ade80',
                                color: 'black',
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
                            <Plus size={20} /> Create Bot
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Bots</div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4ade80' }}>
                            {bots.filter(b => b.status === 'active').length}
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Profit</div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4ade80' }}>
                            ${bots.reduce((sum, b) => sum + b.profit, 0).toFixed(2)}
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Avg Win Rate</div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#a78bfa' }}>
                            {(bots.reduce((sum, b) => sum + b.winRate, 0) / bots.length).toFixed(1)}%
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Trades</div>
                        <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                            {bots.reduce((sum, b) => sum + b.trades, 0)}
                        </div>
                    </div>
                </div>

                {/* Active Bots */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Your Bots</h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {bots.map(bot => {
                            const strategyInfo = getStrategyInfo(bot.strategy);
                            return (
                                <div
                                    key={bot.id}
                                    className="glass-card"
                                    style={{
                                        padding: '1.5rem',
                                        borderRadius: '1rem',
                                        border: bot.status === 'active' ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                                        {/* Icon */}
                                        <div style={{
                                            fontSize: '3rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {strategyInfo?.icon}
                                        </div>

                                        {/* Info */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>{bot.name}</h3>
                                                <div style={{
                                                    background: bot.status === 'active' ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)',
                                                    color: bot.status === 'active' ? '#4ade80' : '#fbbf24',
                                                    padding: '0.3rem 0.6rem',
                                                    borderRadius: '0.4rem',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    textTransform: 'capitalize',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.3rem'
                                                }}>
                                                    {bot.status === 'active' && <div className="pulse-dot" />}
                                                    {bot.status}
                                                </div>
                                            </div>

                                            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                                {strategyInfo?.name} • {bot.token}
                                            </div>

                                            {/* Stats Grid */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Profit</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: bot.profit > 0 ? '#4ade80' : '#f87171' }}>
                                                        ${bot.profit.toFixed(2)}
                                                    </div>
                                                    <div style={{ fontSize: '0.8rem', color: bot.profitPercent > 0 ? '#4ade80' : '#f87171' }}>
                                                        +{bot.profitPercent}%
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Invested</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                                                        ${bot.invested.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Win Rate</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a78bfa' }}>
                                                        {bot.winRate}%
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Trades</div>
                                                    <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                                                        {bot.trades}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => toggleBot(bot.id)}
                                                    style={{
                                                        background: bot.status === 'active' ? 'rgba(251,191,36,0.2)' : 'rgba(74,222,128,0.2)',
                                                        border: 'none',
                                                        padding: '0.6rem 1rem',
                                                        borderRadius: '0.5rem',
                                                        color: bot.status === 'active' ? '#fbbf24' : '#4ade80',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    {bot.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                                                    {bot.status === 'active' ? 'Pause' : 'Start'}
                                                </button>
                                                <button
                                                    style={{
                                                        background: 'rgba(167,139,250,0.2)',
                                                        border: 'none',
                                                        padding: '0.6rem 1rem',
                                                        borderRadius: '0.5rem',
                                                        color: '#a78bfa',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    <Settings size={16} />
                                                    Settings
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Available Strategies */}
                <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem' }}>Available Strategies</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                        {STRATEGIES.map(strategy => (
                            <div
                                key={strategy.id}
                                className="glass-card"
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => setShowCreateModal(true)}
                            >
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{strategy.icon}</div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                    {strategy.name}
                                </h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                                    {strategy.description}
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <div style={{
                                        background: `${getRiskColor(strategy.riskLevel)}22`,
                                        color: getRiskColor(strategy.riskLevel),
                                        padding: '0.3rem 0.6rem',
                                        borderRadius: '0.4rem',
                                        fontSize: '0.8rem',
                                        fontWeight: '600'
                                    }}>
                                        {strategy.riskLevel} Risk
                                    </div>
                                    <div style={{
                                        background: 'rgba(167,139,250,0.2)',
                                        color: '#a78bfa',
                                        padding: '0.3rem 0.6rem',
                                        borderRadius: '0.4rem',
                                        fontSize: '0.8rem'
                                    }}>
                                        {strategy.profitPotential} Profit
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #4ade80;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </AppShell>
    );
}
