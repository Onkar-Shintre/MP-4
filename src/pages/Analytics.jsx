import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Clock,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Video,
  BookOpen,
  Settings,
  FileText,
  MessageCircle,
  Eye,
  MousePointer,
  Smartphone,
  Globe,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API calls
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalUsers: 1247,
      activeUsers: 892,
      totalSessions: 3456,
      avgRating: 4.6,
      completionRate: 87.3,
      avgSessionTime: 24.5
    },
    trends: {
      users: [120, 135, 142, 138, 156, 168, 175],
      sessions: [45, 52, 48, 61, 58, 67, 72],
      ratings: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.6]
    },
    categories: [
      { name: 'AI Interviews', value: 35, color: 'from-blue-500 to-blue-600' },
      { name: 'Practice Sessions', value: 28, color: 'from-green-500 to-green-600' },
      { name: 'Mock Interviews', value: 22, color: 'from-purple-500 to-purple-600' },
      { name: 'Resume Analysis', value: 15, color: 'from-orange-500 to-orange-600' }
    ],
    topFeatures: [
      { name: 'AI Interview Questions', usage: 89, satisfaction: 4.8, trend: 'up' },
      { name: 'Performance Analytics', usage: 76, satisfaction: 4.6, trend: 'up' },
      { name: 'Practice Sessions', usage: 72, satisfaction: 4.7, trend: 'up' },
      { name: 'Mock Interviews', usage: 68, satisfaction: 4.5, trend: 'stable' },
      { name: 'Resume Analyzer', usage: 54, satisfaction: 4.3, trend: 'down' }
    ],
    userEngagement: {
      daily: [65, 72, 68, 75, 82, 78, 85, 90, 88, 92, 95, 89, 87, 91],
      weekly: [420, 445, 432, 468, 485, 472, 498],
      monthly: [1800, 1920, 1850, 2100, 1980, 2050]
    },
    deviceUsage: [
      { device: 'Desktop', percentage: 58, users: 723 },
      { device: 'Mobile', percentage: 35, users: 436 },
      { device: 'Tablet', percentage: 7, users: 88 }
    ],
    geographicData: [
      { country: 'United States', users: 456, growth: 12.5 },
      { country: 'United Kingdom', users: 234, growth: 8.7 },
      { country: 'Canada', users: 189, growth: 15.2 },
      { country: 'Australia', users: 156, growth: 9.8 },
      { country: 'Germany', users: 134, growth: 6.4 }
    ]
  });

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    // Here you would typically fetch new data for the selected period
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>;
    }
  };

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
              <div className="relative group">
                <svg 
                  className="w-8 h-8 text-blue-600 relative z-10 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300 group-hover:scale-105" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" 
                    fill="currentColor"
                  />
                  <circle cx="8" cy="12" r="1.2" fill="currentColor" opacity="0.9"/>
                  <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.9"/>
                  <circle cx="16" cy="12" r="1.2" fill="currentColor" opacity="0.9"/>
                  <path 
                    d="M8 12H16" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    opacity="0.7"
                  />
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
              <Link to="/analytics" className="text-blue-600 font-medium">
                Analytics
              </Link>
              <Link to="/feedback" className="text-gray-600 hover:text-blue-600 transition-colors">
                Feedback
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive insights into your InterviewAce platform performance
            </p>
          </div>

          {/* Period Selector */}
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => handlePeriodChange(period.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedPeriod === period.value
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePeriodChange(selectedPeriod)}
              className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalUsers)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5%
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(analyticsData.overview.activeUsers)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.3%
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalSessions)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15.7%
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.avgRating}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  +0.2
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">User Growth Trend</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Users</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-1">
              {analyticsData.trends.users.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    style={{ height: `${(value / 200) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Feature Usage Distribution</h3>
            <div className="space-y-4">
              {analyticsData.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 bg-gradient-to-r ${category.color} rounded-full shadow-md`}></div>
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${category.color} h-2 rounded-full shadow-lg transition-all duration-1000 ease-out`}
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8 text-right">{category.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Features Performance */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Top Features Performance</h3>
              <button className="p-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {analyticsData.topFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {feature.usage}% usage
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
                          {feature.satisfaction}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(feature.trend)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Device Usage</h3>
            <div className="space-y-4">
              {analyticsData.deviceUsage.map((device, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : '#f59e0b'}
                        strokeWidth="3"
                        strokeDasharray={`${device.percentage}, 100`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{device.percentage}%</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{device.device}</h4>
                  <p className="text-sm text-gray-600">{formatNumber(device.users)} users</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Geographic Distribution</h3>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Top Countries</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {analyticsData.geographicData.map((country, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-200 hover:shadow-md">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  {country.country.charAt(0)}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{country.country}</h4>
                <p className="text-lg font-bold text-blue-600 mb-1">{formatNumber(country.users)}</p>
                <p className="text-xs text-green-600 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{country.growth}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-green-600">{analyticsData.overview.completionRate}%</p>
            <p className="text-sm text-gray-600 mt-2">of users complete sessions</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Avg Session Time</h3>
            <p className="text-3xl font-bold text-purple-600">{analyticsData.overview.avgSessionTime}m</p>
            <p className="text-sm text-gray-600 mt-2">per user session</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Performance Score</h3>
            <p className="text-3xl font-bold text-orange-600">92.4</p>
            <p className="text-sm text-gray-600 mt-2">platform performance</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
