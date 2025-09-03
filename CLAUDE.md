# Parcel Express Client App - Navigation Structure

## Overview
Expo app with SDK 53 and multilanguage support (Georgian/English) with React Navigation setup.

## Navigation Structure

### 1. Auth Stack (Initial Flow)
- **Splash Screen** (`app/index.tsx`) - App loading screen with i18n welcome message
- **Login Screen** (`app/(auth)/login.tsx`) - User authentication with language selector
- **Register Screen** (`app/(auth)/register.tsx`) - New user registration
- **Guest Order** (`app/(auth)/guest-order.tsx`) - Guest checkout flow
- **Forgot Password** (`app/(auth)/forgot-password.tsx`) - Password recovery

### 2. Main App (Tab Navigation)
After successful login, users access 5 main tabs with Georgian labels:

- **მთავარი (Home)** (`app/(tabs)/index.tsx`) - Dashboard with order stats
- **შეკვეთები (Orders)** (`app/(tabs)/orders.tsx`) - Order history list
- **ახალი შეკვეთა (New Order)** (`app/(tabs)/new-order.tsx`) - Modal presentation style for new orders
- **ჩათი (Support)** (`app/(tabs)/support.tsx`) - Customer support chat interface
- **Profile** (`app/(tabs)/(profile)/index.tsx`) - User profile with stack navigation

### 3. Profile Stack
Profile tab contains nested stack screens:
- **Profile Home** - Main profile screen with user info, language selector, and menu items
- Menu items include: Personal Info, Address Book, Payment Methods, Order History, Notifications, Help & Support, About
- **Logout** - Confirmation dialog for signing out

## Implementation Details

### Authentication Flow
1. App starts with splash screen (2-second delay)
2. Automatically navigates to login screen
3. Login/Register/Guest flows lead to main tab navigator
4. Profile logout returns to login screen

### Tab Navigation Features
- **Georgian language support** for all tab labels
- **Modal presentation** for New Order tab
- **SF Symbols icons** for consistent design
- **Haptic feedback** on tab presses
- **Blur background** on iOS for native feel

### Multilingual Support
- **i18n integration** with react-i18next
- **3 languages**: Georgian (ka-GE), English (en-US), Russian (ru-RU)
- **Language selector** available on login and profile screens
- **Persistent language selection** via AsyncStorage

## Dependencies
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs
- react-native-screens
- react-native-safe-area-context

## Commands
- `npm run dev` - Start development server
- `npm run lint` - Run linter
- `npm run typecheck` - Run TypeScript checks