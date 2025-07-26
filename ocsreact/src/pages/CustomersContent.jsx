import React, { useState, useEffect } from 'react';
import { customerApi, employeeApi } from '../services/api';
import SearchBar from '../components/SearchBar';

const CustomersContent = () => {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  
  // Modal states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  
  // Complete form state - ALL FIELDS
  const [formData, setFormData] = useState({
    customerName: '',
    contactLastName: '',
    contactFirstName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    salesRepEmployeeNumber: '',
    creditLimit: ''
  });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch customers and employees
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await customerApi.getAll();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchEmployees();
  }, []);

  // Animation handlers
  const openAddForm = () => {
    setShowAddForm(true);
    setTimeout(() => setIsAddFormVisible(true), 10);
  };

  const closeAddForm = () => {
    setIsAddFormVisible(false);
    setTimeout(() => {
      setShowAddForm(false);
      setFormData({
        customerName: '',
        contactLastName: '',
        contactFirstName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        salesRepEmployeeNumber: '',
        creditLimit: ''
      });
    }, 300);
  };

  const openEditForm = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      customerName: customer.customerName || '',
      contactLastName: customer.contactLastName || '',
      contactFirstName: customer.contactFirstName || '',
      phone: customer.phone || '',
      addressLine1: customer.addressLine1 || '',
      addressLine2: customer.addressLine2 || '',
      city: customer.city || '',
      state: customer.state || '',
      postalCode: customer.postalCode || '',
      country: customer.country || '',
      salesRepEmployeeNumber: String(customer.salesRepEmployeeNumber || ''),
      creditLimit: String(customer.creditLimit || '')
    });
    setShowEditForm(true);
    setTimeout(() => setIsEditFormVisible(true), 10);
  };

  const closeEditForm = () => {
    setIsEditFormVisible(false);
    setTimeout(() => {
      setShowEditForm(false);
      setEditingCustomer(null);
      setFormData({
        customerName: '',
        contactLastName: '',
        contactFirstName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        salesRepEmployeeNumber: '',
        creditLimit: ''
      });
    }, 300);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for adding
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.contactLastName.trim() || 
        !formData.contactFirstName.trim() || !formData.phone.trim() || 
        !formData.addressLine1.trim() || !formData.city.trim() || 
        !formData.country.trim()) {
      alert('Please fill in all required fields (Name, Contact Last Name, Contact First Name, Phone, Address, City, Country)');
      return;
    }

    // Validate credit limit is positive if provided
    if (formData.creditLimit && parseFloat(formData.creditLimit) < 0) {
      alert('Credit Limit must be 0 or greater');
      return;
    }

    try {
      setFormLoading(true);
      // Convert to proper types for Spring Boot backend
      const submitData = {
        customerName: formData.customerName.trim(),
        contactLastName: formData.contactLastName.trim(),
        contactFirstName: formData.contactFirstName.trim(),
        phone: formData.phone.trim(),
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2.trim() || null,
        city: formData.city.trim(),
        state: formData.state.trim() || null,
        postalCode: formData.postalCode.trim() || null,
        country: formData.country.trim(),
        salesRepEmployeeNumber: formData.salesRepEmployeeNumber || null,
        creditLimit: formData.creditLimit ? parseFloat(formData.creditLimit) : null
      };
      
      console.log('Customer Form Data before submit:', formData);
      console.log('Customer Submit Data:', submitData);
      await customerApi.create(submitData);
      closeAddForm();
      await fetchCustomers();
      alert('Customer added successfully!');
    } catch (err) {
      alert('Error adding customer: ' + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.contactLastName.trim() || 
        !formData.contactFirstName.trim() || !formData.phone.trim() || 
        !formData.addressLine1.trim() || !formData.city.trim() || 
        !formData.country.trim()) {
      alert('Please fill in all required fields (Name, Contact Last Name, Contact First Name, Phone, Address, City, Country)');
      return;
    }

    // Validate credit limit is positive if provided
    if (formData.creditLimit && parseFloat(formData.creditLimit) < 0) {
      alert('Credit Limit must be 0 or greater');
      return;
    }

    try {
      setFormLoading(true);
      // Convert to proper types for Spring Boot backend
      const submitData = {
        customerName: formData.customerName.trim(),
        contactLastName: formData.contactLastName.trim(),
        contactFirstName: formData.contactFirstName.trim(),
        phone: formData.phone.trim(),
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2.trim() || null,
        city: formData.city.trim(),
        state: formData.state.trim() || null,
        postalCode: formData.postalCode.trim() || null,
        country: formData.country.trim(),
        salesRepEmployeeNumber: formData.salesRepEmployeeNumber || null,
        creditLimit: formData.creditLimit ? parseFloat(formData.creditLimit) : null
      };
      
      console.log('Edit Customer Form Data before submit:', formData);
      console.log('Edit Customer Submit Data:', submitData);
      await customerApi.update(editingCustomer.id, submitData);
      closeEditForm();
      await fetchCustomers();
      alert('Customer updated successfully!');
    } catch (err) {
      alert('Error updating customer: ' + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (customer) => {
    openEditForm(customer);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerApi.delete(id);
        setCustomers(customers.filter(c => c.id !== id));
        alert('Customer deleted successfully!');
      } catch (err) {
        alert('Error deleting customer: ' + err.message);
      }
    }
  };

  // Get unique countries for filter dropdown
  const uniqueCountries = [...new Set(customers.map(customer => 
    customer.country
  ).filter(Boolean))].sort();

  // Filter customers based on search term and selected country
  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch = !searchLower || [
      customer.customerName,
      customer.contactLastName,
      customer.contactFirstName,
      customer.city,
      customer.country,
      String(customer.id)
    ].some(field => field?.toString().toLowerCase().includes(searchLower));

    const matchesCountry = !selectedCountry || customer.country === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <span className="ml-3 text-gray-600">Loading customers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
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
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <button 
          onClick={openAddForm}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Add Customer
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex gap-4">
        <div className="flex-1">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search customers by name, contact, city, country, or ID..."
          />
        </div>
        <div className="w-64">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
          >
            <option value="">All Countries</option>
            {uniqueCountries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Customer Form Modal */}
      {showAddForm && (
        <div className={`fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
          isAddFormVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${
            isAddFormVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Customer</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="e.g., Atelier graphique"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contactFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact First Name *
                  </label>
                  <input
                    type="text"
                    id="contactFirstName"
                    name="contactFirstName"
                    value={formData.contactFirstName}
                    onChange={handleInputChange}
                    placeholder="e.g., Carine"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contactLastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Last Name *
                  </label>
                  <input
                    type="text"
                    id="contactLastName"
                    name="contactLastName"
                    value={formData.contactLastName}
                    onChange={handleInputChange}
                    placeholder="e.g., Schmitt"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., 40.32.2555"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="e.g., 54, rue Royale"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="e.g., Suite 100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Nantes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g., CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g., 44000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g., France"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="salesRepEmployeeNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Sales Representative
                  </label>
                  <select
                    id="salesRepEmployeeNumber"
                    name="salesRepEmployeeNumber"
                    value={formData.salesRepEmployeeNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  >
                    <option value="">No Sales Rep</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} (#{emp.id})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="creditLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Limit ($)
                  </label>
                  <input
                    type="text"
                    step="0.01"
                    min="0"
                    id="creditLimit"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleInputChange}
                    placeholder="e.g., 21000.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {formLoading ? 'Adding...' : 'Add Customer'}
                </button>
                <button
                  type="button"
                  onClick={closeAddForm}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Form Modal */}
      {showEditForm && (
        <div className={`fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
          isEditFormVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${
            isEditFormVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Customer</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editCustomerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    id="editCustomerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="e.g., Atelier graphique"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editContactFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact First Name *
                  </label>
                  <input
                    type="text"
                    id="editContactFirstName"
                    name="contactFirstName"
                    value={formData.contactFirstName}
                    onChange={handleInputChange}
                    placeholder="e.g., Carine"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editContactLastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Last Name *
                  </label>
                  <input
                    type="text"
                    id="editContactLastName"
                    name="contactLastName"
                    value={formData.contactLastName}
                    onChange={handleInputChange}
                    placeholder="e.g., Schmitt"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="text"
                    id="editPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g., 40.32.2555"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editAddressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    id="editAddressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="e.g., 54, rue Royale"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editAddressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="editAddressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="e.g., Suite 100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="editCity" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="editCity"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Nantes"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editState" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="editState"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g., CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="editPostalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="editPostalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g., 44000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="editCountry" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="editCountry"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g., France"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="editSalesRepEmployeeNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Sales Representative
                  </label>
                  <select
                    id="editSalesRepEmployeeNumber"
                    name="salesRepEmployeeNumber"
                    value={formData.salesRepEmployeeNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  >
                    <option value="">No Sales Rep</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} (#{emp.id})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="editCreditLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Limit ($)
                  </label>
                  <input
                    type="text"
                    step="0.01"
                    min="0"
                    id="editCreditLimit"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleInputChange}
                    placeholder="e.g., 21000.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {formLoading ? 'Updating...' : 'Update Customer'}
                </button>
                <button
                  type="button"
                  onClick={closeEditForm}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Results Summary */}
      {(searchTerm || selectedCountry) && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
          <p className="text-emerald-700">
            Showing {filteredCustomers.length} of {customers.length} customers
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCountry && ` in "${selectedCountry}"`}
          </p>
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">ID</th>
                <th className="px-6 py-4 text-left font-semibold">Company</th>
                <th className="px-6 py-4 text-left font-semibold">Contact</th>
                <th className="px-6 py-4 text-left font-semibold">Phone</th>
                <th className="px-6 py-4 text-left font-semibold">City</th>
                <th className="px-6 py-4 text-left font-semibold">Country</th>
                <th className="px-6 py-4 text-left font-semibold">Sales Rep</th>
                <th className="px-6 py-4 text-left font-semibold">Credit Limit</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer, index) => (
                <tr key={customer.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 font-mono text-sm text-gray-800">{customer.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{customer.customerName}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {customer.contactFirstName} {customer.contactLastName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.city}</td>
                  <td className="px-6 py-4 text-gray-600">{customer.country}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {customer.salesRepEmployeeNumber ? 
                      `#${customer.salesRepEmployeeNumber}` : 
                      'None'}
                  </td>
                  <td className="px-6 py-4">
                    {customer.creditLimit ? (
                      <span className="font-semibold text-emerald-600">
                        ${parseFloat(customer.creditLimit).toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-400">No limit</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(customer)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(customer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>

      {/* Empty States */}
      {filteredCustomers.length === 0 && !loading && !error && (searchTerm || selectedCountry) && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No customers found matching your criteria. Try adjusting your search or filter.
          </p>
        </div>
      )}

      {customers.length === 0 && !loading && !error && !searchTerm && !selectedCountry && (
        <div className="text-center py-8">
          <p className="text-gray-500">No customers available. Add some customers to get started!</p>
        </div>
      )}
    </div>
  );
};

export default CustomersContent;