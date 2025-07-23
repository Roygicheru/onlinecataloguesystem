import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ProductLineCard from '../components/ProductLineCard';
import { productLineApi } from '../services/api';
import { getProductLineIcon } from '../data/mockData';

const HomeContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productLines, setProductLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product lines from API
  useEffect(() => {
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
      </div>

      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search product lines..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProductLines.map(productLine => (
          <ProductLineCard key={productLine.id} productLine={productLine} />
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
    </div>
  );
};

export default HomeContent;