import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Play, 
  Plus, 
  Trash2,
  User
} from 'lucide-react';

const RoleSelection = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roles = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      abbreviation: 'FD',
      skills: 'React.js, DOM manipulation, CSS Flexbox',
      experience: '2 Years',
      qaCount: '10 Q&A',
      lastUpdated: '30th Apr 2025',
      purpose: 'Preparing for product-based company interviews',
      color: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      abbreviation: 'BD',
      skills: 'Node.js, Express, REST APIs, MongoDB',
      experience: '3 Years',
      qaCount: '20 Q&A',
      lastUpdated: '1st May 2025',
      purpose: 'Want to master backend system design and performance',
      color: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      abbreviation: 'FS',
      skills: 'MERN stack, deployment strategies, authentication',
      experience: '4 Years',
      qaCount: '10 Q&A',
      lastUpdated: '30th Apr 2025',
      purpose: 'Getting ready for startup tech rounds',
      color: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      abbreviation: 'DA',
      skills: 'SQL, Excel, Data Visualization, Power BI',
      experience: '2 Years',
      qaCount: '10 Q&A',
      lastUpdated: '30th Apr 2025',
      purpose: 'Targeting analyst roles in finance domain',
      color: 'bg-pink-100',
      textColor: 'text-pink-800',
      borderColor: 'border-pink-200'
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      abbreviation: 'DE',
      skills: 'CI/CD, Docker, Kubernetes, AWS',
      experience: '5 Years',
      qaCount: '10 Q&A',
      lastUpdated: '30th Apr 2025',
      purpose: 'Switching to a cloud-native role with more automation',
      color: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Designer',
      abbreviation: 'UD',
      skills: 'Figma, user journey, wireframing, accessibility',
      experience: '3 Years',
      qaCount: '10 Q&A',
      lastUpdated: '30th Apr 2025',
      purpose: 'Preparing for top product design interviews',
      color: 'bg-indigo-100',
      textColor: 'text-indigo-800',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'mobile',
      title: 'Mobile App Developer',
      abbreviation: 'MA',
      skills: 'React Native, Flutter, performance optimization',
      experience: '2 Years',
      qaCount: '10 Q&A',
      lastUpdated: '30th Apr 2025',
      purpose: 'Need cross-platform expertise for startup interviews',
      color: 'bg-teal-100',
      textColor: 'text-teal-800',
      borderColor: 'border-teal-200'
    },
    {
      id: 'ai-ml',
      title: 'AI/ML Engineer',
      abbreviation: 'AE',
      skills: 'Python, scikit-learn, model deployment, NLP',
      experience: '1 Year',
      qaCount: '10 Q&A',
      lastUpdated: '30th Apr 2025',
      purpose: 'Cracking ML internship and entry-level roles',
      color: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200'
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      abbreviation: 'PM',
      skills: 'Roadmapping, user stories, KPIs, stakeholder communication',
      experience: '4 Years',
      qaCount: '10 Q&A',
      lastUpdated: '30th Apr 2025',
      purpose: 'Pivoting into tech PM from business analyst back',
      color: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    }
  ];

  const handleRoleClick = (roleId) => {
    navigate(`/interview/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - App title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Interview Prep AI
              </h1>
            </div>

            {/* Right side - User profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'Mike William'}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`relative p-6 rounded-lg border-2 ${role.borderColor} ${role.color} hover:shadow-lg transition-all duration-200 cursor-pointer`}
              onMouseEnter={() => setHoveredCard(role.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleRoleClick(role.id)}
            >
              {/* Delete button - only show on hover */}
              {hoveredCard === role.id && (
                <button className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {/* Role header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 ${role.textColor} bg-white rounded-lg flex items-center justify-center font-bold text-lg border-2 ${role.borderColor}`}>
                  {role.abbreviation}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {role.title}
                </h3>
              </div>

              {/* Skills */}
              <p className="text-sm text-gray-600 mb-4">
                {role.skills}
              </p>

              {/* Metrics */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Experience:</span>
                  <span className="text-xs font-medium text-gray-700">{role.experience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Q&A Count:</span>
                  <span className="text-xs font-medium text-gray-700">{role.qaCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Last Updated:</span>
                  <span className="text-xs font-medium text-gray-700">{role.lastUpdated}</span>
                </div>
              </div>

              {/* Purpose */}
              <p className="text-sm text-gray-700 italic">
                {role.purpose}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side - Play button */}
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Play (k)</span>
            </button>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Right side - Add New button */}
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add New</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection; 