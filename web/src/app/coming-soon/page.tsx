'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import MainLayout from '../../components/layout/portal/MainLayout';

export default function ComingSoonPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleName = searchParams.get('module') || 'Module';
  const moduleIcon = searchParams.get('icon') || 'fas fa-rocket';

  return (
    <MainLayout>
      <div className="coming-soon-container">
        {/* Main Content Card */}
        <div className="coming-soon-card">
          {/* Icon */}
          <div className="coming-soon-icon">
            <i className={moduleIcon}></i>
          </div>

          {/* Content */}
          <div className="coming-soon-content">
            <h1 className="coming-soon-title">{moduleName}</h1>
            <h2 className="coming-soon-subtitle">Coming Soon</h2>
          </div>

          {/* Features Preview */}
          <div className="coming-soon-features">
            <h3>What to expect:</h3>
            <div className="features-grid">
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Modern, intuitive interface</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Advanced functionality</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Seamless integration</span>
              </div>
              <div className="feature-item">
                <i className="fas fa-check-circle"></i>
                <span>Enhanced productivity</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="coming-soon-actions">
            <button
              onClick={() => router.push('/dashboard')}
              className="back-to-dashboard-btn"
            >
              <i className="fas fa-arrow-left"></i>
              <span>Back to Dashboard</span>
            </button>
          </div>

          {/* Status indicator */}
          <div className="development-status">
            <div className="status-indicator"></div>
            <span>Development in Progress</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}