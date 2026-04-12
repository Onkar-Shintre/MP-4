import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText,
  Download,
  Brain,
  CheckCircle,
  ArrowRight,
  Search,
  Star,
  Users,
  TrendingUp,
  Award,
  Zap,
  Target,
  Eye,
  Upload,
  BarChart3,
  Settings,
  Menu,
  X,
  ArrowLeft,
  Youtube,
  Linkedin,
  Twitter
} from 'lucide-react';

const ResumeHome = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  console.log('ResumeHome component loaded');

  const features = [
    {
      icon: FileText,
      title: "Easy Builder",
      description: "Intuitive drag and drop interface with real time preview. Build your resume in minutes, not hours.",
      color: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "Download high-quality PDF resumes optimized for ATS systems and professional printing.",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      icon: Brain,
      title: "AI Analyzer",
      description: "Get instant feedback and suggestions to improve your resume's impact and ATS compatibility.",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    }
  ];

  const templates = [
    {
      name: "Modern Pro",
      description: "Perfect for professionals",
      image: "/templates/modern-pro.jpg"
    },
    {
      name: "Executive",
      description: "Perfect for professionals",
      image: "/templates/executive.jpg"
    },
    {
      name: "Creative",
      description: "Perfect for professionals",
      image: "/templates/creative.jpg"
    },
    {
      name: "Minimalist",
      description: "Perfect for professionals",
      image: "/templates/minimalist.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
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
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Dashboard
              </Link>
              <Link to="/interview" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Interviews
              </Link>
              <Link to="/resume-home" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Resume Home
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/interview"
                className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Interviews
              </Link>
              <Link
                to="/resume-home"
                className="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Resume Home
              </Link>
              <div className="pt-4">
                <Link
                  to="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 600\"%3E%3Crect width=\"1200\" height=\"600\" fill=\"%23f8fafc\"/%3E%3C/svg%3E')"
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Build Your Perfect
                <span className="block text-purple-600">Resume</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Create professional resumes in minutes with our AI-powered builder. Choose from premium templates, get instant feedback, and download as PDF.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Start Building Now
                </button>
                <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Analyze Existing Resume
                </button>
              </div>
            </div>

            {/* Right Content - Resume Image */}
            <div className="relative">
              <div className="relative transform rotate-3">
                {/* Main Resume Image */}
                <div className="bg-white rounded-lg shadow-2xl p-4 w-full max-w-sm mx-auto overflow-hidden">
                  <img 
                    src="/resumeimage.jpg.png" 
                    alt="Professional Resume Example" 
                    className="w-full h-auto rounded-lg"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>
                
                {/* Stacked Resume Cards for visual effect */}
                <div className="absolute -top-4 -right-4 transform rotate-12">
                  <div className="bg-white rounded-lg shadow-lg p-4 w-32 h-40 opacity-60"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 transform -rotate-6">
                  <div className="bg-white rounded-lg shadow-lg p-4 w-28 h-36 opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-gray-600">
              Professional tools and features to create, analyze, and perfect your resume
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Templates
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our collection of ATS-friendly, professionally designed templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4 relative">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">✏️</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              View All Templates
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have landed their dream jobs with our AI-powered interview preparation and resume analysis tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Start Interview Prep
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
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
              <p className="text-gray-400">
                The most advanced AI-powered interview preparation platform. 
                Practice with intelligent feedback and personalized training.
              </p>
              <div className="flex space-x-4 mt-4">
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
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Analyzer</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InterviewAce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeHome;
