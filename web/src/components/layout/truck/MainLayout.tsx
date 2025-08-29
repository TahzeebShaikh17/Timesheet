'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    console.log('Opening sidebar, current state:', sidebarOpen); // Debug
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    console.log('Closing sidebar'); // Debug
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="floating-elements">
        <div className="floating-circle" style={{ pointerEvents: 'none', zIndex: -10 }}></div>
        <div className="floating-circle" style={{ pointerEvents: 'none', zIndex: -10 }}></div>
        <div className="floating-circle" style={{ pointerEvents: 'none', zIndex: -10 }}></div>
        <div className="floating-circle" style={{ pointerEvents: 'none', zIndex: -10 }}></div>
        <div className="floating-circle" style={{ pointerEvents: 'none', zIndex: -10 }}></div>
      </div>
      
      <div className="container">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

        {/* Main Content */}
        <div className="main-content">
          <Navbar onMenuClick={handleMenuClick} />
          <div style={{ position: 'relative', zIndex: 10 }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}