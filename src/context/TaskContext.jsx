import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { tasksAPI } from '../utils/api';

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
  },
};

// Action types
const TASK_ACTIONS = {
  LOAD_TASKS_START: 'LOAD_TASKS_START',
  LOAD_TASKS_SUCCESS: 'LOAD_TASKS_SUCCESS',
  LOAD_TASKS_FAILURE: 'LOAD_TASKS_FAILURE',
  CREATE_TASK_START: 'CREATE_TASK_START',
  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  CREATE_TASK_FAILURE: 'CREATE_TASK_FAILURE',
  UPDATE_TASK_START: 'UPDATE_TASK_START',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
  UPDATE_TASK_FAILURE: 'UPDATE_TASK_FAILURE',
  DELETE_TASK_START: 'DELETE_TASK_START',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
  DELETE_TASK_FAILURE: 'DELETE_TASK_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.LOAD_TASKS_START:
      return { ...state, loading: true, error: null };
    
    case TASK_ACTIONS.LOAD_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload.tasks,
        pagination: {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        },
        error: null,
      };
    
    case TASK_ACTIONS.LOAD_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case TASK_ACTIONS.CREATE_TASK_START:
      return { ...state, loading: true, error: null };
    
    case TASK_ACTIONS.CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [action.payload, ...state.tasks],
        error: null,
      };
    
    case TASK_ACTIONS.CREATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case TASK_ACTIONS.UPDATE_TASK_START:
      return { ...state, loading: true, error: null };
    
    case TASK_ACTIONS.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
        error: null,
      };
    
    case TASK_ACTIONS.UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case TASK_ACTIONS.DELETE_TASK_START:
      return { ...state, loading: true, error: null };
    
    case TASK_ACTIONS.DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task._id !== action.payload),
        error: null,
      };
    
    case TASK_ACTIONS.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case TASK_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Create context
const TaskContext = createContext();

// Provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks
  const loadTasks = async (params = {}) => {
    try {
      dispatch({ type: TASK_ACTIONS.LOAD_TASKS_START });
      const response = await tasksAPI.getTasks(params);
      
      dispatch({
        type: TASK_ACTIONS.LOAD_TASKS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load tasks';
      dispatch({
        type: TASK_ACTIONS.LOAD_TASKS_FAILURE,
        payload: errorMessage,
      });
    }
  };

  // Create task
  const createTask = async (taskData) => {
    try {
      dispatch({ type: TASK_ACTIONS.CREATE_TASK_START });
      const response = await tasksAPI.createTask(taskData);
      
      dispatch({
        type: TASK_ACTIONS.CREATE_TASK_SUCCESS,
        payload: response.data,
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create task';
      dispatch({
        type: TASK_ACTIONS.CREATE_TASK_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      dispatch({ type: TASK_ACTIONS.UPDATE_TASK_START });
      const response = await tasksAPI.updateTask(id, taskData);
      
      dispatch({
        type: TASK_ACTIONS.UPDATE_TASK_SUCCESS,
        payload: response.data,
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update task';
      dispatch({
        type: TASK_ACTIONS.UPDATE_TASK_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      dispatch({ type: TASK_ACTIONS.DELETE_TASK_START });
      await tasksAPI.deleteTask(id);
      
      dispatch({
        type: TASK_ACTIONS.DELETE_TASK_SUCCESS,
        payload: id,
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete task';
      dispatch({
        type: TASK_ACTIONS.DELETE_TASK_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: TASK_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    clearError,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
