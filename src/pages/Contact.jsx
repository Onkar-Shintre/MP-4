import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  Brain,
  MessageCircle,
  Clock,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);



  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'support', label: 'Technical Support', icon: Phone },
    { value: 'other', label: 'Partnership', icon: Users },
    { value: 'feedback', label: 'Feedback', icon: CheckCircle }
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      icon: Clock,
      url: 'https://youtube.com/@interviewai',
      color: 'hover:bg-red-500',
      description: 'Subscribe for interview tips'
    },
    {
      name: 'LinkedIn',
      icon: Users,
      url: 'https://linkedin.com/company/interviewai',
      color: 'hover:bg-blue-600',
      description: 'Connect with professionals'
    },
    {
      name: 'Twitter',
      icon: Mail,
      url: 'https://twitter.com/interviewai',
      color: 'hover:bg-blue-400',
      description: 'Latest updates & tips'
    },
    {
      name: 'Instagram',
      icon: MapPin,
      url: 'https://instagram.com/interviewai',
      color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500',
      description: 'Behind the scenes'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('🔍 Submitting contact form with data:', formData);
      
      // Client-side validation
      const errors = [];
      
      if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
      }
      
      if (!formData.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
      }
      
      if (!formData.subject || formData.subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
      }
      
      if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
      }
      
      if (errors.length > 0) {
        toast.error(errors.join(', '));
        setIsSubmitting(false);
        return;
      }
      
      const response = await contactAPI.submitContact(formData);
      console.log('✅ Contact API response:', response);

      if (response.data.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          category: 'general'
        });
      } else {
        throw new Error(response.data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('❌ Contact form error:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error message:', error.message);
      
      // Handle different types of errors
      if (error.response?.status === 404) {
        toast.error('Contact endpoint not found. Please check server configuration.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Network error. Please check your connection.');
      } else if (error.response?.status === 400 && error.response?.data?.errors) {
        // Handle validation errors from backend
        const validationErrors = error.response.data.errors.join(', ');
        toast.error(`Validation failed: ${validationErrors}`);
      } else {
        toast.error(error.response?.data?.message || error.message || 'Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
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
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </Link>
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Have questions about InterviewAI? We're here to help! Reach out to our team 
              and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>



      {/* Contact Form Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden" style={{boxShadow: '0 15px 35px -8px rgba(59, 130, 246, 0.12), 0 0 0 1px rgba(59, 130, 246, 0.05)'}}>
            <div className="grid lg:grid-cols-2">
              {/* Form */}
              <div className="p-5 lg:p-8">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-blue-200"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type of Inquiry
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {inquiryTypes.map((type) => (
                          <label
                            key={type.value}
                            className={`flex items-center p-2 border rounded-lg cursor-pointer transition-all duration-200 ${
                              formData.category === type.value
                                ? 'border-blue-400 bg-blue-50 shadow-md shadow-blue-100'
                                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                            }`}
                          >
                            <input
                              type="radio"
                              name="category"
                              value={type.value}
                              checked={formData.category === type.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <type.icon className={`w-4 h-4 mr-2 ${
                              formData.category === type.value ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              formData.category === type.value ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                              {type.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength="2"
                        maxLength="50"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md hover:border-blue-300"
                        placeholder="Enter your full name"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 2 characters</p>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md hover:border-blue-300"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        minLength="5"
                        maxLength="100"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md hover:border-blue-300"
                        placeholder="What's this about?"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 5 characters</p>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        minLength="10"
                        maxLength="1000"
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none shadow-sm hover:shadow-md hover:border-blue-300"
                        placeholder="Tell us more about your inquiry..."
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 10 characters, maximum 1000</p>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-200 hover:shadow-xl"
                        style={{boxShadow: '0 8px 20px -4px rgba(59, 130, 246, 0.25), 0 3px 5px -2px rgba(59, 130, 246, 0.1)'}}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Contact Info Sidebar */}
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-5 lg:p-8 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Let's Connect</h3>
                    <p className="text-blue-100 leading-relaxed text-sm">
                      We're here to help you succeed in your interview preparation journey. 
                      Whether you have questions, need support, or want to share feedback, 
                      we'd love to hear from you.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1 text-sm">Email Response Time</div>
                        <div className="text-blue-100 text-xs">Usually within 2-4 hours</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1 text-sm">Live Chat Support</div>
                        <div className="text-blue-100 text-xs">Available for premium users</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1 text-sm">Community Forum</div>
                        <div className="text-blue-100 text-xs">Connect with other users</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-blue-400/30">
                    <div className="text-sm text-blue-100">
                      <p className="mb-4 text-sm font-medium">Follow us for updates:</p>
                      <div className="flex space-x-3">
                        <a 
                          href="https://youtube.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 hover:scale-105 transition-all duration-200 backdrop-blur-sm group"
                          title="Follow us on YouTube"
                        >
                          <Clock className="w-5 h-5 group-hover:text-red-200 transition-colors" />
                        </a>
                        <a 
                          href="https://linkedin.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 hover:scale-105 transition-all duration-200 backdrop-blur-sm group"
                          title="Connect with us on LinkedIn"
                        >
                          <Users className="w-5 h-5 group-hover:text-blue-200 transition-colors" />
                        </a>
                        <a 
                          href="https://twitter.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 hover:scale-105 transition-all duration-200 backdrop-blur-sm group"
                          title="Follow us on Twitter"
                        >
                          <Mail className="w-5 h-5 group-hover:text-sky-200 transition-colors" />
                        </a>
                        <a 
                          href="https://instagram.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 hover:scale-105 transition-all duration-200 backdrop-blur-sm group"
                          title="Follow us on Instagram"
                        >
                          <MapPin className="w-5 h-5 group-hover:text-pink-200 transition-colors" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Follow Us for Updates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected with InterviewAI for the latest tips, features, and career insights. 
              Join our community across all platforms!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${social.color}`}
                style={{boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.1), 0 2px 6px -2px rgba(59, 130, 246, 0.05)'}}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                    <social.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">
                    {social.name}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                    {social.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Join thousands of professionals already following us!</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions about InterviewAI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-blue-100" style={{boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.1)'}}>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">How does the AI interview work?</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Our AI analyzes your responses in real-time and provides personalized feedback based on industry standards and best practices.</p>
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-blue-100" style={{boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.1)'}}>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Is my data secure?</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Yes, we use enterprise-grade security measures to protect your personal information and practice sessions.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 border border-blue-100" style={{boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.1)'}}>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Can I practice for specific roles?</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Absolutely! Our platform offers customized interview scenarios for various industries and experience levels.</p>
              </div>
              
              <div className="bg-white rounded-xl p-5 border border-blue-100" style={{boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.1)'}}>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Do you offer refunds?</h3>
                <p className="text-gray-600 text-xs leading-relaxed">Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
              </div>
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
                  <Clock className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
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
                <li><a href="mailto:hello@interviewai.com" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
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

export default Contact;