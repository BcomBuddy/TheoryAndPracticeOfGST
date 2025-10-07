# JWT-Based Single Sign-On (SSO) Implementation

This micro-app implements JWT-based Single Sign-On integration that receives authentication tokens from a parent shell application (BcomBuddy).

## Features

- JWT token validation from URL parameters
- Automatic login when users access the app via SSO
- Protected routes that require authentication
- Logout with redirect to shell app
- Clean URL parameters after token validation
- Fallback handling for existing user data

## URL Format

When users access this app from the shell, the URL will be:
```
https://my-app.netlify.app?token=ENCODED_JWT_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
```

## JWT Token Structure

The token contains this user data with the correct micro-app domain:

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

The main authentication service that handles:
- `validateTokenFromShell()`: Parse and validate JWT from URL
- `getUserData()`: Retrieve stored user data
- `isAuthenticated()`: Check auth status
- `logout()`: Clear data and redirect to shell
- `cleanUrl()`: Remove token parameters from URL

### useAuth Hook (`src/hooks/useAuth.ts`)

Custom React hook that manages authentication state:
- Automatic token validation on app load
- Loading state during authentication
- User data management
- Logout functionality

### ProtectedRoute Component (`src/components/ProtectedRoute.tsx`)

Route protection component that:
- Shows loading spinner during authentication
- Redirects to authentication required message if not authenticated
- Wraps protected content

### App Component Updates

The main App component now:
- Uses the authentication hook
- Shows user information when logged in
- Displays authentication required message when not authenticated
- Handles logout functionality

## Environment Variables

Create a `.env` file with:

```env
VITE_SHELL_DOMAIN=https://bcombuddy.netlify.app
VITE_APP_TYPE=simulator
```

## Security Features

- Token structure validation before parsing
- Token expiration checking
- Sensitive data removal from URL after validation
- HTTPS enforcement in production
- Error handling for invalid or expired tokens

## Usage

1. **SSO Login**: Users access the app through the shell with token parameters
2. **Automatic Authentication**: Token is validated and user data is stored
3. **URL Cleaning**: Token parameters are removed from the URL
4. **Session Management**: User data persists in localStorage
5. **Logout**: Clears data and redirects to shell app

## Error Handling

The implementation handles:
- Invalid token format
- Expired tokens
- Missing required fields
- Network errors
- Graceful fallbacks to authentication required state

## Console Logging

The system includes console logging for debugging:
- Successful SSO login with user data
- Token validation errors
- Authentication state changes

## Production Considerations

- Ensure HTTPS is used in production
- Validate token signatures if required by your security policy
- Consider implementing token refresh mechanisms
- Monitor authentication logs for security issues
- Test logout redirects thoroughly

## Testing

To test the SSO implementation:

1. Create a test JWT token with the required structure
2. Access the app with URL parameters: `?token=TEST_TOKEN&sso=true&shell=https://bcombuddy.netlify.app`
3. Verify automatic login and URL cleaning
4. Test logout functionality
5. Verify fallback behavior when no token is present
