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
                        <li><a href="#">Markets</a></li>
                        <li><a href="#">Exchange</a></li>
                        <li><a href="#">Earn</a></li>
                        <li><a href="#">Wallet</a></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">API Documentation</a></li>
                        <li><a href="#">Fees</a></li>
                        <li><a href="#">Security</a></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h3>Socials</h3>
                    <ul>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Discord</a></li>
                        <li><a href="#">CTelegram</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; 2025 Lexchange. All rights reserved.
            </div>
        </footer>
    );
}
