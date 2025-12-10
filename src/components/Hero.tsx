'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { TrendingUp, Zap, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
    const { user } = useAuth();
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const parallaxOffset = scrollY * 0.5;
    const mouseParallaxX = (mousePos.x - window.innerWidth / 2) * 0.02;
    const mouseParallaxY = (mousePos.y - window.innerHeight / 2) * 0.02;

    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '2rem',
            zIndex: 1
        }}>
            {/* Animated gradient orbs */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                transform: `translate(${mouseParallaxX}px, ${mouseParallaxY}px) translateY(${parallaxOffset}px)`,
                animation: 'float 8s ease-in-out infinite',
                pointerEvents: 'none'
            }} />

            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(74,222,128,0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                transform: `translate(${-mouseParallaxX}px, ${-mouseParallaxY}px) translateY(${parallaxOffset * 0.8}px)`,
                animation: 'float 10s ease-in-out infinite reverse',
                pointerEvents: 'none'
            }} />

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                transform: `translate(-50%, -50%) translateY(${parallaxOffset * 1.2}px)`,
                animation: 'pulse 6s ease-in-out infinite',
                pointerEvents: 'none'
            }} />

            {/* Content */}
            <div style={{
                maxWidth: '1200px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2,
                transform: `translateY(${parallaxOffset * -0.3}px)`
            }}>
                {/* Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(167,139,250,0.1)',
                    border: '1px solid rgba(167,139,250,0.3)',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    marginBottom: '2rem',
                    animation: 'slideDown 0.8s ease-out'
                }}>
                    <Sparkles size={16} color="#a78bfa" />
                    <span style={{ color: '#a78bfa', fontSize: '0.9rem', fontWeight: '600' }}>
                        The Future of Crypto Trading
                    </span>
                </div>

                {/* Main Title */}
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    fontWeight: '900',
                    marginBottom: '1.5rem',
                    background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #4ade80 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1.2',
                    animation: 'fadeInUp 1s ease-out 0.2s both'
                }}>
                    Trade Smarter with
                    <br />
                    <span style={{
                        background: 'linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        AI-Powered Insights
                    </span>
                </h1>

                {/* Subtitle */}
                <p style={{
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                    color: '#94a3b8',
                    marginBottom: '3rem',
                    maxWidth: '700px',
                    margin: '0 auto 3rem',
                    lineHeight: '1.6',
                    animation: 'fadeInUp 1s ease-out 0.4s both'
                }}>
                    Experience the next generation of crypto trading with AI assistants,
                    automated bots, whale tracking, and social trading - all in one platform.
                </p>

                {/* CTA Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '4rem',
                    animation: 'fadeInUp 1s ease-out 0.6s both'
                }}>
                    {!user ? (
                        <>
                            <Link href="/login">
                                <button className="cta-primary">
                                    Start Trading
                                    <ArrowRight size={20} />
                                </button>
                            </Link>
                            <Link href="/ai-trader">
                                <button className="cta-secondary">
                                    <Zap size={20} />
                                    Try AI Trader
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/ai-trader">
                                <button className="cta-primary">
                                    <Zap size={20} />
                                    AI Trader Chat
                                </button>
                            </Link>
                            <Link href="/trading-bots">
                                <button className="cta-secondary">
                                    Auto Trading Bots
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Feature Pills */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    animation: 'fadeInUp 1s ease-out 0.8s both'
                }}>
                    <div className="feature-pill">
                        <TrendingUp size={18} color="#4ade80" />
                        <span>AI Insights</span>
                    </div>
                    <div className="feature-pill">
                        <Zap size={18} color="#fbbf24" />
                        <span>Auto Bots</span>
                    </div>
                    <div className="feature-pill">
                        <Shield size={18} color="#22d3ee" />
                        <span>Whale Tracking</span>
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '2rem',
                    marginTop: '4rem',
                    maxWidth: '800px',
                    margin: '4rem auto 0',
                    animation: 'fadeInUp 1s ease-out 1s both'
                }}>
                    <div className="stat-card">
                        <div className="stat-value">$2.4B+</div>
                        <div className="stat-label">24h Volume</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">24,891</div>
                        <div className="stat-label">Active Traders</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">156%</div>
                        <div className="stat-label">Avg ROI</div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }

                @keyframes pulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
                    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .cta-primary {
                    background: linear-gradient(135deg, #4ade80, #22d3ee);
                    color: black;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 0.75rem;
                    font-weight: 700;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 40px rgba(74,222,128,0.3);
                }

                .cta-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 50px rgba(74,222,128,0.5);
                }

                .cta-secondary {
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(10px);
                    color: white;
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 1rem 2rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }

                .cta-secondary:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(167,139,250,0.5);
                    transform: translateY(-2px);
                }

                .feature-pill {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255,255,255,0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.75rem 1.5rem;
                    borderRadius: 2rem;
                    color: white;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .feature-pill:hover {
                    background: rgba(255,255,255,0.1);
                    transform: translateY(-2px);
                }

                .stat-card {
                    text-align: center;
                    padding: 1.5rem;
                    background: rgba(255,255,255,0.03);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.05);
                    borderRadius: 1rem;
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(167,139,250,0.3);
                    transform: translateY(-5px);
                }

                .stat-value {
                    font-size: 2rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #4ade80, #22d3ee);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    color: #94a3b8;
                    font-size: 0.9rem;
                }
            `}</style>
        </section>
    );
}
