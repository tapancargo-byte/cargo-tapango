import React from 'react';
import { FlatList, View } from 'react-native';
import { Screen, EmptyState, Skeleton, SkeletonText, Card } from '../../src/ui';
import { JobCard } from '../../src/ui/driver/JobCard';
import { OfflineBanner } from '../../src/components/OfflineBanner';
import { router } from 'expo-router';

import { fetchDriverJobs } from '../../src/services/driverData';
import { supabase } from '../../src/services/supabaseClient';

export default function DriverJobs() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Only fetch jobs when a Supabase session is active
        const session = (await supabase?.auth.getSession())?.data?.session;
        if (!session) {
          setLoading(false);
          return;
        }
        const res = await fetchDriverJobs();
        if (res == null) {
          setError('Unable to fetch jobs');
        } else {
          setData(res);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Screen scroll={false}>
      <OfflineBanner />
      {loading ? (
        <View style={{ gap: 12 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <SkeletonText lines={2} />
              <Skeleton height={12} radius={6} />
            </Card>
          ))}
        </View>
      ) : error ? (
        <EmptyState title='Could not load jobs' subtitle={error} icon='alert' />
      ) : data.length === 0 ? (
        <EmptyState
          title='No jobs right now'
          subtitle='We will notify you when new jobs are available.'
          icon='briefcase'
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(it) => it.id}
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
          renderItem={({ item }) => {
            const extra: any = {};
            if (item.distance_km) extra.distance = `${item.distance_km} km`;
            if (item.eta_minutes) extra.eta = `${item.eta_minutes}m`;
            return (
              <JobCard
                id={item.id}
                origin={item.origin}
                destination={item.destination}
                payoutINR={Number(item.payout_inr)}
                {...extra}
                onPress={() =>
                  router.push({
                    pathname: '/(driver)/bid',
                    params: { trackingId: item.tracking_id },
                  } as any)
                }
              />
            );
          }}
        />
      )}
    </Screen>
  );
}
