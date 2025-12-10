'use client';

import AppShell from '@/components/AppShell';
import AITraderChat from '@/components/AITraderChat';

export default function AITraderPage() {
    return (
        <AppShell>
            <div style={{ height: 'calc(100vh - 4rem)', padding: '1.5rem' }}>
                <AITraderChat />
            </div>
        </AppShell>
    );
}
