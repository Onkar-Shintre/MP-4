import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Menu,
  X,
  Play,
  Star,
  MessageSquare,
  BarChart3,
  Zap,
  Video,
  BookOpen,
  Calendar,
  Award,
  Clock,
  Building,
  Headphones,
  Eye,
  Trophy,
  FileText,
  UserCheck,
  Bot,
  Youtube,
  Linkedin,
  Twitter,
  User,
  LogOut,
  Settings
} from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Practice",
      description: "Advanced AI technology provides personalized interview questions and real-time feedback to help you improve faster.",
      navigateTo: "/register"
    },
    {
      icon: Video,
      title: "Mock Interviews",
      description: "Realistic mock interview sessions with industry professionals to simulate real interview experiences.",
      navigateTo: "/register"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed analytics and insights track your progress and identify areas for improvement.",
      navigateTo: "/register"
    },
    {
      icon: Video,
      title: "Video Practice",
      description: "Record yourself answering questions and review your body language and speaking skills.",
      navigateTo: "/register"
    },
    {
      icon: FileText,
      title: "Resume Analyzer",
      description: "AI-powered resume analysis and optimization to help you stand out to employers.",
      navigateTo: "/resume-home"
    },
    {
      icon: Calendar,
      title: "Interview Scheduling",
      description: "Smart scheduling system to manage your upcoming interviews and preparation timeline.",
      navigateTo: "/register"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      icon: UserCheck,
      title: "Create Your Profile",
      description: "Set up your profile with career goals, target roles, and skill level to get personalized recommendations.",
      navigateTo: "/register"
    },
    {
      step: "02",
      icon: Bot,
      title: "Practice with AI",
      description: "Engage in realistic interview simulations powered by AI that adapts to your industry and experience level.",
      navigateTo: "/register"
    },
    {
      step: "03",
      icon: Award,
      title: "Get Hired",
      description: "Apply your improved skills in real interviews and land your dream job with confidence and expertise.",
      navigateTo: "/register"
    }
  ];

  const testimonials = [
    {
      name: "Aditya",
      role: "Software Engineer",
      company: "TechCorp",
      content: "This app helped me ace my technical interviews. The AI feedback was incredibly accurate!",
      rating: 5
    },
    {
      name: "Onkar",
      role: "Product Manager",
      company: "InnovateLab",
      content: "The personalized training sessions made all the difference in my interview preparation.",
      rating: 5
    },
    {
      name: "Danish",
      role: "Marketing Director",
      company: "GrowthCo",
      content: "Professional, comprehensive, and effective. Highly recommend for anyone serious about their career.",
      rating: 5
    }
  ];

  const handleFeatureClick = (navigateTo) => {
    navigate(navigateTo);
  };

  const handleHowItWorksClick = (navigateTo) => {
    navigate(navigateTo);
  };

  const handleLearnMoreClick = () => {
    // Scroll to features section
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStatisticsClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
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

                         {/* Desktop Navigation */}
             <nav className="hidden md:flex items-center space-x-8">
               <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                 Features
               </a>
               <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                 How It Works
               </a>
               <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                 Testimonials
               </a>
               <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                 About
               </Link>
             </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                                     <button
                     onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                     className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                   >
                     <div className="flex flex-col items-end">
                       <span className="text-sm font-semibold">{user.name}</span>
                       <span className="text-xs text-gray-500">{user.email}</span>
                     </div>
                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                       <User className="w-5 h-5 text-blue-600" />
                     </div>
                   </button>
                  
                  {/* User Dropdown */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

                       {/* Mobile menu */}
             {isMenuOpen && (
               <div className="md:hidden py-4 border-t border-gray-200">
                 <div className="flex flex-col space-y-4">
                   <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
                   <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</a>
                   <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a>
                   <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <>
                                             <div className="flex items-center space-x-3 text-gray-600 mb-3">
                         <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                           <User className="w-5 h-5 text-blue-600" />
                         </div>
                         <div className="flex flex-col">
                           <span className="font-semibold text-gray-700">{user.name}</span>
                           <span className="text-sm text-gray-500">{user.email}</span>
                         </div>
                       </div>
                      <Link 
                        to="/dashboard" 
                        className="block text-gray-600 hover:text-blue-600 mb-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block text-gray-600 hover:text-blue-600 mb-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="block text-gray-600 hover:text-blue-600 mb-2 w-full text-left"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block text-gray-600 hover:text-blue-600 mb-2">Sign In</Link>
                      <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center">Get Started</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/teamdiscussion.jpg.png')"
          }}
        ></div>
        
        {/* Background Overlay - Darker on left, much lighter on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-700/40 to-white/10"></div>
        
        {/* Additional subtle shading overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center">
            {user ? (
              <>
                {/* Welcome message for logged-in users */}
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                    <User className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Welcome back, {user.name}!</span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Ready to
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"> Practice?</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Continue your interview preparation journey with personalized AI practice sessions and real-time feedback.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Link
                    to="/dashboard"
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/profile"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Profile Settings</span>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Original content for non-logged-in users */}
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Ace Your Next
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"> Interview</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Master interview skills with AI-powered practice sessions, personalized feedback, and real-time coaching. 
                  Join thousands who've landed their dream jobs with InterviewAce.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Link
                    to="/register"
                    className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button 
                    onClick={handleLearnMoreClick}
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Play className="w-5 h-5" />
                    <span>Learn More</span>
                  </button>
                </div>
              </>
            )}
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div 
                className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105"
                onClick={handleStatisticsClick}
              >
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-white/80 text-sm">Successful Candidates</div>
              </div>
              <div 
                className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105"
                onClick={handleStatisticsClick}
              >
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
              <div 
                className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105"
                onClick={handleStatisticsClick}
              >
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/80 text-sm">Partner Companies</div>
              </div>
              <div 
                className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-105"
                onClick={handleStatisticsClick}
              >
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white/80 text-sm">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Interview Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to prepare, practice, and excel in your interviews with cutting-edge AI technology and expert guidance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => handleFeatureClick(feature.navigateTo)}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              How InterviewAce Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Simple steps to transform your interview performance and land your dream job.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                
                {/* Card */}
                <div 
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleHowItWorksClick(step.navigateTo)}
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Get started</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
                
                {/* Connecting Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-200 to-indigo-200 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of professionals who have transformed their interview skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 duration-300"
                onClick={() => navigate('/register')}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/teamdiscuss2.png')"
          }}
        ></div>
        
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have already transformed their interview skills with our platform
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                {/* Logo Icon Only */}
                <div className="relative group">
                  {/* Custom Interview Icon - Blue Format */}
                  <svg 
                    className="w-8 h-8 text-blue-400 relative z-10 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 group-hover:scale-105" 
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
                  <span className="text-2xl font-bold text-blue-400 leading-tight">
                    InterviewAce
                  </span>
                  <span className="text-xs text-gray-400 font-medium -mt-1">
                    AI-Powered Interview Prep
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The most advanced AI-powered interview preparation platform. 
                Practice with intelligent feedback and personalized training.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors cursor-pointer">How It Works</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Testimonials</a></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 InterviewAce. All rights reserved. Made with ❤️ for career success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 