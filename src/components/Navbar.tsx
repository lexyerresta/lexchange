'use client';

import Link from 'next/link';
import { Menu, X, Wallet, User, LogOut, TrendingUp, Star, BarChart2, Zap, Home, Bot, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

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
                    ? 'rgba(8, 8, 16, 0.95)'
                    : 'linear-gradient(180deg, rgba(8, 8, 16, 0.9) 0%, rgba(8, 8, 16, 0) 100%)',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(167, 139, 250, 0.15)' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 1.5rem',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem'
            }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem',
                            fontWeight: '800',
                            color: 'white',
                            boxShadow: '0 4px 20px rgba(167, 139, 250, 0.4)'
                        }}
                    >
                        L
                    </motion.div>
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #fff, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Lexchange
                    </span>
                </Link>

                {/* Center Navigation - DEXScreener Style */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    flex: 1,
                    justifyContent: 'center'
                }} className={styles.desktopMenu}>
                    {user ? (
                        // LOGGED IN: Show full navigation
                        navItems.map((item) => (
                            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        padding: '0.5rem 0.85rem',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        fontWeight: '500',
                                        color: isActive(item.href)
                                            ? '#fff'
                                            : item.highlight
                                                ? '#a78bfa'
                                                : '#94a3b8',
                                        background: isActive(item.href)
                                            ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(99, 102, 241, 0.2))'
                                            : 'transparent',
                                        border: isActive(item.href)
                                            ? '1px solid rgba(167, 139, 250, 0.4)'
                                            : '1px solid transparent',
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer',
                                        position: 'relative'
                                    }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                    {item.highlight && !isActive(item.href) && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '-4px',
                                            right: '-4px',
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
                        // GUEST: Simple navigation
                        <>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ color: '#fff' }}
                                    style={{ color: '#94a3b8', padding: '0.5rem 1rem', fontSize: '0.9rem', fontWeight: '500' }}
                                >
                                    Home
                                </motion.span>
                            </Link>
                            <Link href="#features" style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ color: '#fff' }}
                                    style={{ color: '#94a3b8', padding: '0.5rem 1rem', fontSize: '0.9rem', fontWeight: '500' }}
                                >
                                    Features
                                </motion.span>
                            </Link>
                            <Link href="#showcase" style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ color: '#fff' }}
                                    style={{ color: '#94a3b8', padding: '0.5rem 1rem', fontSize: '0.9rem', fontWeight: '500' }}
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
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '10px',
                                    padding: '0.5rem',
                                    color: '#94a3b8',
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
                                    top: '4px',
                                    right: '4px',
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#ef4444'
                                }} />
                            </motion.button>

                            {/* User Menu */}
                            <div style={{ position: 'relative' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(99, 102, 241, 0.1))',
                                        border: '1px solid rgba(167, 139, 250, 0.3)',
                                        borderRadius: '12px',
                                        padding: '0.4rem 0.75rem 0.4rem 0.5rem',
                                        cursor: 'pointer',
                                        color: '#fff'
                                    }}
                                >
                                    <div style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        fontWeight: '700'
                                    }}>
                                        {user.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>
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
                                                top: 'calc(100% + 8px)',
                                                right: 0,
                                                width: '220px',
                                                background: 'rgba(15, 15, 30, 0.98)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(167, 139, 250, 0.2)',
                                                borderRadius: '12px',
                                                padding: '0.5rem',
                                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
                                            }}
                                        >
                                            <div style={{
                                                padding: '0.75rem',
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>
                                                    {user.username}
                                                </div>
                                                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                                                    Balance: ${user.balance?.toLocaleString()}
                                                </div>
                                            </div>
                                            <Link href="/portfolio" style={{ textDecoration: 'none' }} onClick={() => setShowUserMenu(false)}>
                                                <motion.div
                                                    whileHover={{ x: 4, background: 'rgba(167, 139, 250, 0.1)' }}
                                                    style={{
                                                        padding: '0.6rem 0.75rem',
                                                        borderRadius: '8px',
                                                        color: '#e2e8f0',
                                                        fontSize: '0.85rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <User size={16} /> Profile
                                                </motion.div>
                                            </Link>
                                            <Link href="/transactions" style={{ textDecoration: 'none' }} onClick={() => setShowUserMenu(false)}>
                                                <motion.div
                                                    whileHover={{ x: 4, background: 'rgba(167, 139, 250, 0.1)' }}
                                                    style={{
                                                        padding: '0.6rem 0.75rem',
                                                        borderRadius: '8px',
                                                        color: '#e2e8f0',
                                                        fontSize: '0.85rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    📜 Transactions
                                                </motion.div>
                                            </Link>
                                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />
                                            <motion.div
                                                whileHover={{ x: 4, background: 'rgba(239, 68, 68, 0.1)' }}
                                                onClick={handleLogout}
                                                style={{
                                                    padding: '0.6rem 0.75rem',
                                                    borderRadius: '8px',
                                                    color: '#f87171',
                                                    fontSize: '0.85rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <LogOut size={16} /> Sign Out
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className={styles.guestButtons}>
                            <Link href="/login" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '10px',
                                        padding: '0.5rem 1rem',
                                        color: '#fff',
                                        fontSize: '0.85rem',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Log In
                                </motion.button>
                            </Link>
                            <Link href="/login?mode=register" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(167, 139, 250, 0.4)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '0.5rem 1rem',
                                        color: '#fff',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        boxShadow: '0 4px 20px rgba(167, 139, 250, 0.3)'
                                    }}
                                >
                                    <Wallet size={16} />
                                    Get Started
                                </motion.button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            display: 'none',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            padding: '0.5rem',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                        className={styles.mobileToggle}
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
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
                            background: 'rgba(8, 8, 16, 0.98)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {user ? (
                                <>
                                    {navItems.map((item) => (
                                        <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: '0.75rem',
                                                borderRadius: '10px',
                                                color: isActive(item.href) ? '#fff' : '#94a3b8',
                                                background: isActive(item.href) ? 'rgba(167, 139, 250, 0.2)' : 'transparent'
                                            }}>
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </div>
                                        </Link>
                                    ))}
                                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem',
                                            borderRadius: '10px',
                                            color: '#f87171',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <LogOut size={18} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                        <div style={{ padding: '0.75rem', color: '#e2e8f0' }}>Home</div>
                                    </Link>
                                    <Link href="#features" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                        <div style={{ padding: '0.75rem', color: '#e2e8f0' }}>Features</div>
                                    </Link>
                                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />
                                    <Link href="/login" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                        <button style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '10px',
                                            background: 'transparent',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            marginBottom: '0.5rem'
                                        }}>
                                            Log In
                                        </button>
                                    </Link>
                                    <Link href="/login?mode=register" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                                        <button style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '10px',
                                            background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                                            border: 'none',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontWeight: '600'
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
