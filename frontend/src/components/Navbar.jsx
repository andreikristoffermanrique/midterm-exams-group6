import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout, getStoredUser, isAuthenticated } from '../api';

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Sync auth state on location/route change
  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);
    if (authStatus) {
      const stored = getStoredUser();
      if (stored) {
        setUser(stored);
      } else {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({ username: payload.username || 'User' });
          } catch {
            setUser({ username: 'User' });
          }
        }
      }
    } else {
      setUser(null);
    }
    // Close mobile menu on route navigation
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setUser(null);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight hover:text-blue-100 transition duration-150 flex items-center space-x-2"
          >
            <span>NewsPortal</span>
          </Link>

          {/* Desktop Navigation Links (md and above) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition duration-150 ${
                location.pathname === '/' ? 'bg-blue-700 text-white' : 'hover:bg-blue-500 hover:text-white'
              }`}
            >
              Home
            </Link>

            {isAuth ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition duration-150 ${
                    location.pathname === '/dashboard' ? 'bg-blue-700 text-white' : 'hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <span className="text-sm text-blue-200 px-2 py-1 bg-blue-700 rounded-md">
                  {user?.username ? `@${user.username}` : 'Logged in'}
                </span>
                <button
                  onClick={handleLogout}
                  id="nav-logout-btn"
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600 transition duration-150 shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition duration-150 ${
                    location.pathname === '/login' ? 'bg-blue-700 text-white' : 'hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 transition duration-150 shadow-sm`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button (small screens) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              type="button"
              className="p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Collapsible Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-500 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
            }`}
          >
            Home
          </Link>

          {isAuth ? (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/dashboard' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <div className="px-3 py-1 text-sm text-blue-200">
                Signed in as: <span className="font-semibold">{user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                id="mobile-logout-btn"
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/login' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`block px-3 py-2 rounded-md text-base font-medium bg-white text-blue-600 hover:bg-blue-50`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
