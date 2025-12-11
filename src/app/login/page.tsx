
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Wallet, ArrowRight, Mail, User } from 'lucide-react';
import Link from 'next/link';
import CyberGridBackground from '@/components/CyberGridBackground';
import GlitchText from '@/components/GlitchText';

export default function LoginPage() {
    const { user, login, register, isLoading } = useAuth();
    const router = useRouter();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleLogin = async () => {
        await login();
        router.push('/');
    };

    const handleRegister = async () => {
        if (!username.trim()) {
            alert('Please enter a username');
            return;
        }
        await register(username);
        router.push('/');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at top left, #2e1065, #000000)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            padding: '2rem',
            position: 'relative'
        }}>
            <CyberGridBackground />

            <div className="glass-card" style={{
                padding: '3rem',
                maxWidth: '480px',
                width: '100%',
                textAlign: 'center',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(20, 20, 30, 0.6)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                zIndex: 1
            }}>
                <GlitchText
                    text="LEXCHANGE"
                    style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        marginBottom: '0.5rem'
                    }}
                />
                <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                    The Next Gen Crypto Interface
                </p>

                {/* Toggle between Login and Register */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem', borderRadius: '0.8rem' }}>
                    <button
                        onClick={() => setIsRegisterMode(false)}
                        style={{
                            flex: 1,
                            background: !isRegisterMode ? '#a78bfa' : 'transparent',
                            color: 'white',
                            border: 'none',
                            padding: '0.6rem',
                            borderRadius: '0.6rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                        }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsRegisterMode(true)}
                        style={{
                            flex: 1,
                            background: isRegisterMode ? '#a78bfa' : 'transparent',
                            color: 'white',
                            border: 'none',
                            padding: '0.6rem',
                            borderRadius: '0.6rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                        }}
                    >
                        Register
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {isRegisterMode && (
                        <div style={{ textAlign: 'left' }}>
                            <label style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                                <User size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white',
                                    padding: '0.8rem',
                                    borderRadius: '0.6rem',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    )}

                    <button
                        onClick={isRegisterMode ? handleRegister : handleLogin}
                        disabled={isLoading}
                        style={{
                            background: '#a78bfa',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '0.8rem',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: isLoading ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.8rem',
                            transition: 'all 0.2s',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? 'Processing...' : (
                            <>
                                <Wallet size={20} />
                                {isRegisterMode ? 'Create Account' : 'Connect Wallet'}
                            </>
                        )}
                    </button>

                    <button
                        disabled
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: '#64748b',
                            padding: '1rem',
                            borderRadius: '0.8rem',
                            fontSize: '1rem',
                            fontWeight: '500',
                            border: '1px solid rgba(255,255,255,0.1)',
                            cursor: 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Mail size={18} />
                        Sign in with Email (Coming Soon)
                    </button>
                </div>

                <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
                    By connecting, you agree to our <Link href="https://github.com/lexyerresta/lexchange#readme" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa' }}>Terms of Service</Link>
                </div>
            </div>

            <Link href="/" style={{ marginTop: '2rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                Continue as Guest <ArrowRight size={16} />
            </Link>
        </div>
    );
}
