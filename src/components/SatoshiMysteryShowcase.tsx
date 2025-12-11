'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';


export default function SatoshiMysteryShowcase() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- SCENE SETUP ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.02); // Deep mysterious fog

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 6;
        camera.position.y = 0.5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);


        // --- SATOSHI FIGURE GROUP ---
        const figureGroup = new THREE.Group();
        scene.add(figureGroup);

        // 1. THE HOOD (Outer Shell)
        // Using BackSide rendering to create a hollow shell effect
        const hoodGeo = new THREE.SphereGeometry(1.6, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.65);
        const hoodMat = new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.7,
            metalness: 0.6,
            side: THREE.BackSide,
            emissive: 0x1a1a2e,
            emissiveIntensity: 0.2
        });
        const hood = new THREE.Mesh(hoodGeo, hoodMat);
        hood.rotation.x = -Math.PI / 2.2;
        hood.scale.z = 1.2; // Elongate hood
        figureGroup.add(hood);

        // 2. THE VOID (Inner Face)
        // A pure black sphere to absorb light inside the hood
        const faceGeo = new THREE.SphereGeometry(1.3, 32, 32);
        const faceMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const face = new THREE.Mesh(faceGeo, faceMat);
        face.position.y = 0.2;
        face.position.z = -0.3;
        figureGroup.add(face);

        // 3. SHOULDER DRAPE (Cape/Cloth)
        const shoulderGeo = new THREE.CylinderGeometry(0.5, 2.5, 3, 32, 1, true);
        const shoulderMat = new THREE.MeshStandardMaterial({
            color: 0x0f0f18,
            roughness: 0.8,
            side: THREE.DoubleSide
        });
        const shoulders = new THREE.Mesh(shoulderGeo, shoulderMat);
        shoulders.position.y = -2;
        figureGroup.add(shoulders);

        // 4. DIGITAL GHOST PARTICLES
        // Surround the figure with data particles
        const particleCount = 3000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);
        const pSizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const r = 2 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pPos[i * 3 + 1] = r * Math.cos(phi) - 0.5;
            pPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

            pSizes[i] = 0.02 + Math.random() * 0.04; // Slightly larger and varied particles
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

        const pMat = new THREE.PointsMaterial({
            color: 0x22d3ee,
            size: 0.04,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        const particleSystem = new THREE.Points(pGeo, pMat);
        figureGroup.add(particleSystem);

        // 5. ORBITING BITCOIN SYMBOLS
        const coins: THREE.Group[] = [];
        const coinCount = 5;
        const ringRadius = 4;

        for (let i = 0; i < coinCount; i++) {
            const coinGroup = new THREE.Group();

            // Coin Mesh
            const coinGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 32);
            const coinMat = new THREE.MeshStandardMaterial({
                color: 0xf2a900,
                metalness: 0.9,
                roughness: 0.2,
                emissive: 0xf2a900,
                emissiveIntensity: 0.2
            });
            const coin = new THREE.Mesh(coinGeo, coinMat);
            coin.rotation.x = Math.PI / 2;

            // Bitcoin 'B' Text (Simulated with simple geometry for now or texture)
            // Just a glowing ring for optimization
            const glowRingGeo = new THREE.TorusGeometry(0.5, 0.02, 16, 32);
            const glowRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
            const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);

            coinGroup.add(coin);
            coinGroup.add(glowRing);

            // Initial Position
            const angle = (i / coinCount) * Math.PI * 2;
            coinGroup.position.set(
                Math.cos(angle) * ringRadius,
                Math.sin(angle * 3) * 1, // Wave height
                Math.sin(angle) * ringRadius
            );

            // Store animation data
            coinGroup.userData = { angle: angle, speed: 0.005 + Math.random() * 0.005, yOffset: i };

            scene.add(coinGroup);
            coins.push(coinGroup);
        }

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0x222244, 0.8); // Darker ambient with more depth
        scene.add(ambientLight);

        const keyLight = new THREE.SpotLight(0x00ffff, 3);
        keyLight.position.set(4, 6, 4);
        scene.add(keyLight);

        const rimLight = new THREE.SpotLight(0xa78bfa, 6);
        rimLight.position.set(-4, 3, -4);
        rimLight.lookAt(0, 0, 0);
        scene.add(rimLight);

        // Add pulsing point light inside the void
        const voidLight = new THREE.PointLight(0x6366f1, 0, 3);
        voidLight.position.set(0, 0.2, 0);
        figureGroup.add(voidLight);

        // --- ANIMATION LOOP ---
        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();

            // Float Figure with breathing effect
            figureGroup.position.y = Math.sin(time * 0.5) * 0.15;
            figureGroup.rotation.y = time * 0.05; // Slow continuous rotation

            // Pulse the void light
            voidLight.intensity = 0.5 + Math.sin(time * 2) * 0.5;

            // Animate Particles - Slow spiral rotation with color pulse
            const positions = particleSystem.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                // Subtle vertical drift
                positions[i * 3 + 1] -= 0.003;
                if (positions[i * 3 + 1] < -4) {
                    positions[i * 3 + 1] = 4;
                    // Randomize X and Z on reset
                    const r = 2 + Math.random() * 2;
                    const theta = Math.random() * Math.PI * 2;
                    positions[i * 3] = r * Math.cos(theta);
                    positions[i * 3 + 2] = r * Math.sin(theta);
                }
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;
            particleSystem.rotation.y += 0.001;

            // Animate Coins
            coins.forEach(coin => {
                const data = coin.userData;
                data.angle += data.speed;
                coin.position.x = Math.cos(data.angle) * ringRadius;
                coin.position.z = Math.sin(data.angle) * ringRadius;
                coin.position.y = Math.sin(time + data.yOffset) * 1.5;

                coin.rotation.y += 0.02;
                coin.rotation.z = Math.sin(time * 2) * 0.2;
            });

            // Camera subtle movement
            camera.position.x = Math.sin(time * 0.1) * 0.5;
            camera.lookAt(0, 0.2, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Handle Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            // Dispose
            // Cleanup: dispose renderer and scene resources
            renderer.dispose();
            // Note: three.js will handle geometry disposal via garbage collection
        };
    }, []);

    return (
        <section id="showcase" style={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #1a1a2e 0%, #000000 100%)'
        }}>
            {/* 3D Container */}
            <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />

            {/* Overlay Text */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                pointerEvents: 'none',
                zIndex: 10,
                width: '100%',
                maxWidth: '900px',
                padding: '0 20px'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <h2 style={{
                        marginTop: '15rem', // Push down below figure
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        fontWeight: '900',
                        letterSpacing: '-0.05em',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1.5rem',
                        textShadow: '0 10px 40px rgba(0,0,0,0.8)'
                    }}>
                        SATOSHI NAKAMOTO
                    </h2>

                    <div style={{
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(10px)',
                        padding: '2rem',
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
                    }}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                            color: '#e2e8f0',
                            fontStyle: 'italic',
                            lineHeight: '1.6',
                            marginBottom: '1rem'
                        }}>
                            "I've moved on to other things. It's in good hands with Gavin and everyone."
                        </p>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#94a3b8',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            - Last known communication, 2011
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Fade */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '150px',
                background: 'linear-gradient(to top, #0B0B15, transparent)',
                pointerEvents: 'none'
            }} />
        </section>
    );
}
