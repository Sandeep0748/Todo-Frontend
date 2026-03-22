import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              TodoMaster
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Your modern task management solution for staying organized and productive.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tasks" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  My Tasks
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Task Management
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Status Tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                User Authentication
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 TodoMaster. Built with ❤️ using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
