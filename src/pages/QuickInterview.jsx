import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft, ArrowRight, Loader2, Lightbulb, Code,
  CheckCircle, AlertCircle, RotateCcw, BookOpen, ChevronDown, User,
} from 'lucide-react';

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

const QuickInterview = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answered, setAnswered] = useState([]);
  const [source, setSource] = useState('');

  const domain = DOMAIN_MAP[sectionId] || sectionId;

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    setShowAnswer(false);
    setCurrent(0);
    setAnswered([]);

    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      const all = [
        ...(data.questions?.beginner || []),
        ...(data.questions?.intermediate || []),
        ...(data.questions?.advanced || []),
      ];

      if (all.length === 0) throw new Error('No questions returned from server');

      setQuestions(all);
      setSource(data.source || 'backend');
    } catch (err) {
      console.error('fetchQuestions error:', err);
      setError(err.message || 'Failed to generate questions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionId]);

  const q = questions[current];
  const total = questions.length;
  const progress = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        <p className="text-gray-700 font-medium text-lg">Generating questions for {domain}…</p>
        <p className="text-gray-400 text-sm">Calling AI — this takes a few seconds</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 text-sm mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate('/interview-sections')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
              Go Back
            </button>
            <button onClick={fetchQuestions}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (current >= total && total > 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Complete!</h2>
          <p className="text-gray-600 mb-2">You reviewed <span className="font-semibold text-blue-600">{total} questions</span> for</p>
          <p className="text-gray-800 font-semibold mb-2">{domain}</p>
          <p className="text-sm text-gray-500 mb-6">{answered.length} of {total} answers revealed</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => { setCurrent(0); setShowAnswer(false); setAnswered([]); }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Restart Session
            </button>
            <button onClick={fetchQuestions}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Generate New Questions
            </button>
            <button onClick={() => navigate('/interview-sections')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Back to Sections
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/interview-sections')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">{domain}</p>
            <p className="text-xs text-gray-400 capitalize">Source: {source}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-700 hidden sm:block">{user?.name || 'User'}</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {source === 'fallback' && (
          <div className="mb-4 flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-sm text-yellow-800">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Showing sample questions — AI service unavailable.</span>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {current + 1} of {total}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-1 mt-2">
            {questions.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < current ? 'bg-blue-400' : i === current ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${LEVEL_COLORS[q?.level] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                {q?.level}
              </span>
              {q?.type === 'coding' && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                  <Code className="w-3 h-3" /> Coding
                </span>
              )}
              <span className="text-xs text-gray-400 ml-auto">#{q?.id}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 leading-relaxed">{q?.question}</h2>
          </div>

          {q?.hint && (
            <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-100 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800"><span className="font-semibold">Hint:</span> {q.hint}</p>
            </div>
          )}

          <div className="px-6 py-5">
            {!showAnswer ? (
              <button onClick={() => { setShowAnswer(true); if (!answered.includes(current)) setAnswered(p => [...p, current]); }}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all font-medium">
                <ChevronDown className="w-5 h-5" />
                Reveal Answer &amp; Explanation
              </button>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Answer &amp; Explanation</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line bg-green-50 border border-green-100 rounded-xl p-4">
                  {q?.answer || 'No answer available.'}
                </p>
              </div>
            )}
          </div>

          <div className="px-6 pb-6 flex items-center justify-between">
            <button onClick={() => { setShowAnswer(false); setCurrent(p => p - 1); }} disabled={current === 0}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-xs text-gray-400">{answered.length} revealed</span>
            <button onClick={() => { setShowAnswer(false); setCurrent(p => p + 1); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              {current === total - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question list */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">All Questions</p>
          <div className="space-y-1">
            {questions.map((item, i) => (
              <button key={i} onClick={() => { setCurrent(i); setShowAnswer(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                  i === current ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === current ? 'bg-blue-600 text-white' :
                  answered.includes(i) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
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
