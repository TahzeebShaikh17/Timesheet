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
  { name: 'Dashboard', href: '/dashboard', icon: 'fas fa-home' },
    { name: 'Timesheet', href: '/timesheet/add', icon: 'fas fa-calendar' },

];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (window.innerWidth <= 768) {
    sidebar?.classList.toggle('active');
    overlay?.classList.toggle('active');
  } else {
    sidebar?.classList.toggle('collapsed');
    document.querySelector('.main-content')?.classList.toggle('collapsed');
  }
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
          <h2>EDGEAXIS</h2>
          <p> Technologies</p>
        </div>
        
        {/* Navigation */}
        <nav className="relative navbar-side z-10 ">
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
          <div className="nav-item" onClick={async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
            }
          }}>
            <i className="fas fa-sign-out-alt "></i>
            <span>Log Out</span>
          </div>
        </nav>
      </div>
    </>
  );
}