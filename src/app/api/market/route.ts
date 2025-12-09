import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent caching so we get fresh data


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '50';
    const category = searchParams.get('category') || 'market_cap_desc'; // market_cap_desc, volume_desc, gecko_desc

    // CoinGecko API URL
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${category}&per_page=${limit}&page=${page}&sparkline=false&price_change_percentage=24h`;

    // For "New Pairs", we might try to use a different sort or endpoint, but 'id_desc' or 'gecko_desc' is closest on free tier

    try {
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                // Add API Key here if User provides one later
            },
            next: { revalidate: 60 } // Cache for 60 seconds to avoid hitting rate limits
        });

        if (!res.ok) {
            if (res.status === 429) {
                return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
            }
            throw new Error(`CoinGecko API Error: ${res.statusText}`);
        }

        const data = await res.json();

        // Transform CoinGecko data to our internal format
        const formattedData = data.map((coin: any) => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            changePercent: coin.price_change_percentage_24h,
            marketCap: coin.market_cap,
            volume: coin.total_volume,
            dayHigh: coin.high_24h,
            dayLow: coin.low_24h,
            image: coin.image
        }));

        return NextResponse.json({
            data: formattedData,
            page: parseInt(page),
            limit: parseInt(limit)
        });

    } catch (error) {
        console.error('Error fetching market data:', error);
        return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
    }
}
