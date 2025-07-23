import React from 'react';

const ProductLineCard = ({ productLine }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
      <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white group-hover:from-emerald-500 group-hover:to-teal-700 transition-all duration-300">
        <span className="text-4xl">{productLine.icon}</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{productLine.productLine}</h3>
        <p className="text-gray-600 text-sm">{productLine.textDescription}</p>
      </div>
    </div>
  );
};

export default ProductLineCard;