import React, { useState, useEffect } from 'react';
import { orderApi, customerApi } from '../services/api';
import Pagination from '../components/Pagination';
import OrderModal from '../components/OrderModal';

const OrdersContent = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders and customers from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [ordersData, customersData] = await Promise.all([
          orderApi.getAll(),
          customerApi.getAll()
        ]);
        setOrders(ordersData);
        setCustomers(customersData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate pagination values
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get customer name by customer number
  const getCustomerName = (customerNumber) => {
    const customer = customers.find(c => c.id === parseInt(customerNumber));
    return customer ? customer.customerName : 'Unknown Customer';
  };

  // Handle Add Order
  const handleAddClick = () => {
    setModalMode('add');
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  // Handle Edit Order
  const handleEdit = (order) => {
    setModalMode('edit');
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Handle Delete Order
  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderApi.delete(orderId);
        setOrders(orders.filter(o => o.id !== orderId));
        
        // Adjust current page if needed after deletion
        const newTotalPages = Math.ceil((totalItems - 1) / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } catch (err) {
        alert('Error deleting order: ' + err.message);
      }
    }
  };

  // Handle Save (Add or Edit)
  const handleSave = async (formData) => {
    try {
      if (modalMode === 'add') {
        const newOrder = await orderApi.create(formData);
        setOrders([...orders, newOrder]);
      } else {
        const updatedOrder = await orderApi.update(selectedOrder.id, formData);
        setOrders(orders.map(o => o.id === selectedOrder.id ? updatedOrder : o));
      }
      setIsModalOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      alert(`Error ${modalMode === 'add' ? 'creating' : 'updating'} order: ` + err.message);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const colors = {
      'Shipped': 'bg-green-100 text-green-800',
      'In Process': 'bg-blue-100 text-blue-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'Resolved': 'bg-purple-100 text-purple-800',
      'On Hold': 'bg-yellow-100 text-yellow-800',
      'Disputed': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <span className="ml-3 text-gray-600">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Orders</h1>
        <button 
          onClick={handleAddClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 w-full sm:w-auto justify-center text-sm sm:text-base"
        >
          <span className="text-lg">+</span>
          Add Order
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <tr>
                <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-left font-semibold">Order ID</th>
                <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-left font-semibold">Customer</th>
                <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-left font-semibold">Order Date</th>
                <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-left font-semibold">Required</th>
                <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-left font-semibold">Shipped</th>
                <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-left font-semibold">Status</th>
                <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-left font-semibold">Comments</th>
                <th className="px-1.5 sm:px-3 py-2 sm:py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentOrders.map((order, index) => (
                <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-3 font-mono text-gray-800">#{order.id}</td>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-3 font-medium text-gray-800 max-w-[100px] sm:max-w-[150px] truncate" title={getCustomerName(order.customernumber)}>{getCustomerName(order.customernumber)}</td>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-3 text-gray-600">{formatDate(order.orderdate)}</td>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-3 text-gray-600">{formatDate(order.requireddate)}</td>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-3 text-gray-600">{formatDate(order.shippeddate)}</td>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-3">
                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-3 text-gray-600 max-w-[80px] sm:max-w-[120px] truncate" title={order.comments}>
                    {order.comments || '-'}
                  </td>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-3">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <button 
                        onClick={() => handleEdit(order)}
                        className="p-1 sm:p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                        title="Edit"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-1 sm:p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" 
                        title="Delete"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            itemName="orders"
          />
        )}
      </div>

      {orders.length === 0 && !loading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders available. Add some orders to get started!</p>
        </div>
      )}

      {/* Order Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
        onSave={handleSave}
        order={selectedOrder}
        customers={customers}
        mode={modalMode}
      />
    </div>
  );
};

export default OrdersContent;