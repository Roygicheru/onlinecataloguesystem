import React from 'react';

const ProductLineCard = ({ productLine, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white group-hover:from-emerald-500 group-hover:to-teal-700 transition-all duration-300">
        <span className="text-4xl">{productLine.icon}</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{productLine.productLine}</h3>
        <p className="text-gray-600 text-sm mb-4">{productLine.textDescription}</p>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(productLine);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(productLine);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductLineCard;



// import React from 'react';

// const ProductLineCard = ({ productLine, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
//       <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white group-hover:from-emerald-500 group-hover:to-teal-700 transition-all duration-300">
//         <span className="text-4xl">{productLine.icon}</span>
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">{productLine.productLine}</h3>
//         <p className="text-gray-600 text-sm mb-4">{productLine.textDescription}</p>
        
//         {/* Action Buttons */}
//         <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onEdit(productLine);
//             }}
//             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//             title="Edit"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//             </svg>
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(productLine);
//             }}
//             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//             title="Delete"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductLineCard;





// import React from 'react';

// const ProductLineCard = ({ productLine }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
//       <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white group-hover:from-emerald-500 group-hover:to-teal-700 transition-all duration-300">
//         <span className="text-4xl">{productLine.icon}</span>
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">{productLine.productLine}</h3>
//         <p className="text-gray-600 text-sm">{productLine.textDescription}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductLineCard;