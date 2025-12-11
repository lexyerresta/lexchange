'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function ThreeJSShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [prices, setPrices] = useState({
        BTC: { price: 98450, change: 2.4 },
        ETH: { price: 3750, change: 1.8 },
        SOL: { price: 142, change: 5.2 },
        BNB: { price: 612, change: -0.8 },
        USDT: { price: 1.00, change: 0.0 }
    });

    // Simulate price updates
    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => ({
                BTC: { ...prev.BTC, change: (Math.random() - 0.5) * 5 },
                ETH: { ...prev.ETH, change: (Math.random() - 0.5) * 5 },
                SOL: { ...prev.SOL, change: (Math.random() - 0.5) * 8 },
                BNB: { ...prev.BNB, change: (Math.random() - 0.5) * 4 },
                USDT: { ...prev.USDT, change: 0 }
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Crypto data with positions
        const cryptoData = [
            { name: 'BTC', color: 0xf7931a, position: [0, 0, 0], scale: 2, symbol: '₿' },
            { name: 'ETH', color: 0x627eea, position: [-5, 2, -3], scale: 1.5, symbol: 'Ξ' },
            { name: 'SOL', color: 0x14f195, position: [5, -2, -3], scale: 1.2, symbol: '◎' },
            { name: 'BNB', color: 0xf3ba2f, position: [-4, -3, -4], scale: 1.1, symbol: 'B' },
            { name: 'USDT', color: 0x26a17b, position: [4, 3, -4], scale: 1, symbol: '₮' }
        ];

        const coins: { group: THREE.Group; name: string }[] = [];

        cryptoData.forEach((data) => {
            const coinGroup = new THREE.Group();

            // Main coin
            const geometry = new THREE.CylinderGeometry(1, 1, 0.3, 64);
            const material = new THREE.MeshPhysicalMaterial({
                color: data.color,
                metalness: 0.95,
                roughness: 0.05,
                clearcoat: 1,
                clearcoatRoughness: 0.1,
                reflectivity: 1,
                emissive: data.color,
                emissiveIntensity: 0.4
            });
            const coin = new THREE.Mesh(geometry, material);
            coin.rotation.x = Math.PI / 2;
            coinGroup.add(coin);

            // Glowing edge
            const edgeGeometry = new THREE.TorusGeometry(1.05, 0.15, 16, 64);
            const edgeMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 1,
                roughness: 0,
                emissive: data.color,
                emissiveIntensity: 0.8,
                transparent: true,
                opacity: 0.9
            });
            const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
            edge.position.z = 0.15;
            coinGroup.add(edge);

            coinGroup.position.set(data.position[0], data.position[1], data.position[2]);
            coinGroup.scale.setScalar(data.scale);
            scene.add(coinGroup);
            coins.push({ group: coinGroup, name: data.name });
        });

        // Market data visualization particles
        const particleCount = 3000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

            const colorChoice = Math.random();
            if (colorChoice < 0.3) {
                colors[i * 3] = 0.97; colors[i * 3 + 1] = 0.58; colors[i * 3 + 2] = 0.10; // Gold
            } else if (colorChoice < 0.6) {
                colors[i * 3] = 0.29; colors[i * 3 + 1] = 0.87; colors[i * 3 + 2] = 0.50; // Green
            } else {
                colors[i * 3] = 0.65; colors[i * 3 + 1] = 0.55; colors[i * 3 + 2] = 0.98; // Purple
            }

            sizes[i] = Math.random() * 0.15 + 0.05;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Premium lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 10, 5);
        scene.add(mainLight);

        const lights = [
            new THREE.PointLight(0xf7931a, 4, 50),
            new THREE.PointLight(0x627eea, 4, 50),
            new THREE.PointLight(0x14f195, 4, 50),
            new THREE.PointLight(0xa78bfa, 3, 50),
            new THREE.PointLight(0x22d3ee, 3, 50)
        ];

        lights.forEach((light, i) => {
            const angle = (i / lights.length) * Math.PI * 2;
            light.position.set(Math.cos(angle) * 10, 5, Math.sin(angle) * 10);
            scene.add(light);
        });

        camera.position.set(0, 3, 15);
        camera.lookAt(0, 0, 0);

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.01;

            // Camera parallax
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
            camera.position.y += (3 + mouseY * 2 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            // Animate coins
            coins.forEach((coin, index) => {
                coin.group.rotation.y += 0.015;

                if (index === 0) {
                    // BTC center - floating
                    coin.group.position.y = Math.sin(time * 0.5) * 0.5;
                } else {
                    // Others orbit
                    const orbitSpeed = 0.15 + index * 0.05;
                    const orbitRadius = 5 + index * 0.8;
                    const angle = time * orbitSpeed + index * (Math.PI / 2);
                    coin.group.position.x = Math.cos(angle) * orbitRadius;
                    coin.group.position.z = Math.sin(angle) * orbitRadius - 3;
                    coin.group.position.y = Math.sin(time * 0.5 + index) * 0.8;
                }
            });

            // Particles flow
            particles.rotation.y += 0.0008;
            particles.rotation.x = Math.sin(time * 0.2) * 0.1;

            // Lights orbit
            lights.forEach((light, i) => {
                const angle = time * 0.3 + (i / lights.length) * Math.PI * 2;
                const radius = 12 + Math.sin(time + i) * 3;
                light.position.x = Math.cos(angle) * radius;
                light.position.z = Math.sin(angle) * radius;
                light.position.y = 5 + Math.sin(time * 0.5 + i) * 3;
                light.intensity = 3 + Math.sin(time * 2 + i) * 1.5;
            });

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            {/* Title */}
            <div style={{
                position: 'absolute',
                top: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                textAlign: 'center',
                maxWidth: '90%'
            }}>
                <h3 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #f7931a, #fbbf24, #f7931a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.05em'
                }}>
                    Crypto Mandala
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    Sacred Geometry of Digital Currency
                </p>
                <p style={{ color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    Powered by Three.js • Real-time 3D Rendering
                </p>
            </div>

            {/* 3D Canvas */}
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '700px',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(10,10,20,0.95), rgba(20,20,40,0.95))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 0 100px rgba(167,139,250,0.1)'
                }}
            />

            {/* Live Price Ticker */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                zIndex: 10,
                maxWidth: '90%'
            }}>
                {Object.entries(prices).map(([symbol, data]) => (
                    <div
                        key={symbol}
                        style={{
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '0.75rem',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span style={{ fontWeight: '700', color: 'white' }}>{symbol}</span>
                        <span style={{ color: '#94a3b8' }}>${data.price.toLocaleString()}</span>
                        <span style={{
                            color: data.change >= 0 ? '#4ade80' : '#f87171',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.9rem'
                        }}>
                            {data.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {Math.abs(data.change).toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
