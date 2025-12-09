'use client';

import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, TrendingUp, Zap, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Hero.module.css';

export default function Hero() {
    const { user } = useAuth();
    const router = useRouter();

    const handleGetStarted = () => {
        if (user) {
            router.push('/portfolio');
        } else {
            router.push('/login');
        }
    };

    return (
        <section className={styles.heroSection}>
            <div className={styles.bgGlow} />

            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.content}
                >
                    <div className={styles.badge}>
                        <span className={styles.badgeNew}>NEW</span>
                        <span>Zero fees on your first trade</span>
                    </div>

                    <h1 className={styles.title}>
                        Buy & Sell Crypto on <br />
                        <span className={styles.gradientText}>Lexchange</span>
                    </h1>

                    <p className={styles.subtitle}>
                        Lexy, E nya exchange. Experience the next generation of crypto trading with zero-latency execution and premium security.
                    </p>

                    {/* Feature Pills */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <div className={styles.featurePill}>
                            <Zap size={16} style={{ color: '#fbbf24' }} />
                            <span>Lightning Fast</span>
                        </div>
                        <div className={styles.featurePill}>
                            <Shield size={16} style={{ color: '#4ade80' }} />
                            <span>Bank-Level Security</span>
                        </div>
                        <div className={styles.featurePill}>
                            <TrendingUp size={16} style={{ color: '#a78bfa' }} />
                            <span>Real-Time Charts</span>
                        </div>
                    </div>

                    <div className={styles.ctaGroup}>
                        <button className={styles.primaryBtn} onClick={handleGetStarted}>
                            {user ? 'Go to Portfolio' : 'Start Trading Now'}
                            <ArrowRight size={20} />
                        </button>
                        <button className={styles.secondaryBtn} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <PlayCircle size={20} />
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem', maxWidth: '500px' }}>
                        <div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#a78bfa' }}>500K+</div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Active Users</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#4ade80' }}>$2.5B+</div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Trading Volume</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#22d3ee' }}>350+</div>
                            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Crypto Pairs</div>
                        </div>
                    </div>
                </motion.div>

                <div className={styles.visuals}>
                    {/* Floating Card 1: BTC */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className={`glass-card ${styles.floatingCard}`}
                        style={{ top: '10%', right: '10%', zIndex: 2 }}
                    >
                        <div className={styles.coinIcon} style={{ background: 'linear-gradient(135deg, #f7931a, #ffbb5c)' }}>₿</div>
                        <div className={styles.coinName}>Bitcoin</div>
                        <div className={styles.coinPrice}>$98,450.00</div>
                        <div className={`${styles.coinChange} ${styles.up}`}>+5.24%</div>
                    </motion.div>

                    {/* Floating Card 2: ETH */}
                    <motion.div
                        animate={{ y: [15, -15, 15] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className={`glass-card ${styles.floatingCard}`}
                        style={{ bottom: '5%', left: '5%', zIndex: 1 }}
                    >
                        <div className={styles.coinIcon} style={{ background: 'linear-gradient(135deg, #627eea, #a4b6ff)' }}>Ξ</div>
                        <div className={styles.coinName}>Ethereum</div>
                        <div className={styles.coinPrice}>$4,890.12</div>
                        <div className={`${styles.coinChange} ${styles.up}`}>+3.12%</div>
                    </motion.div>

                    {/* Floating Card 3: LEXY */}
                    <motion.div
                        animate={{ y: [-5, 5, -5], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className={`glass-card ${styles.floatingCard}`}
                        style={{ top: '40%', left: '40%', zIndex: 3, transform: 'translate(-50%, -50%)', borderColor: 'rgba(147, 51, 234, 0.5)' }}
                    >
                        <div className={styles.coinIcon} style={{ background: 'linear-gradient(135deg, #9333ea, #c084fc)' }}>L</div>
                        <div className={styles.coinName}>Lexy Coin</div>
                        <div className={styles.coinPrice}>$12.45</div>
                        <div className={`${styles.coinChange} ${styles.up}`}>+128.4%</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
