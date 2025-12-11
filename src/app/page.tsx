'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarketTable from "@/components/MarketTable";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SatoshiMysteryShowcase from "@/components/SatoshiMysteryShowcase";
import FloatingAIButton from "@/components/FloatingAIButton";
import LivePriceTicker from "@/components/LivePriceTicker";
import HolographicCard from "@/components/HolographicCard";
import ParticleCursor from "@/components/ParticleCursor";
import QuickSwapWidget from "@/components/QuickSwapWidget";
import NeuroQuantumWidget from "@/components/NeuroQuantumWidget";
import DysonSwarmWidget from "@/components/DysonSwarmWidget";
import LoadingScreen from "@/components/LoadingScreen";
import StatsGrid from "@/components/StatsGrid";
import { Zap, Shield, TrendingUp, Users, Bot, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

// --- STATIC DATA ---
const FEATURES = [
  {
    icon: <Bot size={32} />,
    title: 'AI Trading Assistant',
    description: 'Chat with AI to get real-time market insights, trade recommendations, and portfolio analysis.',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(139,92,246,0.1))'
  },
  {
    icon: <Zap size={32} />,
    title: 'Auto Trading Bots',
    description: 'Set up automated trading strategies with DCA, Grid Trading, Momentum, and Arbitrage bots.',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.1))'
  },
  {
    icon: <Eye size={32} />,
    title: 'Whale Tracking',
    description: 'Monitor large transactions in real-time and get alerts when whales move the market.',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(6,182,212,0.1))'
  },
  {
    icon: <Users size={32} />,
    title: 'Social Trading',
    description: 'Copy trades from top performers automatically and learn from the best traders.',
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, rgba(244,114,182,0.1), rgba(236,72,153,0.1))'
  },
  {
    icon: <Shield size={32} />,
    title: 'Secure & Fast',
    description: 'Industry-leading security with lightning-fast execution and zero-latency trading.',
    color: '#4ade80',
    gradient: 'linear-gradient(135deg, rgba(74,222,128,0.1), rgba(34,197,94,0.1))'
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Advanced Analytics',
    description: 'Multi-chart analysis, price alerts, and comprehensive market intelligence tools.',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(139,92,246,0.1))'
  }
];

// --- REUSABLE COMPONENTS ---
const Section = ({ children, style = {} }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    style={{
      padding: '4rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      ...style
    }}
  >
    {children}
  </motion.section>
);

const SectionHeader = ({ title, highlight, subtitle, badge, badgeColor }: any) => (
  <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
    {badge && (
      <div style={{
        display: 'inline-block',
        padding: '5px 15px',
        borderRadius: '20px',
        background: `${badgeColor}1a`, // 10% opacity hex
        color: badgeColor,
        fontSize: '0.8rem',
        fontWeight: 'bold',
        border: `1px solid ${badgeColor}4d`, // 30% opacity hex
        marginBottom: '1rem'
      }}>
        {badge}
      </div>
    )}
    <h2 style={{
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '800',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: badgeColor ? `0 0 30px ${badgeColor}33` : 'none'
    }}>
      {title} <span style={{ color: badgeColor || '#a78bfa', WebkitTextFillColor: badgeColor || '#a78bfa' }}>{highlight}</span>
    </h2>
    <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
      {subtitle}
    </p>
  </div>
);


export default function Home() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <LoadingScreen />
      <ParticleCursor />
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <LivePriceTicker />

        <Section>
          <StatsGrid stats={[
            { value: 2400000000, label: '24h Trading Volume', prefix: '$', decimals: 0, color: '#a78bfa' },
            { value: 24891, label: 'Active Traders', suffix: '+', decimals: 0, color: '#22d3ee' },
            { value: 156, label: 'Average ROI', suffix: '%', decimals: 0, color: '#4ade80' },
            { value: 99.9, label: 'Uptime', suffix: '%', decimals: 1, color: '#fbbf24' }
          ]} />
        </Section>

        {/* 2024 FEATURE: QUICK SWAP */}
        <Section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <SectionHeader
            title="Instant"
            highlight="Swap"
            subtitle="Zero fees, infinite liquidity, lightning fast."
          />
          <QuickSwapWidget />
        </Section>

        {/* 2050 FEATURE: NEURO-QUANTUM */}
        <Section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <SectionHeader
            title="Neuro-Quantum"
            highlight="Interface"
            subtitle="Direct Brain-Computer Interface (BCI) allowing thought-speed execution. Zero-latency trading powered by quantum entanglement."
            badge="FEATURE FROM 2050"
            badgeColor="#22d3ee"
          />
          <NeuroQuantumWidget />
        </Section>

        {/* 2100 FEATURE: DYSON SWARM */}
        <Section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <SectionHeader
            title="Kardashev"
            highlight="Energy Exchange"
            subtitle="Deploy Type-II Dyson Swarms to harvest direct stellar plasma. Stake stars to earn Universal Energy Credits (UEC)."
            badge="FEATURE FROM 2100"
            badgeColor="#fbbf24"
          />
          <DysonSwarmWidget />
        </Section>

        {/* SHOWCASE */}
        <Section>
          <SectionHeader
            title="The Satoshi"
            highlight="Mystery"
            subtitle="The enigma that started it all. Who is Satoshi Nakamoto?"
            badgeColor="#a78bfa"
          />
          <SatoshiMysteryShowcase />
        </Section>

        {/* FEATURES GRID */}
        <Section>
          <SectionHeader
            title="Revolutionary"
            highlight="Features"
            subtitle="Everything you need to dominate the crypto market."
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {FEATURES.map((feature, idx) => (
              <HolographicCard key={idx} intensity={0.8}>
                <motion.div
                  className="feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    background: feature.gradient,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${feature.color}33`,
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    height: '100%',
                    cursor: 'pointer'
                  }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '1rem',
                    background: `${feature.color}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem', color: feature.color
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '1rem' }}>
                    {feature.description}
                  </p>
                </motion.div>
              </HolographicCard>
            ))}
          </div>
        </Section>

        <Section>
          <MarketTable />
        </Section>

        <Footer />
      </div>

      <FloatingAIButton />

      <style jsx global>{`
                .feature-card { position: relative; overflow: hidden; }
                .feature-card::before {
                    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: left 0.5s;
                }
                .feature-card:hover::before { left: 100%; }
            `}</style>
    </main>
  );
}
