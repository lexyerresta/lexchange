'use client';

import { X, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    type: 'buy' | 'sell';
    fromToken: string;
    toToken: string;
    fromAmount: number;
    toAmount: number;
    price: number;
    slippage: number;
    gasFee?: number;
}

export default function TransactionModal({
    isOpen,
    onClose,
    onConfirm,
    type,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    price,
    slippage,
    gasFee = 0.42
}: TransactionModalProps) {
    const [isConfirming, setIsConfirming] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsConfirming(true);
        try {
            await onConfirm();
            onClose();
        } catch (error) {
            // Error handled by parent
        } finally {
            setIsConfirming(false);
        }
    };

    const minReceived = toAmount * (1 - slippage / 100);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
        }}>
            <div className="glass-card" style={{
                maxWidth: '480px',
                width: '100%',
                borderRadius: '1.5rem',
                padding: '2rem',
                background: 'rgba(20, 20, 30, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Confirm Transaction</h2>
                    <button
                        onClick={onClose}
                        disabled={isConfirming}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: isConfirming ? 'not-allowed' : 'pointer',
                            padding: '0.5rem',
                            display: 'flex'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Transaction Details */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: '#94a3b8' }}>You {type}</span>
                            <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                                {fromAmount.toFixed(6)} {fromToken}
                            </span>
                        </div>

                        <div style={{
                            height: '1px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            margin: '1rem 0',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: '#1e222d',
                                padding: '0.5rem',
                                borderRadius: '50%',
                                border: '2px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                ↓
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>You receive</span>
                            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#4ade80' }}>
                                {toAmount.toFixed(6)} {toToken}
                            </span>
                        </div>
                    </div>

                    {/* Transaction Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>Price</span>
                            <span>1 {toToken} = ${price.toLocaleString()}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>Slippage Tolerance</span>
                            <span>{slippage}%</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>Minimum Received</span>
                            <span>{minReceived.toFixed(6)} {toToken}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>Network Fee</span>
                            <span>${gasFee.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Warning */}
                <div style={{
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    gap: '0.75rem'
                }}>
                    <AlertTriangle size={20} color="#fbbf24" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                    <div style={{ fontSize: '0.85rem', color: '#fbbf24' }}>
                        <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Important</div>
                        <div>This transaction will be executed on-chain. Make sure you review all details before confirming.</div>
                    </div>
                </div>

                {/* Info */}
                <div style={{
                    background: 'rgba(167, 139, 250, 0.1)',
                    border: '1px solid rgba(167, 139, 250, 0.3)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    gap: '0.75rem'
                }}>
                    <Info size={18} color="#a78bfa" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                    <div style={{ fontSize: '0.85rem', color: '#a78bfa' }}>
                        By confirming, you authorize this transaction to be signed with your wallet.
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onClose}
                        disabled={isConfirming}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '0.75rem',
                            color: 'white',
                            fontWeight: '600',
                            cursor: isConfirming ? 'not-allowed' : 'pointer',
                            opacity: isConfirming ? 0.5 : 1
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isConfirming}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: type === 'buy' ? '#4ade80' : '#f87171',
                            border: 'none',
                            borderRadius: '0.75rem',
                            color: 'black',
                            fontWeight: '700',
                            cursor: isConfirming ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            opacity: isConfirming ? 0.8 : 1
                        }}
                    >
                        {isConfirming && <Loader2 className="animate-spin" size={20} />}
                        {isConfirming ? 'Confirming...' : 'Confirm & Sign'}
                    </button>
                </div>
            </div>
        </div>
    );
}
