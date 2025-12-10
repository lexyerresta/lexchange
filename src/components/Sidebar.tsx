
import Link from 'next/link';
import { Home, TrendingUp, Zap, Star, Search, Menu, X, BarChart2 } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
    return (
        <>
            <div
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>L</div>
                    <span className={styles.logoText}>Lexchange</span>
                    <button className={styles.closeBtn} onClick={toggle}>
                        <X size={20} />
                    </button>
                </div>


                <div className={styles.nav}>
                    <div className={styles.sectionTitle}>Market</div>
                    <NavItem href="/" icon={<Home size={18} />} label="Overview" />
                    <NavItem href="/watchlist" icon={<Star size={18} />} label="Watchlist" />
                    <NavItem href="/multicharts" icon={<BarChart2 size={18} />} label="Multicharts" />

                    <div className={styles.sectionTitle}>Discover</div>
                    <NavItem href="/new-pairs" icon={<Zap size={18} />} label="New Pairs" highlight />
                    <NavItem href="/gainers-losers" icon={<TrendingUp size={18} />} label="Gainers & Losers" />

                    <div className={styles.sectionTitle}>Profile</div>
                    <NavItem href="/portfolio" icon={<span className={styles.chainIcon}>💼</span>} label="Portfolio" />
                    <NavItem href="/transactions" icon={<span className={styles.chainIcon}>📜</span>} label="Transactions" />

                    <div className={styles.sectionTitle}>Advanced</div>
                    <NavItem href="/ai-trader" icon={<span className={styles.chainIcon}>🤖</span>} label="AI Trader Chat" highlight />
                    <NavItem href="/trading-bots" icon={<span className={styles.chainIcon}>⚙️</span>} label="Trading Bots" highlight />
                    <NavItem href="/ai-insights" icon={<span className={styles.chainIcon}>🧠</span>} label="AI Insights" highlight />
                    <NavItem href="/social-trading" icon={<span className={styles.chainIcon}>👥</span>} label="Social Trading" highlight />
                    <NavItem href="/market-intel" icon={<span className={styles.chainIcon}>👁️</span>} label="Market Intel" highlight />
                    <NavItem href="/price-alerts" icon={<span className={styles.chainIcon}>🔔</span>} label="Price Alerts" highlight />
                </div>
            </div>
            {/* Overlay for mobile */}
            {isOpen && <div className={styles.overlay} onClick={toggle} />}
        </>
    );
}

function NavItem({ icon, label, href, active = false, highlight = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean, highlight?: boolean }) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <div className={`${styles.navItem} ${active ? styles.active : ''} ${highlight ? styles.highlight : ''}`}>
                <span className={styles.navIcon}>{icon}</span>
                <span className={styles.navLabel}>{label}</span>
            </div>
        </Link>
    );
}
