'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle system
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            opacity: number;

            constructor() {
                this.x = Math.random() * (canvas?.width || window.innerWidth);
                this.y = Math.random() * (canvas?.height || window.innerHeight);
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;

                const colors = ['#a78bfa', '#4ade80', '#22d3ee', '#f472b6', '#fbbf24'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (canvas) {
                    if (this.x > canvas.width) this.x = 0;
                    if (this.x < 0) this.x = canvas.width;
                    if (this.y > canvas.height) this.y = 0;
                    if (this.y < 0) this.y = canvas.height;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        // Create particles
        const particleCount = 100;
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = '#a78bfa';
                        ctx.globalAlpha = (1 - distance / 100) * 0.2;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                });

                // Mouse interaction
                const dx = p1.x - mouseX;
                const dy = p1.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = '#4ade80';
                    ctx.globalAlpha = (1 - distance / 150) * 0.5;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, #0a0a14 0%, #1a1a2e 50%, #0f0f1e 100%)'
            }}
        />
    );
}
