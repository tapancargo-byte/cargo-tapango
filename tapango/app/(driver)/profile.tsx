import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Screen, Title, Button, Card } from '../../src/ui';
import { supabase } from '../../src/services/supabaseClient';
import { submitKyc } from '../../src/services/kyc';
import { KycUploader } from '../../src/ui/driver/KycUploader';
import { useTheme, useColors } from '../../src/styles/ThemeProvider';
import { OfflineBanner } from '../../src/components/OfflineBanner';

export default function DriverProfile() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rcUri, setRcUri] = useState<string | null>(null);
  const [licenseUri, setLicenseUri] = useState<string | null>(null);
  const { colorScheme, toggleColorScheme } = useTheme();
  const colors = useColors();

  useEffect(() => {
    if (!supabase) return;
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUserId((data as any)?.user?.id ?? null);
      } catch {}
      try {
        const { data: sub } = supabase.auth.onAuthStateChange((_e, s: any) => {
          setUserId(s?.user?.id ?? null);
        });
        unsub = () => sub.subscription.unsubscribe();
      } catch {}
    })();
    return () => {
      try {
        unsub?.();
      } catch {}
    };
  }, []);

  if (!supabase) {
    return (
      <Screen scroll>
        <Title>Driver Profile</Title>
        <Card>
          <Title fontSize={14}>Supabase not configured.</Title>
          <Title fontSize={12}>
            Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.
          </Title>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <OfflineBanner />
      <Title>Driver Profile</Title>

      <Card>
        <Title fontSize={16}>Account</Title>
        <Title fontSize={12}>Signed in as:</Title>
        <Title fontSize={14}>{userId}</Title>
        <Button
          variant='secondary'
          onPress={async () => {
            setLoading(true);
            try {
              if (!supabase) throw new Error('Supabase not configured');
              await supabase.auth.signOut();
              Alert.alert('Signed out');
            } catch (e: any) {
              Alert.alert('Error', e?.message ?? 'Failed to sign out');
            } finally {
              setLoading(false);
            }
          }}
          marginTop={'$2' as any}
        >
          {loading ? 'Signing out…' : 'Sign out'}
        </Button>
      </Card>

      <Card>
        <Title fontSize={16}>KYC</Title>
        <Title fontSize={12}>Upload your RC and Driver’s License</Title>
        <KycUploader label='Registration Certificate (RC)' value={rcUri} onPick={setRcUri} />
        <KycUploader label='Driver’s License' value={licenseUri} onPick={setLicenseUri} />
        <Button
          variant='primary'
          onPress={async () => {
            setLoading(true);
            try {
              const res = await submitKyc({ rcUri, licenseUri, userId });
              Alert.alert(
                res.queued ? 'Queued' : 'Uploaded',
                res.queued ? 'KYC will sync when online.' : 'KYC uploaded successfully.'
              );
            } catch {
              Alert.alert('Error', 'Failed to submit KYC');
            } finally {
              setLoading(false);
            }
          }}
          fullWidth
          disabled={loading}
          marginTop={'$2' as any}
        >
          {loading ? 'Submitting…' : 'Submit KYC'}
        </Button>
      </Card>

      <Card>
        <Title fontSize={16}>Settings</Title>
        <Title fontSize={12} color={colors.textSecondary}>
          Theme
        </Title>
        <Button
          variant={colorScheme === 'light' ? 'primary' : 'outline'}
          size='sm'
          onPress={() => toggleColorScheme('light')}
          accessibilityLabel='Light theme'
          style={{ marginRight: 8 }}
        >
          Light
        </Button>
        <Button
          variant={colorScheme === 'dark' ? 'primary' : 'outline'}
          size='sm'
          onPress={() => toggleColorScheme('dark')}
          accessibilityLabel='Dark theme'
          style={{ marginRight: 8 }}
        >
          Dark
        </Button>
        <Button
          variant={colorScheme === 'system' ? 'primary' : 'outline'}
          size='sm'
          onPress={() => toggleColorScheme('system')}
          accessibilityLabel='System theme'
        >
          System
        </Button>
      </Card>
    </Screen>
  );
}
