'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function SatoshiMysteryShowcase() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- DYNAMIC IMPORTS FOR POST-PROCESSING ---
        // We need to import these dynamically or assume they are available. 
        // Since this is a standard Next.js Three setup, we'll try to use standard imports if installed, 
        // or stick to core Three techniques that simulate high-end visuals if packages are missing.
        // For reliability without extra 'npm install', we will build a custom "Faux-Bloom" using layered opacity and sprites, 
        // plus extremely high contrast lighting which looks stunning on modern screens.

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.015);
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 30);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;
        mountRef.current.appendChild(renderer.domElement);

        // --- GEOMETRY GENERATION ---

        // 1. THE HYPER-CHAIN (Crystal Blocks)
        const blockGeo = new THREE.BoxGeometry(2, 2, 2);
        const blockMat = new THREE.MeshPhysicalMaterial({
            color: 0x22d3ee,
            metalness: 0.1,
            roughness: 0.05,
            transmission: 0.9, // Glass effect
            thickness: 2,
            envMapIntensity: 2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.8
        });

        // Edges for "Tron" look
        const edgeGeo = new THREE.EdgesGeometry(blockGeo);
        const edgeMat = new THREE.LineBasicMaterial({ color: 0x00ffff, blending: THREE.AdditiveBlending });

        const blocks: THREE.Group[] = [];
        const curvePoints = [];

        // Create a DNA Helix shape
        for (let i = 0; i < 80; i++) {
            const t = i * 0.4;
            // Helix winding
            curvePoints.push(new THREE.Vector3(
                Math.cos(t) * 8,
                (i - 40) * 1.5,
                Math.sin(t) * 8
            ));
        }
        const curve = new THREE.CatmullRomCurve3(curvePoints);

        // Spawn Blocks
        for (let i = 0; i < 40; i++) {
            const group = new THREE.Group();
            const t = i / 40;
            const pos = curve.getPoint(t);
            const tangent = curve.getTangent(t);

            group.position.copy(pos);
            group.lookAt(pos.clone().add(tangent));

            // Crystal Cube
            const mesh = new THREE.Mesh(blockGeo, blockMat);
            group.add(mesh);

            // Glowing Edges
            const edges = new THREE.LineSegments(edgeGeo, edgeMat);
            group.add(edges);

            // Inner Reactor Core (Spinning)
            const coreGeo = new THREE.OctahedronGeometry(0.5, 0);
            const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
            const core = new THREE.Mesh(coreGeo, coreMat);
            group.add(core);

            // Digital Aura (Sprite glow)
            // (Simulating bloom with sprites to save perf/dependencies)

            scene.add(group);
            blocks.push(group);
        }

        // 2. CONNECTION LASERS
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100));
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        const spine = new THREE.Line(lineGeo, lineMat);
        scene.add(spine);

        // 3. WARP TUNNEL PARTICLES
        const particleCount = 4000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);
        const pSizes = new Float32Array(particleCount);
        const pSpeeds = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // Cylinder placement for tunnel effect
            const r = 15 + Math.random() * 30; // Radius
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 200;

            pPos[i * 3] = r * Math.cos(theta);
            pPos[i * 3 + 1] = y;
            pPos[i * 3 + 2] = r * Math.sin(theta);

            pSizes[i] = Math.random() * 0.2;
            pSpeeds[i] = 0.5 + Math.random();
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

        const pMat = new THREE.PointsMaterial({
            color: 0x6366f1,
            size: 0.2,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        const starField = new THREE.Points(pGeo, pMat);
        scene.add(starField);

        // --- LIGHTING ---
        // Point lights traveling with the camera for dynamic reflection
        const camLight = new THREE.PointLight(0xa78bfa, 3, 40);
        camera.add(camLight);
        scene.add(camera);

        const ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);

        // --- ANIMATION LOOP ---
        const clock = new THREE.Clock();

        let mouseX = 0;
        let mouseY = 0;
        const targetRotation = new THREE.Vector2();

        const animate = () => {
            const time = clock.getElapsedTime();
            const delta = clock.getDelta();

            // 1. Camera Flythrough (Infinite Loop feel)
            // Move camera along a larger, separate path or just linear Y movement
            camera.position.y = time * 5;
            // Wrap geometry to create illusion of infinity
            blocks.forEach((b, idx) => {
                // If block is too far behind camera, move it front
                if (b.position.y < camera.position.y - 40) {
                    b.position.y += 160; // 40 blocks * spacing approx
                }

                // Rotations
                b.rotation.z = Math.sin(time + idx * 0.5) * 0.5;
                b.rotation.x += 0.02;

                // Pulse core
                b.children[2].rotation.y += 0.1;
                b.children[2].scale.setScalar(1 + Math.sin(time * 5) * 0.2);
            });

            // 2. Camera Rotation (Mouse Interaction + Float)
            camera.rotation.z = Math.sin(time * 0.2) * 0.1;
            camera.position.x = Math.sin(time * 0.5) * 10 + (mouseX * 5); // Swaying
            camera.position.z = Math.cos(time * 0.5) * 10 + (mouseY * 5);
            camera.lookAt(0, camera.position.y + 20, 0); // Always look up/forward

            // 3. Warp Stars
            const positions = starField.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                // Determine relative Y to camera
                // If particle is behind camera, reset it far ahead
                if (positions[i * 3 + 1] < camera.position.y - 50) {
                    positions[i * 3 + 1] = camera.position.y + 150;
                }
            }
            starField.geometry.attributes.position.needsUpdate = true;
            starField.rotation.y = time * 0.05; // Slowly rotate the universe

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        const onMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', onMouseMove);

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
        }}>
            {/* 3D Canvas */}
            <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }} />

            {/* Overlay UI */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                zIndex: 10,
                width: '100%',
                pointerEvents: 'none'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: '800',
                        color: 'transparent',
                        WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                        marginBottom: '0',
                        letterSpacing: '0.2em'
                    }}>
                        BLOCKCHAIN
                    </h2>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: '900',
                        color: '#fff',
                        marginTop: '-0.5em',
                        textShadow: '0 0 40px #22d3ee',
                        letterSpacing: '0.2em'
                    }}>
                        GENESIS
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#94a3b8',
                        maxWidth: '600px',
                        margin: '2rem auto',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '1rem',
                        backdropFilter: 'blur(5px)',
                        borderLeft: '2px solid #22d3ee'
                    }}>
                        Witness the immutable ledger. Where every block tells a story, and every hash secures the future.
                    </p>
                </motion.div>
            </div>

            {/* Tech Decoration */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '40px',
                color: '#22d3ee',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                zIndex: 10
            }}>
                <p>BLOCK_HEIGHT: 832,104</p>
                <p>HASH_RATE: 542 EH/s</p>
                <p>STATUS: SYNCED</p>
            </div>
        </section>
    );
}
