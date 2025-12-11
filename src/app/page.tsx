'use client';

import { useEffect, useState } from 'react';
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
import LoadingScreen from "@/components/LoadingScreen";
import StatsGrid from "@/components/StatsGrid";
import { Zap, Shield, TrendingUp, Users, Bot, Eye } from 'lucide-react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
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

  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <LoadingScreen />
      <ParticleCursor />
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />

        {/* Live Price Ticker */}
        <LivePriceTicker />

        {/* Stats Section */}
        <section style={{
          padding: '4rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <StatsGrid stats={[
            { value: 2400000000, label: '24h Trading Volume', prefix: '$', decimals: 0, color: '#a78bfa' },
            { value: 24891, label: 'Active Traders', suffix: '+', decimals: 0, color: '#22d3ee' },
            { value: 156, label: 'Average ROI', suffix: '%', decimals: 0, color: '#4ade80' },
            { value: 99.9, label: 'Uptime', suffix: '%', decimals: 1, color: '#fbbf24' }
          ]} />
        </section>

        {/* 3D Showcase Section */}
        <section style={{
          padding: '6rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          transform: `translateY(${Math.max(0, (scrollY - 300) * -0.08)}px)`,
          opacity: Math.min(1, Math.max(0, (scrollY - 100) / 300))
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #4ade80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              The Satoshi Mystery
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 0.5rem' }}>
              The enigma that started it all
            </p>
            <p style={{ color: '#64748b', fontSize: '0.95rem', fontStyle: 'italic' }}>
              Who is Satoshi Nakamoto? The mystery continues...
            </p>
          </div>

          <SatoshiMysteryShowcase />
        </section>

        {/* Features Section */}
        <section style={{
          padding: '6rem 2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          transform: `translateY(${Math.max(0, (scrollY - 400) * -0.1)}px)`,
          opacity: Math.min(1, Math.max(0, (scrollY - 200) / 300))
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Revolutionary Features
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              Everything you need to dominate the crypto market
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, idx) => (
              <HolographicCard key={idx} intensity={0.8}>
                <div
                  className="feature-card"
                  style={{
                    background: feature.gradient,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${feature.color}33`,
                    borderRadius: '1.5rem',
                    padding: '2rem',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    transform: `translateY(${Math.max(0, (scrollY - 600 - idx * 50) * -0.05)}px)`,
                    opacity: Math.min(1, Math.max(0, (scrollY - 400 - idx * 50) / 200))
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 20px 60px ${feature.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '1rem',
                    background: `${feature.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: feature.color
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '1rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#94a3b8',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    {feature.description}
                  </p>
                </div>
              </HolographicCard>
            ))}
          </div>
        </section>

        {/* Market Table */}
        <section style={{
          transform: `translateY(${Math.max(0, (scrollY - 1000) * -0.05)}px)`,
          opacity: Math.min(1, Math.max(0, (scrollY - 800) / 300))
        }}>
          <MarketTable />
        </section>

        <Footer />
      </div>

      {/* Floating AI Assistant Button */}
      <FloatingAIButton />

      <style jsx global>{`
                .feature-card {
                    position: relative;
                    overflow: hidden;
                }

                .feature-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: left 0.5s;
                }

                .feature-card:hover::before {
                    left: 100%;
                }
            `}</style>
    </main>
  );
}
