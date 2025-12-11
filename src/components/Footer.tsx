import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.col}>
                    <h3>Lexchange</h3>
                    <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                        Lexy, E nya exchange. <br />
                        The most trusted crypto exchange platform.
                    </p>
                </div>
                <div className={styles.col}>
                    <h3>Platform</h3>
                    <ul>
                        <li><a href="/">Markets</a></li>
                        <li><a href="/portfolio">Portfolio</a></li>
                        <li><a href="/ai-trader">AI Trader</a></li>
                        <li><a href="/trading-bots">Trading Bots</a></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h3>Support</h3>
                    <ul>
                        <li><a href="https://github.com/lexyerresta/lexchange" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="https://github.com/lexyerresta/lexchange#readme" target="_blank" rel="noopener noreferrer">Documentation</a></li>
                        <li><a href="/login">Get Started</a></li>
                        <li><a href="https://github.com/lexyerresta/lexchange/issues" target="_blank" rel="noopener noreferrer">Report Issue</a></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h3>Socials</h3>
                    <ul>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a></li>
                        <li><a href="https://telegram.org" target="_blank" rel="noopener noreferrer">Telegram</a></li>
                        <li><a href="https://github.com/lexyerresta" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; 2025 Lexchange. All rights reserved.
            </div>
        </footer>
    );
}
