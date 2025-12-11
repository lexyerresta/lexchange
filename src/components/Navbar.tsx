'use client';

import Link from 'next/link';
import { Menu, X, Wallet, User, LogOut, TrendingUp, Star, BarChart2, Zap, Home, Bot, Bell, Shield, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        router.push('/');
    };

    // Navigation items for logged-in users (DEXScreener style)
    const navItems = [
        { href: '/', label: 'Home', icon: <Home size={16} /> },
        { href: '/watchlist', label: 'Watchlist', icon: <Star size={16} /> },
        { href: '/new-pairs', label: 'New Pairs', icon: <Zap size={16} />, highlight: true },
        { href: '/gainers-losers', label: 'Gainers', icon: <TrendingUp size={16} /> },
        { href: '/multicharts', label: 'Charts', icon: <BarChart2 size={16} /> },
        { href: '/ai-trader', label: 'AI Bot', icon: <Bot size={16} />, highlight: true },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                background: isScrolled
                    ? 'rgba(5, 5, 10, 0.95)'
                    : 'linear-gradient(180deg, rgba(5, 5, 10, 0.95) 0%, rgba(5, 5, 10, 0) 100%)',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(167, 139, 250, 0.2)' : 'none',
                transition: 'all 0.3s ease',
                boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none'
            }}
        >
            <div style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '0 1.5rem',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem'
            }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, type: 'spring' }}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                            fontWeight: '800',
                            color: 'white',
                            boxShadow: '0 0 20px rgba(167, 139, 250, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        L
                    </motion.div>
                    <span style={{
                        fontSize: '1.4rem',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #22d3ee 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 30px rgba(167, 139, 250, 0.3)',
                        display: 'none', // Hide on small screens if needed, usually show
                        '@media (min-width: 768px)': { display: 'block' }
                    } as any}>
                        Lexchange
                    </span>
                </Link>

                {/* Center Navigation - DEXScreener Style */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    flex: 1,
                    justifyContent: 'center',
                    overflowX: 'auto',
                    scrollbarWidth: 'none'
                }}>
                    {user ? (
                        // LOGGED IN: Show full navigation with glow effects
                        navItems.map((item) => (
                            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(167, 139, 250, 0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.6rem 1rem',
                                        borderRadius: '10px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        color: isActive(item.href)
                                            ? '#fff'
                                            : item.highlight
                                                ? '#e0e7ff'
                                                : '#94a3b8',
                                        background: isActive(item.href)
                                            ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.4), rgba(99, 102, 241, 0.3))'
                                            : item.highlight
                                                ? 'rgba(167, 139, 250, 0.1)'
                                                : 'transparent',
                                        border: isActive(item.href)
                                            ? '1px solid rgba(167, 139, 250, 0.5)'
                                            : item.highlight
                                                ? '1px solid rgba(167, 139, 250, 0.2)'
                                                : '1px solid transparent',
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        whiteSpace: 'nowrap',
                                        boxShadow: isActive(item.href) ? '0 0 15px rgba(167, 139, 250, 0.3)' : 'none'
                                    }}
                                >
                                    <span style={{ color: isActive(item.href) ? '#fff' : item.highlight ? '#a78bfa' : '#64748b' }}>
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                    {item.highlight && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '4px',
                                            right: '4px',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: '#22d3ee',
                                            boxShadow: '0 0 8px #22d3ee'
                                        }} />
                                    )}
                                </motion.div>
                            </Link>
                        ))
                    ) : (
                        // GUEST: Simple navigation with hover glow
                        <>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
                                    style={{ color: '#cbd5e1', padding: '0.5rem 1rem', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }}
                                >
                                    Home
                                </motion.span>
                            </Link>
                            <Link href="#features" style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
                                    style={{ color: '#cbd5e1', padding: '0.5rem 1rem', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }}
                                >
                                    Features
                                </motion.span>
                            </Link>
                            <Link href="#showcase" style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
                                    style={{ color: '#cbd5e1', padding: '0.5rem 1rem', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }}
                                >
                                    Showcase
                                </motion.span>
                            </Link>
                        </>
                    )}
                </div>

                {/* Right Section: Auth */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {user ? (
                        <>
                            {/* Notification Bell */}
                            <motion.button
                                whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.1)' }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    padding: '0.6rem',
                                    color: '#e2e8f0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}
                            >
                                <Bell size={18} />
                                <span style={{
                                    position: 'absolute',
                                    top: '6px',
                                    right: '6px',
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#ef4444',
                                    boxShadow: '0 0 8px #ef4444'
                                }} />
                            </motion.button>

                            {/* User Menu */}
                            <div style={{ position: 'relative' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(99, 102, 241, 0.1))',
                                        border: '1px solid rgba(167, 139, 250, 0.3)',
                                        borderRadius: '14px',
                                        padding: '0.4rem 0.8rem 0.4rem 0.5rem',
                                        cursor: 'pointer',
                                        color: '#fff',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        boxShadow: '0 2px 10px rgba(99, 102, 241, 0.3)'
                                    }}>
                                        {user.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {user.username}
                                    </span>
                                </motion.button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            style={{
                                                position: 'absolute',
                                                top: 'calc(100% + 12px)',
                                                right: 0,
                                                width: '240px',
                                                background: 'rgba(10, 10, 20, 0.95)',
                                                backdropFilter: 'blur(30px)',
                                                border: '1px solid rgba(167, 139, 250, 0.2)',
                                                borderRadius: '16px',
                                                padding: '0.75rem',
                                                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
                                            }}
                                        >
                                            <div style={{
                                                padding: '0.75rem',
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <div style={{ color: '#fff', fontWeight: '700', fontSize: '1rem', marginBottom: '0.2rem' }}>
                                                    {user.username}
                                                </div>
                                                <div style={{ color: '#22d3ee', fontSize: '0.8rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <Shield size={12} />
                                                    Verified Trader
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                <Link href="/portfolio" style={{ textDecoration: 'none' }} onClick={() => setShowUserMenu(false)}>
                                                    <motion.div
                                                        whileHover={{ x: 4, background: 'rgba(167, 139, 250, 0.15)', color: '#fff' }}
                                                        style={{
                                                            padding: '0.75rem',
                                                            borderRadius: '10px',
                                                            color: '#cbd5e1',
                                                            fontSize: '0.9rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.75rem',
                                                            cursor: 'pointer',
                                                            fontWeight: '500',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        <User size={18} /> Profile & Settings
                                                    </motion.div>
                                                </Link>
                                                <Link href="/transactions" style={{ textDecoration: 'none' }} onClick={() => setShowUserMenu(false)}>
                                                    <motion.div
                                                        whileHover={{ x: 4, background: 'rgba(167, 139, 250, 0.15)', color: '#fff' }}
                                                        style={{
                                                            padding: '0.75rem',
                                                            borderRadius: '10px',
                                                            color: '#cbd5e1',
                                                            fontSize: '0.9rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.75rem',
                                                            cursor: 'pointer',
                                                            fontWeight: '500',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        <Wallet size={18} /> Wallet & Txns
                                                    </motion.div>
                                                </Link>
                                            </div>

                                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.75rem 0' }} />

                                            <motion.div
                                                whileHover={{ x: 4, background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5' }}
                                                onClick={handleLogout}
                                                style={{
                                                    padding: '0.75rem',
                                                    borderRadius: '10px',
                                                    color: '#f87171',
                                                    fontSize: '0.9rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <LogOut size={18} /> Sign Out
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className={styles.guestButtons}>
                            <Link href="/login" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '12px',
                                        padding: '0.6rem 1.2rem',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Log In
                                </motion.button>
                            </Link>
                            <Link href="/login?mode=register" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 0 30px rgba(167, 139, 250, 0.5)',
                                        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '0.6rem 1.2rem',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: '0 4px 20px rgba(167, 139, 250, 0.3)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Zap size={16} fill="white" />
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            display: 'none',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            padding: '0.6rem',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                        className={styles.mobileToggle}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: 'rgba(5, 5, 10, 0.98)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {user ? (
                                <>
                                    {navItems.map((item) => (
                                        <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem',
                                                borderRadius: '14px',
                                                color: isActive(item.href) ? '#fff' : '#94a3b8',
                                                background: isActive(item.href)
                                                    ? 'linear-gradient(90deg, rgba(167, 139, 250, 0.2), transparent)'
                                                    : 'rgba(255,255,255,0.03)',
                                                border: isActive(item.href) ? '1px solid rgba(167, 139, 250, 0.2)' : '1px solid transparent'
                                            }}>
                                                {item.icon}
                                                <span style={{ fontWeight: '600' }}>{item.label}</span>
                                            </div>
                                        </Link>
                                    ))}
                                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            padding: '1rem',
                                            borderRadius: '14px',
                                            color: '#f87171',
                                            background: 'rgba(239, 68, 68, 0.05)',
                                            border: '1px solid rgba(239, 68, 68, 0.1)',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <LogOut size={20} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                        <div style={{ padding: '1rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Home</div>
                                    </Link>
                                    <Link href="#features" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                        <div style={{ padding: '1rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Features</div>
                                    </Link>
                                    <div style={{ height: '20px' }}></div>
                                    <Link href="/login" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                        <button style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '14px',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            marginBottom: '1rem',
                                            fontWeight: '600'
                                        }}>
                                            Log In
                                        </button>
                                    </Link>
                                    <Link href="/login?mode=register" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                        <button style={{
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '14px',
                                            background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                                            border: 'none',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontWeight: '700',
                                            boxShadow: '0 10px 30px rgba(167, 139, 250, 0.3)'
                                        }}>
                                            Get Started
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
