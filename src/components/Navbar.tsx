'use client';

import Link from 'next/link';
import { Menu, X, Wallet, User, LogOut, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        router.push('/');
    };

    // Track scroll direction for auto-hide
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when scrolling up or at top
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
                setShowNavbar(true);
            } else {
                // Hide navbar when scrolling down
                setShowNavbar(false);
            }

            setLastScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: showNavbar ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                background: isScrolled ? 'rgba(10, 10, 20, 0.7)' : 'rgba(10, 10, 20, 0.3)',
                backdropFilter: 'blur(20px)',
                borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'all 0.3s ease',
                boxShadow: isScrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none'
            }}
        >
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>L</span>
                    <span className={styles.logoText}>Lexchange</span>
                </Link>

                {/* Desktop Menu - Conditional based on Auth */}
                {!user ? (
                    // GUEST NAVBAR: Clean & Minimal
                    <div className={styles.desktopMenu}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                        <Link href="#features" className={styles.navLink}>Features</Link>
                        <Link href="#showcase" className={styles.navLink}>Showcase</Link>
                    </div>
                ) : (
                    // USER NAVBAR: Navigation moved to Sidebar, keep Navbar clean or show status
                    <div className={styles.desktopMenu} style={{ opacity: 0.7 }}>
                        <span className={styles.navLink} style={{ cursor: 'default', color: '#a78bfa' }}>
                            ● System Online
                        </span>
                    </div>
                )}

                {/* Auth Buttons */}
                <div className={styles.authButtons}>
                    {user ? (
                        <div style={{ position: 'relative' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className={styles.userButton}
                            >
                                <div className={styles.userAvatar}>
                                    {user.username ? user.username[0].toUpperCase() : 'U'}
                                </div>
                                <span className={styles.userName}>{user.username}</span>
                            </motion.button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className={styles.dropdownMenu}
                                    >
                                        <div className={styles.dropdownHeader}>
                                            <div className={styles.dropdownName}>{user.username}</div>
                                            <div className={styles.dropdownEmail}>Member</div>
                                        </div>
                                        <div className={styles.dropdownDivider} />
                                        <Link href="/profile" className={styles.dropdownItem}>
                                            Profile Settings
                                        </Link>
                                        <button onClick={handleLogout} className={styles.dropdownItem} style={{ color: '#ef4444' }}>
                                            Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className={styles.guestButtons}>
                            <Link href="/login">
                                <button className={styles.loginBtn}>
                                    Log In
                                </button>
                            </Link>
                            <Link href="/login?mode=register">
                                <button className={styles.signupBtn}>
                                    <Wallet size={18} />
                                    Get Started
                                </button>
                            </Link>
                        </div>
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
                            {!user ? (
                                <>
                                    <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</Link>
                                    <Link href="#features" className={styles.navLink} onClick={() => setIsOpen(false)}>Features</Link>
                                    <div className={styles.menuDivider} />
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <button className={styles.loginBtn} style={{ textAlign: 'left', width: '100%' }}>Log In</button>
                                    </Link>
                                    <Link href="/login?mode=register" onClick={() => setIsOpen(false)}>
                                        <button className={styles.signupBtn} style={{ justifyContent: 'center', width: '100%' }}>
                                            Get Started
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div style={{ padding: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                                        Logged in as {user.username}
                                    </div>
                                    <Link href="/portfolio" className={styles.navLink} onClick={() => setIsOpen(false)}>Portfolio</Link>
                                    <Link href="/markets" className={styles.navLink} onClick={() => setIsOpen(false)}>Markets</Link>
                                    <Link href="/ai-trader" className={styles.navLink} onClick={() => setIsOpen(false)}>AI Trader</Link>
                                    <div className={styles.menuDivider} />
                                    <button className={styles.loginBtn} onClick={handleLogout} style={{ textAlign: 'left', color: '#f87171' }}>
                                        <LogOut size={16} /> Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
