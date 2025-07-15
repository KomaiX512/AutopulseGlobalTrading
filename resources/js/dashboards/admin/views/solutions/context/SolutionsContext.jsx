import React, { createContext, useReducer } from 'react';
import { message } from 'antd';

// Create context
export const SolutionsContext = createContext();

// Initial state
const initialState = {
  solutions: [],
  loading: false,
  error: null,
  currentSolution: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  },
  filters: {
    search: '',
    is_viewable: ''
  }
};

// Reducer
const solutionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SOLUTIONS': {
      // Ensure we always store an array of solutions and valid pagination meta
      const payload = action.payload || {};
      const list = Array.isArray(payload.data) ? payload.data : [];

      return {
        ...state,
        solutions: list,
        pagination: {
          ...state.pagination,
          current: payload.current_page || 1,
          total: payload.total || list.length,
          pageSize: payload.per_page || 10,
        },
        loading: false,
        error: null, // Clear any previous errors
      };
    }
    case 'SET_CURRENT_SOLUTION':
      return { ...state, currentSolution: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case 'DELETE_SOLUTION':
      return {
        ...state,
        solutions: state.solutions.filter(solution => solution.id !== action.payload)
      };
    case 'UPDATE_SOLUTION':
      return {
        ...state,
        solutions: state.solutions.map(solution =>
          solution.id === action.payload.id ? action.payload : solution
        )
      };
    case 'ADD_SOLUTION':
      return {
        ...state,
        solutions: [action.payload, ...state.solutions]
      };
    default:
      return state;
  }
};

// Helper to get CSRF token with better error handling
const getCsrfToken = () => {
  try {
    // First try: meta tag
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (metaToken) {
      return decodeURIComponent(metaToken);
    }

    // Second try: XSRF-TOKEN cookie
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const xsrfCookie = cookies.find(cookie => cookie.startsWith('XSRF-TOKEN='));
    if (xsrfCookie) {
      return decodeURIComponent(xsrfCookie.split('=')[1]);
    }

    // Third try: Laravel session cookie
    const laravelCookie = cookies.find(cookie => cookie.startsWith('laravel_session='));
    if (laravelCookie) {
      return decodeURIComponent(laravelCookie.split('=')[1]);
    }

    console.warn('CSRF token not found in any expected location');
    return null;
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    return null;
  }
};

// Helper to refresh session and get new CSRF token
const refreshSession = async () => {
  try {
    // First try: Sanctum CSRF endpoint
    let response = await fetch('/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      // Second try: Custom refresh endpoint
      response = await fetch('/api/refresh-csrf', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
        }
      });
    }

    if (response.ok) {
      // Wait a moment for cookies to be set
      await new Promise(resolve => setTimeout(resolve, 100));
      return getCsrfToken();
    }
  } catch (error) {
    console.error('Failed to refresh session:', error);
  }
  return null;
};

// Helper to make authenticated requests with CSRF handling
const makeAuthenticatedRequest = async (url, options = {}) => {
  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    try {
      let csrfToken = getCsrfToken();
      
      if (!csrfToken && attempts === 0) {
        csrfToken = await refreshSession();
      }

      if (!csrfToken) {
        throw new Error('CSRF token not available');
      }

      // Prepare headers - don't set Content-Type for FormData
      const headers = {
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers
      };

      // Remove Content-Type header if we're sending FormData
      if (options.body instanceof FormData) {
        delete headers['Content-Type'];
      }

      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'same-origin'
      });

      if (response.status === 419) {
        if (attempts < maxAttempts - 1) {
          attempts++;
          await refreshSession();
          continue;
        }
        throw new Error('CSRF token mismatch. Please refresh the page and try again.');
      }

      if (response.status === 401) {
        throw new Error('Authentication required. Please log in again.');
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      if (attempts === maxAttempts - 1) {
        throw error;
      }
      attempts++;
    }
  }
};

// API functions
const solutionsAPI = {
  // Get solutions list
  async getSolutions(filters = {}, pagination = {}) {
    const params = new URLSearchParams({
      ...filters,
      page: pagination.current || 1,
      per_page: pagination.pageSize || 10
    });

    return makeAuthenticatedRequest(`/api/admin/solutions?${params}`, {
      method: 'GET'
    });
  },

  // Get single solution
  async getSolution(id) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${id}`, {
      method: 'GET'
    });
  },

  // Create solution
  async createSolution(solutionData) {
    return makeAuthenticatedRequest('/api/admin/solutions', {
      method: 'POST',
      body: solutionData // Remove headers for FormData
    });
  },

  // Update solution
  async updateSolution(id, solutionData) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${id}`, {
      method: 'PUT',
      body: solutionData // Remove headers for FormData
    });
  },

  // Delete solution
  async deleteSolution(id) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${id}`, {
      method: 'DELETE'
    });
  },

  // Get available products
  async getAvailableProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    return makeAuthenticatedRequest(`/api/admin/solutions/products/available?${params}`, {
      method: 'GET'
    });
  },

  // Assign products
  async assignProducts(solutionId, productIds) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${solutionId}/products/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_ids: productIds })
    });
  },

  // Remove products
  async removeProducts(solutionId, productIds) {
    return makeAuthenticatedRequest(`/api/admin/solutions/${solutionId}/products/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_ids: productIds })
    });
  }
};

// Context Provider
export const SolutionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(solutionsReducer, initialState);

  const methods = {
    // Load solutions
    async loadSolutions(filters = {}, pagination = {}) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        
        const data = await solutionsAPI.getSolutions(filters, pagination);
        dispatch({ type: 'SET_SOLUTIONS', payload: data });
      } catch (error) {
        console.error('Error loading solutions:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
        
        // If it's an authentication error, redirect to login
        if (error.message.includes('Authentication') || error.message.includes('Unauthenticated')) {
          window.location.href = '/login';
          return;
        }
        
        // If it's a network error, show a user-friendly message
        if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
          dispatch({ type: 'SET_ERROR', payload: 'Network error. Please check your connection and try again.' });
          return;
        }
        
        message.error(error.message || 'Failed to load solutions');
      }
    },

    // Load single solution
    async loadSolution(id) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        
        const solution = await solutionsAPI.getSolution(id);
        dispatch({ type: 'SET_CURRENT_SOLUTION', payload: solution });
        dispatch({ type: 'SET_LOADING', payload: false });
        return solution;
      } catch (error) {
        console.error('Error loading solution:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
        dispatch({ type: 'SET_LOADING', payload: false });
        
        // If it's an authentication error, redirect to login
        if (error.message.includes('Authentication') || error.message.includes('Unauthenticated')) {
          window.location.href = '/login';
          return;
        }
        
        message.error(error.message || 'Failed to load solution');
        throw error;
      }
    },

    // Create solution
    async createSolution(solutionData) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const solution = await solutionsAPI.createSolution(solutionData);
        dispatch({ type: 'ADD_SOLUTION', payload: solution });
        dispatch({ type: 'SET_LOADING', payload: false });
        message.success('Solution created successfully');
        return solution;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        message.error(error.message || 'Failed to create solution');
        throw error;
      }
    },

    // Update solution
    async updateSolution(id, solutionData) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const solution = await solutionsAPI.updateSolution(id, solutionData);
        dispatch({ type: 'UPDATE_SOLUTION', payload: solution });
        dispatch({ type: 'SET_CURRENT_SOLUTION', payload: solution });
        dispatch({ type: 'SET_LOADING', payload: false });
        message.success('Solution updated successfully');
        return solution;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        message.error(error.message || 'Failed to update solution');
        throw error;
      }
    },

    // Delete solution
    async deleteSolution(id) {
      try {
        await solutionsAPI.deleteSolution(id);
        dispatch({ type: 'DELETE_SOLUTION', payload: id });
        message.success('Solution deleted successfully');
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    },

    // Get available products
    async getAvailableProducts(filters = {}) {
      try {
        return await solutionsAPI.getAvailableProducts(filters);
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    },

    // Assign products
    async assignProducts(solutionId, productIds) {
      try {
        await solutionsAPI.assignProducts(solutionId, productIds);
        message.success('Products assigned successfully');
        // Reload solution to get updated product count
        await methods.loadSolution(solutionId);
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    },

    // Remove products
    async removeProducts(solutionId, productIds) {
      try {
        await solutionsAPI.removeProducts(solutionId, productIds);
        message.success('Products removed successfully');
        // Reload solution to get updated product count
        await methods.loadSolution(solutionId);
      } catch (error) {
        message.error(error.message);
        throw error;
      }
    },

    // Set filters
    setFilters(filters) {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },

    // Set pagination
    setPagination(pagination) {
      dispatch({ type: 'SET_PAGINATION', payload: pagination });
    },

    // Clear current solution
    clearCurrentSolution() {
      dispatch({ type: 'SET_CURRENT_SOLUTION', payload: null });
    }
  };

  return (
    <SolutionsContext.Provider value={{ state, dispatch, methods }}>
      {children}
    </SolutionsContext.Provider>
  );
}; 