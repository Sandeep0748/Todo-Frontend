import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';

const CalendarView = () => {
  const { tasks } = useTasks();
  const { isDark } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getTasksForDate = (day) => {
    if (!day) return [];
    
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toDateString();
    
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      return new Date(task.dueDate).toDateString() === dateStr;
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = generateCalendarDays();

  return (
    <div className="card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <span className="text-xl">◀</span>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <span className="text-xl">▶</span>
        </button>
      </div>

      {/* Week Days Header */}
      <div className="calendar-grid mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const dayTasks = getTasksForDate(day);
          const isToday = day === new Date().getDate() && 
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear();
          const isSelected = selectedDate === day;

          return (
            <div
              key={index}
              className={`
                calendar-day rounded-lg cursor-pointer transition-all duration-200
                ${!day ? 'bg-transparent' : ''}
                ${isToday ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}
                ${isSelected ? 'ring-2 ring-indigo-500' : ''}
                ${day && !isToday && !isSelected ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}
              `}
              onClick={() => day && setSelectedDate(day)}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {day}
                  </div>
                  
                  {dayTasks.length > 0 && (
                    <div className="space-y-1">
                      {dayTasks.slice(0, 3).map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className={`
                            text-xs p-1 rounded truncate
                            category-${task.category}
                            ${task.priority === 'high' ? 'border-l-2 border-red-500' : ''}
                          `}
                          title={task.title}
                        >
                          {task.title.length > 10 ? task.title.substring(0, 10) + '...' : task.title}
                        </div>
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{dayTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Tasks for {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
          </h3>
          
          {getTasksForDate(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getTasksForDate(selectedDate).map(task => (
                <div
                  key={task._id}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className={`w-3 h-3 rounded-full priority-${task.priority}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {task.category} • {task.priority} priority
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'completed' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
                    task.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' :
                    'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No tasks scheduled for this date
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
