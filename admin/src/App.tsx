import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthGuard } from './components/auth/AuthGuard';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider, ToastViewport } from './components/ui/toast';
import { PermissionGuard, AdminGuard, SuperAdminGuard } from './components/PermissionGuard';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Drivers = React.lazy(() => import('./pages/Drivers'));
const Customers = React.lazy(() => import('./pages/Customers'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Invoices = React.lazy(() => import('./pages/Invoices'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const TrackingEvents = React.lazy(() => import('./pages/TrackingEvents'));
const RoleManagement = React.lazy(() => import('./pages/RoleManagement'));
const SuperAdmin = React.lazy(() => import('./pages/SuperAdmin'));
const Kyc = React.lazy(() => import('./pages/Kyc'));
const Landing = React.lazy(() => import('./pages/Landing'));
const Login = React.lazy(() => import('./pages/Login'));

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <Router>
                <Routes>
                  {/* Public landing page */}
<Route path="/" element={<React.Suspense fallback={null}><Landing /></React.Suspense>} />
                  <Route path="/login" element={<React.Suspense fallback={null}><Login /></React.Suspense>} />
                  
                  {/* Guarded admin app */}
                  <Route
                    path="/*"
                    element={
                      <AuthGuard>
                        <Layout>
                          <Routes>
                            <Route path="/dashboard" element={<React.Suspense fallback={null}><Dashboard /></React.Suspense>} />
                            <Route path="/orders" element={<React.Suspense fallback={null}><Orders /></React.Suspense>} />
                            <Route path="/drivers" element={<React.Suspense fallback={null}><Drivers /></React.Suspense>} />
                            <Route path="/customers" element={<React.Suspense fallback={null}><Customers /></React.Suspense>} />
                            <Route path="/invoices" element={<React.Suspense fallback={null}><Invoices /></React.Suspense>} />
                            <Route path="/tracking-events" element={<React.Suspense fallback={null}><TrackingEvents /></React.Suspense>} />
                            <Route 
                              path="/kyc" 
                              element={
                                <AdminGuard>
                                  <React.Suspense fallback={null}>
                                    <Kyc />
                                  </React.Suspense>
                                </AdminGuard>
                              }
                            />
                            <Route path="/notifications" element={<React.Suspense fallback={null}><Notifications /></React.Suspense>} />
                            <Route path="/analytics" element={<React.Suspense fallback={null}><Analytics /></React.Suspense>} />
                            <Route 
                              path="/roles" 
                              element={
                                <AdminGuard>
                                  <React.Suspense fallback={null}>
                                    <RoleManagement />
                                  </React.Suspense>
                                </AdminGuard>
                              } 
                            />
                            <Route 
                              path="/super-admin" 
                              element={
                                <SuperAdminGuard>
                                  <React.Suspense fallback={null}>
                                    <SuperAdmin />
                                  </React.Suspense>
                                </SuperAdminGuard>
                              } 
                            />
                            <Route path="/settings" element={<React.Suspense fallback={null}><Settings /></React.Suspense>} />
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
                    }
                  />
                </Routes>
                <ToastViewport />
              </Router>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
