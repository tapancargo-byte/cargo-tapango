import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthGuard } from './components/auth/AuthGuard';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Drivers from './pages/Drivers';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Invoices from './pages/Invoices';
import Notifications from './pages/Notifications';
import RoleManagement from './pages/RoleManagement';
import SuperAdmin from './pages/SuperAdmin';
import SentryTest from './components/SentryTest';
import { PermissionGuard, AdminGuard, SuperAdminGuard } from './components/PermissionGuard';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <Router>
              <AuthGuard>
                <Layout>
                  <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/drivers" element={<Drivers />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route 
                    path="/roles" 
                    element={
                      <AdminGuard>
                        <RoleManagement />
                      </AdminGuard>
                    } 
                  />
                  <Route 
                    path="/super-admin" 
                    element={
                      <SuperAdminGuard>
                        <SuperAdmin />
                      </SuperAdminGuard>
                    } 
                  />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/sentry-test" element={<SentryTest />} />
                  <Route 
                    path="/unauthorized" 
                    element={
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                          <p className="text-muted-foreground">You don't have permission to access this page.</p>
                        </div>
                      </div>
                    } 
                  />
                </Routes>
              </Layout>
            </AuthGuard>
          </Router>
        </AuthProvider>
      </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
