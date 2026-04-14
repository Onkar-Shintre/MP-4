/**
 * Builds the AI prompt for generating interview questions with answers and explanations.
 */
export function buildPrompt(domain) {
  return `Generate 10 interview questions with detailed answers for: "${domain}".

STRICT RULES:
- Output ONLY a raw JSON object. No markdown. No code fences. No backticks. No explanation text.
- Start your response with { and end with }
- Do not write anything before { or after }

JSON structure (copy exactly, fill in values):
{"domain":"${domain}","questions":{"beginner":[{"id":1,"level":"beginner","type":"conceptual","question":"QUESTION HERE","answer":"DETAILED ANSWER HERE - minimum 3 sentences explaining the concept clearly","hint":"HINT HERE"},{"id":2,"level":"beginner","type":"conceptual","question":"QUESTION HERE","answer":"DETAILED ANSWER HERE - minimum 3 sentences","hint":"HINT HERE"},{"id":3,"level":"beginner","type":"coding","question":"CODING QUESTION HERE","answer":"SOLUTION AND EXPLANATION HERE - include code example and explain time complexity","hint":"HINT HERE"}],"intermediate":[{"id":4,"level":"intermediate","type":"conceptual","question":"QUESTION HERE","answer":"DETAILED ANSWER HERE - minimum 3 sentences","hint":"HINT HERE"},{"id":5,"level":"intermediate","type":"coding","question":"CODING QUESTION HERE","answer":"SOLUTION AND EXPLANATION HERE - include code example","hint":"HINT HERE"},{"id":6,"level":"intermediate","type":"conceptual","question":"QUESTION HERE","answer":"DETAILED ANSWER HERE - minimum 3 sentences","hint":"HINT HERE"},{"id":7,"level":"intermediate","type":"conceptual","question":"QUESTION HERE","answer":"DETAILED ANSWER HERE - minimum 3 sentences","hint":"HINT HERE"}],"advanced":[{"id":8,"level":"advanced","type":"conceptual","question":"QUESTION HERE","answer":"DETAILED ANSWER HERE - minimum 3 sentences","hint":"HINT HERE"},{"id":9,"level":"advanced","type":"conceptual","question":"QUESTION HERE","answer":"DETAILED ANSWER HERE - minimum 3 sentences","hint":"HINT HERE"},{"id":10,"level":"advanced","type":"conceptual","question":"QUESTION HERE","answer":"DETAILED ANSWER HERE - minimum 3 sentences","hint":"HINT HERE"}]}}

All questions must be specifically about "${domain}". Replace every placeholder with real content. Output only the JSON.`;
}
