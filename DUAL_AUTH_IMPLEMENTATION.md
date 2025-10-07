# Dual Authentication System: Firebase + JWT-Based SSO

This micro-app implements a comprehensive dual authentication system that supports both Firebase authentication and JWT-based Single Sign-On integration from a parent shell application (BcomBuddy).

## Features

### Firebase Authentication
- Email/password login
- Google OAuth sign-in
- Password reset functionality
- User account creation
- Session persistence

### JWT-Based SSO
- JWT token validation from URL parameters
- Automatic login when users access the app via SSO
- Protected routes that require authentication
- Logout with redirect to shell app
- Clean URL parameters after token validation

## Authentication Methods

The app intelligently handles both authentication methods:

1. **SSO Priority**: If SSO token is present in URL, it takes precedence
2. **Firebase Fallback**: If no SSO token, falls back to Firebase authentication
3. **Session Persistence**: Maintains authentication state across page refreshes
4. **Method Tracking**: Tracks which authentication method was used

## URL Format

When users access this app from the shell, the URL will be:
```
https://my-app.netlify.app?token=ENCODED_JWT_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
```

## JWT Token Structure

The SSO token contains this user data with the correct micro-app domain:

```json
{
  "uid": "user_id",
  "email": "user@example.com", 
  "name": "User Name",
  "yearOfStudy": "1st Year",
  "role": "student",
  "isAdmin": false,
  "shellDomain": "https://bcombuddy.netlify.app",
  "microAppDomain": "https://my-app.netlify.app",
  "iat": 1234567890,
  "exp": 1234654290,
  "firebaseToken": "firebase_jwt_token"
}
```

## Implementation Details

### AuthService (`src/services/authService.ts`)

The unified authentication service that handles both methods:

#### SSO Methods
- `validateTokenFromShell()`: Parse and validate JWT from URL
- `getUserData()`: Retrieve stored user data
- `getAuthMethod()`: Get current authentication method
- `isAuthenticated()`: Check auth status for both methods
- `logout()`: Handle logout for both methods
- `cleanUrl()`: Remove token parameters from URL

#### Firebase Methods
- `signInWithEmail()`: Email/password authentication
- `signInWithGoogle()`: Google OAuth authentication
- `createAccount()`: User registration
- `signOut()`: Firebase sign out
- `sendPasswordResetEmail()`: Password reset
- `onAuthStateChanged()`: Firebase auth state listener

### useAuth Hook (`src/hooks/useAuth.ts`)

Custom React hook that manages both authentication states:
- Automatic SSO token validation on app load
- Firebase auth state management
- Loading states during authentication
- User data management for both methods
- Logout functionality for both methods

### ProtectedRoute Component (`src/components/ProtectedRoute.tsx`)

Route protection component that:
- Shows loading spinner during authentication
- Redirects to login page if not authenticated
- Wraps protected content

### App Component Updates

The main App component now:
- Uses the dual authentication hook
- Shows user information when logged in
- Displays authentication method indicator
- Handles logout functionality for both methods
- Shows Firebase login form when not authenticated

## Authentication Flow

### SSO Authentication Flow
1. User accesses app with SSO token in URL
2. Token is validated and user data extracted
3. User data stored in localStorage with 'sso' method
4. URL parameters cleaned
5. User authenticated and app content shown

### Firebase Authentication Flow
1. User sees login form
2. User enters credentials or uses Google OAuth
3. Firebase authenticates user
4. User data stored in localStorage with 'firebase' method
5. User authenticated and app content shown

### Session Persistence
1. On app load, check for stored authentication method
2. If SSO: validate stored user data
3. If Firebase: set up auth state listener
4. Maintain authentication state across refreshes

## User Interface

### Authentication Test Component
The app includes a comprehensive test component that shows:
- Current authentication method (SSO or Firebase)
- User data from both authentication sources
- Firebase user details when applicable
- Logout functionality appropriate to the method

### Header Display
The app header shows:
- User name and email
- Role (if available from SSO)
- Authentication method indicator
- Logout button

## Environment Variables

Create a `.env` file with:

```env
VITE_SHELL_DOMAIN=https://bcombuddy.netlify.app
VITE_APP_TYPE=simulator
```

## Security Features

### SSO Security
- Token structure validation before parsing
- Token expiration checking
- Sensitive data removal from URL after validation
- HTTPS enforcement in production

### Firebase Security
- Secure authentication with Firebase Auth
- Google OAuth integration
- Password strength validation
- Email verification support

### General Security
- Error handling for invalid or expired tokens
- Graceful fallbacks to authentication required state
- Secure logout for both methods
- Session management

## Error Handling

The implementation handles:
- Invalid SSO token format
- Expired SSO tokens
- Missing required fields
- Firebase authentication errors
- Network errors
- Graceful fallbacks to authentication required state

## Console Logging

The system includes console logging for debugging:
- Successful SSO login with user data
- Token validation errors
- Authentication method changes
- Firebase auth state changes

## Production Considerations

- Ensure HTTPS is used in production
- Validate token signatures if required by your security policy
- Consider implementing token refresh mechanisms
- Monitor authentication logs for security issues
- Test both authentication flows thoroughly
- Configure Firebase security rules appropriately

## Testing

To test both authentication methods:

### Firebase Authentication
1. Access the app without SSO parameters
2. Use the login form with email/password
3. Or use Google OAuth
4. Verify authentication and user data display

### SSO Authentication
1. Create a test JWT token with the required structure
2. Access the app with URL parameters: `?token=TEST_TOKEN&sso=true&shell=https://bcombuddy.netlify.app`
3. Verify automatic login and URL cleaning
4. Test logout functionality

### Session Persistence
1. Authenticate using either method
2. Refresh the page
3. Verify authentication state is maintained
4. Test logout and verify proper cleanup

## Key Benefits

- **Flexibility**: Supports both standalone and integrated usage
- **User Experience**: Seamless authentication regardless of method
- **Security**: Robust authentication with proper error handling
- **Maintainability**: Clean, unified codebase for both methods
- **Scalability**: Easy to extend with additional authentication methods

The dual authentication system is now fully functional and ready for both standalone usage and integration with your BcomBuddy shell application. Users can authenticate using Firebase for standalone access or SSO for integrated access, with seamless switching between methods.
