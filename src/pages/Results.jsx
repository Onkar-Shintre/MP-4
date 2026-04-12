import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { interviewAPI } from '../services/api';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  TrendingUp, 
  Target, 
  Clock,
  MessageCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loading from '../components/Loading';

const Results = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  const { data: results, isLoading, error } = useQuery(
    ['interviewResults', interviewId],
    () => interviewAPI.getInterviewResults(interviewId)
  );

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // PDF export functionality would be implemented here
      // For now, just show a success message
      console.log('Exporting PDF...');
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Interview Results',
        text: `Check out my interview results! Score: ${results?.interview?.results?.overallScore}%`,
        url: window.location.href
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  if (isLoading) {
    return <Loading text="Loading results..." />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Results Not Found</h2>
          <p className="text-gray-600 mb-4">The interview results you're looking for don't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const interview = results?.interview;
  const interviewResults = interview?.results;

  // Prepare chart data
  const categoryData = [
    { name: 'HR', value: interviewResults?.categoryScores?.hr || 0, color: '#3B82F6' },
    { name: 'Technical', value: interviewResults?.categoryScores?.technical || 0, color: '#10B981' },
    { name: 'Behavioral', value: interviewResults?.categoryScores?.behavioral || 0, color: '#F59E0B' }
  ];

  const questionScores = interview?.answers?.map((answer, index) => ({
    question: `Q${index + 1}`,
    score: answer.aiFeedback?.score || 0
  })) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/contact')}
              className="btn-outline flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact</span>
            </button>
            <button
              onClick={handleShare}
              className="btn-outline flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="btn-primary flex items-center space-x-2"
            >
              {isExporting ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Results</h1>
          <p className="text-gray-600">
            {interview?.domain} • {interview?.experience} Level
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Score */}
          <div className="card">
            <div className="text-center">
              <div className="mb-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getScoreColor(interviewResults?.overallScore)}`}>
                  {getScoreLabel(interviewResults?.overallScore)}
                </span>
              </div>
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {interviewResults?.overallScore || 0}%
              </div>
              <p className="text-gray-600">Overall Score</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question Scores Chart */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Question-by-Question Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={questionScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Feedback */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Analysis</h3>
            <div className="space-y-6">
              {interviewResults?.strengths && interviewResults.strengths.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Strengths
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {interviewResults.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}

              {interviewResults?.weaknesses && interviewResults.weaknesses.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {interviewResults.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              )}

              {interviewResults?.recommendations && interviewResults.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Target className="w-5 h-5 text-blue-600 mr-2" />
                    Recommendations
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {interviewResults.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Interview Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Questions Answered</span>
                <span className="text-sm font-medium text-gray-900">
                  {interviewResults?.questionsAnswered || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Time</span>
                <span className="text-sm font-medium text-gray-900">
                  {Math.floor((interviewResults?.totalTime || 0) / 60)}m {(interviewResults?.totalTime || 0) % 60}s
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Time per Question</span>
                <span className="text-sm font-medium text-gray-900">
                  {interviewResults?.questionsAnswered > 0 
                    ? Math.floor((interviewResults.totalTime || 0) / interviewResults.questionsAnswered / 60)
                    : 0}m {interviewResults?.questionsAnswered > 0 
                      ? Math.floor(((interviewResults.totalTime || 0) / interviewResults.questionsAnswered) % 60)
                      : 0}s
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-gray-900">
                  {interview?.completedAt ? new Date(interview.completedAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full btn-outline text-left"
              >
                Start New Interview
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="w-full btn-outline text-left"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results; 