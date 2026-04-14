import axios from 'axios';
import { config } from '../config.js';
import { buildPrompt } from '../utils/prompt.js';
import { normalizeResponse } from '../utils/normalize.js';

/**
 * Calls the Google Gemini API to generate interview questions for a domain.
 * Returns parsed JSON object or throws on failure.
 */
export async function callGemini(domain) {
    const prompt = buildPrompt(domain);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModel}:generateContent?key=${config.geminiApiKey}`;

    const response = await axios.post(
        url,
        {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2048,
            },
        },
        { timeout: 15000 } // 15 second timeout
    );

    // Extract text from Gemini response structure
    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
        throw new Error('Gemini returned empty content');
    }

    return normalizeResponse(rawText);
}
