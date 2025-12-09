
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToGainers() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/?category=gecko_desc'); // Using trending/best suitable proxy
    }, [router]);

    return <div style={{ background: '#111', height: '100vh', padding: '2rem', color: 'white' }}>Loading Gainers...</div>;
}
