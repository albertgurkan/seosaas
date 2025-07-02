import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuditProvider } from './contexts/AuditContext';
import { KeywordProvider } from './contexts/KeywordContext';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import KeywordsPage from './pages/KeywordsPage';
import SiteAuditPage from './pages/SiteAuditPage';
import ContentAnalysisPage from './pages/ContentAnalysisPage';
import RankTrackingPage from './pages/RankTrackingPage';
import BacklinkAnalysisPage from './pages/BacklinkAnalysisPage';
import CompetitorAnalysisPage from './pages/CompetitorAnalysisPage';
import ReportsPage from './pages/ReportsPage';
import PricingPage from './pages/PricingPage';
import EducationCenterPage from './pages/EducationCenterPage';
import ContactPage from './pages/ContactPage';
import SEOTaskManagerPage from './pages/SEOTaskManagerPage';
import ContentCalendarPage from './pages/ContentCalendarPage';
import KeywordDifficultyMatrixPage from './pages/KeywordDifficultyMatrixPage';
import SemanticAnalysisPage from './pages/SemanticAnalysisPage';
import TrendForecastingPage from './pages/TrendForecastingPage';
import UserBehaviorInsightsPage from './pages/UserBehaviorInsightsPage';
import AdminPanelPage from './pages/AdminPanelPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

// Protected Route Component (for admin-only routes)
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />
      <Route path="/forgot-password" element={
        <PublicRoute>
          <ForgotPasswordPage />
        </PublicRoute>
      } />
      
      {/* Main App Routes - Available to all users (guest and authenticated) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Keywords section with sub-routes */}
        <Route path="keywords">
          <Route index element={<KeywordsPage />} />
          <Route path="tracking" element={<KeywordsPage />} />
          <Route path="entrenchment" element={<KeywordsPage />} />
          <Route path="title-optimizer" element={<KeywordsPage />} />
        </Route>
        
        {/* Site Audit section with sub-routes */}
        <Route path="site-audit">
          <Route index element={<SiteAuditPage />} />
          <Route path="overview" element={<SiteAuditPage />} />
          <Route path="crawl-budget" element={<SiteAuditPage />} />
        </Route>
        
        {/* Content Analysis section with sub-routes */}
        <Route path="content-analysis">
          <Route index element={<ContentAnalysisPage />} />
          <Route path="quality" element={<ContentAnalysisPage />} />
          <Route path="clarity-builder" element={<ContentAnalysisPage />} />
          <Route path="cannibalization" element={<ContentAnalysisPage />} />
          <Route path="nlp-engagement" element={<ContentAnalysisPage />} />
        </Route>
        
        {/* Rank Tracking section with sub-routes */}
        <Route path="rank-tracking">
          <Route index element={<RankTrackingPage />} />
          <Route path="overview" element={<RankTrackingPage />} />
          <Route path="serp-terrain" element={<RankTrackingPage />} />
          <Route path="serp-features" element={<RankTrackingPage />} />
          <Route path="keywords" element={<RankTrackingPage />} />
        </Route>
        
        {/* Backlink Analysis section with sub-routes */}
        <Route path="backlink-analysis">
          <Route index element={<BacklinkAnalysisPage />} />
          <Route path="overview" element={<BacklinkAnalysisPage />} />
          <Route path="link-magnet" element={<BacklinkAnalysisPage />} />
          <Route path="backlinks" element={<BacklinkAnalysisPage />} />
          <Route path="new" element={<BacklinkAnalysisPage />} />
          <Route path="lost" element={<BacklinkAnalysisPage />} />
          <Route path="toxic" element={<BacklinkAnalysisPage />} />
        </Route>
        
        <Route path="competitor-analysis" element={<CompetitorAnalysisPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="education" element={<EducationCenterPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="seo-task-manager" element={<SEOTaskManagerPage />} />
        <Route path="content-calendar" element={<ContentCalendarPage />} />
        <Route path="keyword-difficulty-matrix" element={<KeywordDifficultyMatrixPage />} />
        
        {/* Semantic Analysis section with sub-routes */}
        <Route path="semantic-analysis">
          <Route index element={<SemanticAnalysisPage />} />
          <Route path="expansion" element={<SemanticAnalysisPage />} />
          <Route path="thought-vectors" element={<SemanticAnalysisPage />} />
        </Route>
        
        <Route path="trend-forecasting" element={<TrendForecastingPage />} />
        
        {/* User Behavior Insights section with sub-routes */}
        <Route path="user-behavior-insights">
          <Route index element={<UserBehaviorInsightsPage />} />
          <Route path="overview" element={<UserBehaviorInsightsPage />} />
          <Route path="click-bounce" element={<UserBehaviorInsightsPage />} />
          <Route path="user-journey" element={<UserBehaviorInsightsPage />} />
          <Route path="engagement" element={<UserBehaviorInsightsPage />} />
          <Route path="device-analysis" element={<UserBehaviorInsightsPage />} />
        </Route>
        
        {/* Admin-only routes */}
        <Route path="admin-panel" element={
          <ProtectedRoute adminOnly>
            <AdminPanelPage />
          </ProtectedRoute>
        } />
        
        {/* User-specific routes */}
        <Route path="settings">
          <Route index element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          <Route path="general" element={<SettingsPage />} />
          <Route path="defaults" element={<SettingsPage />} />
          <Route path="currency" element={<SettingsPage />} />
          <Route path="notifications" element={<SettingsPage />} />
          <Route path="security" element={<SettingsPage />} />
          <Route path="appearance" element={<SettingsPage />} />
          <Route path="data" element={<SettingsPage />} />
        </Route>
        
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AuditProvider>
            <KeywordProvider>
              <Router>
                <AppRoutes />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    className:  'dark:bg-gray-800 dark:text-white',
                    duration: 1000,
                  }}
                />
              </Router>
            </KeywordProvider>
          </AuditProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;