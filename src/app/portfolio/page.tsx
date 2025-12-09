
'use client';

import AppShell from '@/components/AppShell';
import { useAuth } from '@/context/AuthContext';
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const COIN_COLORS: Record<string, string> = {
    'BTC': '#f7931a',
    'ETH': '#627eea',
    'USDT': '#26a17b',
    'SOL': '#9945ff',
    'BNB': '#f3ba2f'
};

export default function PortfolioPage() {
    const { user } = useAuth();

    // Calculate total portfolio value
    const totalValue = user ? user.balance + user.assets.reduce((sum, asset) => sum + asset.value, 0) : 0;

    return (
        <AppShell>
            <div style={{ padding: '2rem', color: 'white' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Portfolio</h1>

                {user ? (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {/* Balance Cards Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                            {/* Total Value Card */}
                            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'linear-gradient(145deg, rgba(167,139,250,0.1), rgba(20,20,30,0.8))', border: '1px solid rgba(167,139,250,0.2)' }}>
                                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <TrendingUp size={16} /> Total Portfolio Value
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#a78bfa' }}>
                                    ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>

                            {/* Available Balance Card */}
                            <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'linear-gradient(145deg, rgba(30,30,40,0.6), rgba(20,20,30,0.8))' }}>
                                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Available Balance (USDT)</div>
                                <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                                    ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                    <button style={{ flex: 1, background: '#4ade80', color: 'black', padding: '0.6rem', borderRadius: '0.6rem', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                        <ArrowDownLeft size={16} /> Deposit
                                    </button>
                                    <button style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '0.6rem', borderRadius: '0.6rem', border: 'none', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                        <ArrowUpRight size={16} /> Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Assets List */}
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Assets</h3>
                            {user.assets.length === 0 ? (
                                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                                    <p>No assets yet. Start trading to build your portfolio!</p>
                                    <Link href="/">
                                        <button style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', background: '#334155', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                                            Explore Market
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="glass-card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                                <th style={{ padding: '1rem', color: '#94a3b8' }}>Asset</th>
                                                <th style={{ padding: '1rem', color: '#94a3b8' }}>Balance</th>
                                                <th style={{ padding: '1rem', color: '#94a3b8' }}>Value (USD)</th>
                                                <th style={{ padding: '1rem', color: '#94a3b8' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.assets.map((asset, idx) => (
                                                <tr key={asset.symbol} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <td style={{ padding: '1rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                            <div style={{
                                                                width: '32px',
                                                                height: '32px',
                                                                background: COIN_COLORS[asset.symbol] || '#64748b',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 'bold',
                                                                fontSize: '0.9rem'
                                                            }}>
                                                                {asset.symbol[0]}
                                                            </div>
                                                            <div>
                                                                <div style={{ fontWeight: 'bold' }}>{asset.name}</div>
                                                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{asset.symbol}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '1rem', fontFamily: 'monospace' }}>
                                                        {asset.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {asset.symbol}
                                                    </td>
                                                    <td style={{ padding: '1rem', color: '#4ade80', fontWeight: '600' }}>
                                                        ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <Link href={`/pair/${asset.symbol.toLowerCase()}`}>
                                                            <button style={{
                                                                background: 'rgba(167, 139, 250, 0.1)',
                                                                color: '#a78bfa',
                                                                border: '1px solid rgba(167, 139, 250, 0.3)',
                                                                padding: '0.4rem 0.8rem',
                                                                borderRadius: '0.4rem',
                                                                cursor: 'pointer',
                                                                fontSize: '0.85rem',
                                                                fontWeight: '500'
                                                            }}>
                                                                Trade
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                        <Wallet size={48} style={{ marginBottom: '1rem', opacity: 0.5, margin: '0 auto 1rem' }} />
                        <h2>Please login to view your portfolio</h2>
                        <Link href="/login">
                            <button style={{ marginTop: '1.5rem', padding: '0.8rem 2rem', background: '#a78bfa', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
                                Connect Wallet
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
