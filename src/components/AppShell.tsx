'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    // Only show sidebar for logged-in users
    if (!user) {
        return (
            <div style={{ minHeight: '100vh', background: '#111', position: 'relative' }}>
                <main style={{ width: '100%', position: 'relative' }}>
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#111', position: 'relative' }}>
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Floating Toggle Button */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    style={{
                        position: 'fixed',
                        top: '1rem',
                        left: '1rem',
                        zIndex: 999,
                        background: 'rgba(167,139,250,0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(167,139,250,0.3)',
                        borderRadius: '0.75rem',
                        padding: '0.75rem',
                        color: '#a78bfa',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(167,139,250,0.3)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(167,139,250,0.2)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <Menu size={20} />
                </button>
            )}

            <main style={{
                flex: 1,
                marginLeft: sidebarOpen ? '240px' : '0',
                transition: 'margin 0.3s ease',
                width: '100%',
                position: 'relative'
            }}>
                {children}
            </main>
        </div>
    );
}
