/**
 * Simple in-memory cache using a Map.
 * Keys are domain strings (lowercased), values are parsed question objects.
 */
const cache = new Map();

/**
 * Returns cached result for a domain, or null if not cached.
 */
export function getCache(domain) {
    const key = domain.toLowerCase().trim();
    return cache.has(key) ? cache.get(key) : null;
}

/**
 * Stores a result in the cache for a given domain.
 */
export function setCache(domain, data) {
    const key = domain.toLowerCase().trim();
    cache.set(key, data);
}

/**
 * Returns the current size of the cache (for debugging).
 */
export function getCacheSize() {
    return cache.size;
}
