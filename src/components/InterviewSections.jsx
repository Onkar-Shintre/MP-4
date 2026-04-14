import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target,
  Code,
  Users,
  Brain,
  Database,
  Cloud,
  Smartphone,
  Palette,
  BarChart3,
  Zap,
  Play,
  Clock,
  Star,
  TrendingUp,
  BookOpen,
  Video,
  Settings,
  Plus,
  X
} from 'lucide-react';

const InterviewSections = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSection, setNewSection] = useState({
    title: '',
    description: '',
    difficulty: 'Intermediate',
    experience: '',
    categories: ''
  });

  const interviewSections = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'React, Vue, Angular, and modern web technologies',
      icon: Code,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      stats: {
        questions: 150,
        difficulty: 'Intermediate',
        avgScore: '85%',
        timeEstimate: '45 min'
      },
      categories: ['React.js', 'DOM manipulation', 'CSS Flexbox', 'State Management'],
      experience: '2 Years',
      lastUpdated: '30th Apr 2025'
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Node.js, Python, Java, and server-side technologies',
      icon: Database,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      stats: {
        questions: 200,
        difficulty: 'Advanced',
        avgScore: '78%',
        timeEstimate: '60 min'
      },
      categories: ['Node.js', 'Express', 'REST APIs', 'MongoDB'],
      experience: '3 Years',
      lastUpdated: '1st May 2025'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      description: 'Complete web application development',
      icon: Zap,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      stats: {
        questions: 180,
        difficulty: 'Advanced',
        avgScore: '82%',
        timeEstimate: '75 min'
      },
      categories: ['MERN stack', 'deployment strategies', 'authentication'],
      experience: '4 Years',
      lastUpdated: '30th Apr 2025'
    },
    {
      id: 'data-analyst',
      title: 'Data Analysis',
      description: 'SQL, Excel, Data Visualization, and analytics',
      icon: BarChart3,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      stats: {
        questions: 120,
        difficulty: 'Intermediate',
        avgScore: '88%',
        timeEstimate: '40 min'
      },
      categories: ['SQL', 'Excel', 'Data Visualization', 'Power BI'],
      experience: '2 Years',
      lastUpdated: '30th Apr 2025'
    },
    {
      id: 'devops',
      title: 'DevOps Engineering',
      description: 'CI/CD, Docker, Kubernetes, and cloud platforms',
      icon: Cloud,
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600',
      stats: {
        questions: 160,
        difficulty: 'Advanced',
        avgScore: '75%',
        timeEstimate: '55 min'
      },
      categories: ['CI/CD', 'Docker', 'Kubernetes', 'AWS'],
      experience: '5 Years',
      lastUpdated: '30th Apr 2025'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'User experience, wireframing, and design systems',
      icon: Palette,
      color: 'bg-pink-500',
      gradient: 'from-pink-500 to-pink-600',
      stats: {
        questions: 100,
        difficulty: 'Intermediate',
        avgScore: '90%',
        timeEstimate: '35 min'
      },
      categories: ['Figma', 'user journey', 'wireframing', 'accessibility'],
      experience: '3 Years',
      lastUpdated: '30th Apr 2025'
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      description: 'React Native, Flutter, and mobile app development',
      icon: Smartphone,
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-teal-600',
      stats: {
        questions: 130,
        difficulty: 'Intermediate',
        avgScore: '83%',
        timeEstimate: '50 min'
      },
      categories: ['React Native', 'Flutter', 'performance optimization'],
      experience: '2 Years',
      lastUpdated: '30th Apr 2025'
    },
    {
      id: 'ai-ml',
      title: 'AI/ML Engineering',
      description: 'Machine learning, deep learning, and AI technologies',
      icon: Brain,
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      stats: {
        questions: 140,
        difficulty: 'Advanced',
        avgScore: '70%',
        timeEstimate: '65 min'
      },
      categories: ['Python', 'scikit-learn', 'model deployment', 'NLP'],
      experience: '1 Year',
      lastUpdated: '30th Apr 2025'
    },
    {
      id: 'product-manager',
      title: 'Product Management',
      description: 'Product strategy, roadmapping, and stakeholder management',
      icon: Users,
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
      stats: {
        questions: 110,
        difficulty: 'Intermediate',
        avgScore: '87%',
        timeEstimate: '45 min'
      },
      categories: ['Roadmapping', 'user stories', 'KPIs', 'stakeholder communication'],
      experience: '4 Years',
      lastUpdated: '30th Apr 2025'
    }
  ];

  const handleSectionClick = (sectionId) => {
    navigate(`/interview-details/${sectionId}`);
  };

  const handleQuickStart = (sectionId) => {
    navigate(`/quick-interview/${sectionId}`);
  };

  const handleAddSection = () => {
    setShowAddSectionModal(true);
  };

  const handleSubmitSection = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New section data:', newSection);
    // Reset form and close modal
    setNewSection({
      title: '',
      description: '',
      difficulty: 'Intermediate',
      experience: '',
      categories: ''
    });
    setShowAddSectionModal(false);
    // You can add a success message here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSection(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Interview Sections
              </h1>
              <span className="ml-2 text-sm text-gray-500">
                Choose your specialization
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span className="text-sm font-medium">Back to Dashboard</span>
              </button>
                             <button
                 onClick={handleAddSection}
                 className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
               >
                 <Plus className="w-4 h-4" />
                 <span className="text-sm font-medium">Add New Section</span>
               </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Interview Path
          </h2>
          <p className="text-gray-600">
            Select a specialization to start your targeted interview preparation journey.
          </p>
        </div>

        {/* Interview Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewSections.map((section) => (
            <div
              key={section.id}
              className={`relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group`}
              onMouseEnter={() => setHoveredCard(section.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${section.gradient} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <p className="text-sm text-white text-opacity-90">{section.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stats */}
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

                {/* Categories */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {section.categories.slice(0, 3).map((category, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        {category}
                      </span>
                    ))}
                    {section.categories.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        +{section.categories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Experience and Last Updated */}
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span>Experience: {section.experience}</span>
                  <span>Updated: {section.lastUpdated}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickStart(section.id);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium"
                  >
                    <Play className="w-4 h-4" />
                    <span>Quick Start</span>
                  </button>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                </div>
              </div>

              {/* Hover overlay */}
              {hoveredCard === section.id && (
                <div className="absolute inset-0 bg-black bg-opacity-5 rounded-lg"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Can't find your specialization?
            </h3>
            <p className="text-gray-600 mb-4">
              We're constantly adding new interview sections. Let us know what you'd like to see!
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Request New Section
            </button>
          </div>
                 </div>
       </main>

       {/* Add New Section Modal */}
       {showAddSectionModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
             <div className="p-6">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-semibold text-gray-900">Add New Interview Section</h3>
                 <button
                   onClick={() => setShowAddSectionModal(false)}
                   className="text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   <X className="w-6 h-6" />
                 </button>
               </div>
               
               <form onSubmit={handleSubmitSection} className="space-y-4">
                 <div>
                   <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                     Section Title *
                   </label>
                   <input
                     type="text"
                     id="title"
                     name="title"
                     value={newSection.title}
                     onChange={handleInputChange}
                     required
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="e.g., Cybersecurity, Blockchain Development"
                   />
                 </div>

                 <div>
                   <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                     Description *
                   </label>
                   <textarea
                     id="description"
                     name="description"
                     value={newSection.description}
                     onChange={handleInputChange}
                     required
                     rows="3"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                     placeholder="Brief description of the interview section"
                   />
                 </div>

                 <div>
                   <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                     Difficulty Level
                   </label>
                   <select
                     id="difficulty"
                     name="difficulty"
                     value={newSection.difficulty}
                     onChange={handleInputChange}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   >
                     <option value="Beginner">Beginner</option>
                     <option value="Intermediate">Intermediate</option>
                     <option value="Advanced">Advanced</option>
                     <option value="Expert">Expert</option>
                   </select>
                 </div>

                 <div>
                   <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                     Required Experience
                   </label>
                   <input
                     type="text"
                     id="experience"
                     name="experience"
                     value={newSection.experience}
                     onChange={handleInputChange}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="e.g., 2 Years, Entry Level"
                   />
                 </div>

                 <div>
                   <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
                     Key Topics (comma separated)
                   </label>
                   <input
                     type="text"
                     id="categories"
                     name="categories"
                     value={newSection.categories}
                     onChange={handleInputChange}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     placeholder="e.g., Python, Machine Learning, Data Analysis"
                   />
                 </div>

                 <div className="flex space-x-3 pt-4">
                   <button
                     type="button"
                     onClick={() => setShowAddSectionModal(false)}
                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                   >
                     Cancel
                   </button>
                   <button
                     type="submit"
                     className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                   >
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