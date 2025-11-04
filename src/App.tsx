import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CustomizationProvider } from './contexts/CustomizationContext';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { initNotificationMonitoring, setNotificationHandler } from './utils/notifications';
import { preloadComponents, PageLoader } from './utils/lazy-components';
import { initializeDayCleanup } from './utils/day-cleanup';
import './App.css';

// Lazy load heavy components
const LazyDashboard = lazy(() => import('@/pages/Dashboard'));
const LazyGoalsPage = lazy(() => import('@/pages/GoalsPage'));
const LazyAssignmentsPage = lazy(() => import('@/pages/AssignmentsPage'));
const LazyInboxPage = lazy(() => import('@/pages/InboxPage'));
const LazyCalendarPage = lazy(() => import('@/pages/CalendarPage'));
const LazyStudySessionsPage = lazy(() => import('@/pages/StudySessionsPage'));
const LazyAnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
const LazyProfilePage = lazy(() => import('@/pages/ProfilePage'));
const LazySettingsPage = lazy(() => import('@/pages/SettingsPage'));
const LazyCustomizationPage = lazy(() => import('@/pages/CustomizationPage'));
const LazyThemeStorePage = lazy(() => import('@/pages/ThemeStorePage'));
const LazyIdealistPage = lazy(() => import('@/pages/IdealistPage'));
const LazyLoginPage = lazy(() => import('@/pages/LoginPage'));
const LazyRegisterPage = lazy(() => import('@/pages/RegisterPage'));
const LazyAuthCallback = lazy(() => import('@/pages/AuthCallback'));

function AppContent() {
  const { showBrowserNotification } = useNotification();
  
  useEffect(() => {
    // Set up notification handler for utils/notifications.ts
    setNotificationHandler((title, body, type) => {
      showBrowserNotification(title, body, type);
    });
    
    // Initialize notification monitoring for deadline reminders
    initNotificationMonitoring();
    
    // Initialize day start cleanup for completed assignments
    initializeDayCleanup();
    
    // Preload critical components after initial load
    preloadComponents();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, [showBrowserNotification]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Main Routes - All accessible in guest mode */}
        <Route path="/" element={<LazyDashboard />} />
        <Route path="/inbox" element={<LazyInboxPage />} />
        <Route path="/assignments" element={<LazyAssignmentsPage />} />
        <Route path="/goals" element={<LazyGoalsPage />} />
        <Route path="/calendar" element={<LazyCalendarPage />} />
        <Route path="/study-sessions" element={<LazyStudySessionsPage />} />
        <Route path="/analytics" element={<LazyAnalyticsPage />} />
        <Route path="/profile" element={<LazyProfilePage />} />
        <Route path="/settings" element={<LazySettingsPage />} />
        <Route path="/customization" element={<LazyCustomizationPage />} />
        <Route path="/theme-gallery" element={<LazyThemeStorePage />} />
        <Route path="/idealist" element={<LazyIdealistPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LazyLoginPage />} />
        <Route path="/register" element={<LazyRegisterPage />} />
        <Route path="/auth/callback" element={<LazyAuthCallback />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <CustomizationProvider>
            <NotificationProvider>
              <AppContent />
            </NotificationProvider>
          </CustomizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;