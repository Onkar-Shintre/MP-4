import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code, Users, Brain, Database, Cloud,
  Smartphone, Palette, BarChart3, Zap,
  Play, BookOpen, Plus, X,
} from 'lucide-react';

const sections = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'React, Vue, Angular, and modern web technologies',
    icon: Code,
    gradient: 'from-blue-500 to-blue-600',
    stats: { questions: 150, difficulty: 'Intermediate', avgScore: '85%', timeEstimate: '45 min' },
    categories: ['React.js', 'DOM manipulation', 'CSS Flexbox', 'State Management'],
    experience: '2 Years',
    lastUpdated: '30th Apr 2025',
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Node.js, Python, Java, and server-side technologies',
    icon: Database,
    gradient: 'from-green-500 to-green-600',
    stats: { questions: 200, difficulty: 'Advanced', avgScore: '78%', timeEstimate: '60 min' },
    categories: ['Node.js', 'Express', 'REST APIs', 'MongoDB'],
    experience: '3 Years',
    lastUpdated: '1st May 2025',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Complete web application development',
    icon: Zap,
    gradient: 'from-purple-500 to-purple-600',
    stats: { questions: 180, difficulty: 'Advanced', avgScore: '82%', timeEstimate: '75 min' },
    categories: ['MERN stack', 'deployment strategies', 'authentication'],
    experience: '4 Years',
    lastUpdated: '30th Apr 2025',
  },
  {
    id: 'data-analyst',
    title: 'Data Analysis',
    description: 'SQL, Excel, Data Visualization, and analytics',
    icon: BarChart3,
    gradient: 'from-orange-500 to-orange-600',
    stats: { questions: 120, difficulty: 'Intermediate', avgScore: '88%', timeEstimate: '40 min' },
    categories: ['SQL', 'Excel', 'Data Visualization', 'Power BI'],
    experience: '2 Years',
    lastUpdated: '30th Apr 2025',
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'CI/CD, Docker, Kubernetes, and cloud platforms',
    icon: Cloud,
    gradient: 'from-indigo-500 to-indigo-600',
    stats: { questions: 160, difficulty: 'Advanced', avgScore: '75%', timeEstimate: '55 min' },
    categories: ['CI/CD', 'Docker', 'Kubernetes', 'AWS'],
    experience: '5 Years',
    lastUpdated: '30th Apr 2025',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'User experience, wireframing, and design systems',
    icon: Palette,
    gradient: 'from-pink-500 to-pink-600',
    stats: { questions: 100, difficulty: 'Intermediate', avgScore: '90%', timeEstimate: '35 min' },
    categories: ['Figma', 'user journey', 'wireframing', 'accessibility'],
    experience: '3 Years',
    lastUpdated: '30th Apr 2025',
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'React Native, Flutter, and mobile app development',
    icon: Smartphone,
    gradient: 'from-teal-500 to-teal-600',
    stats: { questions: 130, difficulty: 'Intermediate', avgScore: '83%', timeEstimate: '50 min' },
    categories: ['React Native', 'Flutter', 'performance optimization'],
    experience: '2 Years',
    lastUpdated: '30th Apr 2025',
  },
  {
    id: 'ai-ml',
    title: 'AI/ML Engineering',
    description: 'Machine learning, deep learning, and AI technologies',
    icon: Brain,
    gradient: 'from-red-500 to-red-600',
    stats: { questions: 140, difficulty: 'Advanced', avgScore: '70%', timeEstimate: '65 min' },
    categories: ['Python', 'scikit-learn', 'model deployment', 'NLP'],
    experience: '1 Year',
    lastUpdated: '30th Apr 2025',
  },
  {
    id: 'product-manager',
    title: 'Product Management',
    description: 'Product strategy, roadmapping, and stakeholder management',
    icon: Users,
    gradient: 'from-yellow-500 to-yellow-600',
    stats: { questions: 110, difficulty: 'Intermediate', avgScore: '87%', timeEstimate: '45 min' },
    categories: ['Roadmapping', 'user stories', 'KPIs', 'stakeholder communication'],
    experience: '4 Years',
    lastUpdated: '30th Apr 2025',
  },
];

const InterviewSections = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newSection, setNewSection] = useState({ title: '', description: '', difficulty: 'Intermediate', experience: '', categories: '' });

  const handleInputChange = (e) => {
    setNewSection(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewSection({ title: '', description: '', difficulty: 'Intermediate', experience: '', categories: '' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Interview Sections</h1>
            <span className="text-sm text-gray-500">Choose your specialization</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm font-medium"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add New Section
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Interview Path</h2>
          <p className="text-gray-600">Select a specialization to start your targeted interview preparation journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                {/* Card header */}
                <div className={`bg-gradient-to-r ${section.gradient} p-6 text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <p className="text-sm opacity-90">{section.description}</p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{section.stats.questions}</p>
                      <p className="text-xs text-gray-500">Questions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{section.stats.avgScore}</p>
                      <p className="text-xs text-gray-500">Avg Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">{section.stats.difficulty}</p>
                      <p className="text-xs text-gray-500">Difficulty</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">{section.stats.timeEstimate}</p>
                      <p className="text-xs text-gray-500">Est. Time</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {section.categories.slice(0, 3).map((cat, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">{cat}</span>
                      ))}
                      {section.categories.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">+{section.categories.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>Experience: {section.experience}</span>
                    <span>Updated: {section.lastUpdated}</span>
                  </div>

                  {/* Buttons — completely separate, no parent onClick */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/quick-interview/${section.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 text-sm font-medium transition-all"
                    >
                      <Play className="w-4 h-4" />
                      Quick Start
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/interview-details/${section.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Can't find your specialization?</h3>
            <p className="text-gray-600 mb-4">We're constantly adding new interview sections. Let us know what you'd like to see!</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
              Request New Section
            </button>
          </div>
        </div>
      </main>

      {/* Add Section Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add New Interview Section</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title *</label>
                  <input type="text" name="title" value={newSection.title} onChange={handleInputChange} required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Cybersecurity" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea name="description" value={newSection.description} onChange={handleInputChange} required rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Brief description" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select name="difficulty" value={newSection.difficulty} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Experience</label>
                  <input type="text" name="experience" value={newSection.experience} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 2 Years" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Key Topics (comma separated)</label>
                  <input type="text" name="categories" value={newSection.categories} onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Python, ML, Data Analysis" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSections;
