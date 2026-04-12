import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle,
  Brain,
  MessageCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Zap,
  Target,
  BookOpen,
  Video,
  Settings,
  FileText,
  BarChart3,
  Users,
  Heart,
  Lightbulb,
  Bug,
  Award,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { feedbackAPI } from '../services/api';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    rating: 0,
    satisfaction: 'satisfied',
    message: '',
    features: [],
    improvements: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allFeedback, setAllFeedback] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const feedbackCategories = [
    { value: 'general', label: 'General Feedback', icon: MessageCircle, color: 'bg-blue-500' },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'bg-green-500' },
    { value: 'bug', label: 'Bug Report', icon: Bug, color: 'bg-red-500' },
    { value: 'improvement', label: 'Improvement Suggestion', icon: Target, color: 'bg-purple-500' },
    { value: 'interview', label: 'Interview Experience', icon: Video, color: 'bg-indigo-500' },
    { value: 'ui-ux', label: 'UI/UX Feedback', icon: Heart, color: 'bg-pink-500' }
  ];

  const satisfactionLevels = [
    { value: 'very-satisfied', label: 'Very Satisfied', icon: Smile, color: 'text-green-600', bgColor: 'bg-green-100' },
    { value: 'satisfied', label: 'Satisfied', icon: Smile, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { value: 'dissatisfied', label: 'Dissatisfied', icon: Frown, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { value: 'very-dissatisfied', label: 'Very Dissatisfied', icon: Frown, color: 'text-red-600', bgColor: 'bg-red-100' }
  ];

  const featureOptions = [
    { value: 'ai-interviews', label: 'AI Interview Questions', icon: Brain },
    { value: 'practice-sessions', label: 'Practice Sessions', icon: Target },
    { value: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
    { value: 'resources', label: 'Learning Resources', icon: BookOpen },
    { value: 'resume-analyzer', label: 'Resume Analyzer', icon: FileText },
    { value: 'mock-interviews', label: 'Mock Interviews', icon: Video },
    { value: 'profile-settings', label: 'Profile Settings', icon: Settings },
    { value: 'user-interface', label: 'User Interface', icon: Heart }
  ];

  const improvementAreas = [
    { value: 'performance', label: 'Performance & Speed', icon: Zap },
    { value: 'accuracy', label: 'Question Accuracy', icon: Target },
    { value: 'interface', label: 'User Interface', icon: Heart },
    { value: 'mobile', label: 'Mobile Experience', icon: Users },
    { value: 'content', label: 'Content Quality', icon: BookOpen },
    { value: 'features', label: 'Feature Set', icon: Lightbulb }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSatisfactionChange = (satisfaction) => {
    setFormData(prev => ({
      ...prev,
      satisfaction
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImprovementToggle = (improvement) => {
    setFormData(prev => ({
      ...prev,
      improvements: prev.improvements.includes(improvement)
        ? prev.improvements.filter(i => i !== improvement)
        : [...prev.improvements, improvement]
    }));
  };

  // Fetch all feedback for display
  const fetchAllFeedback = async () => {
    setLoadingFeedback(true);
    try {
      const response = await feedbackAPI.getAllFeedback();
      if (response.data.success) {
        setAllFeedback(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      // For demo purposes, create some mock feedback data
      setAllFeedback([
        {
          _id: '1',
          name: 'John Doe',
          category: 'feature',
          rating: 5,
          satisfaction: 'very-satisfied',
          message: 'Great platform! The AI interview questions are really helpful for practice.',
          features: ['ai-interviews', 'analytics'],
          improvements: ['performance'],
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          tags: ['feature', 'ai-interviews', 'analytics', 'positive']
        },
        {
          _id: '2',
          name: 'Sarah Wilson',
          category: 'improvement',
          rating: 4,
          satisfaction: 'satisfied',
          message: 'Love the interface! Would be great to have more mobile-friendly features.',
          features: ['user-interface'],
          improvements: ['mobile', 'interface'],
          createdAt: new Date(Date.now() - 172800000), // 2 days ago
          tags: ['improvement', 'user-interface', 'mobile', 'positive']
        },
        {
          _id: '3',
          name: 'Mike Chen',
          category: 'general',
          rating: 5,
          satisfaction: 'very-satisfied',
          message: 'Excellent resource for interview preparation. The practice sessions are very realistic.',
          features: ['practice-sessions', 'mock-interviews'],
          improvements: ['accuracy'],
          createdAt: new Date(Date.now() - 259200000), // 3 days ago
          tags: ['general', 'practice-sessions', 'mock-interviews', 'positive']
        }
      ]);
    } finally {
      setLoadingFeedback(false);
    }
  };

  // Load feedback when component mounts
  useEffect(() => {
    fetchAllFeedback();
  }, []);

  // Handle refresh button click
  const handleRefresh = () => {
    fetchAllFeedback();
    toast.success('Feedback list refreshed!');
  };

  // Handle delete feedback
  const handleDeleteClick = (feedback) => {
    setFeedbackToDelete(feedback);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!feedbackToDelete) return;
    
    setIsDeleting(true);
    try {
      // For demo purposes, remove from local state
      // In real implementation, call API to delete
      setAllFeedback(prev => prev.filter(f => f._id !== feedbackToDelete._id));
      toast.success('Feedback deleted successfully!');
      setShowDeleteModal(false);
      setFeedbackToDelete(null);
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Failed to delete feedback. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setFeedbackToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Client-side validation
      const errors = [];
      
      if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
      }
      
      if (!formData.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
      }
      
      if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
      }
      
      if (errors.length > 0) {
        toast.error(errors.join(', '));
        setIsSubmitting(false);
        return;
      }

      // Submit feedback using API
      const response = await feedbackAPI.submitFeedback(formData);
      console.log('✅ Feedback API response:', response);

      if (response.data.success) {
        toast.success('Thank you for your feedback! We appreciate your input.');
        setIsSubmitted(true);
        // Refresh the feedback list
        fetchAllFeedback();
      } else {
        throw new Error(response.data.message || 'Failed to submit feedback');
      }
      setFormData({
        name: '',
        email: '',
        category: 'general',
        rating: 0,
        satisfaction: 'satisfied',
        message: '',
        features: [],
        improvements: []
      });
    } catch (error) {
      console.error('❌ Feedback submission error:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error message:', error.message);
      
      // Handle different types of errors
      if (error.response?.status === 404) {
        toast.error('Feedback endpoint not found. Please check server configuration.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Network error. Please check your connection.');
      } else if (error.response?.status === 400 && error.response?.data?.errors) {
        // Handle validation errors from backend
        const validationErrors = error.response.data.errors.join(', ');
        toast.error(`Validation failed: ${validationErrors}`);
      } else {
        toast.error(error.response?.data?.message || error.message || 'Failed to submit feedback. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. We value your input and will use it to improve InterviewAce.
          </p>
          <div className="space-y-3">
            <Link
              to="/dashboard"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={() => setIsSubmitted(false)}
              className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Submit Another Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              {/* Logo Icon Only */}
              <div className="relative group">
                {/* Custom Interview Icon - Blue Format */}
                <svg 
                  className="w-8 h-8 text-blue-600 relative z-10 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 group-hover:scale-105" 
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
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Feedback
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us improve InterviewAce by sharing your thoughts, suggestions, and experiences. 
            Your feedback drives our development and helps create a better platform for everyone.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Feedback Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Feedback Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                What type of feedback are you providing? *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {feedbackCategories.map((category) => (
                  <label
                    key={category.value}
                    className={`relative cursor-pointer group ${
                      formData.category === category.value
                        ? 'ring-2 ring-blue-500 ring-offset-2'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.category === category.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-900 text-sm">{category.label}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Overall Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                How would you rate your overall experience with InterviewAce? *
              </label>
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      formData.rating >= star
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-300 hover:text-gray-400'
                    }`}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        formData.rating >= star ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="text-center mt-2">
                <span className="text-sm text-gray-600">
                  {formData.rating === 0 && 'Click to rate'}
                  {formData.rating === 1 && 'Poor'}
                  {formData.rating === 2 && 'Fair'}
                  {formData.rating === 3 && 'Good'}
                  {formData.rating === 4 && 'Very Good'}
                  {formData.rating === 5 && 'Excellent'}
                </span>
              </div>
            </div>

            {/* Satisfaction Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                How satisfied are you with InterviewAce? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {satisfactionLevels.map((level) => (
                  <label
                    key={level.value}
                    className={`relative cursor-pointer group ${
                      formData.satisfaction === level.value
                        ? 'ring-2 ring-blue-500 ring-offset-2'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="satisfaction"
                      value={level.value}
                      checked={formData.satisfaction === level.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                      formData.satisfaction === level.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                      <level.icon className={`w-8 h-8 ${level.color} mx-auto mb-2`} />
                      <div className="text-xs font-medium text-gray-700">{level.label}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Feature Feedback */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Which features would you like us to improve or add? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {featureOptions.map((feature) => (
                  <label
                    key={feature.value}
                    className="relative cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature.value)}
                      onChange={() => handleFeatureToggle(feature.value)}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                      formData.features.includes(feature.value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                      <feature.icon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-xs font-medium text-gray-700">{feature.label}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Improvement Areas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                What areas should we focus on improving? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {improvementAreas.map((area) => (
                  <label
                    key={area.value}
                    className="relative cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={formData.improvements.includes(area.value)}
                      onChange={() => handleImprovementToggle(area.value)}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                      formData.improvements.includes(area.value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                      <area.icon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-xs font-medium text-gray-700">{area.label}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Detailed Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Please share your detailed feedback, suggestions, or experiences *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell us about your experience, what you liked, what could be improved, or any specific suggestions you have..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

          {/* Right Column - Feedback Display */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Community Feedback</h2>
              <button
                onClick={handleRefresh}
                className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                title="Refresh feedback"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {loadingFeedback ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading feedback...</span>
              </div>
            ) : allFeedback.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No feedback yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {allFeedback.map((feedback) => (
                  <div key={feedback._id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition-all duration-200 hover:shadow-md">
                    {/* Feedback Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {feedback.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
                            {/* Show "Your Feedback" indicator for demo purposes */}
                            {feedback.name === formData.name && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                Your Feedback
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              feedback.category === 'feature' ? 'bg-green-100 text-green-800' :
                              feedback.category === 'bug' ? 'bg-red-100 text-red-800' :
                              feedback.category === 'improvement' ? 'bg-purple-100 text-purple-800' :
                              feedback.category === 'interview' ? 'bg-indigo-100 text-indigo-800' :
                              feedback.category === 'ui-ux' ? 'bg-pink-100 text-pink-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                              {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Rating and Actions */}
                      <div className="flex items-center space-x-3">
                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= feedback.rating 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        
                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(feedback);
                          }}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group relative"
                          title="Delete feedback"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          {/* Tooltip */}
                          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Delete Feedback
                            <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Feedback Message */}
                    <p className="text-gray-700 mb-4 leading-relaxed">{feedback.message}</p>

                    {/* Features and Improvements */}
                    {(feedback.features?.length > 0 || feedback.improvements?.length > 0) && (
                      <div className="space-y-2">
                        {feedback.features?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-medium text-gray-600">Features:</span>
                            {feedback.features.map((feature, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {feature.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            ))}
                          </div>
                        )}
                        {feedback.improvements?.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-medium text-gray-600">Improvements:</span>
                            {feedback.improvements.map((improvement, index) => (
                              <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                                {improvement.replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Satisfaction Level */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Satisfaction:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          feedback.satisfaction === 'very-satisfied' ? 'bg-green-100 text-green-800' :
                          feedback.satisfaction === 'satisfied' ? 'bg-blue-100 text-blue-800' :
                          feedback.satisfaction === 'neutral' ? 'bg-yellow-100 text-yellow-800' :
                          feedback.satisfaction === 'dissatisfied' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {feedback.satisfaction.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Your feedback helps us create a better experience for all users. 
            We read every submission and use it to guide our development priorities.
          </p>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Delete Feedback</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-3">
                Are you sure you want to delete your feedback about <span className="font-semibold">{feedbackToDelete?.category}</span>?
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 italic">"{feedbackToDelete?.message?.substring(0, 100)}{feedbackToDelete?.message?.length > 100 ? '...' : ''}"</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
