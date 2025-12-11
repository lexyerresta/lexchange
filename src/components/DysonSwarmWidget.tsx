'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Disc, Globe, Zap, ArrowRight, AlertTriangle } from 'lucide-react';

const STARS = [
    { name: 'SOL (The Sun)', type: 'G2V Yellow Dwarf', temp: '5,778 K', yield: '3.8 x 10²⁶ W', color: '#fbbf24', radius: 40 },
    { name: 'SIRIUS A', type: 'A1V Main Sequence', temp: '9,940 K', yield: '9.1 x 10²⁷ W', color: '#60a5fa', radius: 55 },
    { name: 'BETELGEUSE', type: 'Red Supergiant', temp: '3,500 K', yield: '4.8 x 10³¹ W', color: '#ef4444', radius: 70 },
];

export default function DysonSwarmWidget() {
    const [selectedStar, setSelectedStar] = useState(0);
    const [status, setStatus] = useState<'IDLE' | 'DEPLOYING' | 'HARVESTING'>('IDLE');
    const [energyOutput, setEnergyOutput] = useState(0);

    const star = STARS[selectedStar];

    // Energy Counter
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'HARVESTING') {
            interval = setInterval(() => {
                setEnergyOutput(prev => prev + (Math.random() * (selectedStar + 1) * 100));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [status, selectedStar]);

    const handleDeploy = () => {
        setStatus('DEPLOYING');
        setTimeout(() => {
            setStatus('HARVESTING');
        }, 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                background: 'rgba(5, 5, 10, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '30px',
                padding: '0',
                maxWidth: '600px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 0 100px -20px ${star.color}40`,
                isolation: 'isolate'
            }}
        >
            {/* Header / HUD */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={16} color="#94a3b8" />
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '2px' }}>KARDASHEV PROTOCOL [TYPE II]</span>
                </div>
                <div style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: status === 'HARVESTING' ? '#22c55e20' : '#333',
                    border: `1px solid ${status === 'HARVESTING' ? '#22c55e' : '#555'}`,
                    color: status === 'HARVESTING' ? '#22c55e' : '#777',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                }}>
                    {status === 'IDLE' ? 'STANDBY' : (status === 'DEPLOYING' ? 'DEPLOYING SWARM...' : 'HARVESTING')}
                </div>
            </div>

            {/* Main Viz Area */}
            <div style={{ height: '300px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                {/* Background Grid */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.2,
                    backgroundImage: 'radial-gradient(circle at center, transparent, #000), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '100% 100%, 40px 40px, 40px 40px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)'
                }} />

                {/* The Star */}
                <motion.div
                    key={star.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: star.radius * 2,
                        height: star.radius * 2,
                        borderRadius: '50%',
                        background: `radial-gradient(circle at 30% 30%, #fff, ${star.color}, #000)`,
                        boxShadow: `0 0 ${status === 'HARVESTING' ? 20 : 60}px ${star.color}`,
                        position: 'relative',
                        zIndex: 5
                    }}
                >
                    {/* Solar Flares Animation */}
                    <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: star.color, filter: 'blur(20px)', opacity: 0.5, animation: 'pulse 2s infinite' }} />
                </motion.div>

                {/* Dyson Swarm Rings */}
                <AnimatePresence>
                    {(status === 'DEPLOYING' || status === 'HARVESTING') && (
                        <>
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={`orbit-${i}`}
                                    initial={{ opacity: 0, scale: 2, rotateX: 70, rotateY: 0, rotateZ: 45 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1 + (i * 0.5),
                                        rotateZ: [0, 360],
                                        borderWidth: status === 'HARVESTING' ? '2px' : '1px'
                                    }}
                                    transition={{
                                        rotateZ: { duration: 10 - i * 2, repeat: Infinity, ease: 'linear' },
                                        scale: { duration: 1, ease: 'easeOut' },
                                        borderWidth: { duration: 0.5 }
                                    }}
                                    style={{
                                        position: 'absolute',
                                        width: '120px',
                                        height: '120px',
                                        border: `1px dashed ${star.color}`,
                                        borderRadius: '50%',
                                        zIndex: 4,
                                        boxShadow: status === 'HARVESTING' ? `0 0 10px ${star.color}` : 'none'
                                    }}
                                >
                                    {/* Drones */}
                                    <div style={{ position: 'absolute', top: -5, left: '50%', width: 10, height: 10, background: 'white', borderRadius: '50%', boxShadow: `0 0 10px ${star.color}` }} />
                                    <div style={{ position: 'absolute', bottom: -5, left: '50%', width: 10, height: 10, background: 'white', borderRadius: '50%', boxShadow: `0 0 10px ${star.color}` }} />
                                </motion.div>
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {/* Energy Beams */}
                {status === 'HARVESTING' && (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="energy-beam" style={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                width: '2px', height: '100px',
                                background: `linear-gradient(to top, transparent, ${star.color})`,
                                transformOrigin: 'top center',
                                transform: `rotate(${i * 72}deg) translateY(20px)`,
                                animation: `beam 1s infinite ${i * 0.2}s`
                            }} />
                        ))}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
                {status === 'IDLE' ? (
                    <>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            {STARS.map((s, idx) => (
                                <div
                                    key={s.name}
                                    onClick={() => setSelectedStar(idx)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: `1px solid ${selectedStar === idx ? s.color : 'rgba(255,255,255,0.1)'}`,
                                        background: selectedStar === idx ? `${s.color}10` : 'transparent',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: s.color, margin: '0 auto 0.5rem', boxShadow: `0 0 10px ${s.color}` }} />
                                    <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white' }}>{s.name.split(' ')[0]}</div>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{s.temp}</div>
                                </div>
                            ))}
                        </div>
                        <motion.button
                            onClick={handleDeploy}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            <Disc size={20} />
                            DEPLOY DYSON SWARM
                        </motion.button>
                    </>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.2rem' }}>ENERGY HARVESTED</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.5rem', color: star.color, fontWeight: 'bold' }}>
                                {Math.floor(energyOutput).toLocaleString()} <span style={{ fontSize: '0.8rem' }}>ZW</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.2rem' }}>CONVERSION RATE</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '1.5rem', color: '#fff', fontWeight: 'bold' }}>
                                1.0 <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>STAR</span>
                            </div>
                        </div>
                        {status === 'HARVESTING' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ gridColumn: 'span 2', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#fbbf24' }}
                            >
                                <AlertTriangle size={16} />
                                Warning: Star instability detected. Plasma yield optimal.
                            </motion.div>
                        )}
                        <button
                            onClick={() => { setStatus('IDLE'); setEnergyOutput(0); }}
                            style={{ gridColumn: 'span 2', background: 'transparent', border: '1px solid #555', color: '#777', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                            EMERGENCY RETRACT
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes beam {
                    0% { opacity: 0; transform: rotate(0deg) translateY(20px) scaleY(0.5); }
                    50% { opacity: 1; transform: rotate(0deg) translateY(50px) scaleY(1.5); }
                    100% { opacity: 0; transform: rotate(0deg) translateY(100px) scaleY(0.5); }
                }
            `}</style>
        </motion.div>
    );
}
