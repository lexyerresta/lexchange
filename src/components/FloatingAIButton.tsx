'use client';

import { useState, useEffect } from 'react';
import { Bot, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FloatingAIButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

    useEffect(() => {
        // Generate random particles around the button
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            delay: Math.random() * 2
        }));
        setParticles(newParticles);
    }, []);

    return (
        <>
            <div style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 9999
            }}>
                {/* Particle effects */}
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        style={{
                            position: 'absolute',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#a78bfa',
                            left: '50%',
                            top: '50%',
                            transform: `translate(${particle.x}px, ${particle.y}px)`,
                            animation: `floatParticle 3s ease-in-out ${particle.delay}s infinite`,
                            opacity: 0
                        }}
                    />
                ))}

                {/* Main button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{
                        position: 'relative',
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 40px rgba(167,139,250,0.5)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isExpanded ? 'scale(1.1) rotate(180deg)' : 'scale(1) rotate(0deg)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.15)';
                        e.currentTarget.style.boxShadow = '0 15px 50px rgba(167,139,250,0.7)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = isExpanded ? 'scale(1.1) rotate(180deg)' : 'scale(1) rotate(0deg)';
                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(167,139,250,0.5)';
                    }}
                >
                    {/* Pulse rings */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2px solid #a78bfa',
                        animation: 'pulse-ring 2s ease-out infinite'
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2px solid #a78bfa',
                        animation: 'pulse-ring 2s ease-out 1s infinite'
                    }} />

                    {isExpanded ? (
                        <X size={32} color="white" />
                    ) : (
                        <Bot size={32} color="white" />
                    )}
                </button>

                {/* Expanded menu */}
                <div style={{
                    position: 'absolute',
                    bottom: '85px',
                    right: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    opacity: isExpanded ? 1 : 0,
                    transform: isExpanded ? 'translateY(0)' : 'translateY(20px)',
                    pointerEvents: isExpanded ? 'auto' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                    <Link href="/ai-trader">
                        <button className="ai-menu-item" style={{
                            background: 'rgba(167,139,250,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(167,139,250,0.3)',
                            borderRadius: '1rem',
                            padding: '1rem 1.5rem',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            fontSize: '0.95rem',
                            fontWeight: '600'
                        }}>
                            <Bot size={20} color="#a78bfa" />
                            AI Trader Chat
                        </button>
                    </Link>

                    <Link href="/trading-bots">
                        <button className="ai-menu-item" style={{
                            background: 'rgba(251,191,36,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(251,191,36,0.3)',
                            borderRadius: '1rem',
                            padding: '1rem 1.5rem',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            fontSize: '0.95rem',
                            fontWeight: '600'
                        }}>
                            <Sparkles size={20} color="#fbbf24" />
                            Auto Trading Bots
                        </button>
                    </Link>

                    <Link href="/market-intel">
                        <button className="ai-menu-item" style={{
                            background: 'rgba(34,211,238,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(34,211,238,0.3)',
                            borderRadius: '1rem',
                            padding: '1rem 1.5rem',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            whiteSpace: 'nowrap',
                            fontSize: '0.95rem',
                            fontWeight: '600'
                        }}>
                            <Bot size={20} color="#22d3ee" />
                            Market Intelligence
                        </button>
                    </Link>
                </div>
            </div>

            <style jsx global>{`
                @keyframes pulse-ring {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 0;
                    }
                }

                @keyframes floatParticle {
                    0%, 100% {
                        opacity: 0;
                        transform: translate(0, 0) scale(0);
                    }
                    50% {
                        opacity: 1;
                        transform: translate(var(--x), var(--y)) scale(1);
                    }
                }

                .ai-menu-item:hover {
                    transform: translateX(-5px);
                    box-shadow: 0 10px 30px rgba(167,139,250,0.3);
                }
            `}</style>
        </>
    );
}
