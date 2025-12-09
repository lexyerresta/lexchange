'use client';

import AppShell from '@/components/AppShell';
import AIAssistant from '@/components/AIAssistant';

export default function AIInsightsPage() {
    return (
        <AppShell>
            <div style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                        AI Trading Insights
                    </h1>
                    <p style={{ color: '#94a3b8' }}>
                        Get personalized recommendations powered by advanced AI algorithms
                    </p>
                </div>

                <AIAssistant />
            </div>
        </AppShell>
    );
}
