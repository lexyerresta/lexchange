'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Settings, Repeat } from 'lucide-react';

export default function QuickSwapWidget() {
    const [fromAmount, setFromAmount] = useState('1');
    const [toAmount, setToAmount] = useState('0.063');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
                background: 'rgba(23, 23, 23, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '1.5rem',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontWeight: '700', color: 'white' }}>Quick Swap</h3>
                <motion.div whileHover={{ rotate: 90 }} style={{ cursor: 'pointer', color: '#9ca3af' }}>
                    <Settings size={20} />
                </motion.div>
            </div>

            {/* From Input */}
            <div style={{
                background: '#111',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '0.5rem',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                    <span>You pay</span>
                    <span>Balance: 2.45 ETH</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: '#222', padding: '0.5rem 0.75rem', borderRadius: '12px',
                        cursor: 'pointer', flexShrink: 0
                    }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#627eea' }}></div>
                        <span style={{ fontWeight: '600', color: 'white' }}>ETH</span>
                    </div>
                    <input
                        type="number"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        style={{
                            background: 'transparent', border: 'none', color: 'white',
                            fontSize: '1.5rem', fontWeight: '600', textAlign: 'right', width: '100%',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ textAlign: 'right', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    ~$2,845.20
                </div>
            </div>

            {/* Switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '-1rem 0', position: 'relative', zIndex: 10 }}>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        background: '#1f1f1f',
                        border: '4px solid rgba(23, 23, 23, 0.7)',
                        borderRadius: '12px',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        color: '#a78bfa'
                    }}
                >
                    <ArrowDownLeft size={20} />
                </motion.div>
            </div>

            {/* To Input */}
            <div style={{
                background: '#111',
                borderRadius: '16px',
                padding: '1rem',
                marginTop: '0.5rem',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                    <span>You receive</span>
                    <span>Balance: 0.00 BTC</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: '#222', padding: '0.5rem 0.75rem', borderRadius: '12px',
                        cursor: 'pointer', flexShrink: 0
                    }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f7931a' }}></div>
                        <span style={{ fontWeight: '600', color: 'white' }}>BTC</span>
                    </div>
                    <input
                        type="number"
                        value={toAmount}
                        readOnly
                        style={{
                            background: 'transparent', border: 'none', color: '#22d3ee',
                            fontSize: '1.5rem', fontWeight: '600', textAlign: 'right', width: '100%',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ textAlign: 'right', color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    ~$2,841.15
                </div>
            </div>

            {/* Details */}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#9ca3af' }}>Rate</span>
                    <span style={{ color: 'white' }}>1 ETH = 0.063 BTC</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#9ca3af' }}>Network Cost</span>
                    <span style={{ color: '#4ade80' }}><span style={{ textDecoration: 'line-through', color: '#6b7280', marginRight: '5px' }}>$4.50</span> $1.20</span>
                </div>
            </div>

            {/* CTA Button */}
            <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(167, 139, 250, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                    border: 'none',
                    borderRadius: '16px',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                Connect Wallet to Swap
            </motion.button>

            {/* Glow effect */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: -1
            }} />
        </motion.div>
    );
}
