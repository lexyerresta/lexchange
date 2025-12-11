'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

export default function SatoshiMysteryShowcase() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [hoveredBlock, setHoveredBlock] = useState<any>(null);

    const currentHoverIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        let animationFrameId: number;

        // --- SETUP ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.02);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // --- INTERACTIVITY STATE ---
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let isBoosting = false;
        let speed = 5;
        let cameraShake = 0;

        // --- OBJECTS ---

        // 1. NEON BLOCKS (Interactive)
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        // InstancedMesh not used for simplicity of individual interaction/anim logic here, 
        // using Group of Mesh for max visual fidelity per block
        const blocks: THREE.Mesh[] = [];
        const blockGroup = new THREE.Group();
        scene.add(blockGroup);

        const material = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            emissive: 0x00ffff,
            emissiveIntensity: 0.5,
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.9,
        });

        // Create initial field of blocks
        for (let i = 0; i < 60; i++) {
            const mesh = new THREE.Mesh(geometry, material.clone());

            // Random placement in a tunnel shape
            const angle = Math.random() * Math.PI * 2;
            const radius = 5 + Math.random() * 8;

            mesh.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                (Math.random() - 0.5) * 100 - 50 // Spread depth
            );

            mesh.rotation.set(Math.random(), Math.random(), Math.random());

            // Custom data for gameplay/interaction
            mesh.userData = {
                id: `BLK-${Math.floor(Math.random() * 999999)}`,
                txCount: Math.floor(Math.random() * 5000),
                rotationSpeed: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                ),
                originalScale: 1
            };

            // Add wireframe cage
            const edgeGeo = new THREE.EdgesGeometry(geometry);
            const edgeMat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 });
            const edges = new THREE.LineSegments(edgeGeo, edgeMat);
            mesh.add(edges);

            blockGroup.add(mesh);
            blocks.push(mesh);
        }

        // 2. STARGATE TUNNEL (Particles)
        const starGeo = new THREE.BufferGeometry();
        const starCount = 3000;
        const starPos = new Float32Array(starCount * 3);
        const starSpeed = new Float32Array(starCount);

        for (let i = 0; i < starCount; i++) {
            const r = 2 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            starPos[i * 3] = r * Math.cos(theta);
            starPos[i * 3 + 1] = r * Math.sin(theta);
            starPos[i * 3 + 2] = (Math.random() - 0.5) * 200;
            starSpeed[i] = 0.5 + Math.random();
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const starMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true,
            opacity: 0.8
        });
        const starTunnel = new THREE.Points(starGeo, starMat);
        scene.add(starTunnel);


        // --- LIGHTING ---
        const pointLight = new THREE.PointLight(0x00ffff, 2, 50);
        pointLight.position.set(0, 0, 10);
        scene.add(pointLight);
        scene.add(new THREE.AmbientLight(0x404040));


        // --- EVENTS ---
        const onMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const onMouseDown = () => {
            isBoosting = true;
            cameraShake = 0.2;
        };

        const onMouseUp = () => {
            isBoosting = false;
            cameraShake = 0;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);


        // --- ANIMATION ---
        const clock = new THREE.Clock();

        const animate = () => {
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            // 1. Movement & Speed
            const targetSpeed = isBoosting ? 40 : 8;
            speed += (targetSpeed - speed) * 0.1;

            // 2. Camera Input (Fly Controls)
            // Camera tilts towards mouse
            camera.rotation.x += (-mouse.y * 0.5 - camera.rotation.x) * 0.1;
            camera.rotation.y += (-mouse.x * 0.5 - camera.rotation.y) * 0.1;

            // Add Shake
            if (cameraShake > 0) {
                camera.position.x += (Math.random() - 0.5) * cameraShake;
                camera.position.y += (Math.random() - 0.5) * cameraShake;
            } else {
                camera.position.x += (0 - camera.position.x) * 0.1;
                camera.position.y += (0 - camera.position.y) * 0.1;
            }

            // 3. Move Blocks (Infinite Tunnel)
            blocks.forEach(mesh => {
                // Move towards camera
                mesh.position.z += speed * delta * 5;

                // Rotations
                mesh.rotation.x += mesh.userData.rotationSpeed.x;
                mesh.rotation.y += mesh.userData.rotationSpeed.y;

                // Reset Check
                if (mesh.position.z > 20) {
                    mesh.position.z = -100; // Send back to far distance
                    // Randomize position again for variety
                    const angle = Math.random() * Math.PI * 2;
                    const r = 5 + Math.random() * 10;
                    mesh.position.x = Math.cos(angle) * r;
                    mesh.position.y = Math.sin(angle) * r;
                }
            });

            // 4. Move Stars (Warp Effect)
            const positions = starTunnel.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < starCount; i++) {
                positions[i * 3 + 2] += speed * delta * 15 * starSpeed[i];
                if (positions[i * 3 + 2] > 20) {
                    positions[i * 3 + 2] = -150;
                }
            }
            starTunnel.geometry.attributes.position.needsUpdate = true;

            // Color Shift on Boost
            if (isBoosting) {
                starMat.color.lerp(new THREE.Color(0xff00ff), 0.1);
            } else {
                starMat.color.lerp(new THREE.Color(0xffffff), 0.1);
            }


            // 5. INTERACTION (Raycasting)
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(blocks, false); // Disable recursive to avoid hitting edges

            // Reset previous hover visual
            blocks.forEach(b => {
                const mat = b.material as THREE.MeshPhysicalMaterial;
                if (mat && mat.emissive && mat.emissive.getHex() !== 0x00ffff) {
                    mat.emissive.lerp(new THREE.Color(0x00ffff), 0.1);
                    b.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                }
            });

            if (intersects.length > 0) {
                const target = intersects[0].object as THREE.Mesh;
                const mat = target.material as THREE.MeshPhysicalMaterial;

                // Guard against non-emissive materials (wireframes, etc)
                if (mat && mat.emissive) {
                    // Highlight Effect
                    mat.emissive.setHex(0xff00ff); // Purple highlight
                    target.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.2);

                    // Rotation spin
                    target.rotation.x += 0.2;
                    target.rotation.y += 0.2;

                    // Update State ONLY if ID changed
                    const newId = target.userData.id;
                    if (currentHoverIdRef.current !== newId) {
                        currentHoverIdRef.current = newId;
                        setHoveredBlock({
                            id: newId,
                            txs: target.userData.txCount,
                        });
                        document.body.style.cursor = 'pointer';
                    }
                }
            } else {
                if (currentHoverIdRef.current !== null) {
                    currentHoverIdRef.current = null;
                    setHoveredBlock(null);
                    document.body.style.cursor = 'default';
                }
            }

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate(); // Start the animation loop

        // Cleanup
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId); // Cancel the animation frame
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('resize', handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            document.body.style.cursor = 'default';
        };
    }, []);

    return (
        <section id="showcase" style={{
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'black',
            cursor: 'crosshair'
        }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute' }} />

            {/* Block Data Tooltip (Floating UI) */}
            <AnimatePresence>
                {hoveredBlock && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                            position: 'fixed',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)', // Center primarily, but specific adjustments below
                            pointerEvents: 'none',
                            zIndex: 100,
                            background: 'rgba(0, 0, 0, 0.8)',
                            border: '1px solid #00ffff',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
                            fontFamily: 'monospace'
                        }}
                    >
                        <h4 style={{ color: '#fff', margin: 0, fontSize: '0.9rem' }}>BLOCK: {hoveredBlock.id}</h4>
                        <div style={{ width: '100%', height: '1px', background: '#00ffff', margin: '5px 0' }} />
                        <p style={{ color: '#00ffff', margin: 0, fontSize: '0.8rem' }}>TXs: {hoveredBlock.txs}</p>
                        <p style={{ color: '#ff00ff', margin: 0, fontSize: '0.8rem' }}>STATUS: MINED</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint UI */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                width: '100%',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                pointerEvents: 'none'
            }}>
                [HOVER BLOCKS TO SCAN] • [HOLD CLICK TO WARP SPEED]
            </div>

            {/* Overlay Title */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                pointerEvents: 'none',
                mixBlendMode: 'difference'
            }}>
                <h2 style={{
                    fontSize: '4rem',
                    fontWeight: '900',
                    color: 'white',
                    letterSpacing: '10px',
                    margin: 0,
                    textShadow: '0 0 10px white'
                }}>CYBER<span style={{ color: '#00ffff' }}>CHAIN</span></h2>
            </div>
        </section>
    );
}
