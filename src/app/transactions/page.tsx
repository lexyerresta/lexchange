'use client';

import AppShell from '@/components/AppShell';
import { useAuth } from '@/context/AuthContext';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function TransactionsPage() {
    const { user } = useAuth();

    if (!user) {
        return (
            <AppShell>
                <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    <h2>Please login to view your transactions</h2>
                    <Link href="/login">
                        <button style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', background: '#a78bfa', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                            Login
                        </button>
                    </Link>
                </div>
            </AppShell>
        );
    }

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatTxHash = (hash?: string) => {
        if (!hash) return 'N/A';
        return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
    };

    return (
        <AppShell>
            <div style={{ padding: '2rem', color: 'white' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Transaction History</h1>
                    <p style={{ color: '#94a3b8' }}>View all your trading activity</p>
                </div>

                {!user.transactions || user.transactions.length === 0 ? (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        <Clock size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                        <p>No transactions yet</p>
                        <Link href="/">
                            <button style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', background: '#334155', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                                Start Trading
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="glass-card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Type</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>From</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>To</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Price</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Time</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Status</th>
                                        <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: '500' }}>Tx Hash</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.transactions.map((tx, idx) => (
                                        <tr key={tx.id} style={{
                                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                                            background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                                        }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {tx.type === 'buy' ? (
                                                        <div style={{
                                                            background: 'rgba(74, 222, 128, 0.1)',
                                                            padding: '0.4rem',
                                                            borderRadius: '0.5rem',
                                                            display: 'flex'
                                                        }}>
                                                            <ArrowDownLeft size={16} color="#4ade80" />
                                                        </div>
                                                    ) : (
                                                        <div style={{
                                                            background: 'rgba(248, 113, 113, 0.1)',
                                                            padding: '0.4rem',
                                                            borderRadius: '0.5rem',
                                                            display: 'flex'
                                                        }}>
                                                            <ArrowUpRight size={16} color="#f87171" />
                                                        </div>
                                                    )}
                                                    <span style={{
                                                        color: tx.type === 'buy' ? '#4ade80' : '#f87171',
                                                        fontWeight: '600',
                                                        textTransform: 'capitalize'
                                                    }}>
                                                        {tx.type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>{tx.fromAmount.toFixed(6)} {tx.fromToken}</div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>{tx.toAmount.toFixed(6)} {tx.toToken}</div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                                                ${tx.price.toLocaleString()}
                                            </td>
                                            <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                                                {formatDate(tx.timestamp)}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {tx.status === 'completed' && (
                                                        <>
                                                            <CheckCircle size={16} color="#4ade80" />
                                                            <span style={{ color: '#4ade80', fontSize: '0.9rem' }}>Completed</span>
                                                        </>
                                                    )}
                                                    {tx.status === 'pending' && (
                                                        <>
                                                            <Clock size={16} color="#fbbf24" />
                                                            <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>Pending</span>
                                                        </>
                                                    )}
                                                    {tx.status === 'failed' && (
                                                        <>
                                                            <XCircle size={16} color="#f87171" />
                                                            <span style={{ color: '#f87171', fontSize: '0.9rem' }}>Failed</span>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                {tx.txHash ? (
                                                    <a
                                                        href={`https://etherscan.io/tx/${tx.txHash}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            color: '#a78bfa',
                                                            textDecoration: 'none',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.3rem',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {formatTxHash(tx.txHash)}
                                                        <ExternalLink size={12} />
                                                    </a>
                                                ) : (
                                                    <span style={{ color: '#64748b' }}>-</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
