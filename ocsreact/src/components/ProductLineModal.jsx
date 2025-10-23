import React, { useState, useEffect } from 'react';

const ProductLineModal = ({ isOpen, onClose, onSave, productLine, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    productLine: '',
    textDescription: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && productLine) {
      setFormData({
        productLine: productLine.productLine || '',
        textDescription: productLine.textDescription || '',
      });
    } else {
      setFormData({
        productLine: '',
        textDescription: '',
      });
    }
    setErrors({});
  }, [isOpen, productLine, mode]);

  const validate = () => {
    const newErrors = {};
    if (!formData.productLine.trim()) {
      newErrors.productLine = 'Product line name is required';
    }
    if (!formData.textDescription.trim()) {
      newErrors.textDescription = 'Description is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {mode === 'add' ? 'Add Product Line' : 'Edit Product Line'}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Line Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Line Name *
            </label>
            <input
              type="text"
              name="productLine"
              value={formData.productLine}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                errors.productLine ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Classic Cars"
            />
            {errors.productLine && (
              <p className="mt-1 text-sm text-red-600">{errors.productLine}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="textDescription"
              value={formData.textDescription}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none ${
                errors.textDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter a brief description..."
            />
            {errors.textDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.textDescription}</p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              {mode === 'add' ? 'Add Product Line' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductLineModal;



// import React, { useState, useEffect } from 'react';

// const ProductLineModal = ({ isOpen, onClose, onSave, productLine, mode = 'add' }) => {
//   const [formData, setFormData] = useState({
//     productLine: '',
//     textDescription: '',
//     htmlDescription: '',
//     image: ''
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (productLine && mode === 'edit') {
//       setFormData({
//         productLine: productLine.productLine || '',
//         textDescription: productLine.textDescription || '',
//         htmlDescription: productLine.htmlDescription || '',
//         image: productLine.image || ''
//       });
//     } else {
//       // Reset form for add mode
//       setFormData({
//         productLine: '',
//         textDescription: '',
//         htmlDescription: '',
//         image: ''
//       });
//     }
//     setErrors({});
//   }, [productLine, mode, isOpen]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.productLine.trim()) {
//       newErrors.productLine = 'Product line name is required';
//     }
//     if (!formData.textDescription.trim()) {
//       newErrors.textDescription = 'Description is required';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       onSave(formData);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between">
//           <h2 className="text-2xl font-bold">
//             {mode === 'edit' ? 'Edit Product Line' : 'Add Product Line'}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           {/* Product Line Name */}
//           <div>
//             <label htmlFor="productLine" className="block text-sm font-semibold text-gray-700 mb-2">
//               Product Line Name *
//             </label>
//             <input
//               type="text"
//               id="productLine"
//               name="productLine"
//               value={formData.productLine}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
//                 errors.productLine ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="e.g., Classic Cars"
//             />
//             {errors.productLine && (
//               <p className="mt-1 text-sm text-red-600">{errors.productLine}</p>
//             )}
//           </div>

//           {/* Text Description */}
//           <div>
//             <label htmlFor="textDescription" className="block text-sm font-semibold text-gray-700 mb-2">
//               Description *
//             </label>
//             <textarea
//               id="textDescription"
//               name="textDescription"
//               value={formData.textDescription}
//               onChange={handleChange}
//               rows={4}
//               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none ${
//                 errors.textDescription ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter a detailed description of this product line..."
//             />
//             {errors.textDescription && (
//               <p className="mt-1 text-sm text-red-600">{errors.textDescription}</p>
//             )}
//           </div>

//           {/* HTML Description (Optional) */}
//           <div>
//             <label htmlFor="htmlDescription" className="block text-sm font-semibold text-gray-700 mb-2">
//               HTML Description (Optional)
//             </label>
//             <textarea
//               id="htmlDescription"
//               name="htmlDescription"
//               value={formData.htmlDescription}
//               onChange={handleChange}
//               rows={3}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none"
//               placeholder="Enter HTML formatted description (optional)..."
//             />
//           </div>

//           {/* Image URL (Optional) */}
//           <div>
//             <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
//               Image URL (Optional)
//             </label>
//             <input
//               type="text"
//               id="image"
//               name="image"
//               value={formData.image}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
//               placeholder="https://example.com/image.jpg"
//             />
//           </div>

//           {/* Form Actions */}
//           <div className="flex items-center justify-end gap-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
//             >
//               {mode === 'edit' ? 'Save Changes' : 'Add Product Line'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductLineModal;