'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeJSShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Create multiple crypto coins
        const coins: THREE.Group[] = [];
        const coinData = [
            { color: 0xf7931a, emissive: 0xf7931a, position: [0, 0, 0], scale: 1.5 }, // BTC (center, larger)
            { color: 0x627eea, emissive: 0x627eea, position: [-4, 2, -2], scale: 1 }, // ETH
            { color: 0x00d4aa, emissive: 0x00d4aa, position: [4, -2, -2], scale: 1 }, // USDT
            { color: 0x14f195, emissive: 0x14f195, position: [-3, -3, -3], scale: 0.8 }, // SOL
            { color: 0xf3ba2f, emissive: 0xf3ba2f, position: [3, 3, -3], scale: 0.8 }  // BNB
        ];

        coinData.forEach((data, index) => {
            const coinGroup = new THREE.Group();

            // Coin body
            const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 64);
            const coinMaterial = new THREE.MeshStandardMaterial({
                color: data.color,
                metalness: 0.9,
                roughness: 0.1,
                emissive: data.emissive,
                emissiveIntensity: 0.3
            });
            const coin = new THREE.Mesh(coinGeometry, coinMaterial);
            coin.rotation.x = Math.PI / 2;
            coinGroup.add(coin);

            // Coin edge (rim)
            const edgeGeometry = new THREE.TorusGeometry(1, 0.12, 16, 64);
            const edgeMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 1,
                roughness: 0,
                emissive: 0xffffff,
                emissiveIntensity: 0.5
            });
            const edge = new THREE.Mesh(edgeGeometry, edgeMaterial);
            edge.position.z = 0.1;
            coinGroup.add(edge);

            // Logo ring
            const logoGeometry = new THREE.TorusGeometry(0.6, 0.08, 16, 64);
            const logoMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 1,
                roughness: 0.1,
                emissive: 0xffffff,
                emissiveIntensity: 0.4
            });
            const logo = new THREE.Mesh(logoGeometry, logoMaterial);
            logo.position.z = 0.15;
            coinGroup.add(logo);

            coinGroup.position.set(data.position[0], data.position[1], data.position[2]);
            coinGroup.scale.setScalar(data.scale);
            scene.add(coinGroup);
            coins.push(coinGroup);
        });

        // Enhanced particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i++) {
            posArray[i * 3] = (Math.random() - 0.5) * 30;
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 30;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 30;

            // Random colors
            const colors = [
                [0.65, 0.55, 0.98], // Purple
                [0.29, 0.87, 0.50], // Green
                [0.13, 0.83, 0.93], // Cyan
                [0.97, 0.73, 0.10]  // Gold
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            colorArray[i * 3] = color[0];
            colorArray[i * 3 + 1] = color[1];
            colorArray[i * 3 + 2] = color[2];
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Enhanced lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        // Multiple colored lights
        const lights = [
            { color: 0xa78bfa, position: [8, 8, 8], intensity: 3 },
            { color: 0x4ade80, position: [-8, -8, 8], intensity: 3 },
            { color: 0x22d3ee, position: [0, 8, -8], intensity: 3 },
            { color: 0xf7931a, position: [8, -8, -8], intensity: 2 },
            { color: 0xfbbf24, position: [-8, 8, -8], intensity: 2 }
        ];

        const pointLights: THREE.PointLight[] = [];
        lights.forEach(light => {
            const pointLight = new THREE.PointLight(light.color, light.intensity, 100);
            pointLight.position.set(light.position[0], light.position[1], light.position[2]);
            scene.add(pointLight);
            pointLights.push(pointLight);
        });

        camera.position.z = 12;
        camera.position.y = 2;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.01;

            // Smooth camera follow
            targetX += (mouseX * 2 - targetX) * 0.05;
            targetY += (mouseY * 2 - targetY) * 0.05;
            camera.position.x = targetX;
            camera.position.y = 2 + targetY;
            camera.lookAt(0, 0, 0);

            // Animate coins
            coins.forEach((coin, index) => {
                // Rotation
                coin.rotation.y += 0.01 + index * 0.002;
                coin.rotation.z = Math.sin(time + index) * 0.1;

                // Floating
                const floatSpeed = 0.5 + index * 0.1;
                const floatAmount = 0.3 + index * 0.1;
                coin.position.y += Math.sin(time * floatSpeed + index) * 0.01;

                // Orbit for non-center coins
                if (index > 0) {
                    const orbitSpeed = 0.2 + index * 0.05;
                    const orbitRadius = 4 + index * 0.5;
                    const angle = time * orbitSpeed + index * Math.PI / 2;
                    coin.position.x = Math.cos(angle) * orbitRadius;
                    coin.position.z = Math.sin(angle) * orbitRadius - 2;
                }
            });

            // Rotate particles
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0003;

            // Animate lights
            pointLights.forEach((light, index) => {
                const angle = time * (0.3 + index * 0.1) + index * Math.PI / 2;
                const radius = 8 + Math.sin(time + index) * 2;
                light.position.x = Math.cos(angle) * radius;
                light.position.z = Math.sin(angle) * radius;
                light.position.y = Math.sin(time * 0.5 + index) * 5;

                // Pulse intensity
                light.intensity = 2 + Math.sin(time * 2 + index) * 1;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '700px',
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(10,10,20,0.8), rgba(20,20,40,0.8))',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}
        />
    );
}
