/* eslint-disable */
'use client';

import { Button } from '../form';

export interface Truck {
  id: string;
  truckNumber: string;
  company: string;
  driverName: string;
  driverNumber: string;
  capacity: string;
  materialType: string;
  materialGoods: string;
  status: 'checked-in' | 'checked-out' | 'parked';
  checkInTime?: string;
  checkOutTime?: string;
  expectedCheckOut?: string;
  parkingSpot?: string;
  duration?: string;
}

interface TruckCardProps {
  truck: Truck;
  onCheckOut?: (truckId: string) => void;
  onView?: (truckId: string) => void;
  onEdit?: (truckId: string) => void;
}

const statusConfig = {
  'checked-in': {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '🟢',
    label: 'Checked In'
  },
  'checked-out': {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: '⚪',
    label: 'Checked Out'
  },
  'parked': {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '🟡',
    label: 'Long-term Parked'
  }
};

export default function TruckCard({ truck, onCheckOut, onView, onEdit }: TruckCardProps) {
  const status = statusConfig[truck.status];

  return (
    <div className="truck-card">
      {/* Header */}
      <div className="truck-card-header">
        <div className="truck-card-header-content">
          <div className="truck-card-title-section">
            <div className="truck-card-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div>
              <h3 className="truck-card-title">{truck.truckNumber}</h3>
              <p className="truck-card-company">{truck.company}</p>
            </div>
          </div>
          
          <div className="truck-card-badges">
            <span className={`truck-status-badge ${truck.status}`}>
              <span>{status.icon}</span>
              {status.label}
            </span>
            
            {truck.parkingSpot && (
              <span className="truck-parking-badge">
                Spot {truck.parkingSpot}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="truck-card-body">
        <div className="truck-info-grid">
          {/* Driver Info */}
          <div className="truck-info-section">
            <div className="truck-info-item">
              <i className="truck-info-icon fas fa-user"></i>
              <span className="truck-info-label">Driver:</span>
              <span className="truck-info-value">{truck.driverName}</span>
            </div>
            
            <div className="truck-info-item">
              <i className="truck-info-icon fas fa-phone"></i>
              <span className="truck-info-label">Phone:</span>
              <span className="truck-info-value">{truck.driverNumber}</span>
            </div>
          </div>

          {/* Truck Info */}
          <div className="truck-info-section">
            <div className="truck-info-item">
              <i className="truck-info-icon fas fa-weight-hanging"></i>
              <span className="truck-info-label">Capacity:</span>
              <span className="truck-info-value">{truck.capacity} tons</span>
            </div>
            
            <div className="truck-info-item">
              <i className="truck-info-icon fas fa-cube"></i>
              <span className="truck-info-label">Material:</span>
              <span className="truck-info-value">{truck.materialType}</span>
            </div>
          </div>
        </div>

        {/* Material Goods */}
        {truck.materialGoods && (
          <div className="truck-goods-section">
            <span className="truck-goods-label">Goods: </span>
            <span className="truck-goods-value">{truck.materialGoods}</span>
          </div>
        )}

        {/* Time Info */}
        <div className="truck-time-grid">
          {truck.checkInTime && (
            <div className="truck-time-item">
              <i className="truck-time-icon check-in fas fa-sign-in-alt"></i>
              <span className="truck-info-label">Check-in:</span>
              <span className="truck-info-value">{truck.checkInTime}</span>
            </div>
          )}
          
          {truck.expectedCheckOut && (
            <div className="truck-time-item">
              <i className="truck-time-icon expected fas fa-clock"></i>
              <span className="truck-info-label">Expected out:</span>
              <span className="truck-info-value">{truck.expectedCheckOut}</span>
            </div>
          )}
        </div>

        {/* Duration Badge */}
        {truck.duration && (
          <div className="truck-duration-badge">
            <i className="fas fa-clock"></i>
            Duration: {truck.duration}
          </div>
        )}

        {/* Actions */}
        <div className="truck-card-actions">
          <button
            className="truck-action-btn outline"
            onClick={() => onView?.(truck.id)}
          >
            <i className="truck-action-icon fas fa-eye"></i>
            View Details
          </button>
          
          <button
            className="truck-action-btn outline"
            onClick={() => onEdit?.(truck.id)}
          >
            <i className="truck-action-icon fas fa-edit"></i>
            Edit
          </button>
          
          {truck.status === 'checked-in' && (
            <button
              className="truck-action-btn primary"
              onClick={() => onCheckOut?.(truck.id)}
            >
              <i className="truck-action-icon fas fa-sign-out-alt"></i>
              Check Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}