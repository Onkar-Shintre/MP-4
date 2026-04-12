import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { interviewAPI } from '../services/api';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Send, 
  Pause, 
  Play,
  ArrowLeft,
  Save,
  HelpCircle,
  Brain,
  MessageCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import QuestionExplanationModal from '../components/QuestionExplanationModal';

const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [explanationData, setExplanationData] = useState(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const timerRef = useRef(null);

  // Fetch interview data
  const { data: interview, isLoading, error } = useQuery(
    ['interview', interviewId],
    () => interviewAPI.getInterview(interviewId),
    {
      refetchInterval: 5000, // Refetch every 5 seconds
    }
  );

  // Submit answer mutation
  const submitAnswerMutation = useMutation(
    (data) => interviewAPI.submitAnswer(data),
    {
      onSuccess: (response) => {
        setCurrentFeedback(response.data.evaluation);
        setShowFeedback(true);
        setAnswer('');
        setTimeSpent(0);
        
        if (response.data.isComplete) {
          navigate(`/results/${interviewId}`);
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
        }
        
        // Refetch interview data
        queryClient.invalidateQueries(['interview', interviewId]);
      },
      onError: (error) => {
        toast.error('Failed to submit answer. Please try again.');
        console.error('Submit answer error:', error);
      }
    }
  );

  // Pause/Resume mutations
  const pauseMutation = useMutation(
    () => interviewAPI.pauseInterview(interviewId),
    {
      onSuccess: () => {
        setIsPaused(true);
        toast.success('Interview paused');
      }
    }
  );

  const resumeMutation = useMutation(
    () => interviewAPI.resumeInterview(interviewId),
    {
      onSuccess: () => {
        setIsPaused(false);
        toast.success('Interview resumed');
      }
    }
  );

  // Timer effect
  useEffect(() => {
    if (interview && interview.status === 'in-progress' && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [interview, isPaused]);

  // Handle answer submission
  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitAnswerMutation.mutateAsync({
        interviewId,
        questionIndex: currentQuestionIndex,
        answer: answer.trim(),
        timeSpent
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle pause/resume
  const handlePauseResume = async () => {
    if (isPaused) {
      await resumeMutation.mutateAsync();
    } else {
      await pauseMutation.mutateAsync();
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get progress percentage
  const getProgress = () => {
    if (!interview) return 0;
    return (interview.answers.length / interview.settings.totalQuestions) * 100;
  };

  // Get current question
  const getCurrentQuestion = () => {
    if (!interview || !interview.questions) return null;
    return interview.questions[currentQuestionIndex];
  };

  // Handle Learn More button click
  const handleLearnMore = async () => {
    const currentQuestion = getCurrentQuestion();
    console.log('Learn More clicked!', { currentQuestion, interview });
    
    if (!currentQuestion || !interview) {
      console.error('Missing data:', { currentQuestion, interview });
      toast.error('Question or interview data not available');
      return;
    }

    setLoadingExplanation(true);
    setShowExplanationModal(true);

    try {
      console.log('Calling explanation API with:', {
        question: currentQuestion.question,
        domain: interview.domain,
        experience: interview.experience
      });

      const response = await interviewAPI.getQuestionExplanation({
        question: currentQuestion.question,
        domain: interview.domain,
        experience: interview.experience
      });

      console.log('Explanation API response:', response);
      setExplanationData(response.data.explanation);
    } catch (error) {
      console.error('Error fetching explanation:', error);
      toast.error('Failed to load explanation. Please try again.');
      setShowExplanationModal(false);
    } finally {
      setLoadingExplanation(false);
    }
  };

  if (isLoading) {
    return <Loading text="Loading interview..." />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Interview Not Found</h2>
          <p className="text-gray-600 mb-4">The interview you're looking for doesn't exist or you don't have access to it.</p>
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

  const currentQuestion = getCurrentQuestion();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeSpent)}</span>
            </div>
            
            <button
              onClick={() => navigate('/contact')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              title="Contact Support"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact</span>
            </button>
            
            <button
              onClick={handlePauseResume}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {interview.settings.totalQuestions}</span>
            <span>{Math.round(getProgress())}% Complete</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="card mb-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {currentQuestion.category.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">
                {currentQuestion.difficulty}
              </span>
            </div>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex-1 mr-4">
                {currentQuestion.question}
              </h2>
              <button
                onClick={handleLearnMore}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                disabled={isPaused}
                title="Get AI-powered explanation and tips for this question"
              >
                <Brain className="w-4 h-4" />
                <span>Learn More</span>
              </button>
            </div>
          </div>

          {/* Answer Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="answer-input"
              rows={6}
              disabled={isSubmitting || isPaused}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {answer.length} characters
            </div>
            <button
              onClick={handleSubmitAnswer}
              disabled={!answer.trim() || isSubmitting || isPaused}
              className="btn-primary flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Answer</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && currentFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Feedback</h3>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-gray-600">Score:</span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  currentFeedback.score >= 80 ? 'score-excellent' :
                  currentFeedback.score >= 60 ? 'score-good' :
                  currentFeedback.score >= 40 ? 'score-average' : 'score-poor'
                }`}>
                  {currentFeedback.score}/100
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                <p className="text-gray-700">{currentFeedback.feedback}</p>
              </div>

              {currentFeedback.suggestions && currentFeedback.suggestions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Suggestions</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {currentFeedback.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentFeedback.keywords && currentFeedback.keywords.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentFeedback.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowFeedback(false)}
                className="btn-primary"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Explanation Modal */}
      <QuestionExplanationModal
        isOpen={showExplanationModal}
        onClose={() => setShowExplanationModal(false)}
        explanation={explanationData}
        question={currentQuestion?.question}
        loading={loadingExplanation}
      />
    </div>
  );
};

export default Interview; 