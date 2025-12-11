'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsVisible(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            opacity: progress >= 100 ? 0 : 1,
            transition: 'opacity 0.5s ease-out',
            pointerEvents: progress >= 100 ? 'none' : 'auto'
        }}>
            {/* Logo/Title */}
            <div style={{
                marginBottom: '3rem',
                animation: 'pulse-glow 2s ease-in-out infinite'
            }}>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #a78bfa, #22d3ee, #4ade80)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 40px rgba(167,139,250,0.5)'
                }}>
                    LEXCHANGE
                </h1>
                <p style={{
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: '0.9rem',
                    letterSpacing: '0.2em',
                    marginTop: '0.5rem'
                }}>
                    THE FUTURE OF CRYPTO TRADING
                </p>
            </div>

            {/* Progress Bar */}
            <div style={{
                width: '400px',
                maxWidth: '80vw',
                height: '4px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #a78bfa, #22d3ee, #4ade80)',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease-out',
                    boxShadow: '0 0 20px rgba(167,139,250,0.8)'
                }} />
            </div>

            {/* Progress Text */}
            <div style={{
                marginTop: '1rem',
                color: '#a78bfa',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                fontWeight: '600'
            }}>
                {Math.floor(progress)}%
            </div>

            {/* Loading Animation */}
            <div style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '0.5rem'
            }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#a78bfa',
                            animation: `loading-dot 1.4s ease-in-out ${i * 0.2}s infinite`
                        }}
                    />
                ))}
            </div>

            {/* Cyber Grid */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `
                    linear-gradient(rgba(167, 139, 250, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(167, 139, 250, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                opacity: 0.3,
                zIndex: -1
            }} />

            <style jsx global>{`
                @keyframes loading-dot {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.3;
                    }
                    50% {
                        transform: scale(1.5);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
