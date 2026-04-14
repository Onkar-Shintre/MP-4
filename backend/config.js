import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    geminiApiKey: process.env.GEMINI_API,
    openRouterApiKey: process.env.OpenRouter_API,
    geminiModel: 'gemini-1.5-flash',
    openRouterModel: 'mistralai/mixtral-8x7b-instruct',
};
