/**
 * Extracts and parses valid JSON from an AI response string.
 * Handles markdown code fences, extra text, and control characters.
 */
export function normalizeResponse(rawText) {
    if (!rawText || typeof rawText !== 'string') {
        throw new Error('Empty or invalid response from AI');
    }

    let text = rawText.trim();

    // Strip markdown code fences: ```json ... ``` or ``` ... ```
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();

    // Find the outermost JSON object boundaries
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');

    if (start === -1 || end === -1 || end <= start) {
        throw new Error('No JSON object found in AI response');
    }

    let jsonString = text.slice(start, end + 1);

    // Remove control characters that break JSON.parse (except \n \r \t)
    // eslint-disable-next-line no-control-regex
    jsonString = jsonString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Fix unescaped newlines inside string values
    jsonString = jsonString.replace(/("(?:[^"\\]|\\.)*")/g, (match) =>
        match.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t')
    );

    try {
        return JSON.parse(jsonString);
    } catch (err) {
        // Last resort: try to extract just the questions structure manually
        throw new Error(`Failed to parse AI response as JSON: ${err.message}`);
    }
}
