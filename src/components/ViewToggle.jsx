import React from 'react';

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="flex bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl p-1 shadow-lg border border-white/20 dark:border-gray-700/20">
      <button
        onClick={() => onViewChange('list')}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2
          ${view === 'list' 
            ? 'bg-indigo-500 text-white shadow-md' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }
        `}
      >
        <span>📋</span>
        List
      </button>
      <button
        onClick={() => onViewChange('calendar')}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2
          ${view === 'calendar' 
            ? 'bg-indigo-500 text-white shadow-md' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }
        `}
      >
        <span>📅</span>
        Calendar
      </button>
    </div>
  );
};

export default ViewToggle;
