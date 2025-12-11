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
        // Cyberpunk Void
        scene.fog = new THREE.FogExp2(0x000205, 0.02);
        scene.background = new THREE.Color(0x000205);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.set(0, 5, 20);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // --- GENESIS BLOCK & CHAIN ---
        const blocks: THREE.Mesh[] = [];
        const links: THREE.Line[] = [];

        // Block Geometry: A cube with slightly beveled edges (simulated) or just wireframe overlay
        const boxGeo = new THREE.BoxGeometry(2, 2, 2);
        const edgesGeo = new THREE.EdgesGeometry(boxGeo);

        // Materials
        const blockMat = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            emissive: 0x22d3ee,
            emissiveIntensity: 0.2, // Enhanced glow
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.9,
            transmission: 0.5, // Glass-like
        });

        const wireMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.5 });
        const genesisMat = new THREE.MeshPhysicalMaterial({
            color: 0xffd700, // Gold for Genesis
            emissive: 0xffa500,
            emissiveIntensity: 0.5,
            metalness: 1,
            roughness: 0.1
        });
        const genesisWireMat = new THREE.LineBasicMaterial({ color: 0xffd700 });

        // Create Chain
        const createBlock = (x: number, y: number, z: number, isGenesis = false) => {
            const mesh = new THREE.Mesh(boxGeo, isGenesis ? genesisMat : blockMat);
            mesh.position.set(x, y, z);

            // Add wireframe outline
            const edges = new THREE.LineSegments(edgesGeo, isGenesis ? genesisWireMat : wireMat);
            mesh.add(edges);

            // Add inner pulsing core
            const coreGeo = new THREE.IcosahedronGeometry(isGenesis ? 0.8 : 0.6, 0);
            const coreMat = new THREE.MeshBasicMaterial({
                color: isGenesis ? 0xffffff : 0x22d3ee,
                wireframe: true
            });
            const core = new THREE.Mesh(coreGeo, coreMat);
            mesh.add(core);

            // Metadata text (simulated as floating planes)
            const planeGeo = new THREE.PlaneGeometry(1.5, 0.5);
            const planeMat = new THREE.MeshBasicMaterial({
                color: isGenesis ? 0xffd700 : 0x22d3ee,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.3
            });

            // Random floating data planes above block
            for (let i = 0; i < 3; i++) {
                const p = new THREE.Mesh(planeGeo, planeMat);
                p.position.set(
                    (Math.random() - 0.5) * 2.5,
                    1.5 + Math.random(),
                    (Math.random() - 0.5) * 2.5
                );
                p.rotation.set(Math.random(), Math.random(), Math.random());
                p.scale.setScalar(0.5);
                mesh.add(p);
            }

            scene.add(mesh);
            blocks.push(mesh);
            return mesh;
        };

        // Generate Infinite-like Chain
        // We'll create a curve to place blocks along
        const curvePoints = [];
        for (let i = 0; i < 50; i++) {
            // Spiral helix shape
            const t = i * 0.5;
            curvePoints.push(new THREE.Vector3(
                Math.cos(t) * 10,
                i * -2 + 10, // Going down
                Math.sin(t) * 10
            ));
        }
        const curve = new THREE.CatmullRomCurve3(curvePoints);

        // Place blocks along curve
        const blockCount = 20;
        for (let i = 0; i < blockCount; i++) {
            const t = i / (blockCount - 1);
            const pos = curve.getPoint(t);
            const isGenesis = i === 0;
            const block = createBlock(pos.x, pos.y, pos.z, isGenesis);

            block.lookAt(curve.getPoint(Math.min(t + 0.01, 1))); // Face forward

            // Connect with beam
            if (i > 0) {
                const prevPos = blocks[i - 1].position;
                const geometry = new THREE.BufferGeometry().setFromPoints([prevPos, pos]);
                const material = new THREE.LineBasicMaterial({
                    color: 0x4ade80, // Green data link
                    transparent: true,
                    opacity: 0.3
                });
                const line = new THREE.Line(geometry, material);
                scene.add(line);
                links.push(line);
            }
        }

        // --- DATA PARTICLES ---
        // Floating 0s and 1s simulation (Points)
        const particleCount = 2000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);
        const pSpeed = new Float32Array(particleCount); // custom attribute for speed

        for (let i = 0; i < particleCount; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 60; // Wide spread X
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 60; // Wide spread Y
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 60; // Wide spread Z
            pSpeed[i] = 0.02 + Math.random() * 0.05;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

        const pMat = new THREE.PointsMaterial({
            color: 0x22d3ee,
            size: 0.15,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0x111122, 1);
        scene.add(ambientLight);

        // Moving data light
        const dataLight = new THREE.PointLight(0x00ff00, 2, 20);
        scene.add(dataLight);

        // Genesis light
        const genesisLight = new THREE.PointLight(0xffd700, 2, 30);
        genesisLight.position.copy(blocks[0].position);
        scene.add(genesisLight);

        // --- ANIMATION ---
        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();

            // 1. Move Camera along curve (Flythrough)
            // Loop the flythrough 
            const loopTime = 60; // seconds for full loop
            const t = (time % loopTime) / loopTime;

            // Camera follows curve but with offset
            const camPos = curve.getPointAt(t);
            const lookAtPos = curve.getPointAt(Math.min(t + 0.05, 1)); // Look ahead

            // Smooth dampened movement
            camera.position.x += (camPos.x + 5 - camera.position.x) * 0.02;
            camera.position.y += (camPos.y + 2 - camera.position.y) * 0.02;
            camera.position.z += (camPos.z + 5 - camera.position.z) * 0.02;
            camera.lookAt(lookAtPos);

            // 2. Animate Blocks
            blocks.forEach((block, idx) => {
                block.rotation.x = Math.sin(time + idx) * 0.2;
                block.rotation.y += 0.01;

                // Pulse size
                const scale = 1 + Math.sin(time * 2 + idx) * 0.05;
                block.scale.setScalar(scale);
            });

            // 3. Move Data Particles (Matrix Rain effect vertically)
            const positions = particles.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3 + 1] -= pSpeed[i]; // Fall down
                if (positions[i * 3 + 1] < -30) {
                    positions[i * 3 + 1] = 30; // Reset to top
                }
            }
            particles.geometry.attributes.position.needsUpdate = true;

            // 4. Data Light travels through chain
            const lightT = (time * 0.2) % 1; // Faster than camera
            const lightPos = curve.getPointAt(lightT);
            dataLight.position.copy(lightPos);

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
