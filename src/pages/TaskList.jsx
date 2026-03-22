import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import DashboardOverview from '../components/DashboardOverview';

const TaskList = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    tasks, 
    loading: tasksLoading, 
    error, 
    loadTasks, 
    createTask, 
    updateTask, 
    deleteTask,
    clearError 
  } = useTasks();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user) {
      loadTasks(filter !== 'all' ? { status: filter } : {});
    }
  }, [user, filter]);

  const handleCreateTask = async (taskData) => {
    const result = await createTask(taskData);
    if (result.success) {
      setShowCreateForm(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    const result = await updateTask(editingTask._id, taskData);
    if (result.success) {
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (authLoading) {
    return <div className="spinner"></div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Overview */}
        <DashboardOverview />
        
        {/* Header */}
        <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 animate-fadeIn hover:scale-[1.01] transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                My Tasks
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Manage your daily tasks efficiently 🚀</p>
            </div>
            <button 
              className="btn-primary text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 text-lg hover:scale-[1.05] transition-all duration-300"
              onClick={() => setShowCreateForm(true)}
            >
              <span className="text-2xl">✨</span>
              Create New Task
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 animate-slideIn hover:scale-[1.01] transition-all duration-300">
          <div className="flex flex-wrap gap-3">
            <button 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.05] ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('all')}
            >
              📋 All ({tasks.length})
            </button>
            <button 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.05] ${
                filter === 'pending' 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('pending')}
            >
              ⏳ Pending ({tasks.filter(t => t.status === 'pending').length})
            </button>
            <button 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.05] ${
                filter === 'in-progress' 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('in-progress')}
            >
              🔄 In Progress ({tasks.filter(t => t.status === 'in-progress').length})
            </button>
            <button 
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.05] ${
                filter === 'completed' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('completed')}
            >
              ✅ Completed ({tasks.filter(t => t.status === 'completed').length})
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/40 dark:to-pink-900/40 border border-red-200 dark:border-red-700/50 rounded-2xl text-red-700 dark:text-red-300 flex justify-between items-center animate-fadeIn hover:scale-[1.01] transition-all duration-300">
            <span className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              {error}
            </span>
            <button 
              onClick={clearError} 
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-3xl font-bold transition-colors hover:scale-[1.1] transition-transform duration-200"
            >
              ×
            </button>
          </div>
        )}

        {tasksLoading && tasks.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-16 text-center animate-fadeIn hover:scale-[1.01] transition-all duration-300">
            <div className="text-8xl mb-6 animate-pulse-slow">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">No tasks found</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">Create your first task to get started! 🎯</p>
            <button 
              className="btn-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-[1.05] transition-all duration-300"
              onClick={() => setShowCreateForm(true)}
            >
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onUpdate={updateTask}
              />
            ))}
          </div>
        )}

        {/* Create Task Modal */}
        {showCreateForm && (
          <div className="modal-backdrop fixed inset-0 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="modal-content rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
              <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/30 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                    <span className="text-3xl">✨</span>
                    Create New Task
                  </h2>
                  <button 
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold transition-colors hover:scale-[1.1] transition-transform duration-200"
                    onClick={() => setShowCreateForm(false)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <TaskForm
                  onSubmit={handleCreateTask}
                  onCancel={() => setShowCreateForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Edit Task Modal */}
        {editingTask && (
          <div className="modal-backdrop fixed inset-0 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="modal-content rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
              <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/30 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                    <span className="text-3xl">✏️</span>
                    Edit Task
                  </h2>
                  <button 
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold transition-colors hover:scale-[1.1] transition-transform duration-200"
                    onClick={() => setEditingTask(null)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <TaskForm
                  task={editingTask}
                  onSubmit={handleUpdateTask}
                  onCancel={() => setEditingTask(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
