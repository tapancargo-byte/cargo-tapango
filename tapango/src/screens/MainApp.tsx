import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../styles';
import { Screen } from '../ui/Screen';
import {
  Body as DsBody,
  Subtitle as DsSubtitle,
  Title as DsTitle,
} from '../design-system/components/Typography';

const MainApp: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={colors.neutral.white} />

      <Screen scroll={false} safeTop safeBottom>
        <View style={[styles.content, { paddingTop: insets.top }]}>
          <DsTitle>Welcome to Tapango!</DsTitle>
          <DsSubtitle>Your delivery app is ready to use.</DsSubtitle>

          <View style={styles.placeholder}>
            <DsBody>Main app content will go here</DsBody>
          </View>
        </View>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: 8,
  },
  placeholder: {
    backgroundColor: colors.secondary.lightBlue,
    padding: spacing['3xl'],
    borderRadius: 16,
    alignItems: 'center',
  },
});

export default MainApp;
