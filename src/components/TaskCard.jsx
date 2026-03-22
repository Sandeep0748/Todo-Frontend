import React, { useState } from 'react';

const TaskCard = ({ task, onEdit, onDelete, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    await onUpdate(task._id, { ...task, status: newStatus });
    setIsUpdating(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700/50';
      case 'in-progress':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700/50';
      case 'completed':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700/50';
      default:
        return 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'in-progress':
        return '🔄';
      case 'completed':
        return '✅';
      default:
        return '⏳';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fadeIn group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex-1 mr-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {task.title}
        </h3>
        <span className={`px-4 py-2 rounded-full text-xs font-semibold border ${getStatusClass(task.status)} animate-pulse-slow`}>
          {getStatusIcon(task.status)} {task.status.replace('-', ' ').toUpperCase()}
        </span>
      </div>
      
      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
          {task.description}
        </p>
      )}
      
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 space-y-2">
        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <span className="text-lg">📅</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">Created: {formatDate(task.createdAt)}</span>
        </div>
        {task.updatedAt !== task.createdAt && (
          <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <span className="text-lg">✏️</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">Updated: {formatDate(task.updatedAt)}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Quick status change buttons */}
        <div className="flex flex-wrap gap-2">
          {task.status !== 'pending' && (
            <button 
              className="px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/40 dark:to-yellow-900/40 hover:from-amber-100 hover:to-yellow-100 dark:hover:from-amber-900/60 dark:hover:to-yellow-900/60 text-amber-800 dark:text-amber-300 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 border border-amber-200 dark:border-amber-700/50 hover:shadow-md"
              onClick={() => handleStatusChange('pending')}
              disabled={isUpdating}
              title="Mark as Pending"
            >
              ⏳ Pending
            </button>
          )}
          {task.status !== 'in-progress' && (
            <button 
              className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/60 dark:hover:to-indigo-900/60 text-blue-800 dark:text-blue-300 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 border border-blue-200 dark:border-blue-700/50 hover:shadow-md"
              onClick={() => handleStatusChange('in-progress')}
              disabled={isUpdating}
              title="Mark as In Progress"
            >
              🔄 In Progress
            </button>
          )}
          {task.status !== 'completed' && (
            <button 
              className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/60 dark:hover:to-emerald-900/60 text-green-800 dark:text-green-300 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50 border border-green-200 dark:border-green-700/50 hover:shadow-md"
              onClick={() => handleStatusChange('completed')}
              disabled={isUpdating}
              title="Mark as Completed"
            >
              ✅ Complete
            </button>
          )}
        </div>
        
        {/* Edit and Delete buttons */}
        <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button 
            className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:shadow-md flex items-center justify-center gap-2"
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            <span>✏️</span>
            Edit
          </button>
          <button 
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/40 dark:to-pink-900/40 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/60 dark:hover:to-pink-900/60 text-red-700 dark:text-red-300 rounded-xl text-sm font-medium transition-all duration-300 border border-red-200 dark:border-red-700/50 hover:shadow-md flex items-center justify-center gap-2"
            onClick={() => onDelete(task._id)}
            title="Delete Task"
          >
            <span>🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
