'use client';

import { useState, useEffect } from 'react';
import styles from './MarketTable.module.css';
import { RefreshCcw, Search, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface CoinData {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    marketCap: number;
    volume?: number;
    dayHigh?: number;
    dayLow?: number;
    image?: string;
}

export default function MarketTable() {
    const [data, setData] = useState<CoinData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('market_cap_desc');

    // Auth for watchlist
    const { user, toggleWatchlist } = useAuth();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/market?page=${page}&limit=50&category=${category}`);
            if (!res.ok) throw new Error('Failed to fetch data');
            const jsonData = await res.json();

            if (jsonData.error) {
                throw new Error(jsonData.error);
            }

            setData(jsonData.data || []);
            setError(null);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to load market data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Poll every 60s
        return () => clearInterval(interval);
    }, [page, category]);

    const filteredData = data.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatCurrency = (val: number | undefined) => {
        if (val === undefined) return '-';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: val < 1 ? 8 : 2
        }).format(val);
    };

    const formatCompactNumber = (number: number | undefined) => {
        if (number === undefined) return '-';
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            compactDisplay: "short",
            style: 'currency',
            currency: 'USD'
        }).format(number);
    };

    return (
        <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
            <main style={{ width: '100%', padding: '0 1rem' }}>
                <section className={styles.marketSection}>
                    <div className={styles.controls}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button
                                className={`${styles.filterBtn} ${category === 'market_cap_desc' ? styles.activeFilter : ''}`}
                                onClick={() => { setCategory('market_cap_desc'); setPage(1); }}
                            >
                                Top 100
                            </button>
                            <button
                                className={`${styles.filterBtn} ${category === 'volume_desc' ? styles.activeFilter : ''}`}
                                onClick={() => { setCategory('volume_desc'); setPage(1); }}
                            >
                                High Volume
                            </button>
                            <button
                                className={`${styles.filterBtn} ${category === 'gecko_desc' ? styles.activeFilter : ''}`}
                                onClick={() => { setCategory('gecko_desc'); setPage(1); }} // 'gecko_desc' is roughly "Best" or "Trending"
                            >
                                Trending
                            </button>
                            <button
                                className={`${styles.filterBtn} ${category === 'id_desc' ? styles.activeFilter : ''}`}
                                onClick={() => { setCategory('id_desc'); setPage(1); }} // Often shows newer coins added
                            >
                                New Pairs
                            </button>
                        </div>

                        <div className={styles.searchContainer}>
                            <Search className={styles.searchIcon} size={16} />
                            <input
                                type="text"
                                placeholder="Search on this page..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="glass-card" style={{ color: '#f87171', padding: '1rem', marginBottom: '1rem', border: '1px solid #f87171' }}>
                            {error} - Try refreshing later due to rate limits.
                            <button onClick={fetchData} style={{ marginLeft: '1rem', textDecoration: 'underline' }}>Retry</button>
                        </div>
                    )}

                    <div className={`glass-card ${styles.tableContainer}`}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>Token</th>
                                    <th className={styles.th}>Price</th>
                                    <th className={styles.th}>24h %</th>
                                    <th className={styles.th}>24h High</th>
                                    <th className={styles.th}>24h Low</th>
                                    <th className={styles.th}>Vol(24h)</th>
                                    <th className={styles.th}>Mkt Cap</th>
                                    <th className={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && data.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                                <RefreshCcw className="animate-spin" />
                                                Loading market data...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                                            No pairs found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((coin) => {
                                        const isPositive = coin.changePercent >= 0;
                                        const isStarred = user?.watchlist?.includes(coin.symbol.toLowerCase());

                                        return (
                                            <tr key={coin.symbol} className={styles.tr}>
                                                <td className={styles.td}>
                                                    <div className={styles.coinInfo}>
                                                        <div
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                toggleWatchlist(coin.symbol);
                                                            }}
                                                            style={{ cursor: 'pointer', marginRight: '0.5rem', color: isStarred ? '#eab308' : '#475569' }}
                                                        >
                                                            <Star size={16} fill={isStarred ? '#eab308' : 'none'} />
                                                        </div>
                                                        {coin.image ? (
                                                            <img src={coin.image} alt={coin.symbol} className={styles.iconImg} />
                                                        ) : (
                                                            <div className={styles.icon} style={{ background: '#333' }}>
                                                                {coin.symbol[0]}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <span className="font-semibold block text-sm" style={{ color: '#e2e8f0' }}>{coin.name}</span>
                                                            <span className={styles.symbol} style={{ fontSize: '0.75rem' }}>{coin.symbol}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={styles.td}>
                                                    <div className={styles.price}>{formatCurrency(coin.price)}</div>
                                                </td>
                                                <td className={styles.td}>
                                                    <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
                                                        {isPositive ? '+' : ''}{coin.changePercent?.toFixed(2)}%
                                                    </div>
                                                </td>
                                                <td className={styles.td}>
                                                    <div className={styles.volume}>{formatCurrency(coin.dayHigh)}</div>
                                                </td>
                                                <td className={styles.td}>
                                                    <div className={styles.volume}>{formatCurrency(coin.dayLow)}</div>
                                                </td>
                                                <td className={styles.td}>
                                                    <span style={{ color: '#94a3b8' }}>{formatCompactNumber(coin.volume)}</span>
                                                </td>
                                                <td className={styles.td}>
                                                    <span style={{ color: '#94a3b8' }}>{formatCompactNumber(coin.marketCap)}</span>
                                                </td>
                                                <td className={styles.td}>
                                                    <Link href={`/pair/${coin.symbol.toLowerCase()}`}>
                                                        <button className={styles.tradeBtn}>Details</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className={styles.pagination}>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Page {page}</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                className={styles.pageBtn}
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button
                                className={styles.pageBtn}
                                onClick={() => setPage(p => p + 1)}
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
