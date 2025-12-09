
'use client';

import AppShell from '@/components/AppShell';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { Star, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

interface CoinData {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    marketCap: number;
    image?: string;
}

export default function WatchlistPage() {
    const { user, toggleWatchlist } = useAuth();
    const [watchedCoins, setWatchedCoins] = useState<CoinData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWatchlistData = async () => {
            if (!user || !user.watchlist || user.watchlist.length === 0) {
                setWatchedCoins([]);
                return;
            }

            setLoading(true);
            try {
                // Fetch data for all coins in watchlist
                // Note: CoinGecko markets endpoint allows comma separated ids
                const ids = user.watchlist.join(',');
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=false`);
                const data = await res.json();

                // Map to internal format
                const formatted: CoinData[] = data.map((c: any) => ({
                    symbol: c.symbol,
                    name: c.name,
                    price: c.current_price,
                    changePercent: c.price_change_percentage_24h,
                    marketCap: c.market_cap,
                    image: c.image
                }));

                setWatchedCoins(formatted);
            } catch (e) {
                console.error("Failed to fetch watchlist", e);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlistData();
    }, [user?.watchlist]); // Re-fetch when watchlist changes

    if (!user) {
        return (
            <AppShell>
                <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    <h2>Please login to view your watchlist</h2>
                    <Link href="/login">
                        <button style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', background: '#a78bfa', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                            Login
                        </button>
                    </Link>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Your Watchlist</h1>

                {user.watchlist.length === 0 ? (
                    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                        <p>You haven't starred any coins yet.</p>
                        <Link href="/">
                            <button style={{ marginTop: '1rem', padding: '0.6rem 1.2rem', background: '#334155', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                                Find Coins
                            </button>
                        </Link>
                    </div>
                ) : loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                        <RefreshCcw className="animate-spin" /> Loading your favorites...
                    </div>
                ) : (
                    <div className="glass-card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', color: '#94a3b8' }}>
                                    <th style={{ padding: '1rem' }}>Asset</th>
                                    <th style={{ padding: '1rem' }}>Price</th>
                                    <th style={{ padding: '1rem' }}>24h %</th>
                                    <th style={{ padding: '1rem' }}>Mkt Cap</th>
                                    <th style={{ padding: '1rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {watchedCoins.map(coin => (
                                    <tr key={coin.symbol} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <div
                                                onClick={() => toggleWatchlist(coin.symbol)}
                                                style={{ cursor: 'pointer', color: '#eab308' }}
                                            >
                                                <Star size={16} fill="#eab308" />
                                            </div>
                                            <img src={coin.image} style={{ width: 24, height: 24, borderRadius: '50%' }} />
                                            <span style={{ fontWeight: '600' }}>{coin.name}</span>
                                            <span style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '0.8rem' }}>{coin.symbol}</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>${coin.price.toLocaleString()}</td>
                                        <td style={{ padding: '1rem', color: coin.changePercent >= 0 ? '#4ade80' : '#f87171' }}>
                                            {coin.changePercent.toFixed(2)}%
                                        </td>
                                        <td style={{ padding: '1rem', color: '#94a3b8' }}>
                                            ${(coin.marketCap / 1e6).toFixed(2)}M
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <Link href={`/pair/${coin.symbol.toLowerCase()}`}>
                                                <button style={{ background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: 'pointer' }}>
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
        </AppShell>
    );
}
