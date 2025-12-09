
'use client';

import AppShell from '@/components/AppShell';
import { Plus } from 'lucide-react';

export default function MultichartsPage() {
    return (
        <AppShell>
            <div style={{ padding: '1rem', height: 'calc(100vh - 2rem)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Multicharts</h1>
                    <button style={{ background: '#333', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.4rem', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Plus size={16} /> Add Chart
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem', flex: 1 }}>
                    <EmptyChartSlot />
                    <EmptyChartSlot />
                    <EmptyChartSlot />
                    <EmptyChartSlot />
                </div>
            </div>
        </AppShell>
    );
}

function EmptyChartSlot() {
    return (
        <div style={{
            background: '#131722',
            borderRadius: '0.5rem',
            border: '1px dashed rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333',
            flexDirection: 'column',
            gap: '0.5rem'
        }}>
            <Plus size={32} />
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Select Pair</span>
        </div>
    );
}
