import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumb from './Breadcrumb';

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Breadcrumb />
        
        <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Workexe SEO Check. Contact: <a href="tel:+48501182962" className="text-blue-600 dark:text-blue-400 hover:underline">+48 501 182 962</a> | 
              <a href="mailto:ibrahim@workexe.co" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">ibrahim@workexe.co</a>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              Powered by AI • Made with ❤️
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;