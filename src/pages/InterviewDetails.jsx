import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { interviewAPI } from '../services/api';
import { 
  ChevronDown, 
  Pin, 
  Sparkles, 
  User,
  ArrowLeft,
  Loader2,
  Play, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Target,
  Users,
  TrendingUp,
  Award,
  Calendar,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

const InterviewDetails = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleInfo, setRoleInfo] = useState({
    title: '',
    skills: '',
    experience: '',
    qaCount: '',
    lastUpdated: ''
  });

  // Mock role data - in a real app, this would come from an API
  const roles = {
    frontend: {
      title: 'Frontend Developer',
      skills: 'React.js, DOM manipulation, CSS Flexbox',
      experience: '2 Years',
      questions: [
        {
          id: 1,
          question: 'Explain the Virtual DOM in React and how it improves performance.',
          answer: 'The Virtual DOM is a lightweight copy of the actual DOM. React uses it to optimize rendering by comparing the virtual DOM with the real DOM and only updating what has changed.',
          category: 'technical'
        },
        {
          id: 2,
          question: 'What are the differences between controlled and uncontrolled components?',
          answer: 'Controlled components have their state managed by React, while uncontrolled components manage their own state internally using refs.',
          category: 'technical'
        },
        {
          id: 3,
          question: 'How would you handle state management in a large React application?',
          answer: 'For large applications, I would use Redux, Context API, or Zustand depending on the complexity and team preferences.',
          category: 'technical'
        }
      ]
    },
    backend: {
      title: 'Backend Developer',
      skills: 'Node.js, Express, REST APIs, MongoDB',
      experience: '3 Years',
      questions: [
        {
          id: 1,
          question: 'Explain the difference between SQL and NoSQL databases.',
          answer: 'SQL databases are relational and use structured query language, while NoSQL databases are non-relational and can store data in various formats.',
          category: 'technical'
        },
        {
          id: 2,
          question: 'How would you design a scalable microservices architecture?',
          answer: 'I would use containerization with Docker, orchestration with Kubernetes, and implement proper service discovery and load balancing.',
          category: 'technical'
        }
      ]
    },
    fullstack: {
      title: 'Full Stack Developer',
      skills: 'MERN stack, deployment strategies, authentication',
      experience: '4 Years',
      questions: [
        {
          id: 1,
          question: 'How would you implement JWT authentication in a MERN stack application?',
          answer: 'I would create JWT tokens on login, store them securely, and verify them on protected routes using middleware.',
          category: 'technical'
        }
      ]
    }
  };

  const currentRole = roles[roleId] || roles.frontend;

  // Cache for generated questions to avoid repeated API calls
  const [questionCache, setQuestionCache] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const cacheKey = `${roleId}-questions`;
      
      // Check cache first
      if (questionCache[cacheKey]) {
        setQuestions(questionCache[cacheKey]);
        setRoleInfo({
          title: currentRole.title,
          skills: currentRole.skills,
          experience: currentRole.experience,
          qaCount: `${questionCache[cacheKey].length} Q&A`,
          lastUpdated: '3rd May 2025'
        });
        return;
      }

      try {
        setLoading(true);
        const response = await interviewAPI.generateQuestions({
          domain: roleId,
          experience: 'mid',
          categories: ['technical', 'behavioral', 'hr'],
          count: 10
        });

        // Cache the questions
        setQuestionCache(prev => ({ ...prev, [cacheKey]: response.data.questions }));
        setQuestions(response.data.questions);
        setRoleInfo({
          title: currentRole.title,
          skills: currentRole.skills,
          experience: currentRole.experience,
          qaCount: `${response.data.questions.length} Q&A`,
          lastUpdated: '3rd May 2025'
        });
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Fallback to mock questions
        setQuestions(currentRole.questions);
        setRoleInfo({
          title: currentRole.title,
          skills: currentRole.skills,
          experience: currentRole.experience,
          qaCount: `${currentRole.questions.length} Q&A`,
          lastUpdated: '3rd May 2025'
        });
        console.warn('API request failed, using sample questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [roleId]); // Removed currentRole from dependencies to prevent unnecessary calls

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleStartInterview = async () => {
    try {
      setLoading(true);
      
      // Start a new interview session
      const response = await interviewAPI.startInterview({
        domain: roleId, // Use the roleId as domain (frontend, backend, etc.)
        experience: user?.profile?.experience || 'mid',
        totalQuestions: 10,
        timeLimit: 30,
        categories: ['technical', 'behavioral', 'hr']
      });

      if (response.data.success) {
        toast.success('Interview started successfully!');
        navigate(`/interview/${response.data.interview.id}`);
      } else {
        toast.error('Failed to start interview. Please try again.');
      }
    } catch (error) {
      console.error('Error starting interview:', error);
      toast.error('Failed to start interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - App title and back button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Interview Prep AI
              </h1>
            </div>

            {/* Right side - User profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'Mike William'}
                  </p>
                  <button className="text-sm text-orange-600 hover:text-orange-700 transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {roleInfo?.title || currentRole.title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            {roleInfo?.skills || currentRole.skills}
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              Experience: {roleInfo?.experience || currentRole.experience}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {roleInfo?.qaCount || currentRole.qaCount}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              Last Updated: {roleInfo?.lastUpdated || currentRole.lastUpdated}
            </span>
          </div>
        </div>

        {/* Interview Q&A Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Interview Q & A
          </h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-600">Generating AI questions...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
              <div
                key={question.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">Q</span>
                      </div>
                      <span className="text-gray-900 font-medium">
                        {question.question}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-purple-600 hover:text-purple-700 transition-colors">
                        <Pin className="w-4 h-4" />
                      </button>
                      <button className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-colors">
                        <Sparkles className="w-4 h-4" />
                        <span>Learn More</span>
                      </button>
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${
                            expandedQuestions.has(question.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                
                                 {expandedQuestions.has(question.id) && (
                   <div className="px-4 pb-4 bg-gray-50">
                     <div className="pt-4">
                       <h4 className="text-sm font-medium text-gray-700 mb-2">Answer:</h4>
                       <p className="text-gray-600 text-sm leading-relaxed">
                         {question.answer || "AI-generated answer will appear here when you start the interview session."}
                       </p>
                     </div>
                   </div>
                 )}
               </div>
             ))}
           </div>
          )}

          {/* Start Interview Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleStartInterview}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Interview Session
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewDetails; 