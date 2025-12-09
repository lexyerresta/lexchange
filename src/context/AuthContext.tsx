
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Asset {
    symbol: string;
    name: string;
    amount: number;
    value: number; // For simplicity in this mock, we'll store static value or recalc later
}

interface User {
    address: string;
    username: string;
    balance: number;
    watchlist: string[]; // List of coin IDs/symbols
    assets: Asset[];
}

interface AuthContextType {
    user: User | null;
    login: () => Promise<void>;
    register: (username: string) => Promise<void>;
    logout: () => void;
    toggleWatchlist: (coinSymbol: string) => void;
    executeTrade: (isBuy: boolean, inputSymbol: string, outputSymbol: string, amountIn: number, amountOut: number) => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy Data for specific user
const DUMMY_USER_ASSETS: Asset[] = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.042, value: 2840.50 },
    { symbol: 'USDT', name: 'Tether', amount: 80.19, value: 80.19 },
    { symbol: 'ETH', name: 'Ethereum', amount: 0.5, value: 1200.00 },
];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persistent login
        const storedUser = localStorage.getItem('lexchange_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    // Sync user changes to local storage
    useEffect(() => {
        if (user) {
            localStorage.setItem('lexchange_user', JSON.stringify(user));
        } else if (!isLoading) {
            localStorage.removeItem('lexchange_user');
        }
    }, [user, isLoading]);

    const login = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800)); // Sim delay

        // Restore or create default dummy user
        const stored = localStorage.getItem('lexchange_user');
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            // Default dummy user if none exists
            setUser({
                address: '0x71C...9A21',
                username: 'LexyTrader',
                balance: 4120.69,
                watchlist: ['bitcoin', 'ethereum', 'solana'],
                assets: DUMMY_USER_ASSETS
            });
        }
        setIsLoading(false);
    };

    const register = async (username: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Create new user with starter pack
        const newUser: User = {
            address: '0xNew...User',
            username: username || 'New Trader',
            balance: 1000.00, // Sign up bonus!
            watchlist: [],
            assets: [
                { symbol: 'USDT', name: 'Tether', amount: 1000, value: 1000 }
            ]
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

    const executeTrade = async (isBuy: boolean, inputSymbol: string, outputSymbol: string, amountIn: number, amountOut: number) => {
        if (!user) throw new Error("User not logged in");

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating transaction processing

        // Deep copy user to mutate
        const updatedUser = JSON.parse(JSON.stringify(user));

        if (isBuy) {
            // Buying: Paying with USDT (Quote), Receiving Token (Base)
            // Check balance
            if (updatedUser.balance < amountIn) {
                setIsLoading(false);
                throw new Error("Insufficient USDT balance");
            }

            // Deduct USDT (Balance)
            updatedUser.balance -= amountIn;

            // Add Token to Assets
            const existingAsset = updatedUser.assets.find((micin: Asset) => micin.symbol === outputSymbol);
            if (existingAsset) {
                existingAsset.amount += amountOut;
                existingAsset.value += amountIn; // Approx value update
            } else {
                updatedUser.assets.push({
                    symbol: outputSymbol,
                    name: outputSymbol, // Simplification
                    amount: amountOut,
                    value: amountIn
                });
            }
        } else {
            // Selling: Paying with Token (Base), Receiving USDT (Quote)
            const existingAsset = updatedUser.assets.find((micin: Asset) => micin.symbol === inputSymbol);
            if (!existingAsset || existingAsset.amount < amountIn) {
                setIsLoading(false);
                throw new Error(`Insufficient ${inputSymbol} balance`);
            }

            // Deduct Token
            existingAsset.amount -= amountIn;
            existingAsset.value -= amountOut; // Approx value reduction
            if (existingAsset.amount <= 0.000001) {
                updatedUser.assets = updatedUser.assets.filter((a: Asset) => a.symbol !== inputSymbol);
            }

            // Add USDT (Balance)
            updatedUser.balance += amountOut;
        }

        setUser(updatedUser);
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, toggleWatchlist, executeTrade, isLoading }}>
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

