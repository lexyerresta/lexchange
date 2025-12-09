'use client';

import { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import TradingChart from '@/components/TradingChart';
import { Plus, X, Maximize2, Minimize2, Grid, Layout, TrendingUp } from 'lucide-react';

interface ChartConfig {
    id: string;
    symbol: string;
    name: string;
}

const POPULAR_PAIRS = [
    { symbol: 'btc', name: 'Bitcoin' },
    { symbol: 'eth', name: 'Ethereum' },
    { symbol: 'sol', name: 'Solana' },
    { symbol: 'bnb', name: 'BNB' },
    { symbol: 'xrp', name: 'Ripple' },
    { symbol: 'ada', name: 'Cardano' }
];

export default function MultichartsPage() {
    const [charts, setCharts] = useState<ChartConfig[]>([
        { id: '1', symbol: 'btc', name: 'Bitcoin' }
    ]);
    const [layout, setLayout] = useState<'grid' | '2x2' | '1x3' | '3x1'>('grid');
    const [fullscreenChart, setFullscreenChart] = useState<string | null>(null);
    const [showAddMenu, setShowAddMenu] = useState(false);

    const addChart = (symbol: string, name: string) => {
        if (charts.length >= 6) {
            alert('Maximum 6 charts allowed');
            return;
        }
        const newChart: ChartConfig = {
            id: Date.now().toString(),
            symbol,
            name
        };
        setCharts([...charts, newChart]);
        setShowAddMenu(false);
    };

    const removeChart = (id: string) => {
        setCharts(charts.filter(c => c.id !== id));
    };

    const getGridStyle = () => {
        if (fullscreenChart) {
            return { gridTemplateColumns: '1fr', gridTemplateRows: '1fr' };
        }

        switch (layout) {
            case '2x2':
                return { gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' };
            case '1x3':
                return { gridTemplateColumns: '1fr', gridTemplateRows: 'repeat(3, 1fr)' };
            case '3x1':
                return { gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr' };
            default:
                return {
                    gridTemplateColumns: charts.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
                    gridTemplateRows: 'auto'
                };
        }
    };

    const visibleCharts = fullscreenChart
        ? charts.filter(c => c.id === fullscreenChart)
        : charts;

    return (
        <AppShell>
            <div style={{ height: 'calc(100vh - 4rem)', display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>
                            Multi-Chart Analysis
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                            Monitor multiple markets simultaneously
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {/* Layout Buttons */}
                        <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: '0.5rem' }}>
                            <button
                                onClick={() => setLayout('grid')}
                                style={{
                                    padding: '0.5rem',
                                    background: layout === 'grid' ? 'rgba(167,139,250,0.2)' : 'transparent',
                                    border: 'none',
                                    borderRadius: '0.4rem',
                                    color: layout === 'grid' ? '#a78bfa' : '#94a3b8',
                                    cursor: 'pointer',
                                    display: 'flex'
                                }}
                                title="Auto Grid"
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setLayout('2x2')}
                                style={{
                                    padding: '0.5rem',
                                    background: layout === '2x2' ? 'rgba(167,139,250,0.2)' : 'transparent',
                                    border: 'none',
                                    borderRadius: '0.4rem',
                                    color: layout === '2x2' ? '#a78bfa' : '#94a3b8',
                                    cursor: 'pointer',
                                    display: 'flex'
                                }}
                                title="2x2 Grid"
                            >
                                <Layout size={18} />
                            </button>
                        </div>

                        {/* Add Chart Button */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowAddMenu(!showAddMenu)}
                                style={{
                                    background: '#4ade80',
                                    color: 'black',
                                    border: 'none',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: '600'
                                }}
                            >
                                <Plus size={18} /> Add Chart
                            </button>

                            {showAddMenu && (
                                <div style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 0.5rem)',
                                    right: 0,
                                    background: 'rgba(20,20,30,0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.75rem',
                                    padding: '0.5rem',
                                    minWidth: '200px',
                                    zIndex: 1000,
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                }}>
                                    {POPULAR_PAIRS.map(pair => (
                                        <button
                                            key={pair.symbol}
                                            onClick={() => addChart(pair.symbol, pair.name)}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                background: 'none',
                                                border: 'none',
                                                color: 'white',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                borderRadius: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                                        >
                                            <TrendingUp size={16} color="#4ade80" />
                                            {pair.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div style={{
                    flex: 1,
                    display: 'grid',
                    gap: '1rem',
                    ...getGridStyle()
                }}>
                    {visibleCharts.map(chart => (
                        <div
                            key={chart.id}
                            className="glass-card"
                            style={{
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Chart Header */}
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'rgba(0,0,0,0.2)'
                            }}>
                                <span style={{ fontWeight: '600', color: 'white' }}>{chart.name}</span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => setFullscreenChart(fullscreenChart === chart.id ? null : chart.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#94a3b8',
                                            cursor: 'pointer',
                                            padding: '0.25rem',
                                            display: 'flex'
                                        }}
                                    >
                                        {fullscreenChart === chart.id ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                    </button>
                                    {charts.length > 1 && (
                                        <button
                                            onClick={() => removeChart(chart.id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#f87171',
                                                cursor: 'pointer',
                                                padding: '0.25rem',
                                                display: 'flex'
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Chart Content */}
                            <div style={{ flex: 1, minHeight: 0 }}>
                                <TradingChart symbol={chart.symbol} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
