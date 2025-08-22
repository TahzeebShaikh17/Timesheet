/* eslint-disable */
'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/truck/MainLayout';
import TruckCard, { Truck } from '@/components/ui/TruckCard';
import { Button } from '@/components/form';

// Mock data - replace with API call
const mockTrucks: Truck[] = [
  {
    id: '1',
    truckNumber: 'ABC-123',
    company: 'RAFFLES',
    driverName: 'John Smith',
    driverNumber: '+234 123 456 7890',
    capacity: '25',
    materialType: 'Solid',
    materialGoods: 'Steel bars and construction materials',
    status: 'checked-in',
    checkInTime: '2024-01-15 09:30 AM',
    expectedCheckOut: '2024-01-15 06:00 PM',
    parkingSpot: 'A12',
    duration: '8h 30m'
  },
  {
    id: '2',
    truckNumber: 'XYZ-789',
    company: 'INSIGNIA',
    driverName: 'Michael Johnson',
    driverNumber: '+234 123 456 7891',
    capacity: '40',
    materialType: 'Liquid',
    materialGoods: 'Chemical solutions for manufacturing',
    status: 'parked',
    checkInTime: '2024-01-10 02:15 PM',
    expectedCheckOut: '2024-01-20 10:00 AM',
    parkingSpot: 'B05',
    duration: '5d 12h'
  },
  {
    id: '3',
    truckNumber: 'DEF-456',
    company: 'BHN',
    driverName: 'Sarah Wilson',
    driverNumber: '+234 123 456 7892',
    capacity: '15',
    materialType: 'Non-Hazardous',
    materialGoods: 'Textile products and clothing materials',
    status: 'checked-out',
    checkInTime: '2024-01-14 11:45 AM',
    checkOutTime: '2024-01-14 05:30 PM',
    duration: '5h 45m'
  },
  {
    id: '4',
    truckNumber: 'GHI-012',
    company: 'CHEC',
    driverName: 'David Brown',
    driverNumber: '+234 123 456 7893',
    capacity: '30',
    materialType: 'Hazardous',
    materialGoods: 'Industrial chemicals - Handle with care',
    status: 'checked-in',
    checkInTime: '2024-01-15 07:20 AM',
    expectedCheckOut: '2024-01-15 04:00 PM',
    parkingSpot: 'C08',
    duration: '10h 15m'
  },
  {
    id: '5',
    truckNumber: 'JKL-345',
    company: 'SANA',
    driverName: 'Emma Davis',
    driverNumber: '+234 123 456 7894',
    capacity: '20',
    materialType: 'Solid',
    materialGoods: 'Food products and packaging',
    status: 'checked-in',
    checkInTime: '2024-01-15 01:10 PM',
    expectedCheckOut: '2024-01-16 09:00 AM',
    parkingSpot: 'A07',
    duration: '2h 25m'
  },
  {
    id: '6',
    truckNumber: 'MNO-678',
    company: 'RAFFLES',
    driverName: 'James Miller',
    driverNumber: '+234 123 456 7895',
    capacity: '40',
    materialType: 'Liquid',
    materialGoods: 'Petroleum products',
    status: 'parked',
    checkInTime: '2024-01-08 09:00 AM',
    expectedCheckOut: '2024-01-22 08:00 AM',
    parkingSpot: 'B12',
    duration: '7d 6h'
  },
  {
    id: '7',
    truckNumber: 'PQR-901',
    company: 'TGARLA',
    driverName: 'Lisa Anderson',
    driverNumber: '+234 123 456 7896',
    capacity: '35',
    materialType: 'Non-Hazardous',
    materialGoods: 'Electronics and computer equipment',
    status: 'checked-in',
    checkInTime: '2024-01-15 11:20 AM',
    expectedCheckOut: '2024-01-15 08:00 PM',
    parkingSpot: 'A15',
    duration: '6h 15m'
  },
  {
    id: '8',
    truckNumber: 'STU-234',
    company: 'BASF',
    driverName: 'Robert Garcia',
    driverNumber: '+234 123 456 7897',
    capacity: '25',
    materialType: 'Hazardous',
    materialGoods: 'Chemical compounds for research',
    status: 'checked-out',
    checkInTime: '2024-01-13 08:30 AM',
    checkOutTime: '2024-01-13 03:45 PM',
    duration: '7h 15m'
  }
];

export default function AllTrucksPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleCheckOut = (truckId: string) => {
    console.log('Check out truck:', truckId);
    // Implement check out logic
  };

  const handleView = (truckId: string) => {
    console.log('View truck details:', truckId);
    // Navigate to truck details page
  };

  const handleEdit = (truckId: string) => {
    console.log('Edit truck:', truckId);
    // Navigate to edit truck page
  };

  // Status summary
  const statusSummary = {
    total: mockTrucks.length,
    checkedIn: mockTrucks.filter(t => t.status === 'checked-in').length,
    checkedOut: mockTrucks.filter(t => t.status === 'checked-out').length,
    parked: mockTrucks.filter(t => t.status === 'parked').length,
  };

  return (
    <MainLayout>
      <div className="truck-list-container">
        {/* Header */}
        <div className="truck-list-header">
          <div className="truck-list-title-section">
            <div className="truck-list-title-wrapper">
              <div className="truck-list-icon">
                <i className="fas fa-truck"></i>
              </div>
              <div>
                <h1 className="truck-list-title">All Trucks</h1>
                <p className="truck-list-subtitle">Monitor and manage all trucks in the system</p>
              </div>
            </div>
          </div>

          <div className="truck-list-controls">
            {/* View Toggle */}
            <div className="view-toggle">
              <button
                onClick={() => setViewMode('grid')}
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="truck-stats-grid">
          <div className="truck-stat-card">
            <div className="truck-stat-content">
              <div className="truck-stat-icon total">
                <i className="fas fa-chart-bar"></i>
              </div>
              <div className="truck-stat-details">
                <div className="truck-stat-value">{statusSummary.total}</div>
                <div className="truck-stat-label">Total Trucks</div>
              </div>
            </div>
          </div>

          <div className="truck-stat-card">
            <div className="truck-stat-content">
              <div className="truck-stat-icon checked-in">
                <i className="fas fa-sign-in-alt"></i>
              </div>
              <div className="truck-stat-details">
                <div className="truck-stat-value">{statusSummary.checkedIn}</div>
                <div className="truck-stat-label">Checked In</div>
              </div>
            </div>
          </div>

          <div className="truck-stat-card">
            <div className="truck-stat-content">
              <div className="truck-stat-icon checked-out">
                <i className="fas fa-sign-out-alt"></i>
              </div>
              <div className="truck-stat-details">
                <div className="truck-stat-value">{statusSummary.checkedOut}</div>
                <div className="truck-stat-label">Checked Out</div>
              </div>
            </div>
          </div>

          <div className="truck-stat-card">
            <div className="truck-stat-content">
              <div className="truck-stat-icon parked">
                <i className="fas fa-parking"></i>
              </div>
              <div className="truck-stat-details">
                <div className="truck-stat-value">{statusSummary.parked}</div>
                <div className="truck-stat-label">Long-term Parked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Info */}
        <div className="truck-page-info">
          <div className="truck-page-info-content">
            <div className="truck-page-info-text">
              <i className="fas fa-info-circle"></i>
              <span>Showing all {mockTrucks.length} trucks currently in the system</span>
            </div>
            
            <div className="truck-page-info-actions">
              <button className="btn btn-primary">
                <i className="fas fa-sync-alt"></i>
                Refresh
              </button>
              
              <button className="btn btn-primary">
                <i className="fas fa-download"></i>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Trucks Display */}
        <div className={viewMode === 'grid' ? 'truck-cards-grid' : 'truck-cards-list'}>
          {mockTrucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              onCheckOut={handleCheckOut}
              onView={handleView}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}