import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Inbox, CheckSquare, Target, Calendar, Clock, BarChart3, X, Settings, Palette, Menu, Sparkles
} from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isGuest, showGuestBanner, dismissGuestBanner } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Inbox', href: '/inbox', icon: Inbox },
    { name: 'Assignments', href: '/assignments', icon: CheckSquare },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Study', href: '/study-sessions', icon: Clock },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 pb-20 md:pb-0 transition-colors duration-300">
      {/* Guest Mode Banner */}
      {isGuest && showGuestBanner && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 border-b border-blue-600 px-4 md:px-6 py-3 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-white text-xs md:text-sm flex items-center gap-2">
              <span className="font-semibold">Guest Mode:</span> 
              <span className="hidden md:inline">Sign in to save your data permanently across devices</span>
              <span className="md:hidden">Sign in to save data</span>
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all hover:shadow-md"
              >
                Sign In
              </button>
              <button
                onClick={dismissGuestBanner}
                className="text-white hover:text-blue-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Top Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Horizontal Tabs */}
            <nav className="flex space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side - Settings & Auth */}
            <div className="flex items-center space-x-3">
              <Link
                to="/settings"
                className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all z-10"
                title="Settings"
              >
                <Settings className="h-6 w-6" />
              </Link>
              {isGuest ? (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-gradient-primary text-sm px-4 py-2 z-10"
                >
                  Sign In
                </button>
              ) : (
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:shadow-md transition-all z-10"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.email?.split('@')[0]}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar - Enhanced */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 md:hidden shadow-md">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowMobileMenu(true)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:bg-gray-100 dark:active:bg-gray-700 rounded-lg transition touch-manipulation z-10"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Idlely</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              to="/settings"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:bg-gray-100 dark:active:bg-gray-700 rounded-lg transition touch-manipulation z-10"
            >
              <Settings className="h-5 w-5" />
            </Link>
            {isGuest ? (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-lg active:opacity-80 transition touch-manipulation shadow-md z-10"
              >
                Sign In
              </button>
            ) : (
              <Link
                to="/profile"
                className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center touch-manipulation shadow-md z-10"
              >
                <span className="text-white font-semibold text-sm">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto px-4 md:px-6 py-4 md:py-8" style={{ maxWidth: 'var(--container-max-width)' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--section-spacing)' 
        }}>
          {children}
        </div>
      </main>

      {/* Mobile Drawer Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          {/* Drawer */}
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-2xl animate-slideIn">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Menu</h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all mb-1 touch-manipulation ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Auth Modal - Enhanced */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sign In</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 -m-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="modal-body">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sign in to save your academic progress across all your devices and access aesthetic customization options.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full btn-gradient-primary"
                >
                  Sign In with Email
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full bg-white dark:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 transition-all touch-manipulation hover:border-gray-300 dark:hover:border-gray-500"
                >
                  Create Account
                </button>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-6">
                Continue as guest to explore features without signing in
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}