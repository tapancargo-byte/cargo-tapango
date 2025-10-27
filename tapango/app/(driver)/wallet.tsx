import React from 'react';
import { FlatList, View } from 'react-native';
import { Screen, Title, Card, EmptyState, Skeleton, SkeletonText } from '../../src/ui';
import { OfflineBanner } from '../../src/components/OfflineBanner';
import { TransactionRow } from '../../src/ui/driver/TransactionRow';
import { formatINR } from '../../src/utils/currency';
import { useColors } from '../../src/styles/ThemeProvider';

import { fetchWalletTransactions } from '../../src/services/driverData';

export default function DriverWallet() {
  const colors = useColors();
  const [loading, setLoading] = React.useState(true);
  const [txns, setTxns] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchWalletTransactions();
      if (res) setTxns(res);
      setLoading(false);
    })();
  }, []);

  return (
    <Screen scroll={false}>
      <OfflineBanner />
      <Title>Wallet</Title>
      <Card>
        <Title fontSize={14}>Earnings today</Title>
        <Title fontSize={22} color={colors.primary}>
          {formatINR(1850)}
        </Title>
      </Card>
      {loading ? (
        <View style={{ gap: 12, paddingTop: 12 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <SkeletonText lines={1} />
              <Skeleton height={8} radius={3} />
            </Card>
          ))}
        </View>
      ) : txns.length === 0 ? (
        <EmptyState
          title='No transactions'
          subtitle='Your earnings will appear here.'
          icon='wallet'
        />
      ) : (
        <FlatList
          data={txns}
          keyExtractor={(it) => it.id}
          contentContainerStyle={{ gap: 12, paddingTop: 12, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TransactionRow
              title={item.title}
              amountINR={Number(item.amount_inr)}
              type={item.type}
              date={item.occurred_at}
            />
          )}
        />
      )}
    </Screen>
  );
}
