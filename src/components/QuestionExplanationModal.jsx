import React, { useState } from 'react';
import { X, Brain, Lightbulb, AlertTriangle, Target, CheckCircle, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const QuestionExplanationModal = ({ 
  isOpen, 
  onClose, 
  explanation, 
  question,
  loading = false 
}) => {
  const [activeTab, setActiveTab] = useState('explanation');

  if (!isOpen) return null;

  const formatExplanation = (text) => {
    if (!text) return '';
    
    // Convert markdown-style headers and bullet points for better rendering
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/•/g, '→');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Question Explanation</h2>
                <p className="text-primary-100 text-sm">AI-powered insights and guidance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Display */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Interview Question</h3>
              <p className="text-gray-700">{question}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
                  <Brain className="w-6 h-6 text-primary-600 animate-pulse" />
                </div>
                <p className="text-gray-600">Generating AI explanation...</p>
                <div className="mt-2 flex justify-center">
                  <div className="loading-spinner border-primary-600"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[60vh] overflow-y-auto">
              <div className="p-6">
                {/* ChatGPT-like Response */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">AI Assistant</span>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      className="text-gray-700 leading-relaxed"
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-gray-900 mt-5 mb-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-base font-medium text-gray-900 mt-4 mb-2" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                        ul: ({node, ...props}) => <ul className="space-y-1 my-3" {...props} />,
                        ol: ({node, ...props}) => <ol className="space-y-1 my-3 list-decimal list-inside" {...props} />,
                        li: ({node, ...props}) => <li className="flex items-start space-x-2" {...props} />,
                        p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
                        code: ({node, ...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
                      }}
                    >
                      {explanation || 'No explanation available.'}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Additional Tips Section */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-900">Do This</h4>
                    </div>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Structure your response clearly</li>
                      <li>• Use specific examples</li>
                      <li>• Show your thought process</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h4 className="font-medium text-red-900">Avoid This</h4>
                    </div>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Being too vague or generic</li>
                      <li>• Not providing examples</li>
                      <li>• Rushing through the answer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Lightbulb className="w-4 h-4" />
              <span>Use this guidance to structure your answer effectively</span>
            </div>
            <button
              onClick={onClose}
              className="btn-primary px-4 py-2"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionExplanationModal;