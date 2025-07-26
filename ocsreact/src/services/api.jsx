// Base API configuration
const API_BASE_URL = '/api';

// Generic API error handler
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    // Server responded with error status
    throw new Error(`Server Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
  } else if (error.request) {
    // Request made but no response received
    throw new Error('Network Error: Unable to connect to server. Make sure your Spring Boot backend is running on port 8080.');
  } else {
    // Something else happened
    throw new Error(`Request Error: ${error.message}`);
  }
};

// Generic fetch function with error handling
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    console.log('Making API request to:', url); // Debug log

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }

    // Handle empty responses (like DELETE operations)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }

    return await response.json();
  } catch (error) {
    handleApiError(error);
  }
};

// ============ PRODUCTLINE API FUNCTIONS ============
export const productLineApi = {
  // GET /api/productlines - Get all product lines
  getAll: async () => {
    return await apiRequest('/productlines');
  },

  // GET /api/productlines/{id} - Get product line by ID
  getById: async (id) => {
    return await apiRequest(`/productlines/${id}`);
  },

  // POST /api/productlines/add - Create new product line
  create: async (productLineData) => {
    return await apiRequest('/productlines/add', {
      method: 'POST',
      body: JSON.stringify(productLineData),
    });
  },

  // PUT /api/productlines/{id} - Update product line
  update: async (id, productLineData) => {
    return await apiRequest(`/productlines/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...productLineData, id }),
    });
  },

  // DELETE /api/productlines/{id} - Delete product line
  delete: async (id) => {
    return await apiRequest(`/productlines/${id}`, {
      method: 'DELETE',
    });
  },

  // GET /api/productlines/search/{productLine} - Find by product line name
  findByProductLine: async (productLine) => {
    return await apiRequest(`/productlines/search/${encodeURIComponent(productLine)}`);
  },
};

// ============ PRODUCT API FUNCTIONS ============
export const productApi = {
  // GET /api/products - Get all products
  getAll: async () => {
    return await apiRequest('/products');
  },

  // GET /api/products/{id} - Get product by ID
  getById: async (id) => {
    return await apiRequest(`/products/${id}`);
  },

  // POST /api/products/add - Create new product
  create: async (productData) => {
    return await apiRequest('/products/add', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // PUT /api/products/{id} - Update product
  update: async (id, productData) => {
    return await apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...productData, id }),
    });
  },

  // DELETE /api/products/{id} - Delete product
  delete: async (id) => {
    return await apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // GET /api/products/code/{productCode} - Find by product code
  findByProductCode: async (productCode) => {
    return await apiRequest(`/products/code/${encodeURIComponent(productCode)}`);
  },

  // GET /api/products/line/{productLine} - Find by product line
  findByProductLine: async (productLine) => {
    return await apiRequest(`/products/line/${encodeURIComponent(productLine)}`);
  },
};

// ============ CUSTOMER API FUNCTIONS ============
export const customerApi = {
  // GET /api/customers - Get all customers
  getAll: async () => {
    return await apiRequest('/customers');
  },

  // GET /api/customers/{id} - Get customer by ID
  getById: async (id) => {
    return await apiRequest(`/customers/${id}`);
  },

  // POST /api/customers/add - Create new customer
  create: async (customerData) => {
    return await apiRequest('/customers/add', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  },

  // PUT /api/customers/{id} - Update customer
  update: async (id, customerData) => {
    return await apiRequest(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...customerData, id }),
    });
  },

  // DELETE /api/customers/{id} - Delete customer
  delete: async (id) => {
    return await apiRequest(`/customers/${id}`, {
      method: 'DELETE',
    });
  },

  // GET /api/customers/search/{customerName} - Find by customer name
  findByCustomerName: async (customerName) => {
    return await apiRequest(`/customers/search/${encodeURIComponent(customerName)}`);
  },

  // GET /api/customers/country/{country} - Find by country
  findByCountry: async (country) => {
    return await apiRequest(`/customers/country/${encodeURIComponent(country)}`);
  },
};

// ============ OTHER ENTITY APIs (for future use) ============
export const orderApi = {
  getAll: async () => await apiRequest('/orders'),
  getById: async (id) => await apiRequest(`/orders/${id}`),
  create: async (data) => await apiRequest('/orders/add', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id, data) => await apiRequest(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ ...data, id }) }),
  delete: async (id) => await apiRequest(`/orders/${id}`, { method: 'DELETE' }),
};

export const employeeApi = {
  getAll: async () => await apiRequest('/employees'),
  getById: async (id) => await apiRequest(`/employees/${id}`),
  create: async (data) => await apiRequest('/employees/add', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id, data) => await apiRequest(`/employees/${id}`, { method: 'PUT', body: JSON.stringify({ ...data, id }) }),
  delete: async (id) => await apiRequest(`/employees/${id}`, { method: 'DELETE' }),
};




// // Base API configuration
// const API_BASE_URL = '/api';

// // Generic API error handler
// const handleApiError = (error) => {
//   console.error('API Error:', error);
//   if (error.response) {
//     // Server responded with error status
//     throw new Error(`Server Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
//   } else if (error.request) {
//     // Request made but no response received
//     throw new Error('Network Error: Unable to connect to server. Make sure your Spring Boot backend is running on port 8080.');
//   } else {
//     // Something else happened
//     throw new Error(`Request Error: ${error.message}`);
//   }
// };

// // Generic fetch function with error handling
// const apiRequest = async (endpoint, options = {}) => {
//   try {
//     const url = `${API_BASE_URL}${endpoint}`;
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         ...options.headers,
//       },
//       ...options,
//     };

//     console.log('Making API request to:', url); // Debug log

//     const response = await fetch(url, config);
    
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
//     }

//     // Handle empty responses (like DELETE operations)
//     if (response.status === 204 || response.headers.get('content-length') === '0') {
//       return null;
//     }

//     return await response.json();
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // ============ PRODUCTLINE API FUNCTIONS ============
// export const productLineApi = {
//   // GET /api/productlines - Get all product lines
//   getAll: async () => {
//     return await apiRequest('/productlines');
//   },

//   // GET /api/productlines/{id} - Get product line by ID
//   getById: async (id) => {
//     return await apiRequest(`/productlines/${id}`);
//   },

//   // POST /api/productlines/add - Create new product line
//   create: async (productLineData) => {
//     return await apiRequest('/productlines/add', {
//       method: 'POST',
//       body: JSON.stringify(productLineData),
//     });
//   },

//   // PUT /api/productlines/{id} - Update product line
//   update: async (id, productLineData) => {
//     return await apiRequest(`/productlines/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ ...productLineData, id }),
//     });
//   },

//   // DELETE /api/productlines/{id} - Delete product line
//   delete: async (id) => {
//     return await apiRequest(`/productlines/${id}`, {
//       method: 'DELETE',
//     });
//   },

//   // GET /api/productlines/search/{productLine} - Find by product line name
//   findByProductLine: async (productLine) => {
//     return await apiRequest(`/productlines/search/${encodeURIComponent(productLine)}`);
//   },
// };

// // ============ PRODUCT API FUNCTIONS ============
// export const productApi = {
//   // GET /api/products - Get all products
//   getAll: async () => {
//     return await apiRequest('/products');
//   },

//   // GET /api/products/{id} - Get product by ID
//   getById: async (id) => {
//     return await apiRequest(`/products/${id}`);
//   },

//   // POST /api/products/add - Create new product
//   create: async (productData) => {
//     return await apiRequest('/products/add', {
//       method: 'POST',
//       body: JSON.stringify(productData),
//     });
//   },

//   // PUT /api/products/{id} - Update product
//   update: async (id, productData) => {
//     return await apiRequest(`/products/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ ...productData, id }),
//     });
//   },

//   // DELETE /api/products/{id} - Delete product
//   delete: async (id) => {
//     return await apiRequest(`/products/${id}`, {
//       method: 'DELETE',
//     });
//   },

//   // GET /api/products/code/{productCode} - Find by product code
//   findByProductCode: async (productCode) => {
//     return await apiRequest(`/products/code/${encodeURIComponent(productCode)}`);
//   },

//   // GET /api/products/line/{productLine} - Find by product line
//   findByProductLine: async (productLine) => {
//     return await apiRequest(`/products/line/${encodeURIComponent(productLine)}`);
//   },
// };

// // ============ OTHER ENTITY APIs (for future use) ============
// export const customerApi = {
//   getAll: async () => await apiRequest('/customers'),
//   getById: async (id) => await apiRequest(`/customers/${id}`),
//   create: async (data) => await apiRequest('/customers/add', { method: 'POST', body: JSON.stringify(data) }),
//   update: async (id, data) => await apiRequest(`/customers/${id}`, { method: 'PUT', body: JSON.stringify({ ...data, id }) }),
//   delete: async (id) => await apiRequest(`/customers/${id}`, { method: 'DELETE' }),
// };

// export const orderApi = {
//   getAll: async () => await apiRequest('/orders'),
//   getById: async (id) => await apiRequest(`/orders/${id}`),
//   create: async (data) => await apiRequest('/orders/add', { method: 'POST', body: JSON.stringify(data) }),
//   update: async (id, data) => await apiRequest(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ ...data, id }) }),
//   delete: async (id) => await apiRequest(`/orders/${id}`, { method: 'DELETE' }),
// };

// export const employeeApi = {
//   getAll: async () => await apiRequest('/employees'),
//   getById: async (id) => await apiRequest(`/employees/${id}`),
//   create: async (data) => await apiRequest('/employees/add', { method: 'POST', body: JSON.stringify(data) }),
//   update: async (id, data) => await apiRequest(`/employees/${id}`, { method: 'PUT', body: JSON.stringify({ ...data, id }) }),
//   delete: async (id) => await apiRequest(`/employees/${id}`, { method: 'DELETE' }),
// };
