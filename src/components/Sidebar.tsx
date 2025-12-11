'use client';

import Link from 'next/link';
import { Home, TrendingUp, Zap, Star, BarChart2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
    return (
        <>
            {/* Backdrop Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={toggle}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 9998
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Floating Sidebar Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: -320 }}
                        animate={{ x: 0 }}
                        exit={{ x: -320 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: '300px',
                            background: 'linear-gradient(135deg, rgba(15, 15, 30, 0.95), rgba(30, 27, 75, 0.95))',
                            backdropFilter: 'blur(20px)',
                            borderRight: '1px solid rgba(167, 139, 250, 0.2)',
                            boxShadow: '4px 0 40px rgba(167, 139, 250, 0.3)',
                            zIndex: 9999,
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.5rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: 'white',
                                    boxShadow: '0 4px 12px rgba(167, 139, 250, 0.4)'
                                }}>
                                    L
                                </div>
                                <span style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    Lexchange
                                </span>
                            </div>
                            <button
                                onClick={toggle}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    color: '#a78bfa',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(167, 139, 250, 0.2)';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div style={{ padding: '1rem' }}>
                            <NavSection title="Market">
                                <NavItem href="/" icon={<Home size={18} />} label="Overview" onClick={toggle} />
                                <NavItem href="/watchlist" icon={<Star size={18} />} label="Watchlist" onClick={toggle} />
                                <NavItem href="/multicharts" icon={<BarChart2 size={18} />} label="Multicharts" onClick={toggle} />
                            </NavSection>

                            <NavSection title="Discover">
                                <NavItem href="/new-pairs" icon={<Zap size={18} />} label="New Pairs" highlight onClick={toggle} />
                                <NavItem href="/gainers-losers" icon={<TrendingUp size={18} />} label="Gainers & Losers" onClick={toggle} />
                            </NavSection>

                            <NavSection title="Profile">
                                <NavItem href="/portfolio" icon={<span>💼</span>} label="Portfolio" onClick={toggle} />
                                <NavItem href="/transactions" icon={<span>📜</span>} label="Transactions" onClick={toggle} />
                            </NavSection>

                            <NavSection title="Advanced">
                                <NavItem href="/ai-trader" icon={<span>🤖</span>} label="AI Trader Chat" highlight onClick={toggle} />
                                <NavItem href="/trading-bots" icon={<span>⚙️</span>} label="Trading Bots" highlight onClick={toggle} />
                                <NavItem href="/ai-insights" icon={<span>🧠</span>} label="AI Insights" highlight onClick={toggle} />
                                <NavItem href="/social-trading" icon={<span>👥</span>} label="Social Trading" highlight onClick={toggle} />
                                <NavItem href="/market-intel" icon={<span>👁️</span>} label="Market Intel" highlight onClick={toggle} />
                                <NavItem href="/price-alerts" icon={<span>🔔</span>} label="Price Alerts" highlight onClick={toggle} />
                            </NavSection>
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '1rem',
                            marginTop: 'auto',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            background: 'rgba(0, 0, 0, 0.2)'
                        }}>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#94a3b8',
                                textAlign: 'center'
                            }}>
                                Built with Antigravity AI 🤖
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem',
                paddingLeft: '0.75rem'
            }}>
                {title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {children}
            </div>
        </div>
    );
}

function NavItem({
    icon,
    label,
    href,
    highlight = false,
    onClick
}: {
    icon: React.ReactNode;
    label: string;
    href: string;
    highlight?: boolean;
    onClick?: () => void;
}) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }} onClick={onClick}>
            <motion.div
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    color: highlight ? '#a78bfa' : '#cbd5e1',
                    background: highlight ? 'rgba(167, 139, 250, 0.1)' : 'transparent',
                    border: highlight ? '1px solid rgba(167, 139, 250, 0.2)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.background = highlight
                        ? 'rgba(167, 139, 250, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)';
                    target.style.borderColor = 'rgba(167, 139, 250, 0.3)';
                }}
                onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.background = highlight
                        ? 'rgba(167, 139, 250, 0.1)'
                        : 'transparent';
                    target.style.borderColor = highlight
                        ? 'rgba(167, 139, 250, 0.2)'
                        : 'transparent';
                }}
            >
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem'
                }}>
                    {icon}
                </span>
                <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    flex: 1
                }}>
                    {label}
                </span>
                {highlight && (
                    <span style={{
                        fontSize: '0.65rem',
                        background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                        color: 'white',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '0.3rem',
                        fontWeight: '600'
                    }}>
                        NEW
                    </span>
                )}
            </motion.div>
        </Link>
    );
}
