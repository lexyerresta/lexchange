'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SatoshiMysteryShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [storyIndex, setStoryIndex] = useState(0);

    const mysteryStories = [
        {
            title: "The Genesis",
            text: "October 31, 2008. A mysterious figure named Satoshi Nakamoto published a whitepaper that would change the world forever...",
            color: "#a78bfa"
        },
        {
            title: "The First Block",
            text: "January 3, 2009. The Bitcoin genesis block was mined, containing a hidden message about bank bailouts...",
            color: "#22d3ee"
        },
        {
            title: "The Vanishing",
            text: "April 2011. Satoshi sent his last email and disappeared without a trace, leaving behind a revolutionary legacy...",
            color: "#4ade80"
        },
        {
            title: "The Mystery Remains",
            text: "To this day, nobody knows who Satoshi Nakamoto really is. 1 million BTC remain untouched in his wallets...",
            color: "#fbbf24"
        }
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x0a0a14, 10, 50);

        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / 700,
            0.1,
            1000
        );
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(containerRef.current.clientWidth, 700);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);

        // Create mysterious hooded figure silhouette
        const figureGroup = new THREE.Group();

        // Head (sphere with hood effect)
        const headGeometry = new THREE.SphereGeometry(1.2, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a2e,
            emissive: 0xa78bfa,
            emissiveIntensity: 0.2,
            shininess: 100
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2;
        figureGroup.add(head);

        // Hood (cone)
        const hoodGeometry = new THREE.ConeGeometry(1.8, 2.5, 32);
        const hoodMaterial = new THREE.MeshPhongMaterial({
            color: 0x0f0f1e,
            emissive: 0x6366f1,
            emissiveIntensity: 0.1,
            transparent: true,
            opacity: 0.9
        });
        const hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
        hood.position.y = 3.5;
        figureGroup.add(hood);

        // Question mark symbol (mystery)
        const questionGeometry = new THREE.TorusGeometry(0.5, 0.15, 16, 100);
        const questionMaterial = new THREE.MeshPhongMaterial({
            color: 0xa78bfa,
            emissive: 0xa78bfa,
            emissiveIntensity: 0.8
        });
        const questionMark = new THREE.Mesh(questionGeometry, questionMaterial);
        questionMark.position.set(0, 2, 0.5);
        questionMark.rotation.x = Math.PI / 2;
        figureGroup.add(questionMark);

        scene.add(figureGroup);

        // Create Bitcoin symbols orbiting
        const bitcoinSymbols: THREE.Mesh[] = [];
        const bitcoinCount = 8;

        for (let i = 0; i < bitcoinCount; i++) {
            const geometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
            const material = new THREE.MeshPhongMaterial({
                color: 0xf7931a,
                emissive: 0xf7931a,
                emissiveIntensity: 0.5
            });
            const bitcoin = new THREE.Mesh(geometry, material);

            const angle = (i / bitcoinCount) * Math.PI * 2;
            const radius = 6;
            bitcoin.position.x = Math.cos(angle) * radius;
            bitcoin.position.z = Math.sin(angle) * radius;
            bitcoin.position.y = Math.sin(angle * 2) * 2;

            bitcoinSymbols.push(bitcoin);
            scene.add(bitcoin);
        }

        // Create mysterious particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xa78bfa,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create data streams (binary code effect)
        const dataStreams: THREE.Line[] = [];
        for (let i = 0; i < 20; i++) {
            const points = [];
            const segments = 50;
            for (let j = 0; j < segments; j++) {
                points.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    j * 0.3 - 10,
                    (Math.random() - 0.5) * 20
                ));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x22d3ee,
                transparent: true,
                opacity: 0.3
            });
            const line = new THREE.Line(geometry, material);
            dataStreams.push(line);
            scene.add(line);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xa78bfa, 2, 50);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x22d3ee, 2, 50);
        pointLight2.position.set(-5, 5, 5);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0xf7931a, 1.5, 30);
        pointLight3.position.set(0, 0, 10);
        scene.add(pointLight3);

        // Animation
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.01;

            // Rotate figure slowly
            figureGroup.rotation.y = Math.sin(time * 0.3) * 0.3;

            // Pulse question mark
            questionMark.scale.set(
                1 + Math.sin(time * 2) * 0.1,
                1 + Math.sin(time * 2) * 0.1,
                1 + Math.sin(time * 2) * 0.1
            );

            // Orbit Bitcoin symbols
            bitcoinSymbols.forEach((bitcoin, i) => {
                const angle = (i / bitcoinCount) * Math.PI * 2 + time * 0.5;
                const radius = 6 + Math.sin(time + i) * 0.5;
                bitcoin.position.x = Math.cos(angle) * radius;
                bitcoin.position.z = Math.sin(angle) * radius;
                bitcoin.position.y = Math.sin(angle * 2 + time) * 2;
                bitcoin.rotation.y += 0.02;
                bitcoin.rotation.x += 0.01;
            });

            // Animate particles
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x = Math.sin(time * 0.1) * 0.1;

            // Animate data streams
            dataStreams.forEach((stream, i) => {
                stream.position.y = ((time * 2 + i * 0.5) % 20) - 10;
                (stream.material as THREE.LineBasicMaterial).opacity = 0.3 + Math.sin(time + i) * 0.2;
            });

            // Pulse lights
            pointLight1.intensity = 2 + Math.sin(time) * 0.5;
            pointLight2.intensity = 2 + Math.cos(time) * 0.5;
            pointLight3.intensity = 1.5 + Math.sin(time * 1.5) * 0.3;

            renderer.render(scene, camera);
        };

        animate();

        // Story rotation
        const storyInterval = setInterval(() => {
            setStoryIndex((prev) => (prev + 1) % mysteryStories.length);
        }, 5000);

        // Cleanup
        return () => {
            clearInterval(storyInterval);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    const currentStory = mysteryStories[storyIndex];

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0a0a14 0%, #1a1a2e 100%)',
            border: '1px solid rgba(167,139,250,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        }}>
            {/* 3D Canvas */}
            <div ref={containerRef} style={{ width: '100%', height: '700px' }} />

            {/* Story Overlay */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '3rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: currentStory.color,
                        marginBottom: '1rem',
                        textShadow: `0 0 20px ${currentStory.color}`,
                        animation: 'fadeInUp 0.5s ease-out'
                    }}>
                        {currentStory.title}
                    </h3>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#94a3b8',
                        lineHeight: '1.8',
                        animation: 'fadeInUp 0.5s ease-out 0.2s both'
                    }}>
                        {currentStory.text}
                    </p>

                    {/* Story indicators */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        marginTop: '2rem'
                    }}>
                        {mysteryStories.map((_, idx) => (
                            <div
                                key={idx}
                                style={{
                                    width: idx === storyIndex ? '2rem' : '0.5rem',
                                    height: '0.5rem',
                                    borderRadius: '1rem',
                                    background: idx === storyIndex ? currentStory.color : 'rgba(255,255,255,0.2)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: idx === storyIndex ? `0 0 10px ${currentStory.color}` : 'none'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Mysterious glow effect */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                background: `radial-gradient(circle, ${currentStory.color}40 0%, transparent 70%)`,
                filter: 'blur(60px)',
                pointerEvents: 'none',
                animation: 'pulse-glow 3s ease-in-out infinite'
            }} />
        </div>
    );
}
