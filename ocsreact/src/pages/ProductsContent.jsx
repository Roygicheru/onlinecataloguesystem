import React, { useState, useEffect } from 'react';
import { productApi } from '../services/api';

const ProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getAll();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calculate pagination values
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleEdit = (productId) => {
    console.log('Edit product:', productId);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.delete(productId);
        setProducts(products.filter(p => p.id !== productId));

        const newTotalPages = Math.ceil((totalItems - 1) / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } catch (err) {
        alert('Error deleting product: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <span className="ml-3 text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Connection Error</div>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Products</h2>
              <p className="text-gray-600 text-sm">Manage your product inventory</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              <span className="text-lg">+</span>
              Add Product
            </button>
          </div>
        </div>

        {/* Responsive Desktop Table */}
        <div className="hidden md:block overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Code</th>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Line</th>
                <th className="px-6 py-4 text-left font-semibold">Vendor</th>
                <th className="px-6 py-4 text-left font-semibold">Scale</th>
                <th className="px-6 py-4 text-left font-semibold">Stock</th>
                <th className="px-6 py-4 text-left font-semibold">Buy Price</th>
                <th className="px-6 py-4 text-left font-semibold">MSRP</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 font-mono text-sm text-gray-800">{product.productCode}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{product.productName}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productLine}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productVendor}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productScale}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        product.quantityInStock > 5000
                          ? 'bg-green-100 text-green-800'
                          : product.quantityInStock > 1000
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.quantityInStock}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">${product.buyPrice}</td>
                  <td className="px-6 py-4 font-semibold text-blue-600">${product.msrp}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden p-4 space-y-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 flex justify-between items-start">
                <div className="text-white flex-1 min-w-0">
                  <div className="font-semibold text-base truncate">{product.productName}</div>
                  <div className="text-emerald-100 text-sm font-mono">{product.productCode}</div>
                </div>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${
                    product.quantityInStock > 5000
                      ? 'bg-green-100 text-green-800'
                      : product.quantityInStock > 1000
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.quantityInStock}
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">Product Line:</span>
                  <span className="text-sm text-gray-800 font-semibold">{product.productLine}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">Vendor:</span>
                  <span className="text-sm text-gray-800 text-right truncate ml-2">{product.productVendor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">Scale:</span>
                  <span className="text-sm text-gray-800">{product.productScale}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">Buy Price:</span>
                  <span className="text-sm text-emerald-600 font-bold">${product.buyPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">MSRP:</span>
                  <span className="text-sm text-blue-600 font-bold">${product.msrp}</span>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} products
              </span>
              <div className="flex items-center gap-2">
                <span>Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? 'text-gray-400 bg-white border border-gray-300 cursor-not-allowed'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        currentPage === pageNumber
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                  return (
                    <span key={pageNumber} className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'text-gray-400 bg-white border border-gray-300 cursor-not-allowed'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 && !loading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products available. Add some products to get started!</p>
        </div>
      )}
    </div>
  );
};

export default ProductsContent;


