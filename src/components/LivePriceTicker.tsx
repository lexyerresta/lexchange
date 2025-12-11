'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoPrice {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    icon: string;
}

export default function LivePriceTicker() {
    const [prices, setPrices] = useState<CryptoPrice[]>([
        { symbol: 'BTC', name: 'Bitcoin', price: 43250.50, change24h: 2.34, icon: '₿' },
        { symbol: 'ETH', name: 'Ethereum', price: 2280.75, change24h: -1.23, icon: 'Ξ' },
        { symbol: 'SOL', name: 'Solana', price: 98.45, change24h: 5.67, icon: '◎' },
        { symbol: 'BNB', name: 'BNB', price: 312.80, change24h: 1.89, icon: '⬡' },
        { symbol: 'ADA', name: 'Cardano', price: 0.58, change24h: -0.45, icon: '₳' },
        { symbol: 'XRP', name: 'Ripple', price: 0.62, change24h: 3.21, icon: '✕' },
    ]);

    useEffect(() => {
        // Simulate live price updates
        const interval = setInterval(() => {
            setPrices(prev => prev.map(coin => ({
                ...coin,
                price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
                change24h: coin.change24h + (Math.random() - 0.5) * 0.5
            })));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Duplicate prices for seamless loop
    const duplicatedPrices = [...prices, ...prices];

    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(167,139,250,0.2)',
            borderBottom: '1px solid rgba(167,139,250,0.2)',
            padding: '1rem 0',
            position: 'relative'
        }}>
            {/* Gradient overlays */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '100px',
                background: 'linear-gradient(90deg, rgba(15,23,42,1) 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '100px',
                background: 'linear-gradient(270deg, rgba(15,23,42,1) 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />

            <div style={{
                display: 'flex',
                gap: '3rem',
                animation: 'scroll-ticker 30s linear infinite',
                width: 'max-content'
            }}>
                {duplicatedPrices.map((coin, idx) => (
                    <div
                        key={`${coin.symbol}-${idx}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.5rem 1.5rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(255,255,255,0.05)',
                            minWidth: '200px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <div style={{
                            fontSize: '1.5rem',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                            borderRadius: '50%',
                            fontWeight: 'bold'
                        }}>
                            {coin.icon}
                        </div>
                        <div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span style={{
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '0.9rem'
                                }}>
                                    {coin.symbol}
                                </span>
                                <span style={{
                                    color: '#64748b',
                                    fontSize: '0.75rem'
                                }}>
                                    {coin.name}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginTop: '0.25rem'
                            }}>
                                <span style={{
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: '0.95rem',
                                    fontFamily: 'monospace'
                                }}>
                                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    color: coin.change24h >= 0 ? '#4ade80' : '#f87171',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    {coin.change24h >= 0 ? (
                                        <TrendingUp size={14} />
                                    ) : (
                                        <TrendingDown size={14} />
                                    )}
                                    {Math.abs(coin.change24h).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes scroll-ticker {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}
