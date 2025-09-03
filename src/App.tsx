import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ModuleOne from './components/modules/ModuleOne';
import ModuleTwo from './components/modules/ModuleTwo';
import ModuleThree from './components/modules/ModuleThree';
import ModuleFour from './components/modules/ModuleFour';
import ModuleFive from './components/modules/ModuleFive';
import Homepage from './components/Homepage';

function App() {
  const [activeModule, setActiveModule] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeModule) {
      case 'module1':
        return <ModuleOne />;
      case 'module2':
        return <ModuleTwo />;
      case 'module3':
        return <ModuleThree />;
      case 'module4':
        return <ModuleFour />;
      case 'module5':
        return <ModuleFive />;
      default:
        return <Homepage onModuleSelect={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar 
        activeModule={activeModule}
        onModuleSelect={setActiveModule}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      {/* Main Content Area */}
      <div className="main-content">
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-end">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
        
        <main className="p-4 lg:p-6">
          <div className="content-container">
            {renderContent()}
          </div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;