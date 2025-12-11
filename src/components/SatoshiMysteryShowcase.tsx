'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function SatoshiMysteryShowcase() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- SCENE SETUP - THUNDEROUS MODE ---
        const scene = new THREE.Scene();
        // Deep void with electric fog
        const fogColor = new THREE.Color(0x020205);
        scene.fog = new THREE.FogExp2(fogColor.getHex(), 0.03);
        scene.background = fogColor;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5.5;
        camera.position.y = 0.5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // Simple tone mapping to handle bright lights
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        mountRef.current.appendChild(renderer.domElement);

        // --- SATOSHI FIGURE GROUP ---
        const figureGroup = new THREE.Group();
        scene.add(figureGroup);

        // 1. THE HOOD (Outer Shell) - Glossy obsidian
        const hoodGeo = new THREE.SphereGeometry(1.6, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.65);
        const hoodMat = new THREE.MeshPhysicalMaterial({
            color: 0x050510,
            roughness: 0.2,
            metalness: 0.9,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            side: THREE.BackSide,
            emissive: 0x1a1a40,
            emissiveIntensity: 0.5
        });
        const hood = new THREE.Mesh(hoodGeo, hoodMat);
        hood.rotation.x = -Math.PI / 2.2;
        hood.scale.z = 1.2;
        figureGroup.add(hood);

        // 2. THE VOID (Inner Face) - Pure blackhole
        const faceGeo = new THREE.SphereGeometry(1.3, 32, 32);
        const faceMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const face = new THREE.Mesh(faceGeo, faceMat);
        face.position.y = 0.2;
        face.position.z = -0.3;
        figureGroup.add(face);

        // 3. SHOULDER DRAPE
        const shoulderGeo = new THREE.CylinderGeometry(0.5, 2.8, 3.5, 32, 1, true);
        const shoulderMat = new THREE.MeshStandardMaterial({
            color: 0x080816,
            roughness: 0.5,
            metalness: 0.8,
            side: THREE.DoubleSide
        });
        const shoulders = new THREE.Mesh(shoulderGeo, shoulderMat);
        shoulders.position.y = -2.2;
        figureGroup.add(shoulders);

        // 4. DIGITAL STORM PARTICLES (Menggelegar Mode)
        const particleCount = 5000; // Increased count
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);
        const pSizes = new Float32Array(particleCount);
        const pColors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color(0x22d3ee); // Cyan
        const color2 = new THREE.Color(0xa78bfa); // Purple
        const color3 = new THREE.Color(0xffffff); // White sparks

        for (let i = 0; i < particleCount; i++) {
            const r = 2.5 + Math.random() * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pPos[i * 3 + 1] = (r * Math.cos(phi) - 0.5) * 1.5; // Stretch vertically
            pPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

            pSizes[i] = Math.random() < 0.1 ? 0.08 : 0.03; // Occasional large sparks

            // Mix colors
            const mixedColor = Math.random() > 0.5 ? color1 : color2;
            if (Math.random() > 0.95) mixedColor.copy(color3); // Flash sparks

            pColors[i * 3] = mixedColor.r;
            pColors[i * 3 + 1] = mixedColor.g;
            pColors[i * 3 + 2] = mixedColor.b;
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));
        pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

        const pMat = new THREE.PointsMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        const particleSystem = new THREE.Points(pGeo, pMat);
        figureGroup.add(particleSystem);

        // 5. ENERGY RINGS (Orbiting)
        const coins: THREE.Group[] = [];
        const ringCount = 8;
        const orbitRadius = 4.5;

        for (let i = 0; i < ringCount; i++) {
            const group = new THREE.Group();

            // Glowing simple geometry
            const geo = new THREE.TorusGeometry(0.3, 0.02, 8, 32);
            const mat = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x22d3ee : 0xa78bfa,
                transparent: true,
                opacity: 0.8
            });
            const mesh = new THREE.Mesh(geo, mat);

            group.add(mesh);

            // Random initial placement
            const angle = (i / ringCount) * Math.PI * 2;
            group.position.set(
                Math.cos(angle) * orbitRadius,
                (Math.random() - 0.5) * 3,
                Math.sin(angle) * orbitRadius
            );

            group.userData = {
                angle: angle,
                speed: 0.01 + Math.random() * 0.02,
                wobble: Math.random() * Math.PI
            };

            scene.add(group);
            coins.push(group);
        }

        // --- LIGHTING (EXTREME) ---
        const ambientLight = new THREE.AmbientLight(0x111122, 1);
        scene.add(ambientLight);

        // Thunder Light 1 (Cyan)
        const thunderLight1 = new THREE.PointLight(0x00ffff, 0, 50);
        thunderLight1.position.set(5, 5, 5);
        scene.add(thunderLight1);

        // Thunder Light 2 (Purple)
        const thunderLight2 = new THREE.PointLight(0xff00ff, 0, 50);
        thunderLight2.position.set(-5, 5, -5);
        scene.add(thunderLight2);

        // Rim Light (Constant)
        const rimLight = new THREE.SpotLight(0x6366f1, 20);
        rimLight.position.set(0, 5, -5);
        rimLight.lookAt(0, 0, 0);
        scene.add(rimLight);

        // Void Light (Inner Glow)
        const voidLight = new THREE.PointLight(0xffffff, 2, 5);
        voidLight.position.set(0, 0.5, 0);
        figureGroup.add(voidLight);

        // --- ANIMATION LOOP ---
        const clock = new THREE.Clock();
        let thunderTimer = 0;

        const animate = () => {
            const time = clock.getElapsedTime();
            const delta = clock.getDelta(); // Not used but good practice

            // 1. THUNDER EFFECT (Menggelegar)
            // Randomly flash lights
            if (Math.random() > 0.97) {
                thunderLight1.intensity = 30 + Math.random() * 50;
                // Shake camera slightly on thunder
                camera.position.x += (Math.random() - 0.5) * 0.1;
                camera.position.y += (Math.random() - 0.5) * 0.1;
            } else {
                thunderLight1.intensity *= 0.8; // Fast decay
            }

            if (Math.random() > 0.98) {
                thunderLight2.intensity = 30 + Math.random() * 50;
            } else {
                thunderLight2.intensity *= 0.8;
            }
            // Stabilize camera return
            camera.position.x += (0 - camera.position.x) * 0.05;
            camera.position.y += (0.5 - camera.position.y) * 0.05;


            // 2. FIGURE ANIMATION
            figureGroup.position.y = Math.sin(time * 0.8) * 0.3;
            figureGroup.rotation.y = Math.sin(time * 0.3) * 0.2;

            // "Breathing" scale - glitches occasionally
            const glitch = Math.random() > 0.99 ? 1.05 : 1;
            figureGroup.scale.setScalar(1 + Math.sin(time * 2) * 0.02 * glitch);


            // 3. PARTICLE VORTEX
            const positions = particleSystem.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                // Spiral UP
                positions[i * 3 + 1] += 0.02;

                // Rotate around Y
                const x = positions[i * 3];
                const z = positions[i * 3 + 2];
                const angle = 0.01;
                positions[i * 3] = x * Math.cos(angle) - z * Math.sin(angle);
                positions[i * 3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);

                // Reset check
                if (positions[i * 3 + 1] > 6) {
                    positions[i * 3 + 1] = -6;
                }
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;


            // 4. ORBITING RINGS
            coins.forEach(group => {
                const data = group.userData;
                data.angle += data.speed;

                // Elliptical chaotic orbit
                group.position.x = Math.cos(data.angle) * orbitRadius;
                group.position.z = Math.sin(data.angle) * orbitRadius;
                group.position.y = Math.sin(time * 2 + data.wobble) * 2;

                group.rotation.x += 0.05;
                group.rotation.y += 0.05;
            });


            // 5. VOID PULSE
            voidLight.intensity = 2 + Math.sin(time * 10) * 1.5; // Fast electric pulse

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
            renderer.dispose();
        };
    }, []);

    return (
        <section id="showcase" style={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #1e1e2f 0%, #000 100%)' // Subtle purple tint
        }}>
            {/* 3D Container - Behind everything */}
            <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }} />

            {/* Overlay Text - Glitchy Tech Style */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                pointerEvents: 'none', // Allow clicks to pass through to canvas if interactable
                zIndex: 10,
                width: '100%',
                padding: '0 20px',
                mixBlendMode: 'overlay' // Cool blend effect with the 3D scene
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontWeight: '900',
                        letterSpacing: '-0.05em',
                        color: '#fff',
                        marginBottom: '1rem',
                        textShadow: '0 0 50px rgba(167, 139, 250, 0.8), 0 0 20px rgba(34, 211, 238, 0.8)',
                        // Emulate glitch text via duplicate layers if needed, simplified here
                    }}>
                        SATOSHI <span style={{ color: '#22d3ee' }}>NAKAMOTO</span>
                    </h2>

                    <div style={{
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(4px)',
                        padding: '1.5rem',
                        borderTop: '1px solid rgba(255,255,255,0.2)',
                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                        maxWidth: '800px',
                        margin: '35vh auto 0', // Push text down significantly
                        borderRadius: '0'
                    }}>
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            color: '#e2e8f0',
                            fontFamily: 'monospace',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                        }}>
                             /// DIGITAL GHOST DETECTED ///
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Vignette Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at center, transparent 30%, black 100%)',
                pointerEvents: 'none',
                zIndex: 5
            }} />
        </section>
    );
}

