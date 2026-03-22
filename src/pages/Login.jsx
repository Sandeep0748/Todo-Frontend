import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(formData);
    if (result.success) {
      navigate('/tasks');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-fadeIn">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-pulse-slow">🔐</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Sign in to your account</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/40 dark:to-pink-900/40 border border-red-200 dark:border-red-700/50 rounded-2xl text-red-700 dark:text-red-300 text-sm flex items-center gap-3 animate-fadeIn">
              <span className="text-xl">⚠️</span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-lg">📧</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-enhanced w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                  formErrors.email 
                    ? 'border-red-300 bg-red-50/50' 
                    : 'border-gray-200'
                }`}
                placeholder="you@example.com"
              />
              {formErrors.email && (
                <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2 animate-fadeIn">
                  <span>⚠️</span>
                  {formErrors.email}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <span className="text-lg">🔑</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`input-enhanced w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                  formErrors.password 
                    ? 'border-red-300 bg-red-50/50' 
                    : 'border-gray-200'
                }`}
                placeholder="••••••••"
              />
              {formErrors.password && (
                <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2 animate-fadeIn">
                  <span>⚠️</span>
                  {formErrors.password}
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <span className="text-xl">🚀</span>
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-colors duration-300"
              >
                Create one here ✨
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
