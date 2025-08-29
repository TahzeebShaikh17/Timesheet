/* eslint-disable */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
}

const navigation: SidebarItem[] = [
  { name: 'Dashboard', href: '/truck/dashboard', icon: 'fas fa-tachometer-alt' },
  { name: 'Add Expected Truck', href: '/truck/expected/add', icon: 'fas fa-truck-loading' },
  { name: 'All Trucks', href: '/truck/all', icon: 'fas fa-truck' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''} fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        {/* Sidebar background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-purple-50/30"></div>
        
        {/* Logo section */}
        <div className="logo relative z-10">
          <h1>Truck Park</h1>
          <p>Freight Management System</p>
        </div>
        
        {/* Navigation */}
        <nav className="relative z-10">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="nav-link" onClick={onClose}>
                <div className={`nav-item ${isActive ? 'active' : ''}`}>
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
          
          {/* Back to Dashboard */}
          <Link href="/dashboard" className="nav-link" onClick={onClose}>
            <div className="nav-item">
              <i className="fas fa-arrow-left"></i>
              <span>Back to OnePortal</span>
            </div>
          </Link>
          
          {/* Logout */}
          <div className="nav-item" onClick={async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
            }
          }}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Log Out</span>
          </div>
        </nav>
      </div>
    </>
  );
}