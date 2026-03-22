import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

const DashboardOverview = () => {
  const { tasks } = useTasks();
  const { user } = useAuth();

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0
  };

  const recentTasks = tasks.slice(-3).reverse();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Stats Cards */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-6 rounded-2xl border border-blue-200 dark:border-blue-700/50 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📋</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Tasks</p>
          </div>
          
          <div className="card bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/40 dark:to-yellow-900/40 p-6 rounded-2xl border border-amber-200 dark:border-amber-700/50 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">⏳</span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</span>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">Pending</p>
          </div>
          
          <div className="card bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/40 p-6 rounded-2xl border border-purple-200 dark:border-purple-700/50 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🔄</span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.inProgress}</span>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">In Progress</p>
          </div>
          
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 p-6 rounded-2xl border border-green-200 dark:border-green-700/50 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">✅</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">Completed</p>
          </div>
        </div>
        
        {/* Progress Overview */}
        <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30 mt-6 hover:scale-[1.01] transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            Overall Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{stats.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center pt-2">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pending</div>
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{stats.pending}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">In Progress</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.inProgress}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Completed</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Info & Recent Tasks */}
      <div className="space-y-6">
        {/* User Card */}
        <div className="card bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-700 dark:to-purple-800 p-6 rounded-2xl shadow-lg text-white hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{user?.name}</h3>
              <p className="text-indigo-100 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-100">Member Since</span>
              <span className="text-sm font-semibold text-white">
                {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
        
        {/* Recent Tasks */}
        {recentTasks.length > 0 && (
          <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/30 hover:scale-[1.01] transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-xl">🕐</span>
              Recent Tasks
            </h3>
            <div className="space-y-3">
              {recentTasks.map(task => (
                <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'completed' 
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
                      : task.status === 'in-progress'
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                      : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                  }`}>
                    {task.status === 'completed' ? '✅' : task.status === 'in-progress' ? '🔄' : '⏳'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
