'use client';

import { useEffect, useState, useRef } from 'react';

interface AnimatedStatProps {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    duration?: number;
    color?: string;
}

export function AnimatedStat({
    value,
    label,
    prefix = '',
    suffix = '',
    decimals = 0,
    duration = 2000,
    color = '#a78bfa'
}: AnimatedStatProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(value * easeOut);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, value, duration]);

    return (
        <div
            ref={elementRef}
            style={{
                textAlign: 'center',
                padding: '2rem',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${color}33`,
                borderRadius: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 20px 60px ${color}40`;
                e.currentTarget.style.borderColor = `${color}66`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${color}33`;
            }}
        >
            <div style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.5rem',
                fontFamily: 'monospace',
                textShadow: `0 0 30px ${color}80`
            }}>
                {prefix}{count.toFixed(decimals)}{suffix}
            </div>
            <div style={{
                color: '#94a3b8',
                fontSize: '1rem',
                fontWeight: '500',
                letterSpacing: '0.05em'
            }}>
                {label}
            </div>
        </div>
    );
}

interface StatsGridProps {
    stats: Array<{
        value: number;
        label: string;
        prefix?: string;
        suffix?: string;
        decimals?: number;
        color?: string;
    }>;
}

export default function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            padding: '2rem 0'
        }}>
            {stats.map((stat, idx) => (
                <AnimatedStat
                    key={idx}
                    value={stat.value}
                    label={stat.label}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    color={stat.color}
                />
            ))}
        </div>
    );
}
