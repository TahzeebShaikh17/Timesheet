'use client';

import { useRouter } from 'next/navigation';
import MainLayout from '../../components/layout/portal/MainLayout';

export default function DashboardPage() {
  const router = useRouter();

  const portals = [
    {
      id: 'truck-park',
      title: 'TRUCK PARK',
      description: 'Truck management system with expected truck tracking, check-in/out processes, invoicing, and manual check-in capabilities',
      iconClass: 'fas fa-truck',
      route: '/truck/dashboard'
    },
    {
      id: 'hr',
      title: 'HR',
      description: 'Performance management system with KRA tracking, ratings, reviews for HY1/HY2, subordinate management, and IDP planning',
      iconClass: 'fas fa-users',
      route: '/hr'
    },
    {
      id: 'equipment-efficiency',
      title: 'EQUIPMENT EFFICIENCY',
      description: 'Equipment and project data management with add/update capabilities, approval workflows, and downloadable reports',
      iconClass: 'fas fa-tools',
      route: '/equipment-efficiency'
    },
    {
      id: 'digidocs',
      title: 'DIGIDOCS',
      description: 'Import/export documentation system with agent management, approval workflows, invoice generation, and NEPZA compliance',
      iconClass: 'fas fa-file-alt',
      route: '/digidocs'
    },
    {
      id: 'expense-reimbursement',
      title: 'NEW EXPENSE REIMBURSEMENT',
      description: 'Comprehensive expense and IOU management with approval workflows, validation, processing, and reimbursement tracking',
      iconClass: 'fas fa-dollar-sign',
      route: '/expense-reimbursement'
    },
    {
      id: 'investor',
      title: 'INVESTOR',
      description: 'Investor relations management with profile creation, milestone tracking, task/meeting management, and reporting capabilities',
      iconClass: 'fas fa-user-tie',
      route: '/investor'
    },
    {
      id: 'billing-portal',
      title: 'BILLING PORTAL',
      description: 'Invoice management system with approval workflows, customer/bank/category management, and comprehensive billing tracking',
      iconClass: 'fas fa-receipt',
      route: '/billing-portal'
    },
    {
      id: 'lease-tracking',
      title: 'LEASE TRACKING',
      description: 'Asset management for residential, warehouse, SIF, and housing complex properties with approval workflows and role management',
      iconClass: 'fas fa-chart-line',
      route: '/lease-tracking'
    },
    {
      id: 'exit-management',
      title: 'EXIT MANAGEMENT',
      description: 'Employee exit process management with clearance forms, interview tracking, and multi-department approval workflows',
      iconClass: 'fas fa-sign-out-alt',
      route: '/exit-management'
    },
    {
      id: 'medical',
      title: 'MEDICAL',
      description: 'Medical appointment management system with booking, scheduling, enterprise tracking, and attendance monitoring',
      iconClass: 'fas fa-medkit',
      route: '/medical'
    },
    {
      id: 'e-service',
      title: 'E-SERVICE',
      description: 'Service request management with ticket tracking, surveys, food/meter details, document management, and analytics dashboard',
      iconClass: 'fas fa-headset',
      route: '/e-service'
    },
    {
      id: 'security-system',
      title: 'SECURITY EXCELLENCE SYSTEM',
      description: 'Security incident management with incident reporting, meeting scheduling, approval workflows, and comprehensive tracking',
      iconClass: 'fas fa-shield-alt',
      route: '/security-system'
    },
    {
      id: 'immigration',
      title: 'IMMIGRATION',
      description: 'Immigration services for STR, regularization, renewal, employment change, and exit notification with document management',
      iconClass: 'fas fa-passport',
      route: '/immigration'
    },
    {
      id: 'regulatory',
      title: 'Regulatory',
      description: 'Regulatory compliance management with organization setup, permit/license tracking, and comprehensive NEPZA quarterly reporting',
      iconClass: 'fas fa-balance-scale',
      route: '/regulatory'
    },
    {
      id: 'it-asset-management',
      title: 'IT ASSET MANAGEMENT',
      description: 'IT asset lifecycle management with allocation tracking, spare asset monitoring, approval workflows, and asset history',
      iconClass: 'fas fa-desktop',
      route: '/it-asset-management'
    },
    {
      id: 'project-tracking',
      title: 'Project Tracking',
      description: 'Purchase order management with budget tracking, vendor management, invoice processing, and multi-level approval workflows',
      iconClass: 'fas fa-clipboard-list',
      route: '/project-tracking'
    },
    {
      id: 'procurement',
      title: 'Procurement',
      description: 'Purchase request management with quotation handling, value definition, PO generation, and procurement lifecycle tracking',
      iconClass: 'fas fa-shopping-cart',
      route: '/procurement'
    }
  ];

  const handlePortalClick = (route: string, title: string, iconClass: string) => {
    console.log('Portal clicked:', title, route); // Debug log
    if (route === '/truck/dashboard') {
      router.push(route);
    } else {
      router.push(`/coming-soon?module=${encodeURIComponent(title)}&icon=${encodeURIComponent(iconClass)}`);
    }
  };

  return (
    <MainLayout>
      <div className="dashboard-grid">
        {/* {portals.map((portal, index) => (
          <div
            key={portal.id}
            onClick={() => handlePortalClick(portal.route, portal.title, portal.iconClass)}
            className="module-card"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="module-content">
              <div className="module-icon">
                <i className={portal.iconClass}></i>
              </div>
              <div className="module-text">
                <h3>{portal.title}</h3>
                <p>{portal.description}</p>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </MainLayout>
  );
}