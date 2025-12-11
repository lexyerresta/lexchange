'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Bot, Send, Sparkles, TrendingUp, AlertCircle, Lightbulb, Zap, MessageSquare } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    suggestions?: string[];
    action?: {
        type: 'trade' | 'alert' | 'analyze';
        data: any;
    };
}

const AI_RESPONSES = {
    greeting: [
        "Hello! I'm your AI trading assistant. I can help you analyze markets, execute trades, and provide insights. What would you like to do?",
        "Hi there! Ready to make some smart trades? Ask me anything about crypto markets or your portfolio!"
    ],
    portfolio: [
        "Based on your portfolio analysis:\n\n• Your BTC position is strong with +15.2% unrealized gains\n• Consider taking some profits on ETH (currently +12.4%)\n• Your portfolio is 68% in volatile assets - might want to add some USDT for stability\n\nWould you like me to suggest a rebalancing strategy?",
        "Your portfolio health score is 78/100. Here's what I see:\n\n✅ Good diversification across 3 major assets\n⚠️ High exposure to market volatility\n💡 Suggestion: Set stop-loss at -5% for risk management"
    ],
    trade: [
        "I've analyzed the BTC market:\n\n📊 Technical Analysis:\n• RSI: 62 (Neutral)\n• MACD: Bullish crossover\n• Support: $96,500\n• Resistance: $102,000\n\n💡 My recommendation: Wait for a dip to $97,000 before buying. Would you like me to set a price alert?",
        "ETH is showing strong momentum:\n\n• 24h volume up 45%\n• Whale accumulation detected\n• Breaking resistance at $3,800\n\nRisk Level: Medium\nEntry: $3,750-$3,800\nTarget: $4,200\nStop Loss: $3,600\n\nShall I execute this trade for you?"
    ],
    market: [
        "🔥 Market Update:\n\n• BTC dominance: 52.3% (+1.2%)\n• Fear & Greed Index: 68 (Greed)\n• Total market cap: $2.8T\n\nTop movers (24h):\n1. SOL +12.4%\n2. AVAX +8.9%\n3. MATIC +7.2%\n\nAltcoin season probability: 72%",
        "Market sentiment is BULLISH:\n\n• 78% of top traders are long\n• Funding rates positive across exchanges\n• Bitcoin ETF inflows: $450M this week\n\n⚠️ Watch out for:\n• Potential resistance at $100K BTC\n• Fed meeting next week"
    ]
};

export default function AITraderChat() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: AI_RESPONSES.greeting[0],
            timestamp: Date.now(),
            suggestions: ['Analyze my portfolio', 'What should I buy?', 'Market sentiment', 'Set price alert']
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateAIResponse = (userMessage: string): Message => {
        const lowerMsg = userMessage.toLowerCase();

        let content = '';
        let suggestions: string[] = [];
        let action: Message['action'] = undefined;

        if (lowerMsg.includes('portfolio') || lowerMsg.includes('my assets')) {
            content = AI_RESPONSES.portfolio[Math.floor(Math.random() * AI_RESPONSES.portfolio.length)];
            suggestions = ['Rebalance portfolio', 'Show risk analysis', 'Set stop-loss'];
        } else if (lowerMsg.includes('buy') || lowerMsg.includes('trade') || lowerMsg.includes('btc') || lowerMsg.includes('eth')) {
            content = AI_RESPONSES.trade[Math.floor(Math.random() * AI_RESPONSES.trade.length)];
            suggestions = ['Execute trade', 'Set price alert', 'Show more analysis'];
            action = {
                type: 'trade',
                data: { token: 'BTC', action: 'buy', amount: 0.01 }
            };
        } else if (lowerMsg.includes('market') || lowerMsg.includes('sentiment')) {
            content = AI_RESPONSES.market[Math.floor(Math.random() * AI_RESPONSES.market.length)];
            suggestions = ['Top gainers', 'Whale activity', 'Set alerts'];
        } else if (lowerMsg.includes('alert') || lowerMsg.includes('notify')) {
            content = "I can set up price alerts for you!\n\n📱 Available notification channels:\n• In-app notifications\n• Telegram\n• Discord\n\nWhich token would you like to monitor?";
            suggestions = ['BTC alert', 'ETH alert', 'SOL alert'];
            action = {
                type: 'alert',
                data: { token: 'BTC', price: 100000 }
            };
        } else if (lowerMsg.includes('help') || lowerMsg.includes('what can you do')) {
            content = "I can help you with:\n\n🤖 Trading:\n• Market analysis\n• Trade execution\n• Risk management\n\n📊 Portfolio:\n• Performance tracking\n• Rebalancing suggestions\n• Profit/loss analysis\n\n🔔 Alerts:\n• Price notifications\n• Whale movements\n• Market sentiment changes\n\n💡 Insights:\n• AI-powered recommendations\n• Technical analysis\n• News & trends\n\nJust ask me anything!";
            suggestions = ['Analyze market', 'Check portfolio', 'Recent whale activity'];
        } else {
            content = "I understand you're asking about crypto trading. Let me help you with that!\n\nCould you be more specific? For example:\n• 'Analyze BTC'\n• 'Should I buy ETH?'\n• 'Show my portfolio'\n• 'What's the market sentiment?'";
            suggestions = ['Analyze BTC', 'Portfolio analysis', 'Market update'];
        }

        return {
            id: Date.now().toString(),
            role: 'assistant',
            content,
            timestamp: Date.now(),
            suggestions,
            action
        };
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        try {
            // Call real AI API
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: currentInput,
                    context: {
                        user: user ? {
                            username: user.username,
                            balance: user.balance,
                            assets: user.assets,
                            transactions: user.transactions?.slice(0, 5) // Last 5 transactions
                        } : null
                    }
                })
            });

            if (!response.ok) {
                throw new Error('AI API request failed');
            }

            const data = await response.json();

            const aiResponse: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: data.response,
                timestamp: Date.now(),
                suggestions: data.suggestions || []
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('AI Chat Error:', error);
            showToast('Failed to get AI response. Please try again.', 'error');

            // Fallback to mock response if API fails
            const aiResponse = generateAIResponse(currentInput);
            setMessages(prev => [...prev, aiResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSuggestion = (suggestion: string) => {
        setInput(suggestion);
        setTimeout(() => handleSend(), 100);
    };

    const handleAction = (action: any) => {
        if (action.type === 'trade') {
            showToast(`Trade action: Buy ${action.data.amount} ${action.data.token}`, 'info');
        } else if (action.type === 'alert') {
            showToast(`Alert set for ${action.data.token} at $${action.data.price}`, 'success');
        }
    };

    if (!user) {
        return (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                <Bot size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>Please login to chat with AI Trader</p>
            </div>
        );
    }

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(20,20,30,0.6)',
            borderRadius: '1rem',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                background: 'linear-gradient(135deg, rgba(167,139,250,0.1), rgba(74,222,128,0.1))'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #a78bfa, #4ade80)',
                        padding: '0.75rem',
                        borderRadius: '1rem',
                        display: 'flex'
                    }}>
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white', marginBottom: '0.25rem' }}>
                            AI Trading Assistant
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#4ade80',
                                animation: 'pulse 2s infinite'
                            }} />
                            <span style={{ fontSize: '0.85rem', color: '#4ade80' }}>Online & Ready</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        display: 'flex',
                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                        <div style={{
                            maxWidth: '80%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <div style={{
                                background: msg.role === 'user'
                                    ? 'linear-gradient(135deg, #a78bfa, #8b5cf6)'
                                    : 'rgba(255,255,255,0.05)',
                                padding: '1rem 1.25rem',
                                borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                                color: 'white',
                                whiteSpace: 'pre-line',
                                lineHeight: '1.6'
                            }}>
                                {msg.role === 'assistant' && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', opacity: 0.7 }}>
                                        <Sparkles size={14} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>AI ASSISTANT</span>
                                    </div>
                                )}
                                {msg.content}
                            </div>

                            {/* Suggestions */}
                            {msg.suggestions && msg.suggestions.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {msg.suggestions.map((sug, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSuggestion(sug)}
                                            style={{
                                                background: 'rgba(167,139,250,0.2)',
                                                border: '1px solid rgba(167,139,250,0.3)',
                                                color: '#a78bfa',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '0.5rem',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(167,139,250,0.3)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(167,139,250,0.2)';
                                            }}
                                        >
                                            {sug}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Action Button */}
                            {msg.action && (
                                <button
                                    onClick={() => handleAction(msg.action)}
                                    style={{
                                        background: '#4ade80',
                                        color: 'black',
                                        border: 'none',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        alignSelf: 'flex-start'
                                    }}
                                >
                                    <Zap size={16} />
                                    {msg.action.type === 'trade' ? 'Execute Trade' : 'Set Alert'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span style={{ fontSize: '0.85rem' }}>AI is thinking...</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
                padding: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)'
            }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about crypto trading..."
                        style={{
                            flex: 1,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            color: 'white',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        style={{
                            background: input.trim() && !isTyping ? 'linear-gradient(135deg, #a78bfa, #4ade80)' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '0.75rem',
                            padding: '1rem 1.5rem',
                            color: 'white',
                            cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            opacity: input.trim() && !isTyping ? 1 : 0.5
                        }}
                    >
                        <Send size={18} />
                        Send
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .typing-indicator {
                    display: flex;
                    gap: 0.25rem;
                }

                .typing-indicator span {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #a78bfa;
                    animation: typing 1.4s infinite;
                }

                .typing-indicator span:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .typing-indicator span:nth-child(3) {
                    animation-delay: 0.4s;
                }

                @keyframes typing {
                    0%, 60%, 100% {
                        transform: translateY(0);
                        opacity: 0.7;
                    }
                    30% {
                        transform: translateY(-10px);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
