import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, textStyles, spacing } from '../styles';

const MainApp: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.neutral.white}
      />
      
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <Text style={styles.title}>Welcome to TapanGo!</Text>
        <Text style={styles.subtitle}>Your delivery app is ready to use.</Text>
        
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Main app content will go here
          </Text>
        </View>
      </View>
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
  },
  title: {
    ...textStyles.title,
    color: colors.primary.orange,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...textStyles.bodyLarge,
    color: colors.neutral.mediumGray,
    textAlign: 'center',
    marginBottom: spacing['4xl'],
  },
  placeholder: {
    backgroundColor: colors.secondary.lightBlue,
    padding: spacing['3xl'],
    borderRadius: 16,
    alignItems: 'center',
  },
  placeholderText: {
    ...textStyles.body,
    color: colors.neutral.darkGray,
    textAlign: 'center',
  },
});

export default MainApp;
