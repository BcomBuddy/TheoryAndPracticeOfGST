import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ModuleOne from './components/modules/ModuleOne';
import ModuleTwo from './components/modules/ModuleTwo';
import ModuleThree from './components/modules/ModuleThree';
import ModuleFour from './components/modules/ModuleFour';
import ModuleFive from './components/modules/ModuleFive';
import Homepage from './components/Homepage';
import Login from './components/Login';
import AuthService from './services/authService';
import { User } from 'firebase/auth';

function App() {
  const [activeModule, setActiveModule] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

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
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              GST Simulator
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email || 'User'}
              </span>
              <button
                onClick={async () => {
                  try {
                    await AuthService.signOut();
                  } catch (error) {
                    console.error('Sign out error:', error);
                  }
                }}
                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
              >
                Sign Out
              </button>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
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