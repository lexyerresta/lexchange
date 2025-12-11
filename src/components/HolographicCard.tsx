'use client';

import { useState, useRef, MouseEvent } from 'react';

interface HolographicCardProps {
    children: React.ReactNode;
    intensity?: number;
}

export default function HolographicCard({ children, intensity = 1 }: HolographicCardProps) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10 * intensity;
        const rotateY = ((x - centerX) / centerX) * 10 * intensity;

        setRotation({ x: rotateX, y: rotateY });
        setGlowPosition({
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100
        });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlowPosition({ x: 50, y: 50 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.1s ease-out',
                willChange: 'transform'
            }}
        >
            {/* Holographic glow effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(167,139,250,0.4), transparent 50%)`,
                    opacity: 0.6,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease',
                    mixBlendMode: 'screen'
                }}
            />

            {/* Rainbow shimmer effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 'inherit',
                    background: `linear-gradient(135deg, 
                        rgba(255,0,255,0.1) 0%, 
                        rgba(0,255,255,0.1) 25%, 
                        rgba(255,255,0,0.1) 50%, 
                        rgba(255,0,255,0.1) 75%, 
                        rgba(0,255,255,0.1) 100%)`,
                    backgroundSize: '200% 200%',
                    animation: 'rainbow-shimmer 3s ease infinite',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay'
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>

            <style jsx global>{`
                @keyframes rainbow-shimmer {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
            `}</style>
        </div>
    );
}
