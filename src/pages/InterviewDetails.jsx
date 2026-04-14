import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { questionGeneratorAPI } from '../services/api';
import {
  ChevronDown,
  Pin,
  Sparkles,
  User,
  ArrowLeft,
  Loader2,
  BookOpen,
  Code,
  Lightbulb,
  AlertCircle,
} from 'lucide-react';

// Map section IDs to human-readable domain names for the AI prompt
const DOMAIN_MAP = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  fullstack: 'Full Stack Development',
  'data-analyst': 'Data Analysis',
  devops: 'DevOps Engineering',
  'ui-ux': 'UI/UX Design',
  mobile: 'Mobile App Development',
  'ai-ml': 'AI/ML Engineering',
  'product-manager': 'Product Management',
};

// Role metadata for the header card
const ROLE_META = {
  frontend:        { skills: 'React.js, DOM manipulation, CSS Flexbox', experience: '2 Years' },
  backend:         { skills: 'Node.js, Express, REST APIs, MongoDB', experience: '3 Years' },
  fullstack:       { skills: 'MERN stack, deployment strategies, authentication', experience: '4 Years' },
  'data-analyst':  { skills: 'SQL, Excel, Data Visualization, Power BI', experience: '2 Years' },
  devops:          { skills: 'CI/CD, Docker, Kubernetes, AWS', experience: '5 Years' },
  'ui-ux':         { skills: 'Figma, user journey, wireframing, accessibility', experience: '3 Years' },
  mobile:          { skills: 'React Native, Flutter, performance optimization', experience: '2 Years' },
  'ai-ml':         { skills: 'Python, scikit-learn, model deployment, NLP', experience: '1 Year' },
  'product-manager': { skills: 'Roadmapping, user stories, KPIs, stakeholder communication', experience: '4 Years' },
};

// Level badge colors
const LEVEL_COLORS = {
  beginner:     'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced:     'bg-red-100 text-red-700',
};

// In-memory cache shared across renders (survives re-renders, cleared on page refresh)
const questionCache = {};

const InterviewDetails = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [source, setSource] = useState('');

  const domain = DOMAIN_MAP[roleId] || roleId;
  const meta = ROLE_META[roleId] || { skills: domain, experience: 'N/A' };

  useEffect(() => {
    const load = async () => {
      // Return from cache if available
      if (questionCache[roleId]) {
        const cached = questionCache[roleId];
        setQuestions(cached.flat);
        setSource(cached.source);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await questionGeneratorAPI.generate(domain);
        const data = res.data;

        // Flatten beginner + intermediate + advanced into one list
        const all = [
          ...(data.questions?.beginner || []),
          ...(data.questions?.intermediate || []),
          ...(data.questions?.advanced || []),
        ];

        questionCache[roleId] = { flat: all, source: data.source || 'ai' };
        setQuestions(all);
        setSource(data.source || 'ai');
      } catch (err) {
        console.error('Failed to generate questions:', err);
        setError('Could not load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [roleId]);

  const toggle = (id) => setExpandedId(prev => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/interview-sections')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Interview Prep AI</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-900 hidden sm:block">
                {user?.name || 'User'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{domain}</h2>
          <p className="text-gray-600 mb-4">{meta.skills}</p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Experience: {meta.experience}
            </span>
            <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {questions.length} Questions
            </span>
            {source && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
                Source: {source}
              </span>
            )}
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Interview Q &amp; A</h3>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
              <p className="text-gray-600 font-medium">Generating AI-powered questions for {domain}...</p>
              <p className="text-gray-400 text-sm">This may take a few seconds</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex items-center space-x-3 bg-red-50 border border-red-200 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
              <button
                onClick={() => { delete questionCache[roleId]; setLoading(true); setError(null); }}
                className="ml-auto text-sm text-red-600 underline hover:text-red-800"
              >
                Retry
              </button>
            </div>
          )}

          {/* Questions List */}
          {!loading && !error && questions.length > 0 && (
            <div className="space-y-3">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-shadow hover:shadow-md"
                >
                  {/* Question Row */}
                  <div
                    className="flex items-start justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggle(q.id)}
                  >
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      {/* Level + Type badges */}
                      <div className="flex flex-col items-center space-y-1 flex-shrink-0 mt-0.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLORS[q.level] || 'bg-gray-100 text-gray-600'}`}>
                          {q.level}
                        </span>
                        {q.type === 'coding' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 flex items-center space-x-1">
                            <Code className="w-3 h-3" />
                            <span>code</span>
                          </span>
                        )}
                      </div>
                      <p className="text-gray-900 font-medium text-sm leading-relaxed">{q.question}</p>
                    </div>

                    <div className="flex items-center space-x-2 ml-3 flex-shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-1 text-purple-400 hover:text-purple-600 transition-colors"
                        title="Pin question"
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          expandedId === q.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Answer */}
                  {expandedId === q.id && (
                    <div className="border-t border-gray-100 bg-gray-50 px-4 pb-4 pt-4 space-y-4">
                      {/* Answer */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="w-4 h-4 text-green-600" />
                          <h4 className="text-sm font-semibold text-gray-700">Answer &amp; Explanation</h4>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                          {q.answer || 'No answer available.'}
                        </p>
                      </div>

                      {/* Hint */}
                      {q.hint && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-yellow-700 mb-1">Hint</p>
                            <p className="text-yellow-800 text-sm">{q.hint}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && questions.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No questions generated yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InterviewDetails;
