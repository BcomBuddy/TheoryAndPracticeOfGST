import React, { useState } from 'react';
import { BookOpen, Calculator, FileText, Settings, Briefcase, ArrowRight } from 'lucide-react';
import { SSOTestComponent } from './SSOTestComponent';

interface HomepageProps {
  onModuleSelect: (module: string) => void;
}

const modules = [
  { 
    id: 'module1', 
    name: 'Introduction to GST', 
    icon: BookOpen,
    description: 'Learn GST basics, tax determination, and input credit concepts',
    topics: ['GST Fundamentals', 'Tax Registration', 'Input Tax Credit', 'Payment of Tax']
  },
  { 
    id: 'module2', 
    name: 'Getting Started with GST', 
    icon: Calculator,
    description: 'Master supply types, tax rates, and basic GST operations',
    topics: ['Intrastate vs Interstate', 'Tax Rates', 'Supply Recording', 'Purchase Returns']
  },
  { 
    id: 'module3', 
    name: 'Advanced Entries & Returns', 
    icon: FileText,
    description: 'Handle complex entries, adjustments, and return filing',
    topics: ['Composition Dealer', 'Export/Import', 'GSTR Reports', 'Challan Reconciliation']
  },
  { 
    id: 'module4', 
    name: 'GST on Services', 
    icon: Settings,
    description: 'Service-specific GST rules and place of supply determination',
    topics: ['Place of Supply', 'Service Cancellation', 'Tax Rate Setup', 'Interstate Services']
  },
  { 
    id: 'module5', 
    name: 'Advanced Entries & ERP', 
    icon: Briefcase,
    description: 'Advanced operations, reverse charge, and ERP integration',
    topics: ['Multiple Services', 'Partial Payments', 'Reverse Charge', 'ERP Migration']
  },
];

const Homepage: React.FC<HomepageProps> = ({ onModuleSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const videoOptions = {
    english: {
      label: 'English',
      url: 'https://www.youtube.com/embed/zpaLAL8zbjg?rel=0&modestbranding=1'
    },
    hindi: {
      label: 'Hindi/Urdu',
      url: 'https://www.youtube.com/embed/3eywcG_eCto?rel=0&modestbranding=1'
    },
    telugu: {
      label: 'Telugu',
      url: 'https://www.youtube.com/embed/WwXx1I60L2k?rel=0&modestbranding=1'
    }
  };

  return (
    <div className="w-full">
      {/* Header Banner Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-10 mb-12">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            GST Simulator
          </h2>
          <p className="text-lg text-white mt-2 max-w-2xl">
            Master GST concepts through interactive learning. Practice calculations, understand workflows, 
            and gain hands-on experience with India's Goods and Services Tax system.
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          🎥 Learn about this simulator
        </h3>
        
        {/* Language Selection Dropdown */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-xs">
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Select Video Language
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi/Urdu</option>
              <option value="telugu">Telugu</option>
            </select>
          </div>
        </div>

        {/* Video Player */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={videoOptions[selectedLanguage as keyof typeof videoOptions].url}
              title={`GST Simulator Introduction - ${videoOptions[selectedLanguage as keyof typeof videoOptions].label}`}
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          
          return (
            <div
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {module.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {module.description}
                </p>
                
                <div className="space-y-1">
                  {module.topics.map((topic, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-500">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SSO Test Component */}
      <div className="mb-12">
        <SSOTestComponent />
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 border border-blue-100">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Interactive Learning Experience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Crisp Definitions</h4>
              <p className="text-sm text-gray-600">Quick, clear conceptual explanations for all GST topics</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Step-by-Step Practice</h4>
              <p className="text-sm text-gray-600">Interactive simulators with detailed working and formulas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Settings className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real Workflows</h4>
              <p className="text-sm text-gray-600">Practice actual GST processes and scenarios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;