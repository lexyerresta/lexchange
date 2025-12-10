'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import { useAuth } from '@/context/AuthContext';
import { Bell, Plus, Trash2, Check, X, TrendingUp, TrendingDown, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface PriceAlert {
    id: string;
    token: string;
    condition: 'above' | 'below';
    targetPrice: number;
    currentPrice: number;
    active: boolean;
    notifyVia: ('app' | 'telegram' | 'discord')[];
    createdAt: number;
}

export default function PriceAlertsPage() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [alerts, setAlerts] = useState<PriceAlert[]>([
        {
            id: '1',
            token: 'BTC',
            condition: 'above',
            targetPrice: 100000,
            currentPrice: 98450,
            active: true,
            notifyVia: ['app', 'telegram'],
            createdAt: Date.now() - 86400000
        }
    ]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAlert, setNewAlert] = useState({
        token: 'BTC',
        condition: 'above' as 'above' | 'below',
        targetPrice: '',
        notifyVia: ['app'] as ('app' | 'telegram' | 'discord')[]
    });

    const handleCreateAlert = () => {
        if (!newAlert.targetPrice || parseFloat(newAlert.targetPrice) <= 0) {
            showToast('Enter valid target price', 'error');
            return;
        }

        const alert: PriceAlert = {
            id: Date.now().toString(),
            token: newAlert.token,
            condition: newAlert.condition,
            targetPrice: parseFloat(newAlert.targetPrice),
            currentPrice: 98450, // Mock current price
            active: true,
            notifyVia: newAlert.notifyVia,
            createdAt: Date.now()
        };

        setAlerts([alert, ...alerts]);
        setShowCreateModal(false);
        setNewAlert({
            token: 'BTC',
            condition: 'above',
            targetPrice: '',
            notifyVia: ['app']
        });
        showToast('Price alert created successfully!', 'success');
    };

    const toggleAlert = (id: string) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
        showToast('Alert status updated', 'info');
    };

    const deleteAlert = (id: string) => {
        setAlerts(alerts.filter(a => a.id !== id));
        showToast('Alert deleted', 'info');
    };

    const toggleNotifyMethod = (method: 'app' | 'telegram' | 'discord') => {
        if (newAlert.notifyVia.includes(method)) {
            setNewAlert({
                ...newAlert,
                notifyVia: newAlert.notifyVia.filter(m => m !== method)
            });
        } else {
            setNewAlert({
                ...newAlert,
                notifyVia: [...newAlert.notifyVia, method]
            });
        }
    };

    if (!user) {
        return (
            <AppShell>
                <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                    <Bell size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p>Please login to manage price alerts</p>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div style={{ padding: '2rem', color: 'white' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Price Alerts
                        </h1>
                        <p style={{ color: '#94a3b8' }}>
                            Get notified when prices hit your targets
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        style={{
                            background: '#4ade80',
                            color: 'black',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.75rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Plus size={20} /> Create Alert
                    </button>
                </div>

                {/* Alerts List */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {alerts.length === 0 ? (
                        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                            <Bell size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                            <p>No price alerts yet</p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                style={{
                                    marginTop: '1rem',
                                    padding: '0.6rem 1.2rem',
                                    background: '#334155',
                                    color: 'white',
                                    borderRadius: '0.5rem',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Create Your First Alert
                            </button>
                        </div>
                    ) : (
                        alerts.map(alert => (
                            <div
                                key={alert.id}
                                className="glass-card"
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    opacity: alert.active ? 1 : 0.5
                                }}
                            >
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    {/* Icon */}
                                    <div style={{
                                        background: alert.condition === 'above' ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)',
                                        padding: '1rem',
                                        borderRadius: '1rem',
                                        display: 'flex'
                                    }}>
                                        {alert.condition === 'above' ? (
                                            <TrendingUp size={32} color="#4ade80" />
                                        ) : (
                                            <TrendingDown size={32} color="#f87171" />
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                            {alert.token} {alert.condition === 'above' ? '>' : '<'} ${alert.targetPrice.toLocaleString()}
                                        </div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                                            Current: ${alert.currentPrice.toLocaleString()} •
                                            {alert.condition === 'above'
                                                ? ` ${((alert.targetPrice - alert.currentPrice) / alert.currentPrice * 100).toFixed(2)}% to go`
                                                : ` ${((alert.currentPrice - alert.targetPrice) / alert.currentPrice * 100).toFixed(2)}% away`
                                            }
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {alert.notifyVia.map(method => (
                                                <div
                                                    key={method}
                                                    style={{
                                                        background: 'rgba(167,139,250,0.2)',
                                                        color: '#a78bfa',
                                                        padding: '0.3rem 0.6rem',
                                                        borderRadius: '0.4rem',
                                                        fontSize: '0.8rem',
                                                        textTransform: 'capitalize'
                                                    }}
                                                >
                                                    {method}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => toggleAlert(alert.id)}
                                            style={{
                                                background: alert.active ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.1)',
                                                border: 'none',
                                                padding: '0.6rem',
                                                borderRadius: '0.5rem',
                                                color: alert.active ? '#4ade80' : '#94a3b8',
                                                cursor: 'pointer',
                                                display: 'flex'
                                            }}
                                        >
                                            {alert.active ? <Check size={20} /> : <X size={20} />}
                                        </button>
                                        <button
                                            onClick={() => deleteAlert(alert.id)}
                                            style={{
                                                background: 'rgba(248,113,113,0.2)',
                                                border: 'none',
                                                padding: '0.6rem',
                                                borderRadius: '0.5rem',
                                                color: '#f87171',
                                                cursor: 'pointer',
                                                display: 'flex'
                                            }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Create Modal */}
                {showCreateModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        padding: '1rem'
                    }}>
                        <div className="glass-card" style={{
                            maxWidth: '500px',
                            width: '100%',
                            borderRadius: '1.5rem',
                            padding: '2rem',
                            background: 'rgba(20,20,30,0.95)'
                        }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                                Create Price Alert
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Token Select */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                                        Token
                                    </label>
                                    <select
                                        value={newAlert.token}
                                        onChange={(e) => setNewAlert({ ...newAlert, token: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        <option value="BTC">Bitcoin (BTC)</option>
                                        <option value="ETH">Ethereum (ETH)</option>
                                        <option value="SOL">Solana (SOL)</option>
                                        <option value="BNB">BNB</option>
                                    </select>
                                </div>

                                {/* Condition */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                                        Condition
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => setNewAlert({ ...newAlert, condition: 'above' })}
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem',
                                                background: newAlert.condition === 'above' ? '#4ade80' : 'rgba(255,255,255,0.05)',
                                                color: newAlert.condition === 'above' ? 'black' : 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Above
                                        </button>
                                        <button
                                            onClick={() => setNewAlert({ ...newAlert, condition: 'below' })}
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem',
                                                background: newAlert.condition === 'below' ? '#f87171' : 'rgba(255,255,255,0.05)',
                                                color: newAlert.condition === 'below' ? 'black' : 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Below
                                        </button>
                                    </div>
                                </div>

                                {/* Target Price */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                                        Target Price (USD)
                                    </label>
                                    <input
                                        type="number"
                                        value={newAlert.targetPrice}
                                        onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                                        placeholder="100000"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '0.5rem',
                                            color: 'white',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>

                                {/* Notification Methods */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>
                                        Notify via
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => toggleNotifyMethod('app')}
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem',
                                                background: newAlert.notifyVia.includes('app') ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${newAlert.notifyVia.includes('app') ? '#a78bfa' : 'rgba(255,255,255,0.1)'}`,
                                                borderRadius: '0.5rem',
                                                color: 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Bell size={16} /> App
                                        </button>
                                        <button
                                            onClick={() => toggleNotifyMethod('telegram')}
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem',
                                                background: newAlert.notifyVia.includes('telegram') ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${newAlert.notifyVia.includes('telegram') ? '#22d3ee' : 'rgba(255,255,255,0.1)'}`,
                                                borderRadius: '0.5rem',
                                                color: 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Send size={16} /> Telegram
                                        </button>
                                        <button
                                            onClick={() => toggleNotifyMethod('discord')}
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem',
                                                background: newAlert.notifyVia.includes('discord') ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${newAlert.notifyVia.includes('discord') ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                                                borderRadius: '0.5rem',
                                                color: 'white',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <MessageSquare size={16} /> Discord
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button
                                        onClick={() => setShowCreateModal(false)}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '0.75rem',
                                            color: 'white',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateAlert}
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            background: '#4ade80',
                                            border: 'none',
                                            borderRadius: '0.75rem',
                                            color: 'black',
                                            fontWeight: '700',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Create Alert
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell >
    );
}
