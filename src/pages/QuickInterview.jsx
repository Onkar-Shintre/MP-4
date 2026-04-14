import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Lightbulb,
  Code,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ChevronDown,
  User,
} from 'lucide-react';

const OPENROUTER_KEY = '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';

// Call OpenRouter directly from the browser
async function generateFromAI(domain) {
  const prompt = `Generate 10 interview questions with detailed answers for: "${domain}".

RULES: Output ONLY raw JSON starting with { and ending with }. No markdown, no backticks, no explanation.

Use this exact structure:
{"domain":"${domain}","questions":{"beginner":[{"id":1,"level":"beginner","type":"conceptual","question":"...","answer":"Detailed answer of at least 3 sentences explaining the concept clearly.","hint":"..."},{"id":2,"level":"beginner","type":"conceptual","question":"...","answer":"Detailed answer of at least 3 sentences.","hint":"..."},{"id":3,"level":"beginner","type":"coding","question":"...","answer":"Solution with code example and explanation of time complexity.","hint":"..."}],"intermediate":[{"id":4,"level":"intermediate","type":"conceptual","question":"...","answer":"Detailed answer of at least 3 sentences.","hint":"..."},{"id":5,"level":"intermediate","type":"coding","question":"...","answer":"Solution with code example.","hint":"..."},{"id":6,"level":"intermediate","type":"conceptual","question":"...","answer":"Detailed answer of at least 3 sentences.","hint":"..."},{"id":7,"level":"intermediate","type":"conceptual","question":"...","answer":"Detailed answer of at least 3 sentences.","hint":"..."}],"advanced":[{"id":8,"level":"advanced","type":"conceptual","question":"...","answer":"Detailed answer of at least 3 sentences.","hint":"..."},{"id":9,"level":"advanced","type":"conceptual","question":"...","answer":"Detailed answer of at least 3 sentences.","hint":"..."},{"id":10,"level":"advanced","type":"conceptual","question":"...","answer":"Detailed answer of at least 3 sentences.","hint":"..."}]}}

All questions must be specifically about "${domain}". Fill every "..." with real content. Output only the JSON object.`;

  const res = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'mistralai/mixtral-8x7b-instruct',
      messages: [
        { role: 'system', content: 'You are a JSON API. Respond with only valid JSON. No markdown, no code fences.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 4096,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'InterviewAce',
      },
      timeout: 30000,
    }
  );

  const raw = res.data?.choices?.[0]?.message?.content || '';
  // Strip any accidental markdown fences
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON in response');
  // Remove control characters that break JSON.parse
  // eslint-disable-next-line no-control-regex
  const safe = cleaned.slice(start, end + 1).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return JSON.parse(safe);
}

const DOMAIN_MAP = {
  frontend:          'Frontend Development',
  backend:           'Backend Development',
  fullstack:         'Full Stack Development',
  'data-analyst':    'Data Analysis',
  devops:            'DevOps Engineering',
  'ui-ux':           'UI/UX Design',
  mobile:            'Mobile App Development',
  'ai-ml':           'AI/ML Engineering',
  'product-manager': 'Product Management',
};

const LEVEL_COLORS = {
  beginner:     'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  advanced:     'bg-red-100 text-red-700 border-red-200',
};

// Module-level cache — survives re-renders, cleared on page refresh
const cache = {};

// Fallback questions used when AI call fails
const FALLBACK = {
  'Frontend Development': [
    { id: 1, level: 'beginner', type: 'conceptual', question: 'What is the difference between HTML, CSS, and JavaScript?', answer: 'HTML defines the structure and content of a webpage using elements like headings, paragraphs, and links. CSS controls the visual presentation — colors, fonts, layout, and spacing. JavaScript adds interactivity and dynamic behavior, allowing pages to respond to user actions, fetch data, and update content without reloading. Together they form the three core layers of frontend development: structure, style, and behavior.', hint: 'Think of HTML as the skeleton, CSS as the skin, and JavaScript as the muscles.' },
    { id: 2, level: 'beginner', type: 'conceptual', question: 'What is the Virtual DOM in React and why is it used?', answer: 'The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React updates the Virtual DOM first, then compares it with the previous snapshot (diffing), and applies only the minimal changes to the real DOM (reconciliation). This improves performance because direct DOM manipulation is expensive, and batching updates through the Virtual DOM reduces unnecessary re-renders.', hint: 'Think about why directly manipulating the real DOM is slow.' },
    { id: 3, level: 'beginner', type: 'coding', question: 'Write a JavaScript function to flatten a nested array one level deep.', answer: 'Use Array.flat(): const flatten = arr => arr.flat(). Manual approach: const flatten = arr => arr.reduce((acc, val) => acc.concat(val), []). The reduce approach iterates each element — if it is an array it spreads it into the accumulator, otherwise appends it directly. Time complexity is O(n). For deep flattening use arr.flat(Infinity).', hint: 'Try Array.reduce() or the spread operator inside a loop.' },
    { id: 4, level: 'intermediate', type: 'conceptual', question: 'Explain the difference between controlled and uncontrolled components in React.', answer: 'A controlled component has its form element value managed by React state — the input value is set via state and updated via onChange. An uncontrolled component stores its own state internally in the DOM, accessed via refs. Controlled components are preferred because they make validation, conditional disabling, and enforcing input formats straightforward. Uncontrolled components are simpler for basic forms or when integrating with non-React code.', hint: 'Ask yourself: who owns the form data — React state or the DOM?' },
    { id: 5, level: 'intermediate', type: 'coding', question: 'Implement a debounce function in JavaScript.', answer: 'A debounce function delays invoking a function until after a wait time has elapsed since the last call. Implementation: function debounce(fn, delay) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; }. This is commonly used for search inputs to avoid firing an API call on every keystroke. Each new call resets the timer, so the function only executes after the user stops typing for delay milliseconds.', hint: 'Use setTimeout and clearTimeout — clear the previous timer on each new call.' },
    { id: 6, level: 'intermediate', type: 'conceptual', question: 'What is CSS specificity and how is it calculated?', answer: 'CSS specificity determines which style rule applies when multiple rules target the same element. It is calculated as a 4-part value: inline styles (1,0,0,0), IDs (0,1,0,0), classes/attributes/pseudo-classes (0,0,1,0), and elements/pseudo-elements (0,0,0,1). The rule with the highest specificity wins. If equal, the last rule in the stylesheet wins. The !important declaration overrides all specificity rules.', hint: 'Remember the hierarchy: inline > ID > class > element.' },
    { id: 7, level: 'intermediate', type: 'conceptual', question: 'What are React hooks and why were they introduced?', answer: 'React hooks are functions that let you use state and other React features in functional components, introduced in React 16.8. Key hooks include useState (local state), useEffect (side effects), useContext (consuming context), useRef (DOM references), and useMemo/useCallback (performance). Hooks were introduced to solve problems with class components: complex lifecycle methods, difficulty reusing stateful logic, and confusing "this" binding. Custom hooks allow extracting and sharing stateful logic cleanly.', hint: 'Think about what problems class components had that hooks solve.' },
    { id: 8, level: 'advanced', type: 'conceptual', question: "Explain React's reconciliation algorithm and how keys help optimize it.", answer: "React's reconciliation algorithm compares the new Virtual DOM tree with the previous one to determine the minimal DOM operations needed. It uses a heuristic O(n) algorithm assuming elements of different types produce different trees. When rendering lists, keys help React identify which items changed, were added, or removed — without keys React re-renders the entire list. Keys should be stable unique IDs, not array indices, to avoid bugs when items are reordered.", hint: 'Consider what happens when React compares two lists without keys vs with keys.' },
    { id: 9, level: 'advanced', type: 'conceptual', question: 'What are Web Workers and when would you use them?', answer: 'Web Workers allow JavaScript to run in background threads separate from the main UI thread, preventing heavy computations from blocking rendering and user interactions. They communicate with the main thread via postMessage and onmessage events. Use cases include parsing large JSON datasets, image processing, complex calculations, and running WebAssembly. Limitations include no access to the DOM or localStorage. Use them only when profiling reveals main thread blocking.', hint: 'Think about what happens to the UI when JavaScript runs a heavy loop for several seconds.' },
    { id: 10, level: 'advanced', type: 'conceptual', question: 'How would you optimize a React application that renders large lists?', answer: 'Key strategies: (1) Virtualization — use react-window to render only visible items; (2) Memoization — wrap list items in React.memo to prevent re-renders; (3) useCallback/useMemo — stabilize callback references; (4) Code splitting — use React.lazy and Suspense; (5) Avoid anonymous functions in JSX; (6) Use stable keys; (7) Pagination or infinite scroll instead of rendering everything at once. Always profile with React DevTools Profiler before optimizing.', hint: 'Start with virtualization for large lists — it is the biggest win.' },
  ],
  'Backend Development': [
    { id: 1, level: 'beginner', type: 'conceptual', question: 'What is REST and what are the main HTTP methods?', answer: 'REST (Representational State Transfer) is an architectural style for building web APIs based on stateless client-server communication. The main HTTP methods are: GET (retrieve), POST (create), PUT (replace), PATCH (partial update), and DELETE (remove). RESTful APIs use URLs to identify resources and HTTP methods to define the action. Responses use JSON format and standard HTTP status codes like 200 OK, 201 Created, 404 Not Found.', hint: 'Map CRUD to HTTP: Create=POST, Read=GET, Update=PUT/PATCH, Delete=DELETE.' },
    { id: 2, level: 'beginner', type: 'conceptual', question: 'What is middleware in Express.js?', answer: 'Middleware in Express.js are functions with access to req, res, and next. They can execute code, modify req/res, end the request-response cycle, or call next() to pass control forward. They execute in the order defined. Common uses include logging (morgan), parsing bodies (express.json()), authentication checks, error handling, and CORS headers. The chain stops when a response is sent or an error is thrown.', hint: 'Think of middleware as a pipeline — each function processes the request and passes it along.' },
    { id: 3, level: 'beginner', type: 'coding', question: 'Write an Express.js POST route that validates input and returns JSON.', answer: 'app.use(express.json()); app.post("/api/users", (req, res) => { const { name, email } = req.body; if (!name || !email) return res.status(400).json({ error: "Name and email required" }); res.status(201).json({ success: true, user: { id: Date.now(), name, email } }); }). Key points: express.json() must be added before routes, use req.body to access parsed data, return appropriate HTTP status codes, and always validate input.', hint: 'Remember to add express.json() middleware before your route handler.' },
    { id: 4, level: 'intermediate', type: 'conceptual', question: 'What is JWT authentication and how does it work?', answer: 'JWT (JSON Web Token) is a compact token for securely transmitting information. It has three Base64URL-encoded parts: Header (algorithm), Payload (claims like userId, expiry), and Signature (HMAC of header+payload). Flow: user logs in → server verifies credentials → creates signed JWT → client stores it → sends in Authorization header → server verifies signature without a database lookup. JWTs are stateless, ideal for distributed systems. Never store sensitive data in the payload as it is only signed, not encrypted.', hint: 'JWTs are signed not encrypted — the payload is readable by anyone.' },
    { id: 5, level: 'intermediate', type: 'coding', question: 'Implement a simple rate limiter middleware in Node.js.', answer: 'const rateLimiter = (max, windowMs) => { const map = new Map(); return (req, res, next) => { const ip = req.ip; const now = Date.now(); const times = (map.get(ip) || []).filter(t => t > now - windowMs); if (times.length >= max) return res.status(429).json({ error: "Too many requests" }); times.push(now); map.set(ip, times); next(); }; }; app.use(rateLimiter(100, 60000)). This uses a sliding window — storing timestamps per IP and filtering expired ones. For production use Redis to share state across instances.', hint: 'Store request timestamps per IP and count how many fall within the time window.' },
    { id: 6, level: 'intermediate', type: 'conceptual', question: 'Explain SQL vs NoSQL databases with use cases.', answer: 'SQL databases (PostgreSQL, MySQL) are relational with predefined schemas, foreign key relationships, and ACID transactions — best for financial systems, e-commerce, and user accounts with complex relationships. NoSQL databases (MongoDB, Redis, Cassandra) have flexible schemas and horizontal scaling — MongoDB stores JSON-like documents, Redis stores key-value pairs in memory, Cassandra handles time-series data at scale. Best for real-time analytics, content management, caching, and IoT. Many apps use both (polyglot persistence).', hint: 'Consider data structure, consistency requirements, and scale.' },
    { id: 7, level: 'intermediate', type: 'conceptual', question: 'What is database indexing and when should you use it?', answer: 'A database index is a data structure (typically B-tree) that speeds up data retrieval at the cost of storage and slower writes. Without an index, queries scan every row. With an index, the database jumps directly to matching rows. Use indexes on columns in WHERE clauses, JOIN conditions, ORDER BY, and foreign keys. Avoid over-indexing — each index slows INSERT/UPDATE/DELETE. Composite indexes cover multi-column queries. Use EXPLAIN to analyze query plans.', hint: 'Indexes speed up reads but slow down writes — use on frequently queried columns.' },
    { id: 8, level: 'advanced', type: 'conceptual', question: 'How would you design a scalable microservices architecture?', answer: 'Key components: (1) API Gateway — single entry point for routing, auth, rate limiting; (2) Service Discovery — Consul or Kubernetes DNS; (3) Message Queue — Kafka or RabbitMQ for async communication; (4) Circuit Breaker — prevent cascade failures; (5) Distributed Tracing — Jaeger or Zipkin; (6) Centralized Logging — ELK stack; (7) Container Orchestration — Kubernetes; (8) Database per service for loose coupling. Start with a monolith and extract services as boundaries become clear.', hint: 'Think about service discovery, communication patterns, and failure handling.' },
    { id: 9, level: 'advanced', type: 'conceptual', question: 'Explain database transaction isolation levels.', answer: 'Isolation levels control how transactions interact: (1) Read Uncommitted — can read uncommitted changes (dirty reads), fastest but least safe; (2) Read Committed (PostgreSQL default) — only reads committed data; (3) Repeatable Read (MySQL default) — same row read twice returns same data; (4) Serializable — transactions execute as if sequential, prevents all anomalies but slowest. For financial transactions use Serializable. For analytics dashboards, Read Committed is usually sufficient. Higher isolation means more locking and lower throughput.', hint: 'Higher isolation prevents more anomalies but reduces concurrency.' },
    { id: 10, level: 'advanced', type: 'conceptual', question: 'How would you handle 10,000 concurrent WebSocket connections in Node.js?', answer: 'Node.js is well-suited for WebSockets due to its event-driven non-blocking I/O. Strategies: (1) Use ws or Socket.io library; (2) Cluster module or PM2 to use all CPU cores; (3) Redis Pub/Sub with socket.io-redis adapter to broadcast across instances; (4) Heartbeat/ping-pong to detect dead connections; (5) Message batching to reduce overhead; (6) Horizontal scaling with sticky sessions or shared Redis state; (7) Monitor memory — each connection holds state; (8) Use binary protocols for high-frequency messages.', hint: 'Think about clustering, shared state with Redis, and connection lifecycle.' },
  ],
};

const QuickInterview = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answered, setAnswered] = useState([]); // track which q's user has revealed
  const [source, setSource] = useState('');

  const domain = DOMAIN_MAP[sectionId] || sectionId;

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    setShowAnswer(false);
    setCurrent(0);
    setAnswered([]);

    // Return from cache if available
    if (cache[sectionId]) {
      setQuestions(cache[sectionId].questions);
      setSource(cache[sectionId].source);
      setLoading(false);
      return;
    }

    try {
      const data = await generateFromAI(domain);
      const all = [
        ...(data.questions?.beginner || []),
        ...(data.questions?.intermediate || []),
        ...(data.questions?.advanced || []),
      ];
      if (all.length === 0) throw new Error('No questions returned');
      cache[sectionId] = { questions: all, source: 'openrouter' };
      setQuestions(all);
      setSource('openrouter');
    } catch (err) {
      console.error('AI generation failed:', err);
      // Use built-in fallback questions for the domain
      const fallback = FALLBACK[domain] || FALLBACK['Frontend Development'];
      cache[sectionId] = { questions: fallback, source: 'fallback' };
      setQuestions(fallback);
      setSource('fallback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [sectionId]);

  const q = questions[current];
  const total = questions.length;
  const progress = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  const handleReveal = () => {
    setShowAnswer(true);
    if (!answered.includes(current)) setAnswered(prev => [...prev, current]);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrent(prev => prev + 1);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrent(prev => prev - 1);
  };

  const handleRetry = () => {
    delete cache[sectionId];
    fetchQuestions();
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        <p className="text-gray-700 font-medium text-lg">Generating questions for {domain}…</p>
        <p className="text-gray-400 text-sm">Calling AI — this takes a few seconds</p>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 text-sm mb-6">{error}</p>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={() => navigate('/interview-sections')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
            >
              Go Back
            </button>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  // ── Finished ─────────────────────────────────────────────────────────────
  if (current >= total) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Complete!</h2>
          <p className="text-gray-600 mb-2">
            You reviewed <span className="font-semibold text-blue-600">{total} questions</span> for
          </p>
          <p className="text-gray-800 font-semibold mb-6">{domain}</p>
          <p className="text-sm text-gray-500 mb-6">
            {answered.length} of {total} answers revealed
          </p>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => { setCurrent(0); setShowAnswer(false); setAnswered([]); }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Restart Session
            </button>
            <button
              onClick={handleRetry}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Generate New Questions</span>
            </button>
            <button
              onClick={() => navigate('/interview-sections')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Back to Sections
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Question View ───────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/interview-sections')}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">{domain}</p>
            <p className="text-xs text-gray-400 capitalize">Source: {source}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-700 hidden sm:block">{user?.name || 'User'}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Fallback notice */}
        {source === 'fallback' && (
          <div className="mb-4 flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-sm text-yellow-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Showing sample questions — AI service unavailable. Questions are still relevant for practice.</span>
          </div>
        )}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {current + 1} of {total}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Level dots */}
          <div className="flex space-x-1 mt-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < current ? 'bg-blue-400' :
                  i === current ? 'bg-blue-600' :
                  'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${LEVEL_COLORS[q.level] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                {q.level}
              </span>
              {q.type === 'coding' && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center space-x-1">
                  <Code className="w-3 h-3" />
                  <span>Coding</span>
                </span>
              )}
              <span className="text-xs text-gray-400 ml-auto">#{q.id}</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 leading-relaxed">
              {q.question}
            </h2>
          </div>

          {/* Hint */}
          {q.hint && (
            <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-100 flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800"><span className="font-semibold">Hint:</span> {q.hint}</p>
            </div>
          )}

          {/* Answer Section */}
          <div className="px-6 py-5">
            {!showAnswer ? (
              <button
                onClick={handleReveal}
                className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all font-medium"
              >
                <ChevronDown className="w-5 h-5" />
                <span>Reveal Answer &amp; Explanation</span>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Answer &amp; Explanation</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line bg-green-50 border border-green-100 rounded-xl p-4">
                  {q.answer || 'No answer available.'}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-gray-400">
              {answered.length} revealed
            </span>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <span>{current === total - 1 ? 'Finish' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question list overview */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">All Questions</p>
          <div className="space-y-1">
            {questions.map((item, i) => (
              <button
                key={item.id}
                onClick={() => { setCurrent(i); setShowAnswer(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-3 ${
                  i === current
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : answered.includes(i)
                    ? 'text-gray-500 hover:bg-gray-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === current ? 'bg-blue-600 text-white' :
                  answered.includes(i) ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {answered.includes(i) && i !== current ? '✓' : i + 1}
                </span>
                <span className="truncate">{item.question}</span>
                <span className={`ml-auto text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${LEVEL_COLORS[item.level] || ''}`}>
                  {item.level}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuickInterview;
