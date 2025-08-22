/* eslint-disable */
'use client';

import MainLayout from '../../../components/layout/truck/MainLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  // Sample data for the line chart
  const trafficData = [
    { day: 'Mon', checkedIn: 120, checkedOut: 110 },
    { day: 'Tue', checkedIn: 150, checkedOut: 140 },
    { day: 'Wed', checkedIn: 180, checkedOut: 160 },
    { day: 'Thu', checkedIn: 200, checkedOut: 180 },
    { day: 'Fri', checkedIn: 230, checkedOut: 220 },
    { day: 'Sat', checkedIn: 180, checkedOut: 170 },
    { day: 'Sun', checkedIn: 160, checkedOut: 150 }
  ];

  // Sample data for the pie chart
  const companyData = [
    { name: 'RAFFLES', value: 35, color: '#3B82F6' },
    { name: 'INSIGNIA', value: 25, color: '#8B5CF6' },
    { name: 'BHN', value: 20, color: '#10B981' },
    { name: 'Others', value: 20, color: '#F59E0B' }
  ];

  return (
    <MainLayout>
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div>
              <div className="stat-title">Checked In</div>
              <div className="stat-value">727</div>
              <div className="stat-change positive">
                <span>↗</span> +12% from yesterday
              </div>
            </div>
            <div className="stat-icon checked-in"><i className="fas fa-truck"></i></div>
          </div>
        </div>

        <div className="stat-card checked-out">
          <div className="stat-header">
            <div>
              <div className="stat-title">Checked Out</div>
              <div className="stat-value">673</div>
              <div className="stat-change positive">
                <span>↗</span> +8% from yesterday
              </div>
            </div>
            <div className="stat-icon checked-out"><i className="fas fa-check-square"></i></div>
          </div>
        </div>

        <div className="stat-card forecast">
          <div className="stat-header">
            <div>
              <div className="stat-title">Forecast</div>
              <div className="stat-value">6</div>
              <div className="stat-change negative">
                <span>↘</span> -2 from yesterday
              </div>
            </div>
            <div className="stat-icon forecast"><i className="fas fa-chart-line"></i></div>
          </div>
        </div>

        <div className="stat-card parked">
          <div className="stat-header">
            <div>
              <div className="stat-title">Long-term Parked</div>
              <div className="stat-value">54</div>
              <div className="stat-change positive">
                <span>↗</span> +3% this week
              </div>
            </div>
            <div className="stat-icon parked"><i className="fas fa-parking"></i></div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Truck Traffic Analytics</h3>
            <select className="chart-period">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="checkedIn" stroke="#3B82F6" strokeWidth={2} name="Checked In" />
                <Line type="monotone" dataKey="checkedOut" stroke="#8B5CF6" strokeWidth={2} name="Checked Out" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Company Distribution</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={companyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {companyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">Company Status Overview</h3>
          <div className="search-box">
            <input type="text" className="search-input" placeholder="Search companies..." />
            <button className="btn btn-primary">Export</button>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Total Trucks</th>
                <th>Parked &gt;5 Days</th>
                <th>Today's Entries</th>
                <th>Utilization</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>RAFFLES</strong></td>
                <td>20</td>
                <td>4</td>
                <td>2</td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '85%' }}></div>
                  </div>
                </td>
                <td><span className="status-badge status-active">Active</span></td>
              </tr>
              <tr>
                <td><strong>INSIGNIA</strong></td>
                <td>13</td>
                <td>2</td>
                <td>4</td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '70%' }}></div>
                  </div>
                </td>
                <td><span className="status-badge status-active">Active</span></td>
              </tr>
              <tr>
                <td><strong>BHN</strong></td>
                <td>4</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '25%' }}></div>
                  </div>
                </td>
                <td><span className="status-badge status-parked">Parked</span></td>
              </tr>
              <tr>
                <td><strong>LFZ_Admin</strong></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '0%' }}></div>
                  </div>
                </td>
                <td><span className="status-badge status-inactive">Inactive</span></td>
              </tr>
              <tr>
                <td><strong>KT</strong></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '0%' }}></div>
                  </div>
                </td>
                <td><span className="status-badge status-inactive">Inactive</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}