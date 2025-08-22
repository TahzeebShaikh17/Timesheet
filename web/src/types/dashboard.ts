/* eslint-disable */
import { ApiResponse } from '@/types/api';

export interface DashboardStats {
  checkedIn: StatItem;
  checkedOut: StatItem;
  forecast: StatItem;
  longTermParked: StatItem;
}

export interface StatItem {
  value: number;
  change: {
    percentage: number;
    isPositive: boolean;
    period: string;
  };
}

export interface TrafficData {
  labels: string[];
  datasets: {
    checkIns: number[];
    checkOuts: number[];
  };
}

export interface CompanyDistribution {
  labels: string[];
  data: number[];
  colors: string[];
}

export interface Company {
  id: string;
  name: string;
  totalTrucks: number;
  parkedLongTerm: number;
  todayEntries: number;
  utilization: number;
  status: 'active' | 'parked' | 'inactive';
}

export interface Truck {
  id: string;
  plateNumber: string;
  company: string;
  driverName: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  parkingSpot?: string;
  status: 'checked-in' | 'checked-out' | 'parked';
  expectedCheckOut?: Date;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  companyId: string;
  companyName: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface ParkingSpot {
  id: string;
  number: string;
  isOccupied: boolean;
  truckId?: string;
  section: string;
  type: 'regular' | 'oversized' | 'refrigerated';
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  action: string;
  userId: string;
  userName: string;
  details: string;
  entityType: 'truck' | 'user' | 'invoice' | 'system';
  entityId?: string;
}


export interface StatItem {
  value: number;
  change: {
    percentage: number;
    isPositive: boolean;
    period: string;
  };
}

export interface TrafficData {
  labels: string[];
  datasets: {
    checkIns: number[];
    checkOuts: number[];
  };
}

export interface CompanyDistribution {
  labels: string[];
  data: number[];
  colors: string[];
}

export interface Company {
  id: string;
  name: string;
  totalTrucks: number;
  parkedLongTerm: number;
  todayEntries: number;
  utilization: number;
  status: 'active' | 'parked' | 'inactive';
}

export interface Truck {
  id: string;
  plateNumber: string;
  company: string;
  driverName: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  parkingSpot?: string;
  status: 'checked-in' | 'checked-out' | 'parked';
  expectedCheckOut?: Date;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  companyId: string;
  companyName: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface ParkingSpot {
  id: string;
  number: string;
  isOccupied: boolean;
  truckId?: string;
  section: string;
  type: 'regular' | 'oversized' | 'refrigerated';
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  action: string;
  userId: string;
  userName: string;
  details: string;
  entityType: 'truck' | 'user' | 'invoice' | 'system';
  entityId?: string;
}