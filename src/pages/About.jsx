import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  Users, 
  TrendingUp, 
  Zap,
  Shield,
  Clock,
  Award,
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Youtube,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Our advanced AI adapts to your responses, providing personalized feedback and realistic interview scenarios that mirror real-world situations."
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Customized interview questions based on your industry, role, and experience level. Practice scenarios that matter most to your career goals."
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Detailed insights into your strengths and areas for improvement with actionable recommendations to boost your interview confidence."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. Practice confidently knowing your information remains private and secure."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Practice anytime, anywhere. Our platform is available round the clock to fit your busy schedule and learning pace."
    },
    {
      icon: Award,
      title: "Expert-Curated Content",
      description: "Questions and scenarios developed by industry professionals and hiring experts from top companies worldwide."
    }
  ];

  const teamMembers = [
    {
      name: "Dinesh Shid",
      role: "software engineer",
      image: "",
      bio: "Former AI researcher at Google with 10+ years in machine learning and natural language processing.",
      location: "kolhapur, maharashtra",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Aditya",
      role: "Head of company",
      image: "",
      bio: "Product leader with experience at LinkedIn and Microsoft, specializing in career development platforms.",
      location: "kolhapur, maharashtra",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Onkar Shintre",
      role: "Lead Data Scientist",
      image: "",
      bio: "PhD in Computer Science from Stanford, expert in behavioral analysis and interview performance metrics.",
      location: "kolhapur, maharashtra",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Danish",
      role: "Senior Software Engineer",
      image: "",
      bio: "Full-stack developer passionate about creating intuitive user experiences and scalable architectures.",
      location: "kolhapur, maharashtra",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  const stats = [
    { label: "Active Users", value: "10,000+" },
    { label: "Interview Sessions", value: "50,000+" },
    { label: "Success Rate", value: "85%" },
    { label: "Companies", value: "500+" }
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
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
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Contact
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
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
                <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
                <div className="pt-4 border-t border-gray-200">
                  <Link to="/login" className="block text-gray-600 hover:text-blue-600 mb-2">Sign In</Link>
                  <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center">Get Started</Link>
            </div>
          </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                InterviewAI
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering professionals to ace their interviews with AI-powered practice sessions, 
              personalized feedback, and expert insights. Your career success starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe that everyone deserves the opportunity to showcase their best self during interviews. 
                Traditional interview preparation often lacks personalization and real-time feedback, leaving 
                candidates feeling unprepared and anxious.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our AI-powered platform bridges this gap by providing realistic interview simulations, 
                instant feedback, and personalized improvement recommendations. We're democratizing access 
                to high-quality interview preparation, helping professionals at all levels achieve their career goals.
              </p>
              <div className="flex items-center space-x-4">
                <Zap className="w-8 h-8 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Transforming careers, one interview at a time
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose InterviewAI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with expert insights 
              to deliver the most effective interview preparation experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our diverse team of industry experts, AI researchers, and career professionals 
              brings decades of combined experience to help you succeed in your interviews.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-2">
                {/* Profile Image Section */}
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-10 flex flex-col items-center">
                  <div className="relative">
                    {/* Circle Profile Image */}
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Status Indicator */}
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-green-500 rounded-full border-4 border-white shadow-md flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Name and Role */}
                  <div className="text-center mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-blue-600 font-semibold text-sm bg-blue-50 px-4 py-2 rounded-full inline-block shadow-sm">
                      {member.role}
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    {member.location}
                  </div>
                  
                  {/* Bio */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
                    {member.bio}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 pt-4 border-t border-gray-100">
                    <a 
                      href={member.social.linkedin} 
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-md hover:scale-110"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href={member.social.twitter} 
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-md hover:scale-110"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href={member.social.github} 
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-md hover:scale-110"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their interview skills with InterviewAI. 
              Your dream job is just a practice session away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/register" 
                className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                Get Started Free
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
              
              <a 
                href="mailto:hello@interviewai.com" 
                className="border border-blue-200 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </a>
            </div>
          </div>
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
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
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

export default About;