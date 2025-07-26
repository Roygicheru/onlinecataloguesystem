import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeContent from './pages/HomeContent';
import ProductsContent from './pages/ProductsContent';
import CustomersContent from './pages/CustomersContent';
import GenericContent from './pages/GenericContent';
import { menuItems } from './data/mockData';

const ClassicModelsDashboard = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeContent />;
      case 'products':
        return <ProductsContent />;
      case 'customers':
        return <CustomersContent />;
      case 'orders':
        return <GenericContent title="Orders" icon="🛒" />;
      case 'payments':
        return <GenericContent title="Payments" icon="💳" />;
      case 'employees':
        return <GenericContent title="Employees" icon="👨‍💼" />;
      case 'offices':
        return <GenericContent title="Offices" icon="🏢" />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        menuItems={menuItems}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ClassicModelsDashboard;