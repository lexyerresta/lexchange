
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import SwapInterface from '@/components/SwapInterface';
import TradingChart from '@/components/TradingChart';

// Helper to fetch single coin data
async function getCoinData(id: string) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id.toLowerCase()}&sparkline=false`, {
            next: { revalidate: 60 }
        });
        const data = await res.json();
        return data[0];
    } catch (e) {
        console.error(e);
        return null;
    }
}

// Helper to format IDR
const formatIDR = (val: number) => {
    // Current approx rate
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(val * 16300);
};

// Helper to calculate age (rough estimate from ATH date if genesis not available in restricted API)
// Ideally we would use 'genesis_date' from /coins/{id}, but for now let's use what we have or mock it visually
function getCoinAge(dateStr: string) {
    if (!dateStr) return 'N/A';
    const created = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
    return `${(diffDays / 365).toFixed(1)} years`;
}

export default async function PairPage({ params }: { params: Promise<{ symbol: string }> }) {
    const { symbol } = await params;
    const coinData = await getCoinData(symbol);

    if (!coinData) {
        return (
            <div style={{ padding: '4rem', color: 'white', textAlign: 'center' }}>
                <h2>Token not found</h2>
                <Link href="/" style={{ color: '#a78bfa', textDecoration: 'underline' }}>Go back home</Link>
            </div>
        );
    }

    const price = coinData.current_price;
    const change24h = coinData.price_change_percentage_24h;
    const isPositive = change24h >= 0;

    // Use ATL date as a proxy for "age" since it's the oldest data point we have in this endpoint usually
    // Or just fetch the detailed endpoint if we really need accuracy.
    // For now, let's use atl_date as "Oldest recorded price"
    const age = getCoinAge(coinData.atl_date);

    return (
        <div style={{ padding: '1rem', maxWidth: '1600px', margin: '0 auto', color: 'white' }}>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', textDecoration: 'none' }}>
                    <ArrowLeft size={20} /> Back
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={coinData.image} alt={coinData.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{coinData.name} <span style={{ color: '#94a3b8', fontSize: '1rem' }}>/ {coinData.symbol.toUpperCase()}</span></h1>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                            <span style={{ fontWeight: '600', color: isPositive ? '#4ade80' : '#f87171' }}>
                                ${price} ({change24h.toFixed(2)}%)
                            </span>
                            <span style={{ color: '#cbd5e1', fontWeight: '500' }}>
                                ≈ {formatIDR(price)}
                            </span>
                            <span style={{ color: '#94a3b8' }}>MC: ${(coinData.market_cap / 1000000).toFixed(2)}M</span>
                        </div>
                    </div>
                </div>
                {/* Security Status Mock */}
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                    <div style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', padding: '0.3rem 0.8rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <ShieldCheck size={16} /> Audited
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '1.5rem', alignItems: 'start' }}>

                {/* Left Column: Chart & Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Chart Container */}
                    <div style={{ background: '#131722', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden', height: '600px' }}>
                        <TradingChart symbol={coinData.symbol.toUpperCase() + 'USDT'} />
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <StatCard label="Liquidity" value="$4.2M" />
                        <StatCard label="Volume (24h)" value={`$${(coinData.total_volume / 1000000).toFixed(2)}M`} />
                        <StatCard label="FDV" value={coinData.fully_diluted_valuation ? `$${(coinData.fully_diluted_valuation / 1000000).toFixed(2)}M` : 'N/A'} />
                        <StatCard label="Coin Age" value={age} />
                    </div>
                </div>

                {/* Right Column: Swap & Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <SwapInterface symbol={coinData.symbol} price={price} />

                    {/* Token Info Card */}
                    <div style={{ background: '#1e222d', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Token Info</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Contract</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>0x...d4f1 <ExternalLink size={12} /></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Website</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Visit <ExternalLink size={12} /></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Chain</span>
                                <span>Solana</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>All Time High</span>
                                <span>${coinData.ath}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value }: { label: string, value: string }) {
    return (
        <div style={{ background: '#1e222d', padding: '1rem', borderRadius: '0.8rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{label}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{value}</div>
        </div>
    );
}
