'use client';
import { useAuth } from '@/context/AuthContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { isLoading } = useAuth();

    // Prevent hydration mismatch by waiting for auth check
    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0B0B15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Minimal loading indicator */}
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }} />
            </div>
        );
    }

    // Clean layout - no sidebar, navigation is in Navbar
    return (
        <div style={{ minHeight: '100vh', background: '#0B0B15', position: 'relative' }}>
            <main style={{ width: '100%', position: 'relative', zIndex: 1 }}>
                {children}
            </main>
        </div>
    );
}
