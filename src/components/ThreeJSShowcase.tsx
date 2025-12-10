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

        // Create crypto coin (Bitcoin)
        const coinGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 64);
        const coinMaterial = new THREE.MeshStandardMaterial({
            color: 0xf7931a,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0xf7931a,
            emissiveIntensity: 0.2
        });
        const coin = new THREE.Mesh(coinGeometry, coinMaterial);
        coin.rotation.x = Math.PI / 2;
        scene.add(coin);

        // Add Bitcoin logo (simplified)
        const logoGeometry = new THREE.TorusGeometry(1.2, 0.15, 16, 100);
        const logoMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0.1,
            emissive: 0xffffff,
            emissiveIntensity: 0.3
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.position.z = 0.2;
        coin.add(logo);

        // Add particles around coin
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xa78bfa,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xa78bfa, 2, 100);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x4ade80, 2, 100);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0x22d3ee, 2, 100);
        pointLight3.position.set(0, 5, -5);
        scene.add(pointLight3);

        camera.position.z = 8;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;

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

            // Rotate coin
            coin.rotation.y += 0.01;
            coin.rotation.z = Math.sin(time) * 0.1;

            // Floating animation
            coin.position.y = Math.sin(time * 0.5) * 0.5;

            // Mouse parallax
            coin.rotation.x = mouseY * 0.3;
            coin.rotation.y += mouseX * 0.01;

            // Rotate particles
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;

            // Animate lights
            pointLight1.position.x = Math.sin(time) * 5;
            pointLight1.position.y = Math.cos(time) * 5;

            pointLight2.position.x = Math.cos(time * 0.7) * 5;
            pointLight2.position.z = Math.sin(time * 0.7) * 5;

            pointLight3.position.y = Math.sin(time * 0.5) * 5;
            pointLight3.position.z = Math.cos(time * 0.5) * 5;

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
                height: '600px',
                position: 'relative',
                borderRadius: '1rem',
                overflow: 'hidden'
            }}
        />
    );
}
