import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ProductLineCard from '../components/ProductLineCard';
import ProductLineModal from '../components/ProductLineModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { productLineApi } from '../services/api';
import { getProductLineIcon } from '../data/mockData';

const HomeContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productLines, setProductLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedProductLine, setSelectedProductLine] = useState(null);
  
  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productLineToDelete, setProductLineToDelete] = useState(null);

  // Fetch product lines from API
  const fetchProductLines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productLineApi.getAll();
      
      // Add icons to the fetched data
      const productLinesWithIcons = data.map(line => ({
        ...line,
        icon: getProductLineIcon(line.productLine)
      }));
      
      setProductLines(productLinesWithIcons);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching product lines:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductLines();
  }, []);

  // Filter product lines based on search term
  const filteredProductLines = productLines.filter(line => {
    const searchLower = searchTerm.toLowerCase().trim();
    const productLineLower = line.productLine?.toLowerCase() || '';
    const descriptionLower = line.textDescription?.toLowerCase() || '';
    
    const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
    
    return searchWords.every(word => 
      productLineLower.includes(word) || descriptionLower.includes(word)
    );
  });

  // Handle Add Product Line
  const handleAddClick = () => {
    setModalMode('add');
    setSelectedProductLine(null);
    setIsModalOpen(true);
  };

  // Handle Edit Product Line
  const handleEdit = (productLine) => {
    setModalMode('edit');
    setSelectedProductLine(productLine);
    setIsModalOpen(true);
  };

  // Handle Delete Product Line - Show confirmation modal
  const handleDelete = (productLine) => {
    setProductLineToDelete(productLine);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    try {
      await productLineApi.delete(productLineToDelete.id);
      setProductLines(productLines.filter(pl => pl.id !== productLineToDelete.id));
      setIsDeleteModalOpen(false);
      setProductLineToDelete(null);
    } catch (err) {
      alert('Error deleting product line: ' + err.message);
      setIsDeleteModalOpen(false);
      setProductLineToDelete(null);
    }
  };

  // Handle Save (Add or Edit)
  const handleSave = async (formData) => {
    try {
      if (modalMode === 'add') {
        // Create new product line
        const newProductLine = await productLineApi.create(formData);
        const productLineWithIcon = {
          ...newProductLine,
          icon: getProductLineIcon(newProductLine.productLine)
        };
        setProductLines([...productLines, productLineWithIcon]);
      } else {
        // Update existing product line
        const updatedProductLine = await productLineApi.update(selectedProductLine.id, formData);
        const productLineWithIcon = {
          ...updatedProductLine,
          icon: getProductLineIcon(updatedProductLine.productLine)
        };
        setProductLines(productLines.map(pl => 
          pl.id === selectedProductLine.id ? productLineWithIcon : pl
        ));
      }
      setIsModalOpen(false);
      setSelectedProductLine(null);
    } catch (err) {
      alert(`Error ${modalMode === 'add' ? 'adding' : 'updating'} product line: ` + err.message);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ClassicModels CMS</h1>
            <p className="text-gray-600 mt-1">Manage your classic model inventory</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <span className="ml-3 text-gray-600">Loading product lines...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ClassicModels CMS</h1>
            <p className="text-gray-600 mt-1">Manage your classic model inventory</p>
          </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">ClassicModels CMS</h1>
          <p className="text-gray-600 mt-1">Manage your classic model inventory</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Add Product Line
        </button>
      </div>

      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search product lines..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProductLines.map(productLine => (
          <ProductLineCard 
            key={productLine.id} 
            productLine={productLine}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredProductLines.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No product lines found matching "{searchTerm}"</p>
        </div>
      )}

      {productLines.length === 0 && !loading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">No product lines available. Add some product lines to get started!</p>
        </div>
      )}

      {/* Product Line Modal */}
      <ProductLineModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProductLine(null);
        }}
        onSave={handleSave}
        productLine={selectedProductLine}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductLineToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={productLineToDelete?.productLine}
        itemType="product line"
      />
    </div>
  );
};

export default HomeContent;





// import React, { useState, useEffect } from 'react';
// import SearchBar from '../components/SearchBar';
// import ProductLineCard from '../components/ProductLineCard';
// import { productLineApi } from '../services/api';
// import { getProductLineIcon } from '../data/mockData';

// const HomeContent = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [productLines, setProductLines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showDeleteSection, setShowDeleteSection] = useState(false);
//   const [isAddFormVisible, setIsAddFormVisible] = useState(false);
//   const [isDeleteSectionVisible, setIsDeleteSectionVisible] = useState(false);
//   const [formData, setFormData] = useState({
//     productLine: '',
//     textDescription: ''
//   });
//   const [formLoading, setFormLoading] = useState(false);

//   const fetchProductLines = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await productLineApi.getAll();
      
//       // Add icons to the fetched data
//       const productLinesWithIcons = data.map(line => ({
//         ...line,
//         icon: getProductLineIcon(line.productLine)
//       }));
      
//       setProductLines(productLinesWithIcons);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching product lines:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch product lines from API
//   useEffect(() => {
//     fetchProductLines();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.productLine.trim() || !formData.textDescription.trim()) {
//       alert('Please fill in all fields');
//       return;
//     }

//     try {
//       setFormLoading(true);
//       await productLineApi.create(formData);
//       setFormData({ productLine: '', textDescription: '' });
//       closeAddForm();
//       await fetchProductLines(); // Refresh the list
//       alert('Product line added successfully!');
//     } catch (err) {
//       alert('Error adding product line: ' + err.message);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // Handle delete product line
//   const handleDeleteProductLine = async (productLineId) => {
//     const confirmed = window.confirm('Are you sure you want to delete this product line?');
//     if (!confirmed) return;

//     try {
//       await productLineApi.delete(productLineId);
//       await fetchProductLines(); // Refresh the list
//       closeDeleteSection();
//       alert('Product line deleted successfully!');
//     } catch (err) {
//       alert('Error deleting product line: ' + err.message);
//     }
//   };

//   // Animation handlers
//   const openAddForm = () => {
//     setShowAddForm(true);
//     setTimeout(() => setIsAddFormVisible(true), 10);
//   };

//   const closeAddForm = () => {
//     setIsAddFormVisible(false);
//     setTimeout(() => {
//       setShowAddForm(false);
//       setFormData({ productLine: '', textDescription: '' });
//     }, 300);
//   };

//   const openDeleteSection = () => {
//     setShowDeleteSection(true);
//     setTimeout(() => setIsDeleteSectionVisible(true), 10);
//   };

//   const closeDeleteSection = () => {
//     setIsDeleteSectionVisible(false);
//     setTimeout(() => {
//       setShowDeleteSection(false);
//     }, 300);
//   };

//   // Filter product lines based on search term
//   const filteredProductLines = productLines.filter(line => {
//     const searchLower = searchTerm.toLowerCase().trim();
//     const productLineLower = line.productLine?.toLowerCase() || '';
//     const descriptionLower = line.textDescription?.toLowerCase() || '';
    
//     const searchWords = searchLower.split(/\s+/).filter(word => word.length > 0);
    
//     return searchWords.every(word => 
//       productLineLower.includes(word) || descriptionLower.includes(word)
//     );
//   });

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">ClassicModels CMS</h1>
//             <p className="text-gray-600 mt-1">Manage your classic model inventory</p>
//           </div>
//         </div>
//         <div className="flex items-center justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
//           <span className="ml-3 text-gray-600">Loading product lines...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Roy's Online Catalogue System</h1>
//             <p className="text-gray-600 mt-1">Manage your classic model inventory</p>
//           </div>
//         </div>
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
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">ClassicModels CMS</h1>
//           <p className="text-gray-600 mt-1">Manage your classic model inventory</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={openAddForm}
//             className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
//           >
//             <span className="text-lg">+</span>
//             Add Product Line
//           </button>
//           <button 
//             onClick={openDeleteSection}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
//           >
//             <span className="text-lg">🗑️</span>
//             Delete Product Line
//           </button>
//         </div>
//       </div>

//       <SearchBar 
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//         placeholder="Search product lines..."
//       />

//       {/* Add Product Line Form */}
//       {showAddForm && (
//         <div className={`fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
//           isAddFormVisible ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <div className={`bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-6 w-full max-w-md transition-all duration-300 ${
//             isAddFormVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
//           }`}>
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Product Line</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="productLine" className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Line Name
//                 </label>
//                 <input
//                   type="text"
//                   id="productLine"
//                   name="productLine"
//                   value={formData.productLine}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Classic Cars"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="textDescription" className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   id="textDescription"
//                   name="textDescription"
//                   value={formData.textDescription}
//                   onChange={handleInputChange}
//                   placeholder="Describe this product line..."
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
//                   {formLoading ? 'Adding...' : 'Add Product Line'}
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

//       {/* Delete Product Line Section */}
//       {showDeleteSection && (
//         <div className={`fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
//           isDeleteSectionVisible ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <div className={`bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto transition-all duration-300 ${
//             isDeleteSectionVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
//           }`}>
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Delete Product Line</h2>
//             <p className="text-gray-600 mb-6">Select a product line to delete:</p>
            
//             {productLines.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No product lines available to delete.</p>
//             ) : (
//               <div className="space-y-3 mb-6">
//                 {productLines.map(line => (
//                   <div key={line.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
//                     <div className="flex items-center gap-3">
//                       <span className="text-2xl">{line.icon}</span>
//                       <div>
//                         <h3 className="font-semibold text-gray-800">{line.productLine}</h3>
//                         <p className="text-sm text-gray-600">{line.textDescription}</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleDeleteProductLine(line.id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
//                     >
//                       <span className="text-sm">🗑️</span>
//                       Delete
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             <div className="flex justify-end">
//               <button
//                 onClick={closeDeleteSection}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-6 rounded-lg font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredProductLines.map(productLine => (
//           <ProductLineCard key={productLine.id} productLine={productLine} />
//         ))}
//       </div>

//       {filteredProductLines.length === 0 && searchTerm && (
//         <div className="text-center py-8">
//           <p className="text-gray-500">No product lines found matching "{searchTerm}"</p>
//         </div>
//       )}

//       {productLines.length === 0 && !loading && !error && (
//         <div className="text-center py-8">
//           <p className="text-gray-500">No product lines available. Add some product lines to get started!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeContent;


