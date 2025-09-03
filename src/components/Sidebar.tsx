import React from 'react';
import { BookOpen, Calculator, FileText, Settings, Briefcase } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleSelect: (module: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const modules = [
  { id: 'module1', name: 'Introduction to GST', icon: BookOpen },
  { id: 'module2', name: 'Getting Started with GST', icon: Calculator },
  { id: 'module3', name: 'Advanced Entries & Returns', icon: FileText },
  { id: 'module4', name: 'GST on Services', icon: Settings },
  { id: 'module5', name: 'Advanced Entries & ERP', icon: Briefcase },
];

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleSelect, isOpen }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">GST Simulator</h1>
              <p className="text-sm text-gray-600 mt-1">3rd Year - 6th Semester</p>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => onModuleSelect('home')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all duration-200 font-medium mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </button>
            
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;
              
              return (
                <button
                  key={module.id}
                  onClick={() => onModuleSelect(module.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-medium text-sm">{module.name}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              Theory and Practice of GST<br />
              B.Com Curriculum
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;