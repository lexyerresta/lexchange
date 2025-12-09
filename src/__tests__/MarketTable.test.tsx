import { render, screen, waitFor } from '@testing-library/react';
import MarketTable from '@/components/MarketTable';

// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
            { symbol: 'BTC', name: 'Bitcoin', price: 50000, changePercent: 5.5, marketCap: 1000000000 },
            { symbol: 'ETH', name: 'Ethereum', price: 4000, changePercent: -2.0, marketCap: 500000000 },
        ]),
    })
) as jest.Mock;

describe('MarketTable', () => {
    it('renders the table headers', async () => {
        render(<MarketTable />);

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Last Price')).toBeInTheDocument();
        expect(screen.getByText('24h Change')).toBeInTheDocument();
    });

    it('fetches and displays market data', async () => {
        render(<MarketTable />);

        // Wait for the data to be loaded
        await waitFor(() => {
            expect(screen.getByText('Bitcoin')).toBeInTheDocument();
            expect(screen.getByText('$50,000.00')).toBeInTheDocument();
            expect(screen.getByText('+5.50%')).toBeInTheDocument();

            expect(screen.getByText('Ethereum')).toBeInTheDocument();
            expect(screen.getByText('$4,000.00')).toBeInTheDocument();
            expect(screen.getByText('-2.00%')).toBeInTheDocument();
        });
    });

    it('handles loading state', () => {
        render(<MarketTable />);
        // Initially should show loading or empty state properly
        // Note: Since we use useEffect, the initial render might be fast, but we can check if it eventually resolves.
        // Our component shows "Loading market data..." if data is empty and loading is true.
        expect(screen.getByText('Loading market data...')).toBeInTheDocument();
    });
});
