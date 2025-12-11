'use client';

import AppShell from '@/components/AppShell';
import AITraderChat from '@/components/AITraderChat';
import CyberGridBackground from '@/components/CyberGridBackground';

export default function AITraderPage() {
    return (
        <AppShell>
            <CyberGridBackground />
            <div style={{ height: 'calc(100vh - 4rem)', padding: '1.5rem', position: 'relative', zIndex: 1 }}>
                <AITraderChat />
            </div>
        </AppShell>
    );
}
