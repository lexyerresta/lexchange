import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { message, context } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Create context-aware prompt
        const systemPrompt = `You are an expert cryptocurrency trading AI assistant for Lexchange platform. 
Your role is to provide:
- Real-time market analysis and insights
- Trading recommendations with entry/exit points
- Portfolio analysis and optimization suggestions
- Risk management advice
- Technical analysis (RSI, MACD, support/resistance levels)
- Market sentiment analysis
- Whale activity insights

User's context:
${context ? JSON.stringify(context, null, 2) : 'No user data available'}

Guidelines:
- Be concise but informative
- Provide actionable insights
- Include specific numbers and percentages when possible
- Format responses with clear sections using markdown
- Use emojis sparingly for emphasis (📊, 💡, ⚠️, ✅)
- Always include risk warnings for trading recommendations
- If asked about specific coins, provide technical analysis

User's question: ${message}`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        // Generate smart suggestions based on the response
        const suggestions = generateSuggestions(message, text);

        return NextResponse.json({
            response: text,
            suggestions,
            timestamp: Date.now()
        });

    } catch (error: any) {
        console.error('AI API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate AI response', details: error.message },
            { status: 500 }
        );
    }
}

function generateSuggestions(userMessage: string, aiResponse: string): string[] {
    const lowerMsg = userMessage.toLowerCase();
    const lowerResponse = aiResponse.toLowerCase();

    const suggestions: string[] = [];

    // Context-aware suggestions
    if (lowerMsg.includes('portfolio') || lowerResponse.includes('portfolio')) {
        suggestions.push('Show risk analysis', 'Rebalance suggestions', 'Set stop-loss');
    } else if (lowerMsg.includes('buy') || lowerMsg.includes('sell') || lowerResponse.includes('entry')) {
        suggestions.push('Execute trade', 'Set price alert', 'Show more analysis');
    } else if (lowerMsg.includes('market') || lowerResponse.includes('market')) {
        suggestions.push('Top gainers', 'Whale activity', 'Market sentiment');
    } else if (lowerMsg.includes('btc') || lowerMsg.includes('bitcoin')) {
        suggestions.push('BTC price alert', 'BTC technical analysis', 'Compare with ETH');
    } else if (lowerMsg.includes('eth') || lowerMsg.includes('ethereum')) {
        suggestions.push('ETH price alert', 'ETH gas fees', 'DeFi opportunities');
    } else {
        suggestions.push('Analyze BTC', 'Portfolio health', 'Market update', 'Set alerts');
    }

    return suggestions.slice(0, 3); // Return max 3 suggestions
}
