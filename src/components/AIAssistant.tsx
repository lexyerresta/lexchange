'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Brain, TrendingUp, TrendingDown, AlertCircle, Sparkles, Target, Shield, Zap } from 'lucide-react';

interface Insight {
    type: 'opportunity' | 'warning' | 'tip' | 'achievement';
    title: string;
    description: string;
    action?: string;
    icon: any;
    color: string;
}

export default function AIAssistant() {
    const { user } = useAuth();
    const [insights, setInsights] = useState<Insight[]>([]);
    const [portfolioScore, setPortfolioScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(true);

    useEffect(() => {
        if (!user) return;

        // Simulate AI analysis
        setTimeout(() => {
            const generatedInsights = generateInsights(user);
            setInsights(generatedInsights);
            setPortfolioScore(calculatePortfolioScore(user));
            setIsAnalyzing(false);
        }, 2000);
    }, [user]);

    const generateInsights = (user: any): Insight[] => {
        const insights: Insight[] = [];

        // Portfolio Diversification Analysis
        const totalValue = user.balance + user.assets.reduce((sum: number, a: any) => sum + a.value, 0);
        const btcAsset = user.assets.find((a: any) => a.symbol === 'BTC');
        const ethAsset = user.assets.find((a: any) => a.symbol === 'ETH');

        if (btcAsset && (btcAsset.value / totalValue) > 0.5) {
            insights.push({
                type: 'warning',
                title: 'High BTC Concentration',
                description: `${((btcAsset.value / totalValue) * 100).toFixed(1)}% of your portfolio is in Bitcoin. Consider diversifying to reduce risk.`,
                action: 'Diversify Portfolio',
                icon: AlertCircle,
                color: '#fbbf24'
            });
        }

        // Cash Balance Analysis
        if (user.balance > totalValue * 0.5) {
            insights.push({
                type: 'opportunity',
                title: 'High Cash Reserve',
                description: `You have ${((user.balance / totalValue) * 100).toFixed(1)}% in cash. Consider deploying capital during market dips.`,
                action: 'View Opportunities',
                icon: TrendingUp,
                color: '#4ade80'
            });
        }

        // Trading Activity
        if (user.transactions && user.transactions.length > 5) {
            const recentTrades = user.transactions.slice(0, 5);
            const profitableTrades = recentTrades.filter((t: any) => t.status === 'completed').length;
            const successRate = (profitableTrades / recentTrades.length) * 100;

            insights.push({
                type: 'achievement',
                title: `${successRate.toFixed(0)}% Success Rate`,
                description: `You've completed ${profitableTrades} successful trades out of ${recentTrades.length} recent transactions.`,
                icon: Target,
                color: '#a78bfa'
            });
        }

        // Smart Suggestions
        if (!ethAsset && btcAsset) {
            insights.push({
                type: 'tip',
                title: 'ETH Opportunity',
                description: 'Ethereum often moves inversely to Bitcoin. Adding ETH could balance your portfolio.',
                action: 'Trade ETH',
                icon: Sparkles,
                color: '#22d3ee'
            });
        }

        // Risk Assessment
        const riskLevel = calculateRiskLevel(user);
        if (riskLevel === 'high') {
            insights.push({
                type: 'warning',
                title: 'High Risk Portfolio',
                description: 'Your portfolio has high volatility exposure. Consider adding stablecoins for stability.',
                action: 'Add USDT',
                icon: Shield,
                color: '#f87171'
            });
        }

        // Gas Optimization
        if (user.transactions && user.transactions.length > 10) {
            insights.push({
                type: 'tip',
                title: 'Gas Optimization',
                description: 'Batch your trades during low network activity (2-6 AM UTC) to save up to 40% on gas fees.',
                icon: Zap,
                color: '#fbbf24'
            });
        }

        return insights;
    };

    const calculatePortfolioScore = (user: any): number => {
        let score = 50; // Base score

        // Diversification bonus
        const assetCount = user.assets.length;
        score += Math.min(assetCount * 5, 20);

        // Balance management
        const totalValue = user.balance + user.assets.reduce((sum: number, a: any) => sum + a.value, 0);
        const cashRatio = user.balance / totalValue;
        if (cashRatio > 0.1 && cashRatio < 0.3) score += 10;

        // Trading activity
        if (user.transactions && user.transactions.length > 0) {
            score += Math.min(user.transactions.length * 2, 20);
        }

        return Math.min(score, 100);
    };

    const calculateRiskLevel = (user: any): 'low' | 'medium' | 'high' => {
        const totalValue = user.balance + user.assets.reduce((sum: number, a: any) => sum + a.value, 0);
        const volatileAssets = user.assets.filter((a: any) =>
            ['BTC', 'ETH', 'SOL', 'DOGE'].includes(a.symbol)
        );
        const volatileRatio = volatileAssets.reduce((sum: number, a: any) => sum + a.value, 0) / totalValue;

        if (volatileRatio > 0.7) return 'high';
        if (volatileRatio > 0.4) return 'medium';
        return 'low';
    };

    if (!user) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                <Brain size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>Please login to access AI insights</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '1.5rem', color: 'white' }}>
            {/* Portfolio Score */}
            <div className="glass-card" style={{
                padding: '2rem',
                borderRadius: '1.5rem',
                marginBottom: '1.5rem',
                background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(74,222,128,0.1))',
                border: '1px solid rgba(167,139,250,0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #a78bfa, #4ade80)',
                        padding: '1rem',
                        borderRadius: '1rem',
                        display: 'flex'
                    }}>
                        <Brain size={32} color="white" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                            AI Portfolio Analysis
                        </h2>
                        <p style={{ color: '#94a3b8' }}>Powered by advanced algorithms</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: '800', color: '#4ade80' }}>
                            {isAnalyzing ? '...' : portfolioScore}
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Portfolio Health Score</div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            height: '12px',
                            borderRadius: '1rem',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                background: 'linear-gradient(90deg, #a78bfa, #4ade80)',
                                height: '100%',
                                width: `${portfolioScore}%`,
                                transition: 'width 1s ease-out'
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                            <span>Poor</span>
                            <span>Good</span>
                            <span>Excellent</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Insights */}
            <div style={{ display: 'grid', gap: '1rem' }}>
                {isAnalyzing ? (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <div className="animate-pulse" style={{ display: 'inline-block' }}>
                            <Brain size={48} color="#a78bfa" />
                        </div>
                        <p style={{ marginTop: '1rem', color: '#94a3b8' }}>Analyzing your portfolio...</p>
                    </div>
                ) : insights.length === 0 ? (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                        <Sparkles size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                        <p>No insights available yet. Start trading to get personalized recommendations!</p>
                    </div>
                ) : (
                    insights.map((insight, idx) => (
                        <div
                            key={idx}
                            className="glass-card"
                            style={{
                                padding: '1.5rem',
                                borderRadius: '1rem',
                                border: `1px solid ${insight.color}33`,
                                background: `${insight.color}11`
                            }}
                        >
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{
                                    background: `${insight.color}22`,
                                    padding: '0.75rem',
                                    borderRadius: '0.75rem',
                                    height: 'fit-content',
                                    display: 'flex'
                                }}>
                                    <insight.icon size={24} color={insight.color} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        {insight.title}
                                    </h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                        {insight.description}
                                    </p>
                                    {insight.action && (
                                        <button style={{
                                            marginTop: '1rem',
                                            padding: '0.5rem 1rem',
                                            background: insight.color,
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}>
                                            {insight.action}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
