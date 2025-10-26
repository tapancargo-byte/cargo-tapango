import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email.trim(), password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    navigate('/dashboard');
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }
    setResetLoading(true);
    setResetMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    if (error) {
      setResetMessage(error.message);
    } else {
      setResetMessage('Password reset email sent');
    }
    setResetLoading(false);
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Left panel (brand) */}
      <div className="relative hidden bg-muted md:block">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <h1 data-testid="login-title" className="text-2xl font-semibold tracking-tight">
              Tapan Associate Cargo Admin
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your admin dashboard</p>
          </div>
        </div>
      </div>

      {/* Right panel (form) */}
      <div className="flex items-center justify-center p-6">
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1 text-center md:hidden">
            <CardTitle className="text-2xl font-semibold tracking-tight">Tapan Associate Cargo Admin</CardTitle>
            <CardDescription>Sign in to your admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  data-testid="login-email"
                  type="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="email"
                  placeholder="admin@tapango.app"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    data-testid="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 inline-flex items-center text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error + reset feedback */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {resetMessage && (
                <Alert>
                  <AlertDescription>{resetMessage}</AlertDescription>
                </Alert>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="link"
                  className="px-0"
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                >
                  {resetLoading ? 'Sending…' : 'Forgot password?'}
                </Button>
                <Button type="submit" disabled={loading} className="min-w-28">
                  {loading ? (
                    <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</span>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-xs text-muted-foreground">Super Admin: admin@tapango.app</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
