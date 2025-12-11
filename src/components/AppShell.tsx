'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, isLoading } = useAuth();
    const pathname = usePathname();

    // Prevent hydration mismatch by waiting for auth check
    if (isLoading) {
        return <div style={{ minHeight: '100vh', background: '#0B0B15' }} />;
    }

    // Check if we are on the landing page (home)
    const isLandingPage = pathname === '/';

    // LOGIC: Sidebar only appears if User is Logged In
    // Landing page (even if logged in) can optionally hide sidebar for immersion, 
    // but user requested "setelah login baru lah fitur... jadi ada side bar".
    // Let's make it: Guest = No Sidebar. User = Sidebar available (except maybe pure landing view).

    // For now: Strict Guest Mode = No Sidebar
    if (!user) {
        return (
            <div style={{ minHeight: '100vh', background: '#0B0B15', position: 'relative' }}>
                <main style={{ width: '100%', position: 'relative', zIndex: 1 }}>
                    {children}
                </main>
            </div>
        );
    }

    // USER MODE: Show Sidebar & Interaction
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0B15', position: 'relative' }}>
            <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Floating Toggle Button - Only for logged in users */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    style={{
                        position: 'fixed',
                        top: '1.2rem',
                        left: '1.5rem',
                        zIndex: 40, // Below Navbar (50) but above content
                        background: 'rgba(11, 11, 21, 0.6)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(167, 139, 250, 0.2)',
                        borderRadius: '0.75rem',
                        padding: '0.6rem',
                        color: '#a78bfa',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(167, 139, 250, 0.15)';
                        e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(11, 11, 21, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <Menu size={22} strokeWidth={1.5} />
                </button>
            )}

            <main style={{
                flex: 1,
                width: '100%',
                position: 'relative',
                zIndex: 1
            }}>
                {children}
            </main>
        </div>
    );
}
