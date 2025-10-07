import { useState, useEffect } from 'react';
import { AuthService, UserData } from '../services/authService';
import { User } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState<'firebase' | 'sso' | null>(null);

  useEffect(() => {
    // First check for SSO token
    const ssoUserData = AuthService.validateTokenFromShell();
    
    if (ssoUserData) {
      setUser(ssoUserData);
      setAuthMethod('sso');
      console.log('✅ SSO Login successful:', ssoUserData);
      setLoading(false);
      return;
    }

    // Check for existing authentication method
    const storedAuthMethod = AuthService.getAuthMethod();
    const storedUserData = AuthService.getUserData();

    if (storedAuthMethod === 'sso' && storedUserData) {
      setUser(storedUserData);
      setAuthMethod('sso');
      setLoading(false);
      return;
    }

    if (storedAuthMethod === 'firebase') {
      // Set up Firebase auth state listener
      const unsubscribe = AuthService.onAuthStateChanged((firebaseUser) => {
        setFirebaseUser(firebaseUser);
        
        if (firebaseUser) {
          // Update user data from Firebase user
          const userData: UserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || '',
            authMethod: 'firebase'
          };
          setUser(userData);
          setAuthMethod('firebase');
          
          // Update stored data
          localStorage.setItem('user_data', JSON.stringify(userData));
          localStorage.setItem('auth_method', 'firebase');
        } else {
          setUser(null);
          setAuthMethod(null);
          localStorage.removeItem('user_data');
          localStorage.removeItem('auth_method');
        }
        
        setLoading(false);
      });

      return () => unsubscribe();
    }

    // No authentication found
    setLoading(false);
  }, []);

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setFirebaseUser(null);
    setAuthMethod(null);
  };

  return {
    user,
    firebaseUser,
    loading,
    isAuthenticated: !!user,
    authMethod,
    logout
  };
};
