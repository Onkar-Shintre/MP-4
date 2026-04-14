import { callGemini } from './gemini.js';
import { callOpenRouter } from './openrouter.js';
import { getCache, setCache } from '../utils/cache.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load base fallback data once at startup
const baseFallback = JSON.parse(
    readFileSync(join(__dirname, '../data/preGenerated.json'), 'utf-8')
);

// Domain-specific fallback question sets
const domainFallbacks = {
    'Frontend Development': {
        beginner: [
            { id: 1, level: 'beginner', type: 'conceptual', question: 'What is the difference between HTML, CSS, and JavaScript?', answer: 'HTML (HyperText Markup Language) defines the structure and content of a webpage using elements like headings, paragraphs, and links. CSS (Cascading Style Sheets) controls the visual presentation — colors, fonts, layout, and spacing. JavaScript adds interactivity and dynamic behavior, allowing pages to respond to user actions, fetch data, and update content without reloading. Together they form the three core layers of frontend development: structure, style, and behavior.', hint: 'Think of HTML as the skeleton, CSS as the skin/clothes, and JavaScript as the muscles.' },
            { id: 2, level: 'beginner', type: 'conceptual', question: 'What is the Virtual DOM in React and why is it used?', answer: 'The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes in a React component, React first updates the Virtual DOM, then compares it with the previous Virtual DOM snapshot (a process called "diffing"), and finally applies only the minimal set of changes to the real DOM. This is called reconciliation. It improves performance because direct DOM manipulation is expensive, and batching updates through the Virtual DOM reduces unnecessary re-renders.', hint: 'Think about why directly manipulating the real DOM is slow and how batching updates helps.' },
            { id: 3, level: 'beginner', type: 'coding', question: 'Write a JavaScript function to flatten a nested array one level deep.', answer: 'You can use Array.prototype.flat() for modern browsers: const flatten = arr => arr.flat(). For a manual approach: const flatten = arr => arr.reduce((acc, val) => acc.concat(val), []). The reduce approach iterates each element — if it\'s an array it spreads it into the accumulator, otherwise appends it directly. Time complexity is O(n) where n is the total number of elements. For deep flattening use arr.flat(Infinity) or a recursive solution.', hint: 'Try using Array.reduce() or the spread operator inside a loop.' },
        ],
        intermediate: [
            { id: 4, level: 'intermediate', type: 'conceptual', question: 'Explain the difference between controlled and uncontrolled components in React.', answer: 'A controlled component is one where React controls the form element\'s value through state. The input value is set via a state variable and updated via an onChange handler — React is the single source of truth. An uncontrolled component stores its own state internally in the DOM, accessed via refs. Controlled components are preferred because they make validation, conditional disabling, and enforcing input formats straightforward. Uncontrolled components are simpler for basic forms or when integrating with non-React code.', hint: 'Ask yourself: who owns the form data — React state or the DOM?' },
            { id: 5, level: 'intermediate', type: 'coding', question: 'Implement a debounce function in JavaScript.', answer: 'A debounce function delays invoking a function until after a specified wait time has elapsed since the last call. Implementation: function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; }. This is commonly used for search inputs to avoid firing an API call on every keystroke. The key insight is that each new call resets the timer, so the function only executes after the user stops typing for `delay` milliseconds.', hint: 'Use setTimeout and clearTimeout — clear the previous timer on each new call.' },
            { id: 6, level: 'intermediate', type: 'conceptual', question: 'What is CSS specificity and how is it calculated?', answer: 'CSS specificity determines which style rule applies when multiple rules target the same element. It is calculated as a 4-part value (a, b, c, d): inline styles score (1,0,0,0), IDs score (0,1,0,0), classes/attributes/pseudo-classes score (0,0,1,0), and elements/pseudo-elements score (0,0,0,1). The rule with the highest specificity wins. If specificity is equal, the last rule in the stylesheet wins (cascade). The !important declaration overrides all specificity rules and should be used sparingly.', hint: 'Remember the hierarchy: inline > ID > class > element.' },
            { id: 7, level: 'intermediate', type: 'conceptual', question: 'What are React hooks and why were they introduced?', answer: 'React hooks are functions that let you use state and other React features in functional components, introduced in React 16.8. Before hooks, stateful logic required class components. Key hooks include useState (local state), useEffect (side effects like data fetching), useContext (consuming context), useRef (DOM references), and useMemo/useCallback (performance optimization). Hooks were introduced to solve problems with class components: complex lifecycle methods, difficulty reusing stateful logic between components, and confusing "this" binding. Custom hooks allow extracting and sharing stateful logic cleanly.', hint: 'Think about what problems class components had that hooks solve.' },
        ],
        advanced: [
            { id: 8, level: 'advanced', type: 'conceptual', question: 'Explain React\'s reconciliation algorithm and how keys help optimize it.', answer: 'React\'s reconciliation algorithm (Fiber) compares the new Virtual DOM tree with the previous one to determine the minimal set of DOM operations needed. It uses a heuristic O(n) algorithm with two assumptions: elements of different types produce different trees, and the developer can hint at stable elements with the key prop. When rendering lists, keys help React identify which items changed, were added, or removed — without keys, React re-renders the entire list. Keys should be stable, unique IDs (not array indices) to avoid subtle bugs when items are reordered.', hint: 'Consider what happens when React compares two lists without keys vs with keys.' },
            { id: 9, level: 'advanced', type: 'conceptual', question: 'What are Web Workers and when would you use them in a frontend application?', answer: 'Web Workers allow JavaScript to run in background threads separate from the main UI thread, preventing heavy computations from blocking the browser\'s rendering and user interactions. They communicate with the main thread via postMessage and onmessage events. Use cases include: parsing large JSON datasets, image/video processing, complex mathematical calculations, and running WebAssembly modules. Limitations include no access to the DOM, window object, or localStorage. Service Workers (a specialized type) enable offline caching and push notifications. For most apps, Web Workers are only needed when profiling reveals main thread blocking.', hint: 'Think about what happens to the UI when JavaScript runs a heavy loop for several seconds.' },
            { id: 10, level: 'advanced', type: 'conceptual', question: 'How would you optimize the performance of a React application that renders large lists?', answer: 'Key strategies: (1) Virtualization — use react-window or react-virtual to render only visible items instead of the entire list; (2) Memoization — wrap list items in React.memo to prevent re-renders when props haven\'t changed; (3) useCallback/useMemo — stabilize callback references passed as props; (4) Code splitting — use React.lazy and Suspense to load components on demand; (5) Avoid anonymous functions in JSX which create new references on every render; (6) Use stable keys for list items; (7) Pagination or infinite scroll instead of rendering everything at once. Always profile with React DevTools Profiler before optimizing.', hint: 'Start with virtualization for large lists — it\'s the biggest win.' },
        ],
    },
    'Backend Development': {
        beginner: [
            { id: 1, level: 'beginner', type: 'conceptual', question: 'What is REST and what are the main HTTP methods used in RESTful APIs?', answer: 'REST (Representational State Transfer) is an architectural style for building web APIs based on stateless client-server communication. The main HTTP methods are: GET (retrieve a resource), POST (create a new resource), PUT (replace an existing resource entirely), PATCH (partially update a resource), and DELETE (remove a resource). RESTful APIs use URLs to identify resources (e.g., /users/123) and HTTP methods to define the action. Responses typically use JSON format and standard HTTP status codes (200 OK, 201 Created, 404 Not Found, 500 Internal Server Error).', hint: 'Map CRUD operations to HTTP methods: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.' },
            { id: 2, level: 'beginner', type: 'conceptual', question: 'What is middleware in Express.js and how does it work?', answer: 'Middleware in Express.js are functions that have access to the request object (req), response object (res), and the next middleware function in the application\'s request-response cycle. Middleware can execute code, modify req/res objects, end the request-response cycle, or call next() to pass control to the next middleware. They are executed in the order they are defined. Common uses include logging (morgan), parsing request bodies (express.json()), authentication checks, error handling, and CORS headers. The middleware chain stops when a response is sent or an error is thrown.', hint: 'Think of middleware as a pipeline — each function processes the request and either responds or passes it along.' },
            { id: 3, level: 'beginner', type: 'coding', question: 'Write an Express.js route that accepts a POST request with a JSON body and returns a response.', answer: 'const express = require("express"); const app = express(); app.use(express.json()); app.post("/api/users", (req, res) => { const { name, email } = req.body; if (!name || !email) { return res.status(400).json({ error: "Name and email are required" }); } const newUser = { id: Date.now(), name, email }; res.status(201).json({ success: true, user: newUser }); }); app.listen(3000). Key points: express.json() middleware must be added before routes to parse JSON bodies, use req.body to access the parsed data, return appropriate HTTP status codes (201 for created resources), and always validate input before processing.', hint: 'Remember to add express.json() middleware before your route handler.' },
        ],
        intermediate: [
            { id: 4, level: 'intermediate', type: 'conceptual', question: 'What is JWT authentication and how does it work?', answer: 'JWT (JSON Web Token) is a compact, self-contained token for securely transmitting information between parties. A JWT consists of three Base64URL-encoded parts separated by dots: Header (algorithm and token type), Payload (claims/data like userId, role, expiry), and Signature (HMAC of header+payload using a secret key). Authentication flow: user logs in → server verifies credentials → server creates and signs a JWT → client stores it (localStorage or httpOnly cookie) → client sends JWT in Authorization header on subsequent requests → server verifies the signature and extracts user data without a database lookup. JWTs are stateless, making them ideal for distributed systems.', hint: 'Remember: JWTs are signed not encrypted — don\'t store sensitive data in the payload.' },
            { id: 5, level: 'intermediate', type: 'coding', question: 'Implement a simple rate limiter middleware in Node.js without external libraries.', answer: 'const rateLimiter = (maxRequests, windowMs) => { const requests = new Map(); return (req, res, next) => { const ip = req.ip; const now = Date.now(); const windowStart = now - windowMs; if (!requests.has(ip)) requests.set(ip, []); const timestamps = requests.get(ip).filter(t => t > windowStart); if (timestamps.length >= maxRequests) { return res.status(429).json({ error: "Too many requests" }); } timestamps.push(now); requests.set(ip, timestamps); next(); }; }; app.use(rateLimiter(100, 60000)); // 100 requests per minute. This uses a sliding window approach — storing timestamps per IP and filtering out expired ones. For production, use Redis to share state across multiple server instances.', hint: 'Store request timestamps per IP and count how many fall within the time window.' },
            { id: 6, level: 'intermediate', type: 'conceptual', question: 'Explain the difference between SQL and NoSQL databases with use cases for each.', answer: 'SQL databases (PostgreSQL, MySQL) are relational — data is stored in tables with predefined schemas, relationships are enforced via foreign keys, and they support ACID transactions ensuring data consistency. Best for: financial systems, e-commerce orders, user accounts with complex relationships. NoSQL databases (MongoDB, Redis, Cassandra) are non-relational — flexible schemas, horizontal scaling, and optimized for specific access patterns. MongoDB stores documents (JSON-like), Redis stores key-value pairs in memory, Cassandra handles time-series data at massive scale. Best for: real-time analytics, content management, caching, IoT data. Many modern applications use both (polyglot persistence).', hint: 'Consider data structure, consistency requirements, and scale when choosing.' },
            { id: 7, level: 'intermediate', type: 'conceptual', question: 'What is database indexing and when should you use it?', answer: 'A database index is a data structure (typically a B-tree) that improves the speed of data retrieval operations at the cost of additional storage and slower writes. Without an index, a query must scan every row (full table scan). With an index on the queried column, the database can jump directly to matching rows. Use indexes on: columns frequently used in WHERE clauses, JOIN conditions, ORDER BY clauses, and foreign keys. Avoid over-indexing — each index slows down INSERT/UPDATE/DELETE operations and consumes disk space. Composite indexes (multiple columns) are useful for queries that filter on multiple columns. Use EXPLAIN to analyze query plans.', hint: 'Indexes speed up reads but slow down writes — use them on frequently queried columns.' },
        ],
        advanced: [
            { id: 8, level: 'advanced', type: 'conceptual', question: 'How would you design a scalable microservices architecture for a high-traffic application?', answer: 'Key components: (1) API Gateway — single entry point handling routing, auth, rate limiting, and SSL termination; (2) Service Discovery — tools like Consul or Kubernetes DNS for services to find each other; (3) Message Queue — Kafka or RabbitMQ for async communication between services, decoupling them; (4) Circuit Breaker — prevent cascade failures when a service is down (Hystrix pattern); (5) Distributed Tracing — Jaeger or Zipkin to trace requests across services; (6) Centralized Logging — ELK stack; (7) Container Orchestration — Kubernetes for deployment, scaling, and self-healing; (8) Database per service — each service owns its data to maintain loose coupling. Start with a monolith and extract services as boundaries become clear.', hint: 'Think about service discovery, communication patterns, and failure handling.' },
            { id: 9, level: 'advanced', type: 'conceptual', question: 'Explain database transaction isolation levels and when to use each.', answer: 'Isolation levels control how transactions interact with each other, trading consistency for performance: (1) Read Uncommitted — can read uncommitted changes from other transactions (dirty reads) — fastest but least safe; (2) Read Committed (default in PostgreSQL) — only reads committed data, prevents dirty reads but allows non-repeatable reads; (3) Repeatable Read (default in MySQL) — same row read twice returns same data within a transaction, prevents non-repeatable reads but allows phantom reads; (4) Serializable — transactions execute as if sequential, prevents all anomalies but slowest. For financial transactions use Serializable or Repeatable Read. For analytics dashboards, Read Committed is usually sufficient. Higher isolation = more locking = lower throughput.', hint: 'Higher isolation prevents more anomalies but reduces concurrency.' },
            { id: 10, level: 'advanced', type: 'conceptual', question: 'What strategies would you use to handle 10,000 concurrent WebSocket connections in Node.js?', answer: 'Node.js is well-suited for WebSockets due to its event-driven, non-blocking I/O model. Strategies: (1) Use the ws or Socket.io library with proper connection pooling; (2) Cluster module or PM2 to utilize all CPU cores — each worker handles a subset of connections; (3) Redis Pub/Sub (with socket.io-redis adapter) to broadcast messages across multiple Node.js instances; (4) Heartbeat/ping-pong to detect and clean up dead connections; (5) Message batching — group small messages to reduce overhead; (6) Horizontal scaling behind a load balancer with sticky sessions or a shared Redis store for session state; (7) Monitor memory usage — each connection holds state; (8) Use binary protocols (MessagePack) instead of JSON for high-frequency messages.', hint: 'Think about clustering, shared state with Redis, and connection lifecycle management.' },
        ],
    },
};

/**
 * Returns domain-specific fallback questions or the generic fallback.
 */
function getFallbackData(domain) {
    const domainData = domainFallbacks[domain];
    if (domainData) {
        return { domain, questions: domainData };
    }
    // Return generic fallback with the requested domain name
    return { ...baseFallback, domain };
}

/**
 * Main AI service with fallback chain:
 * 1. Check in-memory cache
 * 2. Try Gemini API
 * 3. Fallback to OpenRouter API
 * 4. Fallback to domain-specific pre-generated JSON
 */
export async function generateQuestions(domain) {
    // 1. Return cached result if available
    const cached = getCache(domain);
    if (cached) {
        console.log(`[Cache] Returning cached result for: "${domain}"`);
        return { ...cached, source: 'cache' };
    }

    // 2. Try Gemini
    try {
        console.log(`[Gemini] Attempting to generate questions for: "${domain}"`);
        const result = await callGemini(domain);
        setCache(domain, result);
        return { ...result, source: 'gemini' };
    } catch (geminiError) {
        console.warn(`[Gemini] Failed: ${geminiError.message}`);
    }

    // 3. Try OpenRouter
    try {
        console.log(`[OpenRouter] Attempting to generate questions for: "${domain}"`);
        const result = await callOpenRouter(domain);
        setCache(domain, result);
        return { ...result, source: 'openrouter' };
    } catch (openRouterError) {
        console.warn(`[OpenRouter] Failed: ${openRouterError.message}`);
    }

    // 4. Return domain-specific fallback data
    console.warn(`[Fallback] Both APIs failed. Returning pre-generated data for: "${domain}"`);
    const fallback = getFallbackData(domain);
    return { ...fallback, source: 'fallback' };
}
