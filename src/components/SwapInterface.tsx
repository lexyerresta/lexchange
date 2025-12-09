
'use client';

import { useState } from 'react';
import { ArrowDownUp, Info, Settings, Wallet, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function SwapInterface({ symbol, price }: { symbol: string, price: number }) {
    const { user, executeTrade } = useAuth();
    const { showToast } = useToast();


    const [amountIn, setAmountIn] = useState('1');
    const [isBuy, setIsBuy] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const tokenSymbol = symbol.toUpperCase().replace('-USD', '');
    const quoteSymbol = 'USDT';

    const estimatedOut = isBuy
        ? (parseFloat(amountIn || '0') / price).toFixed(6)
        : (parseFloat(amountIn || '0') * price).toFixed(2);

    const balance = isBuy
        ? user?.balance || 0
        : user?.assets.find(a => a.symbol === tokenSymbol)?.amount || 0;

    const handleSwap = async () => {
        if (!user) {
            setError("Please connect wallet first");
            return;
        }
        setSuccess(null);
        setError(null);
        setLoading(true);

        try {
            const inputVal = parseFloat(amountIn || '0');
            const outputVal = parseFloat(estimatedOut || '0');

            if (inputVal <= 0) throw new Error("Enter valid amount");

            await executeTrade(
                isBuy,
                isBuy ? quoteSymbol : tokenSymbol, // Input Token
                isBuy ? tokenSymbol : quoteSymbol, // Output Token
                inputVal,
                outputVal
            );

            setSuccess(`Swapped ${inputVal} ${isBuy ? quoteSymbol : tokenSymbol} for ${outputVal} ${isBuy ? tokenSymbol : quoteSymbol}`);
            setAmountIn('');
        } catch (e: any) {
            setError(e.message || "Swap failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            background: '#1e222d',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)',
            color: 'white'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Swap</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Settings size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
                </div>
            </div>

            <div style={{ background: '#2a2e39', padding: '1rem', borderRadius: '0.8rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>You pay</span>
                    <span
                        style={{ color: '#94a3b8', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => setAmountIn(balance.toString())}
                    >
                        Balance: {balance.toLocaleString()}
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input
                        type="number"
                        value={amountIn}
                        onChange={(e) => { setAmountIn(e.target.value); setError(null); setSuccess(null); }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            width: '60%',
                            outline: 'none'
                        }}
                    />
                    <div style={{
                        background: '#1e222d',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600'
                    }}>
                        {isBuy ? quoteSymbol : tokenSymbol}
                    </div>
                </div>
            </div>

            {/* Switch Button */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '-1rem 0', position: 'relative', zIndex: 10 }}>
                <button
                    onClick={() => setIsBuy(!isBuy)}
                    style={{
                        background: '#363a45',
                        border: '4px solid #1e222d',
                        borderRadius: '0.5rem',
                        padding: '0.4rem',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                >
                    <ArrowDownUp size={16} />
                </button>
            </div>

            {/* Output Field */}
            <div style={{ background: '#2a2e39', padding: '1rem', borderRadius: '0.8rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>You receive</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '600', color: estimatedOut === 'NaN' ? '#94a3b8' : 'white' }}>
                        {estimatedOut === 'NaN' ? '0.00' : estimatedOut}
                    </span>
                    <div style={{
                        background: '#1e222d',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600'
                    }}>
                        {isBuy ? tokenSymbol : quoteSymbol}
                    </div>
                </div>
            </div>

            {/* Price Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <span>1 {tokenSymbol} = {price} {quoteSymbol}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Wallet size={14} /> Gas: $0.42</span>
            </div>

            {error && <div style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
            {success && <div style={{ color: '#4ade80', marginBottom: '1rem', fontSize: '0.9rem' }}>{success}</div>}

            <button
                onClick={handleSwap}
                disabled={loading}
                style={{
                    width: '100%',
                    background: isBuy ? '#4ade80' : '#f87171',
                    color: 'black',
                    padding: '1rem',
                    borderRadius: '0.8rem',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    border: 'none',
                    cursor: loading ? 'wait' : 'pointer',
                    transition: 'filter 0.2s',
                    opacity: loading ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                }}
            >
                {loading && <Loader2 className="animate-spin" size={20} />}
                {loading ? 'Swapping...' : (isBuy ? 'Buy ' + tokenSymbol : 'Sell ' + tokenSymbol)}
            </button>
        </div>
    );
}
