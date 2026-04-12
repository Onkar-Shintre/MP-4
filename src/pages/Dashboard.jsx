import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { interviewAPI } from '../services/api';
import toast from 'react-hot-toast';
import { 
  Play, 
  Plus, 
  Trash2,
  User,
  X,
  Clock,
  Target,
  Video,
  BookOpen,
  BarChart3,
  Camera,
  Settings,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  FileText,
  Zap,
  Star,
  Code,
  Brain,
  Award,
  Users,
  Activity,
  Bell,
  Search,
  Menu,
  LogOut,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    targetRole: '',
    yearsOfExperience: '',
    topicsToFocus: '',
    description: ''
  });
  const [recentSessions, setRecentSessions] = useState([
    {
      id: '1',
      role: 'Frontend Developer',
      description: 'React, JavaScript, CSS interview preparation',
      status: 'completed',
      duration: '30 min',
      questions: 10
    },
    {
      id: '2',
      role: 'Backend Developer',
      description: 'Node.js, Express, MongoDB practice session',
      status: 'in-progress',
      duration: '45 min',
      questions: 15
    },
    {
      id: '3',
      role: 'Full Stack Developer',
      description: 'MERN stack comprehensive interview',
      status: 'pending',
      duration: '60 min',
      questions: 20
    }
  ]);

  // Update time every second for live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Entrance animation effect - wait for auth loading to complete
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Handle clicking outside search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setSearchResults([]);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if no user
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleClick = (roleId) => {
    navigate(`/interview-details/${roleId}`);
  };

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      targetRole: '',
      yearsOfExperience: '',
      topicsToFocus: '',
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSession = async () => {
    try {
      const response = await interviewAPI.startInterview({
        domain: formData.targetRole.toLowerCase().replace(/\s+/g, '-'),
        experience: formData.yearsOfExperience <= 2 ? 'entry' : formData.yearsOfExperience <= 5 ? 'mid' : 'senior',
        totalQuestions: 10,
        timeLimit: 30,
        categories: ['technical', 'behavioral'],
        customTopics: formData.topicsToFocus,
        description: formData.description
      });

      console.log('Custom interview created:', response.data);
      
      // Add the new session to the recent sessions list
      const newSession = {
        id: response.data.interview.id,
        role: formData.targetRole,
        description: formData.description || `Interview preparation for ${formData.targetRole}`,
        status: 'pending',
        duration: '30 min',
        questions: 10
      };
      
      setRecentSessions(prev => [newSession, ...prev.slice(0, 2)]); // Keep only 3 sessions
      
      handleCloseModal();
      navigate(`/interview/${response.data.interview.id}`);
      toast.success('Interview session created successfully!');
    } catch (error) {
      console.error('Error creating interview:', error);
      const message = error.response?.data?.message || 'Failed to create interview session. Please try again.';
      toast.error(message);
    }
  };

  const handleStatisticsClick = () => {
    navigate('/register');
  };

  const handleSessionClick = (session) => {
    console.log('Session clicked:', session);
    // Navigate to the interview page or show session details
    navigate(`/interview/${session.id}`);
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // Show suggestions immediately when user starts typing
    if (query.length >= 1) {
      // Mock search results - in real implementation, this would call an API
      const mockResults = [
        {
          type: 'question',
          title: 'Explain React Hooks',
          category: 'Technical - React',
          id: 'react-hooks-1'
        },
        {
          type: 'question',
          title: 'Tell me about a challenging project',
          category: 'Behavioral - Leadership',
          id: 'behavioral-leadership-1'
        },
        {
          type: 'session',
          title: 'Frontend Developer Mock Interview',
          category: 'Practice Session',
          id: 'session-1'
        },
        {
          type: 'topic',
          title: 'JavaScript Fundamentals',
          category: 'Learning Topic',
          id: 'topic-js-1'
        },
        {
          type: 'resource',
          title: 'Interview Preparation Guide',
          category: 'Resource',
          id: 'resource-1'
        },
        {
          type: 'question',
          title: 'React State Management',
          category: 'Technical - React',
          id: 'react-state-1'
        },
        {
          type: 'question',
          title: 'System Design Principles',
          category: 'Technical - System Design',
          id: 'system-design-1'
        },
        {
          type: 'session',
          title: 'Backend Developer Interview',
          category: 'Practice Session',
          id: 'session-2'
        }
      ].filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  // Get feature suggestions based on search query
  const getFeatureSuggestions = (query) => {
    const suggestions = [];
    const lowerQuery = query.toLowerCase();

    // Technical topics
    if (lowerQuery.includes('react') || lowerQuery.includes('javascript') || lowerQuery.includes('frontend')) {
      suggestions.push(
        { icon: Target, title: 'Start React Practice Session', action: 'practice', color: 'bg-blue-500' },
        { icon: Video, title: 'Mock Frontend Interview', action: 'mock-interview', color: 'bg-green-500' },
        { icon: BookOpen, title: 'View React Resources', action: 'resources', color: 'bg-purple-500' }
      );
    }

    // Behavioral topics
    if (lowerQuery.includes('behavioral') || lowerQuery.includes('leadership') || lowerQuery.includes('teamwork')) {
      suggestions.push(
        { icon: Users, title: 'Behavioral Interview Practice', action: 'behavioral-practice', color: 'bg-indigo-500' },
        { icon: Brain, title: 'Leadership Questions', action: 'leadership-questions', color: 'bg-pink-500' },
        { icon: Award, title: 'Teamwork Scenarios', action: 'teamwork-scenarios', color: 'bg-orange-500' }
      );
    }

    // General interview topics
    if (lowerQuery.includes('interview') || lowerQuery.includes('practice') || lowerQuery.includes('mock')) {
      suggestions.push(
        { icon: Play, title: 'Start New Interview', action: 'new-interview', color: 'bg-blue-500' },
        { icon: BarChart3, title: 'View Performance Analytics', action: 'analytics', color: 'bg-green-500' },
        { icon: Clock, title: 'Recent Practice Sessions', action: 'recent-sessions', color: 'bg-purple-500' }
      );
    }

    // Technical skills
    if (lowerQuery.includes('python') || lowerQuery.includes('java') || lowerQuery.includes('backend')) {
      suggestions.push(
        { icon: Code, title: 'Backend Development Practice', action: 'backend-practice', color: 'bg-blue-500' },
        { icon: Target, title: 'Python Interview Questions', action: 'python-questions', color: 'bg-green-500' },
        { icon: BookOpen, title: 'Programming Resources', action: 'programming-resources', color: 'bg-purple-500' }
      );
    }

    // Data science topics
    if (lowerQuery.includes('data') || lowerQuery.includes('ml') || lowerQuery.includes('ai')) {
      suggestions.push(
        { icon: Brain, title: 'Data Science Interview', action: 'data-science-interview', color: 'bg-blue-500' },
        { icon: TrendingUp, title: 'ML/AI Questions', action: 'ml-questions', color: 'bg-green-500' },
        { icon: BarChart3, title: 'Analytics Practice', action: 'analytics-practice', color: 'bg-purple-500' }
      );
    }

    // Default suggestions if no specific matches
    if (suggestions.length === 0) {
      suggestions.push(
        { icon: Target, title: 'Start Practice Session', action: 'practice', color: 'bg-blue-500' },
        { icon: Video, title: 'Mock Interview', action: 'mock-interview', color: 'bg-green-500' },
        { icon: BookOpen, title: 'Browse Resources', action: 'resources', color: 'bg-purple-500' },
        { icon: BarChart3, title: 'View Analytics', action: 'analytics', color: 'bg-orange-500' }
      );
    }

    return suggestions.slice(0, 4); // Limit to 4 suggestions
  };

  const handleSearchResultClick = (result) => {
    setSearchQuery('');
    setSearchResults([]);
    
    // Navigate based on result type
    switch (result.type) {
      case 'question':
        navigate(`/interview?topic=${result.id}`);
        break;
      case 'session':
        navigate(`/interview/${result.id}`);
        break;
      case 'topic':
        navigate(`/interview-sections?topic=${result.id}`);
        break;
      case 'resource':
        navigate(`/resources/${result.id}`);
        break;
      default:
        break;
    }
  };

  const handleFeatureSuggestionClick = (suggestion) => {
    setSearchQuery('');
    setSearchResults([]);
    
    // Navigate based on suggestion action
    switch (suggestion.action) {
      case 'practice':
        navigate('/interview');
        break;
      case 'mock-interview':
        navigate('/interview');
        break;
      case 'resources':
        navigate('/interview-sections');
        break;
      case 'analytics':
        navigate('/analytics');
        break;
      case 'behavioral-practice':
        navigate('/interview?category=behavioral');
        break;
      case 'leadership-questions':
        navigate('/interview?category=leadership');
        break;
      case 'teamwork-scenarios':
        navigate('/interview?category=teamwork');
        break;
      case 'new-interview':
        navigate('/interview');
        break;
      case 'recent-sessions':
        navigate('/dashboard?tab=sessions');
        break;
      case 'backend-practice':
        navigate('/interview?category=backend');
        break;
      case 'python-questions':
        navigate('/interview?category=python');
        break;
      case 'programming-resources':
        navigate('/interview-sections?category=programming');
        break;
      case 'data-science-interview':
        navigate('/interview?category=data-science');
        break;
      case 'ml-questions':
        navigate('/interview?category=ml-ai');
        break;
      case 'analytics-practice':
        navigate('/interview?category=analytics');
        break;
      default:
        navigate('/interview');
        break;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Mock data for the dashboard
  const keyMetrics = [
    {
      title: 'Questions Practiced',
      value: '247',
      change: '+25',
      icon: FileText,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-white'
    },
    {
      title: 'Practice Hours',
      value: '28.5',
      change: '+6.2',
      icon: Clock,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-white'
    },
    {
      title: 'Success Rate',
      value: '87%',
      change: '+8%',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-white'
    },
    {
      title: 'Interviews This Week',
      value: '3',
      change: '+1',
      icon: Calendar,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      textColor: 'text-white'
    }
  ];

  const quickActions = [
    {
      title: 'Start Practice Session',
      description: 'Begin a new interview practice session',
      icon: Target,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      action: () => navigate('/interview')
    },
    {
      title: 'Mock Interview',
      description: 'AI-powered mock interview simulation',
      icon: Video,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      action: () => navigate('/interview')
    },

    {
      title: 'Interview Sections',
      description: 'Browse specialized interview categories',
      icon: Code,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      action: () => navigate('/interview-sections')
    },
    {
      title: 'Profile Settings',
      description: 'Update your performance and goals',
      icon: Settings,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      action: () => navigate('/profile')
    },
    {
      title: 'Resume Analyzer',
      description: 'AI-powered resume analysis and optimization',
      icon: FileText,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      action: () => {
        console.log('Resume Analyzer button clicked');
        navigate('/resume-home');
      }
    },
    {
      title: 'Share Feedback',
      description: 'Help us improve InterviewAce with your suggestions',
      icon: MessageCircle,
      color: 'bg-gradient-to-br from-teal-500 to-teal-600',
      action: () => {
        console.log('Feedback button clicked');
        navigate('/feedback');
      }
    },
    {
      title: 'View Analytics',
      description: 'Track platform performance and user insights',
      icon: BarChart3,
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      action: () => {
        console.log('Analytics button clicked');
        navigate('/analytics');
      }
    }
  ];

  const upcomingInterviews = [
    {
      company: 'TechFlow Systems',
      role: 'Senior Financial Developer',
      date: 'Today, 07:30 PM',
      type: 'Technical Round',
      interviewer: 'Sarah Chen',
      status: 'confirmed'
    },
    {
      company: 'InnovateCorp',
      role: 'Product Manager',
      date: 'Tomorrow, 10:00 AM',
      type: 'Behavioral Round',
      interviewer: 'Michael Rodriguez',
      status: 'pending'
    },
    {
      company: 'DataViz Inc',
      role: 'Data Scientist',
      date: 'Friday, 02:00 PM',
      type: 'Final Round',
      interviewer: 'Emily Johnson',
      status: 'confirmed'
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: 4, total: 5 },
    { day: 'Tue', completed: 3, total: 4 },
    { day: 'Wed', completed: 5, total: 5 },
    { day: 'Thu', completed: 2, total: 3 },
    { day: 'Fri', completed: 4, total: 4 },
    { day: 'Sat', completed: 3, total: 4 },
    { day: 'Sun', completed: 1, total: 2 }
  ];

  const dailyTip = {
    title: "Today's Interview Tip",
    content: "Practice the STAR method for behavioral questions: Situation, Task, Action, Result. This structured approach helps you provide clear, compelling answers.",
    icon: Brain
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 transition-all duration-1000 ${
      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Header */}
      <header className={`relative bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-700 delay-200 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                {/* Logo Icon Only */}
                <div className="relative group">
                  {/* Custom Interview Icon - Blue Format */}
                  <svg 
                    className={`w-8 h-8 text-blue-600 relative z-10 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 group-hover:scale-105 ${
                      isLoaded ? 'animate-pulse' : ''
                    }`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Main Interview/Meeting Symbol */}
                    <path 
                      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" 
                      fill="currentColor"
                    />
                    {/* AI/Technology Dots */}
                    <circle cx="8" cy="12" r="1.2" fill="currentColor" opacity="0.9"/>
                    <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.9"/>
                    <circle cx="16" cy="12" r="1.2" fill="currentColor" opacity="0.9"/>
                    {/* Connection Lines for AI/Network */}
                    <path 
                      d="M8 12H16" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                    {/* Interview Success Indicator */}
                    <path 
                      d="M9 16L11 18L15 14" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      opacity="0.8"
                    />
                  </svg>
                </div>
                
                {/* Logo Text */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-600 leading-tight">
                    InterviewAce
                  </span>
                  <span className="text-xs text-gray-500 font-medium -mt-1">
                    AI-Powered Interview Prep
                  </span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 search-container">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions, topics, sessions, resources..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {/* Search Suggestions Dropdown */}
                {searchQuery.length >= 1 && (searchResults.length > 0 || getFeatureSuggestions(searchQuery).length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <>
                        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 rounded-t-xl">
                          <div className="flex items-center space-x-2">
                            <Search className="w-4 h-4 text-blue-600" />
                            <h3 className="text-sm font-semibold text-gray-700">Search Results ({searchResults.length})</h3>
                          </div>
                        </div>
                        {searchResults.map((result, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer border-b border-gray-100 transition-all duration-200"
                            onClick={() => handleSearchResultClick(result)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-sm">
                                {result.type === 'question' && <FileText className="w-5 h-5 text-blue-600" />}
                                {result.type === 'session' && <Video className="w-5 h-5 text-blue-600" />}
                                {result.type === 'topic' && <BookOpen className="w-5 h-5 text-blue-600" />}
                                {result.type === 'resource' && <Brain className="w-5 h-5 text-blue-600" />}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-sm">{result.title}</div>
                                <div className="text-xs text-gray-500 flex items-center space-x-2 mt-1">
                                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{result.category}</span>
                                  <span className="text-gray-400">•</span>
                                  <span className="capitalize">{result.type}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Feature Suggestions */}
                    {getFeatureSuggestions(searchQuery).length > 0 && (
                      <>
                        <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-green-600" />
                            <h3 className="text-sm font-semibold text-gray-700">Suggested Features</h3>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-2">
                          {getFeatureSuggestions(searchQuery).map((suggestion, index) => (
                            <div
                              key={`suggestion-${index}`}
                              className="px-3 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 cursor-pointer rounded-lg transition-all duration-200 group"
                              onClick={() => handleFeatureSuggestionClick(suggestion)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-12 h-12 ${suggestion.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                                  <suggestion.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900 text-sm group-hover:text-gray-700 transition-colors">
                                    {suggestion.title}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                                    <span className="px-2 py-1 bg-gray-100 rounded-full">Quick Action</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-green-600 font-medium">Click to explore</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {/* No Results Message */}
                    {searchResults.length === 0 && getFeatureSuggestions(searchQuery).length === 0 && (
                      <div className="px-4 py-6 text-center">
                        <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
                        <p className="text-gray-400 text-xs mt-1">Try different keywords or check our suggested features</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Contact Support"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
                  <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  <button
                    onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-gray-900"
                  >
                  <LogOut className="w-5 h-5" />
                  </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
                </button>
            </div>
            
            <nav className="flex-1 p-6 space-y-2">
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
                <Activity className="w-5 h-5" />
                <span>Overview</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Target className="w-5 h-5" />
                <span>Practice</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <BookOpen className="w-5 h-5" />
                <span>Resources</span>
              </a>
              <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contact</span>
              </button>
              <button
                onClick={() => navigate('/feedback')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Feedback</span>
              </button>
              <button
                onClick={() => navigate('/analytics')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 lg:p-8 relative overflow-hidden">
          {/* Background Design Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
            
            {/* Floating Shapes */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-400/15 to-blue-400/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* AI/Interview Themed Shapes */}
            <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-300/30 to-indigo-300/30 rounded-lg rotate-45 blur-sm"></div>
            <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-purple-300/25 to-pink-300/25 rounded-full blur-sm"></div>
            
            {/* Circuit Board Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="currentColor" className="text-blue-600"/>
                    <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-blue-600"/>
                    <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-blue-600"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#circuit)"/>
              </svg>
            </div>
            
            {/* Interview Icons Floating */}
            <div className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-br from-blue-400/40 to-indigo-400/40 rounded-lg flex items-center justify-center blur-sm">
              <Brain className="w-4 h-4 text-blue-600" />
            </div>
            <div className="absolute top-1/3 right-10 w-8 h-8 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-lg flex items-center justify-center blur-sm">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-gradient-to-br from-indigo-400/40 to-blue-400/40 rounded-lg flex items-center justify-center blur-sm">
              <Video className="w-4 h-4 text-indigo-600" />
            </div>
            
            {/* Geometric Shapes */}
            <div className="absolute top-10 right-1/4 w-12 h-12 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-lg rotate-12"></div>
            <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-300/15 to-pink-300/15 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-indigo-300/10 to-blue-300/10 rounded-lg rotate-45"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10">
            {/* Welcome Section */}
            <div className={`mb-8 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                  </h1>
                  <p className="text-gray-600">
                    Ready to ace your next interview? Here's your progress overview.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Current Time</p>
                  <p className="text-lg font-semibold text-gray-900">{formatTime(currentTime)}</p>
                </div>
              </div>
            </div>

          {/* Key Metrics */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-700 delay-400 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {keyMetrics.map((metric, index) => (
              <div 
                key={index} 
                className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <p className="text-sm text-green-600 mt-1">{metric.change} this week</p>
                  </div>
                  <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className={`mb-8 transition-all duration-700 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`Clicked: ${action.title}`);
                    console.log('Button clicked, action:', action.action);
                    if (action.action) {
                      console.log('Executing action...');
                      action.action();
                    } else {
                      console.log('No action found');
                    }
                  }}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 text-left hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 active:scale-95 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${600 + index * 50}ms` }}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Interview Sessions */}
          <div className={`mb-8 transition-all duration-700 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Interview Sessions</h2>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSessions.map((session, index) => (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                  onClick={() => handleSessionClick(session)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      session.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : session.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{session.role}</h3>
                  <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {session.duration}
                    </span>
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {session.questions} Qs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Interviews */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Interviews</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                </div>
                <div className="space-y-4">
                  {upcomingInterviews.map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 backdrop-blur-sm rounded-lg border border-gray-100/50">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{interview.company}</h3>
                        <p className="text-sm text-gray-600">{interview.role}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">{interview.date}</span>
                          <span className="text-xs text-gray-500">{interview.type}</span>
                          <span className="text-xs text-gray-500">with {interview.interviewer}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          interview.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {interview.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Progress */}
            <div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h2>
                <div className="space-y-3">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{day.day}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200/50 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                            style={{ width: `${(day.completed / day.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{day.completed}/{day.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Tip */}
              <div className="bg-gradient-to-br from-blue-500/90 to-indigo-600/90 backdrop-blur-sm rounded-xl p-6 text-white shadow-lg border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <dailyTip.icon className="w-6 h-6" />
                  <h3 className="font-semibold">{dailyTip.title}</h3>
                </div>
                <p className="text-sm text-blue-100 leading-relaxed">{dailyTip.content}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

      {/* Floating Feedback Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => navigate('/feedback')}
          className="group bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
          title="Share Feedback"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Share Feedback
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      {/* Modal for creating new session */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create New Session</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCreateSession(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
                <input
                  type="text"
                  name="targetRole"
                  value={formData.targetRole}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topics to Focus</label>
                <input
                  type="text"
                  name="topicsToFocus"
                  value={formData.topicsToFocus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., React, JavaScript, System Design"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any specific requirements or notes..."
                />
            </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Session
              </button>
            </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 