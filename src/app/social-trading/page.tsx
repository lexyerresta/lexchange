'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { Users, TrendingUp, Copy, Star, Award, Zap, Target } from 'lucide-react';
import Link from 'next/link';

interface Trader {
    id: string;
    username: string;
    avatar: string;
    roi: number;
    winRate: number;
    followers: number;
    totalTrades: number;
    avgProfit: number;
    riskLevel: 'low' | 'medium' | 'high';
    specialties: string[];
    verified: boolean;
}

const TOP_TRADERS: Trader[] = [
    {
        id: '1',
        username: 'CryptoWhale_88',
        avatar: '🐋',
        roi: 245.8,
        winRate: 78.5,
        followers: 12453,
        totalTrades: 892,
        avgProfit: 12.4,
        riskLevel: 'medium',
        specialties: ['BTC', 'ETH', 'DeFi'],
        verified: true
    },
    {
        id: '2',
        username: 'AltcoinMaster',
        avatar: '🚀',
        roi: 189.3,
        winRate: 72.1,
        followers: 8921,
        totalTrades: 1247,
        avgProfit: 8.7,
        riskLevel: 'high',
        specialties: ['Altcoins', 'Meme Coins'],
        verified: true
    },
    {
        id: '3',
        username: 'SafeTrader_Pro',
        avatar: '🛡️',
        roi: 67.2,
        winRate: 85.3,
        followers: 15782,
        totalTrades: 456,
        avgProfit: 5.2,
        riskLevel: 'low',
        specialties: ['Stablecoins', 'Low Risk'],
        verified: true
    },
    {
        id: '4',
        username: 'DeFi_Degen',
        avatar: '⚡',
        roi: 312.5,
        winRate: 65.8,
        followers: 6234,
        totalTrades: 2134,
        avgProfit: 15.8,
        riskLevel: 'high',
        specialties: ['DeFi', 'Yield Farming'],
        verified: false
    }
];

export default function SocialTradingPage() {
    const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
    const [copiedTraders, setCopiedTraders] = useState<string[]>([]);

    const handleCopyTrader = (traderId: string) => {
        if (copiedTraders.includes(traderId)) {
            setCopiedTraders(copiedTraders.filter(id => id !== traderId));
        } else {
            setCopiedTraders([...copiedTraders, traderId]);
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'low': return '#4ade80';
            case 'medium': return '#fbbf24';
            case 'high': return '#f87171';
            default: return '#94a3b8';
        }
    };

    return (
        <AppShell>
            <div style={{ padding: '2rem', color: 'white' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                            padding: '0.75rem',
                            borderRadius: '1rem',
                            display: 'flex'
                        }}>
                            <Users size={28} />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                            Social Trading
                        </h1>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                        Copy trades from top performers automatically
                    </p>
                </div>

                {/* Stats Banner */}
                <div className="glass-card" style={{
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    marginBottom: '2rem',
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(34,211,238,0.1))'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4ade80' }}>
                                24,891
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Active Traders</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#a78bfa' }}>
                                $2.4M
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Copied Volume (24h)</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22d3ee' }}>
                                156%
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Avg ROI (Top 10)</div>
                        </div>
                    </div>
                </div>

                {/* Top Traders Grid */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {TOP_TRADERS.map(trader => (
                        <div
                            key={trader.id}
                            className="glass-card"
                            style={{
                                padding: '1.5rem',
                                borderRadius: '1rem',
                                border: copiedTraders.includes(trader.id) ? '2px solid #4ade80' : '1px solid rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onClick={() => setSelectedTrader(trader)}
                        >
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                                {/* Avatar */}
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
                                    {trader.avatar}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>{trader.username}</h3>
                                        {trader.verified && (
                                            <div style={{
                                                background: 'rgba(34,211,238,0.2)',
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '0.3rem',
                                                fontSize: '0.75rem',
                                                color: '#22d3ee',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.3rem'
                                            }}>
                                                <Award size={12} /> Verified
                                            </div>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#4ade80' }}>
                                                +{trader.roi}%
                                            </div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total ROI</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#a78bfa' }}>
                                                {trader.winRate}%
                                            </div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Win Rate</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                                {trader.followers.toLocaleString()}
                                            </div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Followers</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                                {trader.totalTrades}
                                            </div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Total Trades</div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                        <div style={{
                                            background: `${getRiskColor(trader.riskLevel)}22`,
                                            color: getRiskColor(trader.riskLevel),
                                            padding: '0.3rem 0.6rem',
                                            borderRadius: '0.4rem',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            textTransform: 'capitalize'
                                        }}>
                                            {trader.riskLevel} Risk
                                        </div>
                                        {trader.specialties.map(spec => (
                                            <div key={spec} style={{
                                                background: 'rgba(167,139,250,0.2)',
                                                color: '#a78bfa',
                                                padding: '0.3rem 0.6rem',
                                                borderRadius: '0.4rem',
                                                fontSize: '0.8rem'
                                            }}>
                                                {spec}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopyTrader(trader.id);
                                        }}
                                        style={{
                                            background: copiedTraders.includes(trader.id) ? '#f87171' : '#4ade80',
                                            color: 'black',
                                            border: 'none',
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '0.6rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {copiedTraders.includes(trader.id) ? (
                                            <>
                                                <Zap size={18} /> Stop Copying
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={18} /> Copy Trader
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Banner */}
                <div className="glass-card" style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    background: 'rgba(167,139,250,0.1)',
                    border: '1px solid rgba(167,139,250,0.3)'
                }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                        <Target size={24} color="#a78bfa" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                        <div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                How Copy Trading Works
                            </h4>
                            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                                When you copy a trader, their trades are automatically replicated in your account in real-time.
                                You can set allocation limits, stop-loss, and pause copying anytime. All trades are executed
                                with your own funds and you maintain full control.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
