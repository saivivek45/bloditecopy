# Profile Page Features

## Overview
The profile page now includes two functional buttons for authenticated users to manage their account:

1. **Update Profile** - Allows users to change their email and username
2. **Change Password** - Allows users to securely change their password

## Features

### Update Profile
- **Location**: Profile page (`/profile/[id]`)
- **Visibility**: Only shown to the profile owner (when `session.user.id === profile.id`)
- **Functionality**:
  - Update email address
  - Update username
  - Real-time validation using Zod schemas
  - Duplicate email checking
  - Session update after successful changes
  - Toast notifications for success/error feedback

### Change Password
- **Location**: Profile page (`/profile/[id]`)
- **Visibility**: Only shown to the profile owner
- **Functionality**:
  - Current password verification
  - New password with strength requirements
  - Password confirmation matching
  - Show/hide password toggles
  - Secure password hashing
  - Toast notifications for feedback

## Technical Implementation

### API Endpoints
- `PUT /api/update-profile` - Updates user profile information
- `PUT /api/change-password` - Changes user password

### Components
- `UpdateProfileForm` - Reusable form component for profile updates
- `ChangePasswordForm` - Reusable form component for password changes

### Validation
- Uses Zod schemas for client and server-side validation
- Password requirements: minimum 8 characters, at least one uppercase letter and one digit
- Email format validation
- Username requirement validation

### Security Features
- Session-based authentication
- Current password verification for password changes
- Secure password hashing with bcrypt
- Duplicate email prevention
- CSRF protection through NextAuth

### UI/UX Features
- Modal dialogs for better user experience
- Loading states during API calls
- Error handling with user-friendly messages
- Responsive design for mobile and desktop
- Consistent styling with existing UI components
- Toast notifications for user feedback

## Usage

1. Navigate to your profile page (`/profile/[your-user-id]`)
2. Click "Update Profile" to modify email/username
3. Click "Change Password" to update your password
4. Follow the form validation and submit
5. Receive feedback via toast notifications

## Dependencies
- NextAuth for authentication
- React Hook Form for form management
- Zod for validation
- Axios for API calls
- Sonner for toast notifications
- Lucide React for icons
- Radix UI for dialog components