'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function SatoshiMysteryShowcase() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- 2020 CRYPTO AESTHETIC: "THE INTERCONNECTED WORLD" ---
        // Dark, Neon Grids, Floating Data, Wireframe Globes.

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x020204); // Deep void black
        // scene.fog = new THREE.FogExp2(0x020204, 0.035);

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 16;
        camera.position.y = 2;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // --- OBJECTS ---
        const worldGroup = new THREE.Group();
        scene.add(worldGroup);

        // 1. THE NETWORK GLOBE (Core)
        const globeGeo = new THREE.IcosahedronGeometry(4.5, 3); // Low-poly ish look
        const globeMat = new THREE.MeshBasicMaterial({
            color: 0x111111,
            wireframe: false,
            transparent: true,
            opacity: 0.9
        });
        const globe = new THREE.Mesh(globeGeo, globeMat);
        worldGroup.add(globe);

        // 2. THE GRID (Wireframe Overlay)
        const wireGeo = new THREE.WireframeGeometry(globeGeo);
        const wireMat = new THREE.LineBasicMaterial({
            color: 0x3b82f6, // Classic crypto blue
            transparent: true,
            opacity: 0.15
        });
        const wireframe = new THREE.LineSegments(wireGeo, wireMat);
        worldGroup.add(wireframe);

        // 3. NODES (Connection Points)
        const particleCount = 400;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);

        // Distribute points on sphere surface
        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            const r = 4.55; // Slightly above surface

            pPos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
            pPos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            pPos[i * 3 + 2] = r * Math.cos(phi);
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({
            color: 0x60a5fa,
            size: 0.08,
            map: null,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        const nodes = new THREE.Points(pGeo, pMat);
        worldGroup.add(nodes);


        // 4. ORBITING ASSETS (Satellites)
        const satellites: THREE.Mesh[] = [];
        const satColors = [0xf7931a, 0x627eea, 0x14f195, 0xe84142]; // BTC, ETH, SOL, AVAX colors

        satColors.forEach((color, i) => {
            const satGeo = new THREE.OctahedronGeometry(0.3, 0); // Geometric tech shape
            const satMat = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: true
            });
            const sat = new THREE.Mesh(satGeo, satMat);

            // Inner glow core
            const core = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.1, 0),
                new THREE.MeshBasicMaterial({ color: 0xffffff })
            );
            sat.add(core);

            // Orbit Group (Pivot)
            const pivot = new THREE.Group();
            pivot.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

            sat.userData = {
                radius: 6 + i,
                speed: 0.005 + (Math.random() * 0.005),
                angle: Math.random() * Math.PI * 2
            };

            pivot.add(sat); // Add sat to pivot, we will animate sat position relative to pivot
            worldGroup.add(pivot);
            satellites.push(sat);

            // Add trail ring
            const trailGeo = new THREE.RingGeometry(sat.userData.radius - 0.02, sat.userData.radius + 0.02, 64);
            const trailMat = new THREE.MeshBasicMaterial({
                color: color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.1
            });
            const trail = new THREE.Mesh(trailGeo, trailMat);
            trail.rotation.x = Math.PI / 2; // Flat ring
            pivot.add(trail);
        });

        // 5. DATA BEAMS (Shooting out)
        const beamGeo = new THREE.CylinderGeometry(0.02, 0.02, 10, 8);
        const beamMat = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0
        }); // Initially invisible
        const beams: THREE.Mesh[] = [];
        for (let i = 0; i < 5; i++) {
            const beam = new THREE.Mesh(beamGeo, beamMat.clone());
            beam.rotation.x = Math.PI / 2;
            beam.userData = {
                active: false,
                speed: 0,
                progress: 0
            };
            worldGroup.add(beam);
            beams.push(beam);
        }


        // --- INTERACTION ---
        let mouseX = 0;
        let mouseY = 0;
        let targetRotX = 0;
        let targetRotY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
        };
        window.addEventListener('mousemove', onMouseMove);


        // --- ANIMATION ---
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            // Smooth Rotation Control
            targetRotY += 0.002; // Auto rotate
            targetRotY += mouseX * 0.05; // Mouse influence
            targetRotX += mouseY * 0.05;

            worldGroup.rotation.y += (targetRotY - worldGroup.rotation.y) * 0.05;
            worldGroup.rotation.x += (targetRotX - worldGroup.rotation.x) * 0.05;

            // Pulse Wireframe color
            const hue = (time * 0.05) % 1;
            // wireMat.color.setHSL(0.6, 0.8, 0.5 + Math.sin(time)*0.1); 

            // Animate Satellites
            satellites.forEach((sat) => {
                const data = sat.userData;
                data.angle += data.speed;
                sat.position.set(
                    Math.cos(data.angle) * data.radius,
                    0,
                    Math.sin(data.angle) * data.radius
                );
                sat.rotation.x += 0.02;
                sat.rotation.z += 0.02;
            });

            // Animate Beams (Data transactions)
            beams.forEach(beam => {
                if (!beam.userData.active) {
                    if (Math.random() > 0.98) {
                        // Reset and activate
                        beam.userData.active = true;
                        beam.userData.progress = 0;
                        beam.userData.speed = 0.5 + Math.random();

                        // Random direction from center
                        beam.lookAt(new THREE.Vector3(
                            (Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)
                        ));
                        (beam.material as THREE.MeshBasicMaterial).opacity = 0.6;
                        beam.scale.y = 0.1;
                    }
                } else {
                    beam.userData.progress += beam.userData.speed;
                    beam.translateZ(beam.userData.speed);
                    beam.scale.y += 0.5; // Stretch as it flies

                    const mat = beam.material as THREE.MeshBasicMaterial;
                    mat.opacity -= 0.02;

                    if (mat.opacity <= 0 || beam.position.length() > 15) {
                        beam.userData.active = false;
                        beam.position.set(0, 0, 0);
                        beam.scale.y = 0.1;
                    }
                }
            });

            // Camera subtle float
            camera.position.y = 2 + Math.sin(time * 0.5) * 0.5;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <section id="showcase" style={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #000000 0%, #050510 100%)'
        }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute' }} />

            {/* TEXT OVERLAY */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%)',
                color: 'white',
                zIndex: 10,
                maxWidth: '600px',
                pointerEvents: 'none' // Let mouse pass through to canvas
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h4 style={{
                        color: '#60a5fa',
                        fontSize: '1rem',
                        letterSpacing: '0.3em',
                        marginBottom: '1.5rem',
                        fontWeight: '600'
                    }}>
                        DECENTRALIZED NETWORK
                    </h4>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        fontWeight: '800',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Connecting the<br />Digital World.
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#94a3b8',
                        lineHeight: 1.6,
                        marginBottom: '2.5rem'
                    }}>
                        A borderless infrastructure where value flows as freely as information.
                        Secure, transparent, and built for the future of finance.
                    </p>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', color: '#fff', fontWeight: '700' }}>24/7</div>
                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>UPTIME</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', color: '#fff', fontWeight: '700' }}>100K+</div>
                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>NODES</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', color: '#fff', fontWeight: '700' }}>$0.00</div>
                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>DOWNTIME</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* VIGNETTE & SCANLINES for Retro Feel */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at center, transparent 0%, #000 90%)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)',
                backgroundSize: '100% 4px',
                pointerEvents: 'none',
                opacity: 0.3
            }} />
        </section>
    );
}
