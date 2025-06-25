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
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload.data)
          ? payload.data
          : [];

      return {
        ...state,
        solutions: list,
        pagination: {
          ...state.pagination,
          current: payload.current_page || state.pagination.current,
          total: payload.total || list.length,
          pageSize: payload.per_page || state.pagination.pageSize,
        },
        loading: false,
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

// Helper to safely parse JSON responses
const safeJson = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (_) {
    // Return raw text so caller can throw meaningful error
    return { success: false, message: text };
  }
};

// API functions
const solutionsAPI = {
  // Get all solutions with pagination and filters
  async getSolutions(filters = {}, pagination = {}) {
    const params = new URLSearchParams({
      page: pagination.current || 1,
      per_page: pagination.pageSize || 10,
      ...filters,
    });

    const response = await fetch(`/api/admin/solutions?${params}`);
    const data = await safeJson(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch solutions');
    }
    
    return data.solutions;
  },

  // Get single solution
  async getSolution(id) {
    const response = await fetch(`/api/admin/solutions/${id}`);
    const data = await safeJson(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch solution');
    }
    
    return data.solution;
  },

  // Create solution
  async createSolution(solutionData) {
    const response = await fetch('/api/admin/solutions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
      },
      body: JSON.stringify(solutionData),
    });
    
    const data = await safeJson(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to create solution');
    }
    
    return data.solution;
  },

  // Update solution
  async updateSolution(id, solutionData) {
    const response = await fetch(`/api/admin/solutions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
      },
      body: JSON.stringify(solutionData),
    });
    
    const data = await safeJson(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to update solution');
    }
    
    return data.solution;
  },

  // Delete solution
  async deleteSolution(id) {
    const response = await fetch(`/api/admin/solutions/${id}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        'Accept': 'application/json',
      },
    });
    
    const data = await safeJson(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete solution');
    }
    
    return data;
  },

  // Get available products
  async getAvailableProducts(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/admin/solutions/products/available?${params}`);
    const data = await safeJson(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch products');
    }
    
    return data.products;
  },

  // Assign products to solution
  async assignProducts(solutionId, productIds) {
    const response = await fetch(`/api/admin/solutions/${solutionId}/products/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
      },
      body: JSON.stringify({ product_ids: productIds }),
    });
    
    const data = await safeJson(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to assign products');
    }
    
    return data;
  },

  // Remove products from solution
  async removeProducts(solutionId, productIds) {
    const response = await fetch(`/api/admin/solutions/${solutionId}/products/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
      },
      body: JSON.stringify({ product_ids: productIds }),
    });
    
    const data = await safeJson(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to remove products');
    }
    
    return data;
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
        const data = await solutionsAPI.getSolutions(filters, pagination);
        dispatch({ type: 'SET_SOLUTIONS', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        message.error(error.message);
      }
    },

    // Load single solution
    async loadSolution(id) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const solution = await solutionsAPI.getSolution(id);
        dispatch({ type: 'SET_CURRENT_SOLUTION', payload: solution });
        dispatch({ type: 'SET_LOADING', payload: false });
        return solution;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        message.error(error.message);
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