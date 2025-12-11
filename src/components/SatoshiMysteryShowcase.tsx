'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA & CONTENT ---
const STORY_STAGES = {
    BLOCKCHAIN: {
        title: "THE PROTOCOL",
        subtitle: "The immutable chain that started it all.",
        instruction: "CLICK THE GENESIS BLOCK TO DECENTRALIZE"
    },
    UNIVERSE: {
        title: "CAMBRIAN EXPLOSION",
        subtitle: "Thousands of assets born from one idea.",
        instruction: "FIND THE ORIGINAL COIN (BTC)"
    },
    SATOSHI: {
        title: "SATOSHI NAKAMOTO",
        subtitle: "Visionary. Creator. Ghost.",
        instruction: "RETURN TO VOID"
    }
};

export default function SatoshiMysteryShowcase() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [stage, setStage] = useState<'BLOCKCHAIN' | 'UNIVERSE' | 'SATOSHI'>('BLOCKCHAIN');
    const [isHoveringInt, setIsHoveringInt] = useState(false);

    // Refs for animation loop access without re-renders
    const stageRef = useRef('BLOCKCHAIN');
    useEffect(() => { stageRef.current = stage; }, [stage]);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- SCENE SETUP ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.02);
        scene.background = new THREE.Color(0x050505);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 15);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // --- GROUPS ---
        const chainGroup = new THREE.Group();
        const universeGroup = new THREE.Group();
        const satoshiGroup = new THREE.Group();

        scene.add(chainGroup);
        scene.add(universeGroup);
        scene.add(satoshiGroup);

        // --- ASSETS GENERATION ---

        // 1. THE BLOCKCHAIN (Stage 1)
        const boxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const boxMat = new THREE.MeshPhysicalMaterial({
            color: 0x22d3ee,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x0044aa,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.9,
            transmission: 0.5
        });
        const genesisMat = new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 1,
            roughness: 0.1,
            emissive: 0xffaa00,
            emissiveIntensity: 0.4
        });

        // Create 10 blocks linked together
        const blocks: THREE.Mesh[] = [];
        for (let i = -4; i <= 4; i++) {
            const isGenesis = i === 0;
            const mesh = new THREE.Mesh(boxGeo, isGenesis ? genesisMat : boxMat);
            mesh.position.x = i * 2.5;

            // Wireframe
            const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(boxGeo),
                new THREE.LineBasicMaterial({ color: isGenesis ? 0xffffff : 0x00ffff, transparent: true, opacity: 0.3 })
            );
            mesh.add(edges);

            // Connection Line
            if (i > -4) {
                const lineGeo = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(-1.25, 0, 0),
                    new THREE.Vector3(1.25, 0, 0)
                ]);
                const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.2 }));
                line.position.x = -1.25;
                mesh.add(line);
            }

            mesh.userData = { type: 'BLOCK', isGenesis };
            chainGroup.add(mesh);
            blocks.push(mesh);
        }


        // 2. CRYPTO UNIVERSE (Stage 2)
        universeGroup.visible = false; // Interactable only in stage 2
        const coins: THREE.Mesh[] = [];
        const coinGeo = new THREE.SphereGeometry(0.4, 16, 16);

        // Generate random altcoins
        for (let i = 0; i < 150; i++) {
            const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
            const mat = new THREE.MeshStandardMaterial({
                color,
                metalness: 0.6,
                roughness: 0.3,
                emissive: color,
                emissiveIntensity: 0.2
            });
            const mesh = new THREE.Mesh(coinGeo, mat);

            // Random sphere distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 4 + Math.random() * 8; // Radius between 4 and 12

            mesh.position.set(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );

            mesh.userData = {
                type: 'COIN',
                id: i,
                velocity: new THREE.Vector3().randomDirection().multiplyScalar(0.01)
            };
            universeGroup.add(mesh);
            coins.push(mesh);
        }

        // The BITCOIN (Hero Coin)
        const btcGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.2, 32);
        const btcMat = new THREE.MeshStandardMaterial({
            color: 0xff9900,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0xff6600,
            emissiveIntensity: 0.4
        });
        const btcCoin = new THREE.Mesh(btcGeo, btcMat);
        btcCoin.rotation.x = Math.PI / 2;
        btcCoin.userData = { type: 'BTC' };
        // Add "B" symbol (simplified as box for now, or text)
        // Keeping it simple geometry for stability
        universeGroup.add(btcCoin);


        // 3. SATOSHI (Stage 3)
        satoshiGroup.visible = false;
        // Abstract Digital Face particles
        const faceParticlesCount = 3000;
        const faceGeo = new THREE.BufferGeometry();
        const facePos = new Float32Array(faceParticlesCount * 3);

        for (let i = 0; i < faceParticlesCount; i++) {
            // Silhouette logic
            const theta = Math.random() * Math.PI * 2;
            // Create a hood-like shape using math
            const y = (Math.random() - 0.5) * 4;
            const rBase = 1.5;
            const r = rBase + Math.random() * 0.2;

            facePos[i * 3] = r * Math.cos(theta); // x
            facePos[i * 3 + 1] = y; // y
            facePos[i * 3 + 2] = r * Math.sin(theta); // z

            // Cutout for "Face" void
            if (facePos[i * 3 + 2] > 0.5 && Math.abs(facePos[i * 3]) < 1 && Math.abs(y) < 1.5) {
                // Push back to create hollow hood
                facePos[i * 3 + 2] -= 1.5;
            }
        }
        faceGeo.setAttribute('position', new THREE.BufferAttribute(facePos, 3));
        const faceMat = new THREE.PointsMaterial({
            color: 0x00ffff,
            size: 0.03,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        const faceMesh = new THREE.Points(faceGeo, faceMat);
        satoshiGroup.add(faceMesh);


        // --- LIGHTING ---
        const ambLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambLight);

        const mainLight = new THREE.PointLight(0xffffff, 2, 50);
        mainLight.position.set(5, 5, 5);
        scene.add(mainLight);

        const blueLight = new THREE.PointLight(0x00ffff, 2, 30);
        blueLight.position.set(-5, -5, 5);
        scene.add(blueLight);


        // --- LOGIC & ANIMATION ---

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const onClick = () => {
            // Raycast checks
            raycaster.setFromCamera(mouse, camera);
            let intersects;

            if (stageRef.current === 'BLOCKCHAIN') {
                // Check for center block (Genesis)
                intersects = raycaster.intersectObjects(chainGroup.children);
                if (intersects.length > 0) {
                    setStage('UNIVERSE');
                }
            } else if (stageRef.current === 'UNIVERSE') {
                // Check for BTC
                intersects = raycaster.intersectObject(btcCoin);
                if (intersects.length > 0) {
                    setStage('SATOSHI');
                }
            } else if (stageRef.current === 'SATOSHI') {
                setStage('BLOCKCHAIN'); // Reset
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);

        // Animation Loop
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            const currentStage = stageRef.current; // Use Ref for updated value in loop

            // TRANSITIONS & VISIBILITY
            // Simple approach: Toggle visibility and animate properties

            // CAMERA
            // Gentle float
            camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            // STAGE 1: BLOCKCHAIN
            if (currentStage === 'BLOCKCHAIN') {
                chainGroup.visible = true;
                universeGroup.visible = false;
                satoshiGroup.visible = false;

                camera.position.z = THREE.MathUtils.lerp(camera.position.z, 15, 0.05);

                // Rotate chain slightly
                chainGroup.rotation.y = Math.sin(time * 0.2) * 0.2;
                chainGroup.rotation.z = Math.sin(time * 0.1) * 0.1;

                // Pulse Genesis Block
                blocks[4].rotation.x += 0.02; // Center block rotates faster
                blocks[4].rotation.y += 0.02;

                // Raycast Highlight
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(chainGroup.children);
                document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';

            }
            // STAGE 2: UNIVERSE
            else if (currentStage === 'UNIVERSE') {
                chainGroup.visible = false;
                universeGroup.visible = true;
                satoshiGroup.visible = false;

                camera.position.z = THREE.MathUtils.lerp(camera.position.z, 20, 0.05);

                // Orbit Universe
                universeGroup.rotation.y += 0.002;

                // Main BTC Spin
                btcCoin.rotation.z += 0.01;
                btcCoin.rotation.x = Math.PI / 2 + Math.sin(time) * 0.2;

                // Raycast Highlight for BTC
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObject(btcCoin);

                if (intersects.length > 0) {
                    btcCoin.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
                    (btcCoin.material as THREE.MeshStandardMaterial).emissiveIntensity = 1;
                    document.body.style.cursor = 'pointer';
                } else {
                    btcCoin.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                    (btcCoin.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4;
                    document.body.style.cursor = 'default';
                }

                // Float coins
                coins.forEach(c => {
                    c.rotation.x += 0.01;
                    c.position.add(c.userData.velocity);
                    // Boundary check to keep them somewhat contained
                    if (c.position.length() > 15) c.userData.velocity.negate();
                });
            }
            // STAGE 3: SATOSHI
            else if (currentStage === 'SATOSHI') {
                chainGroup.visible = false;
                universeGroup.visible = false;
                satoshiGroup.visible = true;

                camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6, 0.05);

                // Morphing face
                faceMesh.rotation.y = Math.sin(time * 0.5) * 0.2;

                // Glitch effect on particles
                const positions = faceGeo.attributes.position.array as Float32Array;
                for (let i = 0; i < faceParticlesCount; i++) {
                    if (Math.random() > 0.99) {
                        positions[i * 3] += (Math.random() - 0.5) * 0.2;
                    } else {
                        // Return to original? (Simplified: just chaotic vibration here)
                    }
                }
                faceGeo.attributes.position.needsUpdate = true;
                document.body.style.cursor = 'pointer'; // Reset allowed
            }

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
            window.removeEventListener('click', onClick);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    const content = STORY_STAGES[stage];

    return (
        <section id="showcase" style={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'black',
            color: 'white'
        }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute' }} />

            {/* UI LAYER */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                zIndex: 10
            }}>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={stage}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8 }}
                    >
                        <h5 style={{
                            color: '#22d3ee',
                            letterSpacing: '0.2em',
                            marginBottom: '1rem',
                            fontWeight: '600'
                        }}>
                            /// {stage} LAYER ///
                        </h5>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 6vw, 5rem)',
                            fontWeight: '900',
                            lineHeight: 1,
                            marginBottom: '1rem',
                            textShadow: '0 0 30px rgba(255,255,255,0.2)'
                        }}>
                            {content.title}
                        </h1>
                        <p style={{
                            fontSize: '1.2rem',
                            color: '#94a3b8',
                            maxWidth: '600px',
                            margin: '0 auto 2rem'
                        }}>
                            {content.subtitle}
                        </p>

                        <div style={{
                            display: 'inline-block',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '10px 20px',
                            background: 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '30px',
                            fontSize: '0.9rem',
                            color: '#fff',
                            letterSpacing: '0.1em'
                        }}>
                            [ {content.instruction} ]
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Nav Dots */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px'
            }}>
                {Object.keys(STORY_STAGES).map((s) => (
                    <div key={s} style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: stage === s ? '#22d3ee' : '#333',
                        transition: 'background 0.3s'
                    }} />
                ))}
            </div>
        </section>
    );
}
