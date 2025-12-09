'use client';

import { useState } from 'react';
import { ArrowDownUp, Settings, Wallet, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import TransactionModal from './TransactionModal';

export default function SwapInterface({ symbol, price }: { symbol: string, price: number }) {
    const { user, executeTrade } = useAuth();
    const { showToast } = useToast();

    const [amountIn, setAmountIn] = useState('');
    const [isBuy, setIsBuy] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const tokenSymbol = symbol.toUpperCase().replace('-USD', '');
    const quoteSymbol = 'USDT';

    const estimatedOut = amountIn && parseFloat(amountIn) > 0
        ? isBuy
            ? (parseFloat(amountIn) / price).toFixed(8)
            : (parseFloat(amountIn) * price).toFixed(2)
        : '0.00';

    const balance = isBuy
        ? user?.balance || 0
        : user?.assets.find(a => a.symbol === tokenSymbol)?.amount || 0;

    const slippage = user?.settings?.slippage || 0.5;

    const handleMaxClick = () => {
        if (balance > 0) {
            // Reserve small amount for gas if buying
            const maxAmount = isBuy ? Math.max(0, balance - 1) : balance;
            setAmountIn(maxAmount.toString());
        }
    };

    const handleSwapClick = () => {
        if (!user) {
            showToast("Please connect wallet first", "error");
            return;
        }

        const inputVal = parseFloat(amountIn || '0');
        if (inputVal <= 0) {
            showToast("Enter valid amount", "error");
            return;
        }

        if (inputVal > balance) {
            showToast(`Insufficient ${isBuy ? 'USDT' : tokenSymbol} balance`, "error");
            return;
        }

        setShowModal(true);
    };

    const handleConfirmTrade = async () => {
        try {
            const inputVal = parseFloat(amountIn);
            const outputVal = parseFloat(estimatedOut);

            const txHash = await executeTrade(
                isBuy,
                isBuy ? quoteSymbol : tokenSymbol,
                isBuy ? tokenSymbol : quoteSymbol,
                inputVal,
                outputVal
            );

            showToast(
                `Transaction confirmed! ${outputVal.toFixed(6)} ${isBuy ? tokenSymbol : quoteSymbol} received`,
                "success"
            );
            setAmountIn('');
            setShowModal(false);
        } catch (e: any) {
            showToast(e.message || "Transaction failed", "error");
            throw e;
        }
    };

    return (
        <>
            <div style={{
                background: '#1e222d',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.05)',
                color: 'white'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Swap</div>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            display: 'flex'
                        }}
                    >
                        <Settings size={18} />
                    </button>
                </div>

                {showSettings && (
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                            Slippage Tolerance: {slippage}%
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            Adjust in Settings
                        </div>
                    </div>
                )}

                <div style={{ background: '#2a2e39', padding: '1rem', borderRadius: '0.8rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>You pay</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                Balance: {balance.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                            </span>
                            <button
                                onClick={handleMaxClick}
                                style={{
                                    background: 'rgba(167, 139, 250, 0.2)',
                                    border: '1px solid rgba(167, 139, 250, 0.3)',
                                    color: '#a78bfa',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '0.3rem',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                MAX
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={amountIn}
                            onChange={(e) => setAmountIn(e.target.value)}
                            placeholder="0.0"
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

                <div style={{ background: '#2a2e39', padding: '1rem', borderRadius: '0.8rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>You receive</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: '600', color: estimatedOut === '0.00' ? '#94a3b8' : 'white' }}>
                            {estimatedOut}
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

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <span>1 {tokenSymbol} = ${price.toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Wallet size={14} /> Gas: ~$0.42
                    </span>
                </div>

                <button
                    onClick={handleSwapClick}
                    disabled={!user || !amountIn || parseFloat(amountIn) <= 0}
                    style={{
                        width: '100%',
                        background: isBuy ? '#4ade80' : '#f87171',
                        color: 'black',
                        padding: '1rem',
                        borderRadius: '0.8rem',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        border: 'none',
                        cursor: (!user || !amountIn || parseFloat(amountIn) <= 0) ? 'not-allowed' : 'pointer',
                        opacity: (!user || !amountIn || parseFloat(amountIn) <= 0) ? 0.5 : 1,
                        transition: 'all 0.2s'
                    }}
                >
                    {!user ? 'Connect Wallet' : `${isBuy ? 'Buy' : 'Sell'} ${tokenSymbol}`}
                </button>
            </div>

            <TransactionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmTrade}
                type={isBuy ? 'buy' : 'sell'}
                fromToken={isBuy ? quoteSymbol : tokenSymbol}
                toToken={isBuy ? tokenSymbol : quoteSymbol}
                fromAmount={parseFloat(amountIn || '0')}
                toAmount={parseFloat(estimatedOut || '0')}
                price={price}
                slippage={slippage}
            />
        </>
    );
}
