/* eslint-disable */
'use client';

import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <div className="header">
      <div className="header-left">
        <button 
          className="menu-toggle lg:hidden"
          onClick={() => {
            console.log('Menu button clicked'); // Debug
            onMenuClick();
          }}
        >
          <i className="fas fa-bars"></i>
        </button>
        
        {/* Desktop Title Section */}
        <div className="hidden lg:block">
          <h2>Welcome to Truck Park</h2>
          <p>Freight Management System</p>
        </div>
        
        {/* Mobile Logo */}
        <div className="mobile-logo lg:hidden">
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>🚛</span>
          </div>
          <span style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: 'var(--dark)'
          }}>Truck Park</span>
        </div>
      </div>
      <div className="user-info">
        <span>Welcome, {user?.full_name || 'Admin'}</span>
        <div className="user-avatar">{user?.full_name?.charAt(0) || 'A'}</div>
      </div>
    </div>
  );
}