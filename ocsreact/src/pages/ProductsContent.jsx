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
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleEdit = (productId) => {
    console.log('Edit product:', productId);
    // TODO: Implement edit functionality
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.delete(productId);
        setProducts(products.filter(p => p.id !== productId));
        
        // Adjust current page if needed after deletion
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
      <div className="space-y-6">
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
      <div className="space-y-6">
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
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section with Padding */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Products</h2>
              <p className="text-gray-600 text-sm">Manage your product inventory</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
              <span className="text-lg">+</span>
              Add Product
            </button>
          </div>
        </div>

        {/* Desktop Table View - Hidden on mobile (md breakpoint = 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-max">
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
                <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}>
                  <td className="px-6 py-4 font-mono text-sm text-gray-800">{product.productCode}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{product.productName}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productLine}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productVendor}</td>
                  <td className="px-6 py-4 text-gray-600">{product.productScale}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      product.quantityInStock > 5000 ? 'bg-green-100 text-green-800' :
                      product.quantityInStock > 1000 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.quantityInStock}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">${product.buyPrice}</td>
                  <td className="px-6 py-4 font-semibold text-blue-600">${product.msrp}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
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

        {/* Mobile Card View - Shown only on mobile */}
        <div className="md:hidden p-4 space-y-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 flex justify-between items-start">
                <div className="text-white flex-1 min-w-0">
                  <div className="font-semibold text-base truncate">{product.productName}</div>
                  <div className="text-emerald-100 text-sm font-mono">{product.productCode}</div>
                </div>
                <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${
                  product.quantityInStock > 5000 ? 'bg-green-100 text-green-800' :
                  product.quantityInStock > 1000 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
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

        {/* Pagination - Inside padded area */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} products</span>
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
            <div className="flex items-center gap-2">
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
                // Show first page, last page, current page, and pages around current
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
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={pageNumber} className="px-2">...</span>;
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







// import React, { useState, useEffect } from 'react';
// import { productApi, productLineApi } from '../services/api';
// import SearchBar from '../components/SearchBar';

// const ProductsContent = () => {
//   const [products, setProducts] = useState([]);
//   const [productLines, setProductLines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProductLine, setSelectedProductLine] = useState('');
  
//   // Modal states
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [isAddFormVisible, setIsAddFormVisible] = useState(false);
//   const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  
//   // Complete form state - ALL FIELDS
//   const [formData, setFormData] = useState({
//     productCode: '',
//     productName: '',
//     productLine: '',
//     productVendor: '',
//     productScale: '',
//     quantityInStock: '',
//     buyPrice: '',
//     msrp: '',
//     productDescription: ''
//   });
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);

//   // Fetch products and product lines
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await productApi.getAll();
//       setProducts(data);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductLines = async () => {
//     try {
//       const data = await productLineApi.getAll();
//       setProductLines(data);
//     } catch (err) {
//       console.error('Error fetching product lines:', err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchProductLines();
//   }, []);

//   // Animation handlers
//   const openAddForm = () => {
//     setShowAddForm(true);
//     setTimeout(() => setIsAddFormVisible(true), 10);
//   };

//   const closeAddForm = () => {
//     setIsAddFormVisible(false);
//     setTimeout(() => {
//       setShowAddForm(false);
//       setFormData({
//         productCode: '',
//         productName: '',
//         productLine: '',
//         productVendor: '',
//         productScale: '',
//         quantityInStock: '',
//         buyPrice: '',
//         msrp: '',
//         productDescription: ''
//       });
//     }, 300);
//   };

//   const openEditForm = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       productCode: product.productCode || product.productcode || '',
//       productName: product.productName || product.productname || '',
//       productLine: product.productLine || product.productline || '',
//       productVendor: product.productVendor || product.productvendor || '',
//       productScale: product.productScale || product.productscale || '',
//       quantityInStock: String(product.quantityInStock || product.quantityinstock || ''),
//       buyPrice: String(product.buyPrice || product.buyprice || ''),
//       msrp: String(product.msrp || ''),
//       productDescription: product.productDescription || product.productdescription || ''
//     });
//     setShowEditForm(true);
//     setTimeout(() => setIsEditFormVisible(true), 10);
//   };

//   const closeEditForm = () => {
//     setIsEditFormVisible(false);
//     setTimeout(() => {
//       setShowEditForm(false);
//       setEditingProduct(null);
//       setFormData({
//         productCode: '',
//         productName: '',
//         productLine: '',
//         productVendor: '',
//         productScale: '',
//         quantityInStock: '',
//         buyPrice: '',
//         msrp: '',
//         productDescription: ''
//       });
//     }, 300);
//   };

//   // Handle form input changes - EXACT SAME AS HOMECONTENT
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle form submission for adding
//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.productCode.trim() || !formData.productName.trim() || 
//         !formData.productLine.trim() || !formData.productScale.trim() || 
//         !formData.productVendor.trim() || !formData.productDescription.trim()) {
//       alert('Please fill in all required fields (Code, Name, Line, Scale, Vendor, Description)');
//       return;
//     }

//     // Validate MSRP is positive if provided
//     if (formData.msrp && parseFloat(formData.msrp) <= 0) {
//       alert('MSRP must be greater than 0');
//       return;
//     }

//     try {
//       setFormLoading(true);
//       // Convert to proper types for Spring Boot backend - use camelCase for API
//       const submitData = {
//         productCode: formData.productCode.trim(),
//         productName: formData.productName.trim(),
//         productLine: formData.productLine.trim(),
//         productScale: formData.productScale.trim(),
//         productVendor: formData.productVendor.trim(),
//         productDescription: formData.productDescription.trim(),
//         quantityInStock: formData.quantityInStock ? parseInt(formData.quantityInStock) : 0,
//         buyPrice: formData.buyPrice ? parseFloat(formData.buyPrice) : 0.01,
//         msrp: formData.msrp ? parseFloat(formData.msrp) : 0.01
//       };
      
//       console.log('Form Data before submit:', formData);
//       console.log('Submit Data:', submitData);
//       await productApi.create(submitData);
//       closeAddForm();
//       await fetchProducts();
//       alert('Product added successfully!');
//     } catch (err) {
//       alert('Error adding product: ' + err.message);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // Handle form submission for editing
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.productCode.trim() || !formData.productName.trim() || 
//         !formData.productLine.trim() || !formData.productScale.trim() || 
//         !formData.productVendor.trim() || !formData.productDescription.trim()) {
//       alert('Please fill in all required fields (Code, Name, Line, Scale, Vendor, Description)');
//       return;
//     }

//     try {
//       setFormLoading(true);
//       // Convert to proper types for Spring Boot backend - use camelCase for API
//       const submitData = {
//         productCode: formData.productCode.trim(),
//         productName: formData.productName.trim(),
//         productLine: formData.productLine.trim(),
//         productScale: formData.productScale.trim(),
//         productVendor: formData.productVendor.trim(),
//         productDescription: formData.productDescription.trim(),
//         quantityInStock: formData.quantityInStock ? parseInt(formData.quantityInStock) : 0,
//         buyPrice: formData.buyPrice ? parseFloat(formData.buyPrice) : 0.01,
//         msrp: formData.msrp ? parseFloat(formData.msrp) : 0.01
//       };
      
//       console.log('Edit Form Data before submit:', formData);
//       console.log('Edit Submit Data:', submitData);
//       await productApi.update(editingProduct.id, submitData);
//       closeEditForm();
//       await fetchProducts();
//       alert('Product updated successfully!');
//     } catch (err) {
//       alert('Error updating product: ' + err.message);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleEdit = (product) => {
//     openEditForm(product);
//   };

//   const handleDelete = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await productApi.delete(productId);
//         setProducts(products.filter(p => p.id !== productId));
//         alert('Product deleted successfully!');
//       } catch (err) {
//         alert('Error deleting product: ' + err.message);
//       }
//     }
//   };

//   // Filter products based on search term and selected product line
//   const filteredProducts = products.filter(product => {
//     const searchLower = searchTerm.toLowerCase().trim();
//     const matchesSearch = !searchLower || [
//       product.productCode || product.productcode,
//       product.productName || product.productname,
//       product.productVendor || product.productvendor,
//       product.productScale || product.productscale
//     ].some(field => field?.toLowerCase().includes(searchLower));

//     const matchesProductLine = !selectedProductLine || 
//       (product.productLine || product.productline) === selectedProductLine;

//     return matchesSearch && matchesProductLine;
//   });

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800">Products</h1>
//         <div className="flex items-center justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
//           <span className="ml-3 text-gray-600">Loading products...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold text-gray-800">Products</h1>
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <div className="text-red-600 text-lg font-semibold mb-2">Connection Error</div>
//           <p className="text-red-700 mb-4">{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
//           >
//             Retry Connection
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800">Products</h1>
//         <button 
//           onClick={openAddForm}
//           className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
//         >
//           <span className="text-lg">+</span>
//           Add Product
//         </button>
//       </div>

//       {/* Search and Filter Controls */}
//       <div className="flex gap-4">
//         <div className="flex-1">
//           <SearchBar 
//             searchTerm={searchTerm}
//             onSearchChange={setSearchTerm}
//             placeholder="Search products by code, name, vendor, or scale..."
//           />
//         </div>
//         <div className="w-64">
//           <select
//             value={selectedProductLine}
//             onChange={(e) => setSelectedProductLine(e.target.value)}
//             className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
//           >
//             <option value="">All Product Lines</option>
//             {productLines.map(line => (
//               <option key={line.id} value={line.productLine}>
//                 {line.productLine}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Add Product Form Modal */}
//       {showAddForm && (
//         <div className={`fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
//           isAddFormVisible ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <div className={`bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${
//             isAddFormVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
//           }`}>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
//             <form onSubmit={handleAddSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="productCode" className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Code *
//                   </label>
//                   <input
//                     type="text"
//                     id="productCode"
//                     name="productCode"
//                     value={formData.productCode}
//                     onChange={handleInputChange}
//                     placeholder="e.g., S10_1678"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="productName"
//                     name="productName"
//                     value={formData.productName}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 1969 Harley Davidson Ultimate Chopper"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="productLine" className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Line *
//                   </label>
//                   <select
//                     id="productLine"
//                     name="productLine"
//                     value={formData.productLine}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   >
//                     <option value="">Select Product Line</option>
//                     {productLines.map(line => (
//                       <option key={line.id} value={line.productLine}>
//                         {line.productLine}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div>
//                   <label htmlFor="productVendor" className="block text-sm font-medium text-gray-700 mb-1">
//                     Vendor *
//                   </label>
//                   <input
//                     type="text"
//                     id="productVendor"
//                     name="productVendor"
//                     value={formData.productVendor}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Autoart Studio Design"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="productScale" className="block text-sm font-medium text-gray-700 mb-1">
//                     Scale *
//                   </label>
//                   <input
//                     type="text"
//                     id="productScale"
//                     name="productScale"
//                     value={formData.productScale}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 1:10"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="quantityInStock" className="block text-sm font-medium text-gray-700 mb-1">
//                     Stock Quantity
//                   </label>
//                   <input
//                     type="text"
//                     id="quantityInStock"
//                     name="quantityInStock"
//                     value={formData.quantityInStock}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 100"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="buyPrice" className="block text-sm font-medium text-gray-700 mb-1">
//                     Buy Price ($)
//                   </label>
//                   <input
//                     type="text"
//                     id="buyPrice"
//                     name="buyPrice"
//                     value={formData.buyPrice}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 48.81"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="msrp" className="block text-sm font-medium text-gray-700 mb-1">
//                     MSRP ($)
//                   </label>
//                   <input
//                     type="text"
//                     id="msrp"
//                     name="msrp"
//                     value={formData.msrp}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 95.70"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
//                   Description *
//                 </label>
//                 <textarea
//                   id="productDescription"
//                   name="productDescription"
//                   value={formData.productDescription}
//                   onChange={handleInputChange}
//                   placeholder="Product description..."
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
//                   required
//                 />
//               </div>
              
//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   disabled={formLoading}
//                   className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   {formLoading ? 'Adding...' : 'Add Product'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={closeAddForm}
//                   className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Edit Product Form Modal */}
//       {showEditForm && (
//         <div className={`fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
//           isEditFormVisible ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <div className={`bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${
//             isEditFormVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
//           }`}>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
//             <form onSubmit={handleEditSubmit} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="editProductCode" className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Code *
//                   </label>
//                   <input
//                     type="text"
//                     id="editProductCode"
//                     name="productCode"
//                     value={formData.productCode}
//                     onChange={handleInputChange}
//                     placeholder="e.g., S10_1678"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="editProductName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="editProductName"
//                     name="productName"
//                     value={formData.productName}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 1969 Harley Davidson Ultimate Chopper"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="editProductLine" className="block text-sm font-medium text-gray-700 mb-1">
//                     Product Line *
//                   </label>
//                   <select
//                     id="editProductLine"
//                     name="productLine"
//                     value={formData.productLine}
//                     onChange={handleInputChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   >
//                     <option value="">Select Product Line</option>
//                     {productLines.map(line => (
//                       <option key={line.id} value={line.productLine}>
//                         {line.productLine}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div>
//                   <label htmlFor="editProductVendor" className="block text-sm font-medium text-gray-700 mb-1">
//                     Vendor *
//                   </label>
//                   <input
//                     type="text"
//                     id="editProductVendor"
//                     name="productVendor"
//                     value={formData.productVendor}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Autoart Studio Design"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="editProductScale" className="block text-sm font-medium text-gray-700 mb-1">
//                     Scale *
//                   </label>
//                   <input
//                     type="text"
//                     id="editProductScale"
//                     name="productScale"
//                     value={formData.productScale}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 1:10"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="editQuantityInStock" className="block text-sm font-medium text-gray-700 mb-1">
//                     Stock Quantity
//                   </label>
//                   <input
//                     type="text"
//                     id="editQuantityInStock"
//                     name="quantityInStock"
//                     value={formData.quantityInStock}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 100"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="editBuyPrice" className="block text-sm font-medium text-gray-700 mb-1">
//                     Buy Price ($)
//                   </label>
//                   <input
//                     type="text"
//                     id="editBuyPrice"
//                     name="buyPrice"
//                     value={formData.buyPrice}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 48.81"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="editMsrp" className="block text-sm font-medium text-gray-700 mb-1">
//                     MSRP ($)
//                   </label>
//                   <input
//                     type="text"
//                     id="editMsrp"
//                     name="msrp"
//                     value={formData.msrp}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 95.70"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label htmlFor="editProductDescription" className="block text-sm font-medium text-gray-700 mb-1">
//                   Description *
//                 </label>
//                 <textarea
//                   id="editProductDescription"
//                   name="productDescription"
//                   value={formData.productDescription}
//                   onChange={handleInputChange}
//                   placeholder="Product description..."
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
//                   required
//                 />
//               </div>
              
//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   disabled={formLoading}
//                   className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   {formLoading ? 'Updating...' : 'Update Product'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={closeEditForm}
//                   className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Results Summary */}
//       {(searchTerm || selectedProductLine) && (
//         <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
//           <p className="text-emerald-700">
//             Showing {filteredProducts.length} of {products.length} products
//             {searchTerm && ` matching "${searchTerm}"`}
//             {selectedProductLine && ` in "${selectedProductLine}"`}
//           </p>
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
//               <tr>
//                 <th className="px-6 py-4 text-left font-semibold">Code</th>
//                 <th className="px-6 py-4 text-left font-semibold">Name</th>
//                 <th className="px-6 py-4 text-left font-semibold">Line</th>
//                 <th className="px-6 py-4 text-left font-semibold">Vendor</th>
//                 <th className="px-6 py-4 text-left font-semibold">Scale</th>
//                 <th className="px-6 py-4 text-left font-semibold">Stock</th>
//                 <th className="px-6 py-4 text-left font-semibold">Buy Price</th>
//                 <th className="px-6 py-4 text-left font-semibold">MSRP</th>
//                 <th className="px-6 py-4 text-left font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredProducts.map((product, index) => (
//                 <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
//                   <td className="px-6 py-4 font-mono text-sm text-gray-800">{product.productCode || product.productcode}</td>
//                   <td className="px-6 py-4 font-medium text-gray-800">{product.productName || product.productname}</td>
//                   <td className="px-6 py-4 text-gray-600">{product.productLine || product.productline}</td>
//                   <td className="px-6 py-4 text-gray-600">{product.productVendor || product.productvendor}</td>
//                   <td className="px-6 py-4 text-gray-600">{product.productScale || product.productscale}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-2 py-1 rounded-full text-sm font-medium ${
//                       (product.quantityInStock || product.quantityinstock) > 80 ? 'bg-green-100 text-green-800' :
//                       (product.quantityInStock || product.quantityinstock) > 50 ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {product.quantityInStock || product.quantityinstock}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 font-semibold text-emerald-600">${product.buyPrice || product.buyprice}</td>
//                   <td className="px-6 py-4 font-semibold text-blue-600">${product.msrp}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button 
//                         onClick={() => handleEdit(product)}
//                         className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
//                         title="Edit"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(product.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
//                         title="Delete"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Empty States */}
//       {filteredProducts.length === 0 && !loading && !error && (searchTerm || selectedProductLine) && (
//         <div className="text-center py-8">
//           <p className="text-gray-500">
//             No products found matching your criteria. Try adjusting your search or filter.
//           </p>
//         </div>
//       )}

//       {products.length === 0 && !loading && !error && !searchTerm && !selectedProductLine && (
//         <div className="text-center py-8">
//           <p className="text-gray-500">No products available. Add some products to get started!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsContent;

