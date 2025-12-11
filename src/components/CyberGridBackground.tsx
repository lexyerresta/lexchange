'use client';

import { useEffect, useRef } from 'react';

export default function CyberGridBackground() {
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

        // Grid properties
        const gridSize = 50;
        let scanLineY = 0;
        let time = 0;

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            ctx.strokeStyle = 'rgba(167, 139, 250, 0.1)';
            ctx.lineWidth = 1;

            // Vertical lines
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Draw scanning line
            scanLineY = (scanLineY + 2) % canvas.height;

            const gradient = ctx.createLinearGradient(0, scanLineY - 50, 0, scanLineY + 50);
            gradient.addColorStop(0, 'rgba(167, 139, 250, 0)');
            gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.5)');
            gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanLineY - 50, canvas.width, 100);

            // Draw pulsing nodes at grid intersections
            time += 0.02;
            for (let x = 0; x < canvas.width; x += gridSize * 2) {
                for (let y = 0; y < canvas.height; y += gridSize * 2) {
                    const distance = Math.sqrt(
                        Math.pow(x - canvas.width / 2, 2) +
                        Math.pow(y - canvas.height / 2, 2)
                    );
                    const pulse = Math.sin(time - distance * 0.01) * 0.5 + 0.5;

                    ctx.beginPath();
                    ctx.arc(x, y, 2 * pulse, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(167, 139, 250, ${0.3 * pulse})`;
                    ctx.fill();
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
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
                opacity: 0.3
            }}
        />
    );
}
