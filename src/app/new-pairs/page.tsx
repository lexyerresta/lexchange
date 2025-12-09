
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectToMarket() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/?category=id_desc');
    }, [router]);

    return <div style={{ background: '#111', height: '100vh', padding: '2rem', color: 'white' }}>Loading New Pairs...</div>;
}
