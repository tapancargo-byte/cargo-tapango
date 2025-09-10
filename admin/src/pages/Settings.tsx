import React, { useState } from 'react';
import { Save, Bell, Shield, Building, DollarSign, Server } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { useToast } from '../components/ui/use-toast';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'TapanGo Logistics',
    supportEmail: 'support@tapango.com',
    supportPhone: '+1-800-TAPANGO',
    timezone: 'America/New_York',
    currency: 'USD',
    
    // Pricing Settings
    baseFare: 5.00,
    perKmRate: 1.50,
    perMinuteRate: 0.25,
    platformFee: 10,
    driverCommission: 80,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderAlerts: true,
    driverAlerts: true,
    systemAlerts: false,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 60,
    ipWhitelisting: false,
    auditLogging: true,
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    dataRetention: 365,
    backupFrequency: 'daily',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully.',
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Building },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Server },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and configuration</p>
        </div>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Sidebar */}
        <aside className="lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 lg:max-w-2xl">
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic company information and regional settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => handleSettingChange('companyName', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      value={settings.supportPhone}
                      onChange={(e) => handleSettingChange('supportPhone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'pricing' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing Settings
                </CardTitle>
                <CardDescription>
                  Configure delivery pricing and commission rates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="baseFare">Base Fare ($)</Label>
                    <Input
                      id="baseFare"
                      type="number"
                      step="0.25"
                      min="0"
                      value={settings.baseFare}
                      onChange={(e) => handleSettingChange('baseFare', parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="perKmRate">Per KM Rate ($)</Label>
                    <Input
                      id="perKmRate"
                      type="number"
                      step="0.25"
                      min="0"
                      value={settings.perKmRate}
                      onChange={(e) => handleSettingChange('perKmRate', parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="perMinuteRate">Per Minute Rate ($)</Label>
                    <Input
                      id="perMinuteRate"
                      type="number"
                      step="0.05"
                      min="0"
                      value={settings.perMinuteRate}
                      onChange={(e) => handleSettingChange('perMinuteRate', parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platformFee">Platform Fee (%)</Label>
                    <Input
                      id="platformFee"
                      type="number"
                      min="0"
                      max="100"
                      value={settings.platformFee}
                      onChange={(e) => handleSettingChange('platformFee', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driverCommission">Driver Commission (%)</Label>
                  <Input
                    id="driverCommission"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.driverCommission}
                    onChange={(e) => handleSettingChange('driverCommission', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how and when notifications are sent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked: boolean) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </div>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked: boolean) => handleSettingChange('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive push notifications on mobile devices
                      </div>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked: boolean) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">Order Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about new orders and status changes
                      </div>
                    </div>
                    <Switch
                      checked={settings.orderAlerts}
                      onCheckedChange={(checked: boolean) => handleSettingChange('orderAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">Driver Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about driver status and availability
                      </div>
                    </div>
                    <Switch
                      checked={settings.driverAlerts}
                      onCheckedChange={(checked: boolean) => handleSettingChange('driverAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="text-base font-medium">System Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about system maintenance and updates
                      </div>
                    </div>
                    <Switch
                      checked={settings.systemAlerts}
                      onCheckedChange={(checked: boolean) => handleSettingChange('systemAlerts', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </div>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked: boolean) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">IP Whitelisting</div>
                    <div className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </div>
                  </div>
                  <Switch
                    checked={settings.ipWhitelisting}
                    onCheckedChange={(checked: boolean) => handleSettingChange('ipWhitelisting', checked)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Audit Logging</div>
                    <div className="text-sm text-muted-foreground">
                      Keep detailed logs of all system activities
                    </div>
                  </div>
                  <Switch
                    checked={settings.auditLogging}
                    onCheckedChange={(checked: boolean) => handleSettingChange('auditLogging', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="480"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'system' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  System Settings
                </CardTitle>
                <CardDescription>
                  Configure system-wide settings and maintenance options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Put the system in maintenance mode for updates
                    </div>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked: boolean) => handleSettingChange('maintenanceMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Debug Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Enable detailed logging for troubleshooting
                    </div>
                  </div>
                  <Switch
                    checked={settings.debugMode}
                    onCheckedChange={(checked: boolean) => handleSettingChange('debugMode', checked)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention (days)</Label>
                    <Input
                      id="dataRetention"
                      type="number"
                      min="30"
                      max="2555"
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Backup Frequency</Label>
                    <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <Button onClick={handleSave} className="min-w-[200px]">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;