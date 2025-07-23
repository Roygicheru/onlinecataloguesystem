import React from 'react';

const GenericContent = ({ title, icon }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title} Management</h3>
        <p className="text-gray-600">This section is under development. Connect to your Spring Boot backend to display real data.</p>
        <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default GenericContent;