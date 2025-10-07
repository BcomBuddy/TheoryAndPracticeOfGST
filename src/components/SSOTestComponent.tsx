import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const SSOTestComponent: React.FC = () => {
  const { user, firebaseUser, isAuthenticated, authMethod, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Authentication Test - Not Authenticated</h3>
        <p className="text-yellow-700 mb-4">
          You can authenticate using either method:
        </p>
        
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-semibold text-blue-800 mb-1">1. Firebase Authentication</h4>
            <p className="text-sm text-blue-700">Use the login form above to sign in with email/password or Google</p>
          </div>
          
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <h4 className="font-semibold text-green-800 mb-1">2. SSO Authentication</h4>
            <p className="text-sm text-green-700 mb-2">Access this app with URL parameters:</p>
            <code className="block p-2 bg-green-100 rounded text-sm">
              ?token=ENCODED_JWT_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="text-lg font-semibold text-green-800 mb-4">
        Authentication Test - Authenticated via {authMethod === 'sso' ? 'SSO' : 'Firebase'}
      </h3>
      
      <div className="space-y-3">
        <div>
          <strong className="text-green-700">Authentication Method:</strong>
          <span className="ml-2 text-green-600 font-semibold">
            {authMethod === 'sso' ? 'SSO (Single Sign-On)' : 'Firebase Authentication'}
          </span>
        </div>
        
        <div>
          <strong className="text-green-700">User ID:</strong>
          <span className="ml-2 text-green-600">{user?.uid}</span>
        </div>
        
        <div>
          <strong className="text-green-700">Name:</strong>
          <span className="ml-2 text-green-600">{user?.name}</span>
        </div>
        
        <div>
          <strong className="text-green-700">Email:</strong>
          <span className="ml-2 text-green-600">{user?.email}</span>
        </div>
        
        {user?.role && (
          <div>
            <strong className="text-green-700">Role:</strong>
            <span className="ml-2 text-green-600">{user.role}</span>
          </div>
        )}
        
        {user?.yearOfStudy && (
          <div>
            <strong className="text-green-700">Year of Study:</strong>
            <span className="ml-2 text-green-600">{user.yearOfStudy}</span>
          </div>
        )}
        
        {user?.isAdmin !== undefined && (
          <div>
            <strong className="text-green-700">Is Admin:</strong>
            <span className="ml-2 text-green-600">{user.isAdmin ? 'Yes' : 'No'}</span>
          </div>
        )}
        
        {user?.shellDomain && (
          <div>
            <strong className="text-green-700">Shell Domain:</strong>
            <span className="ml-2 text-green-600">{user.shellDomain}</span>
          </div>
        )}
        
        {user?.microAppDomain && (
          <div>
            <strong className="text-green-700">Micro App Domain:</strong>
            <span className="ml-2 text-green-600">{user.microAppDomain}</span>
          </div>
        )}

        {firebaseUser && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">Firebase User Details:</h4>
            <div className="space-y-1 text-sm">
              <div><strong>UID:</strong> {firebaseUser.uid}</div>
              <div><strong>Email Verified:</strong> {firebaseUser.emailVerified ? 'Yes' : 'No'}</div>
              <div><strong>Provider:</strong> {firebaseUser.providerData[0]?.providerId || 'N/A'}</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-green-200">
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
        >
          Test Logout {authMethod === 'sso' ? '(Redirect to Shell)' : '(Firebase Sign Out)'}
        </button>
      </div>
    </div>
  );
};
