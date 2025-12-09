
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Asset {
    symbol: string;
    name: string;
    amount: number;
    value: number;
}

export interface Transaction {
    id: string;
    type: 'buy' | 'sell';
    fromToken: string;
    toToken: string;
    fromAmount: number;
    toAmount: number;
    price: number;
    timestamp: number;
    status: 'pending' | 'completed' | 'failed';
    txHash?: string;
}

export interface User {
    address: string;
    username: string;
    balance: number;
    watchlist: string[];
    assets: Asset[];
    transactions: Transaction[];
    settings: {
        slippage: number;
        autoApprove: boolean;
    };
}

interface AuthContextType {
    user: User | null;
    login: () => Promise<void>;
    register: (username: string) => Promise<void>;
    logout: () => void;
    toggleWatchlist: (coinSymbol: string) => void;
    executeTrade: (isBuy: boolean, inputSymbol: string, outputSymbol: string, amountIn: number, amountOut: number) => Promise<string>;
    updateSettings: (settings: Partial<User['settings']>) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DUMMY_USER_ASSETS: Asset[] = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.042, value: 2840.50 },
    { symbol: 'USDT', name: 'Tether', amount: 80.19, value: 80.19 },
    { symbol: 'ETH', name: 'Ethereum', amount: 0.5, value: 1200.00 },
];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('lexchange_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('lexchange_user', JSON.stringify(user));
        } else if (!isLoading) {
            localStorage.removeItem('lexchange_user');
        }
    }, [user, isLoading]);

    const login = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const stored = localStorage.getItem('lexchange_user');
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            setUser({
                address: '0x71C7B...9A21',
                username: 'LexyTrader',
                balance: 4120.69,
                watchlist: ['bitcoin', 'ethereum', 'solana'],
                assets: DUMMY_USER_ASSETS,
                transactions: [],
                settings: {
                    slippage: 0.5,
                    autoApprove: false
                }
            });
        }
        setIsLoading(false);
    };

    const register = async (username: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const newUser: User = {
            address: `0x${Math.random().toString(36).substr(2, 8)}...${Math.random().toString(36).substr(2, 4)}`,
            username: username || 'New Trader',
            balance: 1000.00,
            watchlist: [],
            assets: [
                { symbol: 'USDT', name: 'Tether', amount: 1000, value: 1000 }
            ],
            transactions: [],
            settings: {
                slippage: 0.5,
                autoApprove: false
            }
        };
        setUser(newUser);
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
    };

    const toggleWatchlist = (coinSymbol: string) => {
        if (!user) return;

        const symbol = coinSymbol.toLowerCase();
        const currentList = user.watchlist || [];
        let newList;

        if (currentList.includes(symbol)) {
            newList = currentList.filter(id => id !== symbol);
        } else {
            newList = [...currentList, symbol];
        }

        setUser({ ...user, watchlist: newList });
    };

    const updateSettings = (newSettings: Partial<User['settings']>) => {
        if (!user) return;
        setUser({
            ...user,
            settings: { ...user.settings, ...newSettings }
        });
    };

    const executeTrade = async (isBuy: boolean, inputSymbol: string, outputSymbol: string, amountIn: number, amountOut: number): Promise<string> => {
        if (!user) throw new Error("User not logged in");

        setIsLoading(true);

        // Generate transaction ID and hash
        const txId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const txHash = `0x${Math.random().toString(36).substr(2, 64)}`;

        // Create pending transaction
        const newTransaction: Transaction = {
            id: txId,
            type: isBuy ? 'buy' : 'sell',
            fromToken: isBuy ? 'USDT' : inputSymbol,
            toToken: isBuy ? outputSymbol : 'USDT',
            fromAmount: amountIn,
            toAmount: amountOut,
            price: isBuy ? amountIn / amountOut : amountOut / amountIn,
            timestamp: Date.now(),
            status: 'pending',
            txHash
        };

        // Add pending transaction
        const updatedUser = JSON.parse(JSON.stringify(user));
        updatedUser.transactions = [newTransaction, ...(updatedUser.transactions || [])];
        setUser(updatedUser);

        // Simulate transaction processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Process the trade
        if (isBuy) {
            if (updatedUser.balance < amountIn) {
                newTransaction.status = 'failed';
                setUser(updatedUser);
                setIsLoading(false);
                throw new Error("Insufficient USDT balance");
            }

            updatedUser.balance -= amountIn;

            const existingAsset = updatedUser.assets.find((a: Asset) => a.symbol === outputSymbol);
            if (existingAsset) {
                existingAsset.amount += amountOut;
                existingAsset.value += amountIn;
            } else {
                updatedUser.assets.push({
                    symbol: outputSymbol,
                    name: outputSymbol,
                    amount: amountOut,
                    value: amountIn
                });
            }
        } else {
            const existingAsset = updatedUser.assets.find((a: Asset) => a.symbol === inputSymbol);
            if (!existingAsset || existingAsset.amount < amountIn) {
                newTransaction.status = 'failed';
                setUser(updatedUser);
                setIsLoading(false);
                throw new Error(`Insufficient ${inputSymbol} balance`);
            }

            existingAsset.amount -= amountIn;
            existingAsset.value -= amountOut;
            if (existingAsset.amount <= 0.000001) {
                updatedUser.assets = updatedUser.assets.filter((a: Asset) => a.symbol !== inputSymbol);
            }

            updatedUser.balance += amountOut;
        }

        // Mark transaction as completed
        newTransaction.status = 'completed';
        setUser(updatedUser);
        setIsLoading(false);

        return txHash;
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, toggleWatchlist, executeTrade, updateSettings, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
