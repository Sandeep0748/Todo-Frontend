import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    category: 'personal',
    priority: 'medium',
    dueDate: '',
    reminder: false,
    reminderTime: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        category: task.category || 'personal',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        reminder: task.reminder || false,
        reminderTime: task.reminderTime ? new Date(task.reminderTime).toISOString().slice(0, 16) : '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.trim().length > 100) {
      errors.title = 'Title cannot exceed 100 characters';
    }
    
    if (formData.description && formData.description.trim().length > 500) {
      errors.description = 'Description cannot exceed 500 characters';
    }
    
    if (formData.dueDate && new Date(formData.dueDate) < new Date().setHours(0,0,0,0)) {
      errors.dueDate = 'Due date cannot be in the past';
    }
    
    if (formData.reminder && !formData.reminderTime) {
      errors.reminderTime = 'Reminder time is required when reminder is enabled';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
      reminderTime: formData.reminderTime ? new Date(formData.reminderTime) : null,
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <span className="text-lg">📝</span>
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`input-enhanced w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
            formErrors.title 
              ? 'border-red-300 bg-red-50/50' 
              : 'border-gray-200 dark:border-gray-600'
          }`}
          placeholder="Enter task title..."
        />
        {formErrors.title && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2 animate-fadeIn">
            <span>⚠️</span>
            {formErrors.title}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <span className="text-lg">📄</span>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`input-enhanced w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-vertical ${
            formErrors.description 
              ? 'border-red-300 bg-red-50/50' 
              : 'border-gray-200 dark:border-gray-600'
          }`}
          placeholder="Enter task description (optional)..."
          rows="4"
        />
        {formErrors.description && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2 animate-fadeIn">
            <span>⚠️</span>
            {formErrors.description}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span className="text-lg">🏷️</span>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-enhanced w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          >
            <option value="work">💼 Work</option>
            <option value="personal">🏠 Personal</option>
            <option value="study">📚 Study</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span className="text-lg">🎯</span>
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-enhanced w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span className="text-lg">📅</span>
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`input-enhanced w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
              formErrors.dueDate 
                ? 'border-red-300 bg-red-50/50' 
                : 'border-gray-200 dark:border-gray-600'
            }`}
          />
          {formErrors.dueDate && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2 animate-fadeIn">
              <span>⚠️</span>
              {formErrors.dueDate}
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span className="text-lg">📊</span>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-enhanced w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          >
            <option value="pending">⏳ Pending</option>
            <option value="in-progress">🔄 In Progress</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <input
            type="checkbox"
            id="reminder"
            name="reminder"
            checked={formData.reminder}
            onChange={handleChange}
            className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="reminder" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span className="text-lg">🔔</span>
            Set Reminder
          </label>
        </div>
        
        {formData.reminder && (
          <div>
            <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Reminder Date & Time
            </label>
            <input
              type="datetime-local"
              id="reminderTime"
              name="reminderTime"
              value={formData.reminderTime}
              onChange={handleChange}
              className={`input-enhanced w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                formErrors.reminderTime 
                  ? 'border-red-300 bg-red-50/50' 
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            />
            {formErrors.reminderTime && (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2 animate-fadeIn">
                <span>⚠️</span>
                {formErrors.reminderTime}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex gap-4 pt-6">
        <button 
          type="button" 
          className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-800 dark:text-gray-200 rounded-xl transition-all duration-300 font-semibold border border-gray-300 dark:border-gray-600 hover:shadow-lg flex items-center justify-center gap-2"
          onClick={onCancel}
        >
          <span>❌</span>
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn-primary flex-1 px-6 py-4 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <span>{task ? '✏️' : '➕'}</span>
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
