import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Brain, Target, Users, TrendingUp, CheckCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(formData);
      if (result.success) {
        // Start transition animation
        setIsTransitioning(true);
        
        // Wait for animation to complete before navigating
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google login functionality will be implemented here
    console.log('Google login clicked');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex transition-all duration-800 ${
      isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* Left Side - Information Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/theme.jpg.jpg" 
            alt="Interview theme" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 max-w-md mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              {/* Custom Interview Icon - Blue Format */}
              <svg 
                className="w-6 h-6 text-white" 
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">InterviewAce</h1>
              <p className="text-gray-600 text-sm">AI-Powered Interview Prep</p>
            </div>
          </div>

          {/* Main Content */}
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Ace Your Next Interview with AI
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Join thousands of professionals who have transformed their interview skills with our advanced AI-powered platform. Get personalized feedback, realistic practice sessions, and expert insights.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700">Personalized AI Practice Sessions</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700">Real-time Performance Analytics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700">Expert-Curated Content</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700">95% Success Rate</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 rounded-lg p-4 text-center border border-white/20">
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-600 text-sm">Successful Candidates</div>
            </div>
            <div className="bg-white/60 rounded-lg p-4 text-center border border-white/20">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600 text-sm">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back to Home Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
          </div>

          {/* Login Form */}
          <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transition-all duration-500 ${
            isTransitioning ? 'transform translate-y-4 opacity-0' : 'transform translate-y-0 opacity-100'
          }`}>
            <div className="text-center mb-8">
              <div className={`mx-auto h-16 w-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg mb-4 transition-all duration-500 ${
                isTransitioning ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
              }`}>
                <svg 
                  className="w-8 h-8 text-white" 
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue your journey
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 ${
                      errors.email 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-gray-500 hover:border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 ${
                      errors.password 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-gray-500 hover:border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || isTransitioning}
                  className={`w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isTransitioning ? 'transform scale-95' : 'transform scale-100'
                  }`}
                >
                  {loading || isTransitioning ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isTransitioning ? 'Opening Dashboard...' : 'Signing in...'}
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Welcome to InterviewAce!</h2>
            <p className="text-gray-300">Preparing your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login; 