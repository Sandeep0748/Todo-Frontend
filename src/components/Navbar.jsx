import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg border-b border-white/20 dark:border-gray-700/30 sticky top-0 z-40 animate-slideIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-3xl animate-pulse-slow">✨</span>
            TodoMaster
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-[1.1] transition-transform duration-200"
              title="Toggle theme"
            >
              {isDark ? (
                <span className="text-xl">☀️</span>
              ) : (
                <span className="text-xl">🌙</span>
              )}
            </button>
            
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-full border border-white/20 dark:border-gray-600/50 hover:scale-[1.05] transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    Welcome, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{user.name}</span>
                  </span>
                </div>
                <button 
                  className="btn-primary text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:scale-[1.05] transition-all duration-300"
                  onClick={handleLogout}
                >
                  <span>🚪</span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn-primary text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:scale-[1.05] transition-all duration-300">
                    <span>🔑</span>
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-full font-medium transition-all duration-300 border border-white/20 dark:border-gray-600/30 hover:shadow-lg hover:scale-[1.05] transition-transform duration-200">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
