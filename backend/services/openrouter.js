import axios from 'axios';
import { config } from '../config.js';
import { buildPrompt } from '../utils/prompt.js';
import { normalizeResponse } from '../utils/normalize.js';

/**
 * Calls the OpenRouter API to generate interview questions for a domain.
 * Returns parsed JSON object or throws on failure.
 */
export async function callOpenRouter(domain) {
    const prompt = buildPrompt(domain);

    const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            model: config.openRouterModel,
            messages: [
                {
                    role: 'system',
                    content: 'You are a JSON-only API. You must respond with valid JSON only. No markdown, no code fences, no explanation. Just the raw JSON object.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.5,
            max_tokens: 4096,
        },
        {
            headers: {
                Authorization: `Bearer ${config.openRouterApiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:5000',
                'X-Title': 'AI Interview Generator',
            },
            timeout: 30000,
        }
    );

    const rawText = response.data?.choices?.[0]?.message?.content;

    if (!rawText) {
        throw new Error('OpenRouter returned empty content');
    }

    return normalizeResponse(rawText);
}
