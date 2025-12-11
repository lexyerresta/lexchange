'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Wifi, Activity, Lock, Zap } from 'lucide-react';

export default function NeuroQuantumWidget() {
    const [status, setStatus] = useState<'IDLE' | 'CONNECTING' | 'SYNCED' | 'EXECUTING'>('IDLE');
    const [brainActivity, setBrainActivity] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Simulate Brain Waves
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let t = 0;

        const draw = () => {
            if (!canvasRef.current || !ctx) return;
            ctx.clearRect(0, 0, 300, 100);
            ctx.lineWidth = 2;

            // Color based on status
            const color = status === 'SYNCED' || status === 'EXECUTING' ? '#ec4899' : '#22d3ee'; // Pink or Cyan
            ctx.strokeStyle = color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = color;

            ctx.beginPath();
            for (let i = 0; i < 300; i++) {
                // Wave Math
                const amp = status === 'IDLE' ? 5 : (status === 'CONNECTING' ? 15 : 25 + Math.sin(t * 0.5) * 10);
                const freq = status === 'IDLE' ? 0.02 : 0.05;
                const y = 50 + Math.sin(i * freq + t) * amp * Math.sin(t * 0.1); // Add modulation

                if (i === 0) ctx.moveTo(i, y);
                else ctx.lineTo(i, y);
            }
            ctx.stroke();

            t += (status === 'IDLE' ? 0.1 : 0.3);
            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, [status]);

    const handleConnect = () => {
        setStatus('CONNECTING');

        // Sequence simulation
        setTimeout(() => setStatus('SYNCED'), 2000);
    };

    const handleThoughtTrade = () => {
        if (status !== 'SYNCED') return;
        setStatus('EXECUTING');
        setTimeout(() => {
            setStatus('SYNCED'); // Reset
        }, 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(20,20,30,0.95) 100%)',
                border: '1px solid #333',
                borderRadius: '30px',
                padding: '2rem',
                maxWidth: '500px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)'
            }}
        >
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Cpu size={18} color={status === 'IDLE' ? '#666' : '#22d3ee'} />
                    <span style={{ fontFamily: 'monospace', color: '#666', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                        BCI-PROTOCOL v9.0
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: status === 'IDLE' ? 'red' : '#4ade80',
                        boxShadow: status !== 'IDLE' ? '0 0 10px #4ade80' : 'none'
                    }} />
                    <span style={{ fontSize: '0.8rem', color: '#fff' }}>
                        {status === 'IDLE' ? 'OFFLINE' : (status === 'CONNECTING' ? 'CALIBRATING...' : 'NEURAL LINK ACTIVE')}
                    </span>
                </div>
            </div>

            {/* Main Visual: Brain Canvas */}
            <div style={{
                height: '120px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '15px',
                marginBottom: '1.5rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <canvas ref={canvasRef} width={300} height={100} style={{ width: '100%', height: '100%' }} />

                {/* Overlay Grid */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.05) 50%, transparent 51%)',
                    backgroundSize: '20px 100%',
                    pointerEvents: 'none'
                }} />
            </div>

            {/* Controls */}
            <div style={{ textAlign: 'center' }}>
                <AnimatePresence mode='wait'>
                    {status === 'IDLE' && (
                        <motion.button
                            key="connect"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={handleConnect}
                            style={{
                                background: 'transparent',
                                border: '1px solid #22d3ee',
                                color: '#22d3ee',
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s'
                            }}
                            whileHover={{ background: 'rgba(34, 211, 238, 0.1)', boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}
                        >
                            <Brain size={20} />
                            INITIALIZE NEURAL LINK
                        </motion.button>
                    )}

                    {status === 'CONNECTING' && (
                        <motion.div
                            key="connecting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ color: '#22d3ee', fontFamily: 'monospace' }}
                        >
                            <span className="blink">ESTABLISHING SYNAPSE HANDSHAKE...</span>
                        </motion.div>
                    )}

                    {(status === 'SYNCED' || status === 'EXECUTING') && (
                        <motion.div
                            key="synced"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: '#666' }}>LATENCY</div>
                                    <div style={{ fontSize: '1.2rem', color: '#fff', fontFamily: 'monospace' }}>0.00ms</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', color: '#666' }}>BANDWIDTH</div>
                                    <div style={{ fontSize: '1.2rem', color: '#fff', fontFamily: 'monospace' }}>128 TB/s</div>
                                </div>
                            </div>

                            {status === 'EXECUTING' ? (
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1.1 }}
                                    style={{
                                        color: '#ec4899',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        textShadow: '0 0 10px #ec4899'
                                    }}
                                >
                                    EXECUTING ORDER...
                                </motion.div>
                            ) : (
                                <motion.button
                                    onClick={handleThoughtTrade}
                                    style={{
                                        background: 'linear-gradient(90deg, #ec4899, #8b5cf6)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '1rem 3rem',
                                        borderRadius: '50px',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Zap size={18} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                                    EXECUTE VIA THOUGHT
                                </motion.button>
                            )}

                            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
                                * Warning: Strong emotions may cause market volatility.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decoration */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, transparent 50%, rgba(34, 211, 238, 0.1) 50%)',
                pointerEvents: 'none'
            }} />
        </motion.div>
    );
}
