'use client';

import Link from 'next/link';
import { Menu, X, Wallet, User, LogOut, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        router.push('/');
    };

    return (
        <nav className={`${styles.navbar} glass`}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>L</span>
                    <span className={styles.logoText}>Lexchange</span>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link href="/" className={styles.navLink}>Markets</Link>
                    <Link href="/portfolio" className={styles.navLink}>Portfolio</Link>
                    <Link href="/watchlist" className={styles.navLink}>Watchlist</Link>
                    <Link href="/multicharts" className={styles.navLink}>Charts</Link>
                </div>

                {/* Auth Buttons */}
                <div className={styles.authButtons}>
                    {user ? (
                        <div style={{ position: 'relative' }}>
                            <button
                                className={styles.userBtn}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <User size={18} />
                                <span>{user.username}</span>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: '#4ade80',
                                    background: 'rgba(74, 222, 128, 0.1)',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '0.3rem',
                                    marginLeft: '0.5rem'
                                }}>
                                    ${user.balance.toFixed(2)}
                                </div>
                            </button>

                            {showUserMenu && (
                                <div className={styles.userMenu}>
                                    <Link href="/portfolio" onClick={() => setShowUserMenu(false)}>
                                        <div className={styles.menuItem}>
                                            <TrendingUp size={16} /> Portfolio
                                        </div>
                                    </Link>
                                    <Link href="/watchlist" onClick={() => setShowUserMenu(false)}>
                                        <div className={styles.menuItem}>
                                            <Wallet size={16} /> Watchlist
                                        </div>
                                    </Link>
                                    <div className={styles.menuDivider} />
                                    <div className={styles.menuItem} onClick={handleLogout} style={{ color: '#f87171', cursor: 'pointer' }}>
                                        <LogOut size={16} /> Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className={styles.loginBtn}>
                                    Log In
                                </button>
                            </Link>
                            <Link href="/login">
                                <button className={styles.signupBtn}>
                                    <Wallet size={18} />
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`${styles.mobileMenu} glass`}
                    >
                        <div className={styles.mobileMenuInner}>
                            <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>Markets</Link>
                            <Link href="/portfolio" className={styles.navLink} onClick={() => setIsOpen(false)}>Portfolio</Link>
                            <Link href="/watchlist" className={styles.navLink} onClick={() => setIsOpen(false)}>Watchlist</Link>
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0' }}></div>
                            {user ? (
                                <>
                                    <div style={{ padding: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                                        {user.username} • ${user.balance.toFixed(2)}
                                    </div>
                                    <button className={styles.loginBtn} onClick={handleLogout} style={{ textAlign: 'left', color: '#f87171' }}>
                                        <LogOut size={16} /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <button className={styles.loginBtn} style={{ textAlign: 'left', width: '100%' }}>Log In</button>
                                    </Link>
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <button className={styles.signupBtn} style={{ justifyContent: 'center', width: '100%' }}>
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
