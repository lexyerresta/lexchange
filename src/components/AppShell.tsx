
'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#111' }}>
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
            <main style={{
                flex: 1,
                marginLeft: sidebarOpen ? '240px' : '0',
                transition: 'margin 0.3s',
                width: '100%',
                position: 'relative'
            }}>
                {children}
            </main>
        </div>
    );
}
