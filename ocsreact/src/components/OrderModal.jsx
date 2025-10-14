import React, { useState, useEffect } from 'react';

const OrderModal = ({ isOpen, onClose, onSave, order, customers, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    orderdate: '',
    requireddate: '',
    shippeddate: '',
    status: 'In Process',
    comments: '',
    customernumber: ''
  });

  const [errors, setErrors] = useState({});

  // Status options
  const statusOptions = [
    'In Process',
    'Shipped',
    'Resolved',
    'Cancelled',
    'On Hold',
    'Disputed'
  ];

  useEffect(() => {
    if (order && mode === 'edit') {
      setFormData({
        orderdate: order.orderdate || '',
        requireddate: order.requireddate || '',
        shippeddate: order.shippeddate || '',
        status: order.status || 'In Process',
        comments: order.comments || '',
        customernumber: order.customernumber || ''
      });
    } else {
      // Reset form for add mode with default date as today
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        orderdate: today,
        requireddate: '',
        shippeddate: '',
        status: 'In Process',
        comments: '',
        customernumber: ''
      });
    }
    setErrors({});
  }, [order, mode, isOpen]);

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

  const validate = () => {
    const newErrors = {};
    
    if (!formData.orderdate) {
      newErrors.orderdate = 'Order date is required';
    }
    
    if (!formData.requireddate) {
      newErrors.requireddate = 'Required date is required';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    
    if (!formData.customernumber) {
      newErrors.customernumber = 'Customer is required';
    }
    
    // Validate that required date is after order date
    if (formData.orderdate && formData.requireddate) {
      if (new Date(formData.requireddate) < new Date(formData.orderdate)) {
        newErrors.requireddate = 'Required date must be after order date';
      }
    }
    
    // Validate that shipped date is after order date if provided
    if (formData.orderdate && formData.shippeddate) {
      if (new Date(formData.shippeddate) < new Date(formData.orderdate)) {
        newErrors.shippeddate = 'Shipped date must be after order date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Only include shippeddate if it has a value
      const dataToSave = {
        ...formData,
        shippeddate: formData.shippeddate || null,
        comments: formData.comments || null
      };
      onSave(dataToSave);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {mode === 'edit' ? 'Edit Order' : 'Add New Order'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Customer Selection */}
          <div>
            <label htmlFor="customernumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Customer *
            </label>
            <select
              id="customernumber"
              name="customernumber"
              value={formData.customernumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                errors.customernumber ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a customer...</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.customerName} - {customer.contactFirstName} {customer.contactLastName}
                </option>
              ))}
            </select>
            {errors.customernumber && (
              <p className="mt-1 text-sm text-red-600">{errors.customernumber}</p>
            )}
          </div>

          {/* Order Date */}
          <div>
            <label htmlFor="orderdate" className="block text-sm font-semibold text-gray-700 mb-2">
              Order Date *
            </label>
            <input
              type="date"
              id="orderdate"
              name="orderdate"
              value={formData.orderdate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                errors.orderdate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.orderdate && (
              <p className="mt-1 text-sm text-red-600">{errors.orderdate}</p>
            )}
          </div>

          {/* Required Date */}
          <div>
            <label htmlFor="requireddate" className="block text-sm font-semibold text-gray-700 mb-2">
              Required Date *
            </label>
            <input
              type="date"
              id="requireddate"
              name="requireddate"
              value={formData.requireddate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                errors.requireddate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.requireddate && (
              <p className="mt-1 text-sm text-red-600">{errors.requireddate}</p>
            )}
          </div>

          {/* Shipped Date */}
          <div>
            <label htmlFor="shippeddate" className="block text-sm font-semibold text-gray-700 mb-2">
              Shipped Date (Optional)
            </label>
            <input
              type="date"
              id="shippeddate"
              name="shippeddate"
              value={formData.shippeddate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                errors.shippeddate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.shippeddate && (
              <p className="mt-1 text-sm text-red-600">{errors.shippeddate}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors ${
                errors.status ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          {/* Comments */}
          <div>
            <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
              Comments (Optional)
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors resize-none"
              placeholder="Enter any comments or special instructions..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;