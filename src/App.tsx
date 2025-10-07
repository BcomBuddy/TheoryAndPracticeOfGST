import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ModuleOne from './components/modules/ModuleOne';
import ModuleTwo from './components/modules/ModuleTwo';
import ModuleThree from './components/modules/ModuleThree';
import ModuleFour from './components/modules/ModuleFour';
import ModuleFive from './components/modules/ModuleFive';
import Homepage from './components/Homepage';
import Login from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { AuthService } from './services/authService';

function App() {
  const [activeModule, setActiveModule] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, firebaseUser, loading, isAuthenticated, authMethod } = useAuth();

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={() => window.location.reload()} />;
  }

  return (
    <ProtectedRoute>
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
                <div className="text-right">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name || 'User'}
                  </span>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  {user?.role && <p className="text-xs text-gray-500">Role: {user.role}</p>}
                  {authMethod && (
                    <p className="text-xs text-blue-500">
                      Auth: {authMethod === 'sso' ? 'SSO' : 'Firebase'}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => AuthService.logout()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                >
                  Logout
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
    </ProtectedRoute>
  );
}

export default App;