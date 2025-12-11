'use client';

import { useEffect, useState } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function GlitchText({ text, className = '', style = {} }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        // Random glitch effect
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 200);
            }
        }, 3000);

        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <div
            className={`glitch-container ${className}`}
            style={{
                position: 'relative',
                display: 'inline-block',
                ...style
            }}
        >
            <span
                className="glitch-text"
                data-text={text}
                style={{
                    position: 'relative',
                    display: 'inline-block',
                    animation: isGlitching ? 'glitch-skew 0.2s infinite' : 'none'
                }}
            >
                {text}
            </span>

            <style jsx global>{`
                .glitch-text {
                    position: relative;
                    color: white;
                }

                .glitch-text::before,
                .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }

                .glitch-text::before {
                    color: #ff00ff;
                    z-index: -1;
                    animation: ${isGlitching ? 'glitch-1 0.2s infinite' : 'none'};
                }

                .glitch-text::after {
                    color: #00ffff;
                    z-index: -2;
                    animation: ${isGlitching ? 'glitch-2 0.2s infinite' : 'none'};
                }

                @keyframes glitch-skew {
                    0% {
                        transform: skew(0deg);
                    }
                    20% {
                        transform: skew(-2deg);
                    }
                    40% {
                        transform: skew(2deg);
                    }
                    60% {
                        transform: skew(-1deg);
                    }
                    80% {
                        transform: skew(1deg);
                    }
                    100% {
                        transform: skew(0deg);
                    }
                }

                @keyframes glitch-1 {
                    0% {
                        opacity: 0.8;
                        transform: translate(-2px, 2px);
                        clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                    }
                    20% {
                        opacity: 0.8;
                        transform: translate(2px, -2px);
                        clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
                    }
                    40% {
                        opacity: 0.8;
                        transform: translate(-2px, 2px);
                        clip-path: polygon(0 20%, 100% 20%, 100% 80%, 0 80%);
                    }
                    60% {
                        opacity: 0.8;
                        transform: translate(2px, -2px);
                        clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
                    }
                    80% {
                        opacity: 0.8;
                        transform: translate(-2px, 2px);
                        clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
                    }
                    100% {
                        opacity: 0.8;
                        transform: translate(0);
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    }
                }

                @keyframes glitch-2 {
                    0% {
                        opacity: 0.8;
                        transform: translate(2px, -2px);
                        clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
                    }
                    20% {
                        opacity: 0.8;
                        transform: translate(-2px, 2px);
                        clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
                    }
                    40% {
                        opacity: 0.8;
                        transform: translate(2px, -2px);
                        clip-path: polygon(0 15%, 100% 15%, 100% 75%, 0 75%);
                    }
                    60% {
                        opacity: 0.8;
                        transform: translate(-2px, 2px);
                        clip-path: polygon(0 0, 100% 0, 100% 25%, 0 25%);
                    }
                    80% {
                        opacity: 0.8;
                        transform: translate(2px, -2px);
                        clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
                    }
                    100% {
                        opacity: 0.8;
                        transform: translate(0);
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                    }
                }
            `}</style>
        </div>
    );
}
