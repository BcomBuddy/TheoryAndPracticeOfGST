import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  User,
  AuthError,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Error message mapping for user-friendly messages
const getErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Popup was blocked by browser. Please allow popups and try again.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};

export interface UserData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy?: string;
  role?: string;
  isAdmin?: boolean;
  shellDomain?: string;
  microAppDomain?: string;
  authMethod?: 'firebase' | 'sso';
}

export class AuthService {
  private static readonly USER_KEY = 'user_data';
  private static readonly AUTH_METHOD_KEY = 'auth_method';

  // SSO Methods
  static validateTokenFromShell(): UserData | null {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const isSSO = urlParams.get('sso') === 'true';

    if (!token || !isSSO) {
      return null;
    }

    try {
      const tokenData = JSON.parse(decodeURIComponent(token));
      
      if (!tokenData.uid || !tokenData.email) {
        return null;
      }

      if (tokenData.exp < Math.floor(Date.now() / 1000)) {
        return null;
      }

      const userData: UserData = {
        uid: tokenData.uid,
        email: tokenData.email,
        name: tokenData.name,
        yearOfStudy: tokenData.yearOfStudy,
        role: tokenData.role,
        isAdmin: tokenData.isAdmin,
        shellDomain: tokenData.shellDomain,
        microAppDomain: tokenData.microAppDomain,
        authMethod: 'sso'
      };

      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      localStorage.setItem(this.AUTH_METHOD_KEY, 'sso');
      this.cleanUrl();
      
      return userData;
    } catch (error) {
      console.error('Error validating token:', error);
      return null;
    }
  }

  static getUserData(): UserData | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  static getAuthMethod(): 'firebase' | 'sso' | null {
    return localStorage.getItem(this.AUTH_METHOD_KEY) as 'firebase' | 'sso' | null;
  }

  static isAuthenticated(): boolean {
    const authMethod = this.getAuthMethod();
    
    if (authMethod === 'sso') {
      return this.getUserData() !== null;
    } else if (authMethod === 'firebase') {
      return auth.currentUser !== null;
    }
    
    return false;
  }

  static logout(): void {
    const authMethod = this.getAuthMethod();
    
    if (authMethod === 'sso') {
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.AUTH_METHOD_KEY);
      
      const userData = this.getUserData();
      const shellDomain = userData?.shellDomain || 
                         new URLSearchParams(window.location.search).get('shell') || 
                         'https://bcombuddy.netlify.app';
      
      window.location.href = shellDomain;
    } else if (authMethod === 'firebase') {
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.AUTH_METHOD_KEY);
      firebaseSignOut(auth);
    }
  }

  private static cleanUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('sso');
    url.searchParams.delete('shell');
    window.history.replaceState({}, document.title, url.toString());
  }

  // Firebase Methods
  static async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Store user data for consistency
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: userCredential.user.displayName || '',
        authMethod: 'firebase'
      };
      
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      localStorage.setItem(this.AUTH_METHOD_KEY, 'firebase');
      
      return userCredential.user;
    } catch (error) {
      throw new Error(getErrorMessage(error as AuthError));
    }
  }

  static async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Store user data for consistency
      const userData: UserData = {
        uid: result.user.uid,
        email: result.user.email || '',
        name: result.user.displayName || '',
        authMethod: 'firebase'
      };
      
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      localStorage.setItem(this.AUTH_METHOD_KEY, 'firebase');
      
      return result.user;
    } catch (error) {
      throw new Error(getErrorMessage(error as AuthError));
    }
  }

  static async createAccount(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store user data for consistency
      const userData: UserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: userCredential.user.displayName || '',
        authMethod: 'firebase'
      };
      
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      localStorage.setItem(this.AUTH_METHOD_KEY, 'firebase');
      
      return userCredential.user;
    } catch (error) {
      throw new Error(getErrorMessage(error as AuthError));
    }
  }

  static async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.AUTH_METHOD_KEY);
    } catch (error) {
      throw new Error('Failed to sign out. Please try again.');
    }
  }

  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): { isValid: boolean; message: string } {
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    return { isValid: true, message: '' };
  }

  static async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin,
        handleCodeInApp: false
      });
    } catch (error) {
      throw new Error(getErrorMessage(error as AuthError));
    }
  }
}

export default AuthService;
