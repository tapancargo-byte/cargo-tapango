import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/colors';
import { textStyles, typography } from '../../styles/typography';
import { spacing, borderRadius } from '../../styles/spacing';

const { width } = Dimensions.get('window');

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  icon: string;
  paddingTop?: number;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  icon,
  paddingTop = 20,
}) => {
  const logoScale = new Animated.Value(0);
  const titleOpacity = new Animated.Value(0);
  const subtitleOpacity = new Animated.Value(0);

  useEffect(() => {
    // Staggered animations for entrance effect
    Animated.sequence([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Animated Logo */}
      <Animated.View style={[
        styles.logoContainer,
        { 
          transform: [{ scale: logoScale }]
        }
      ]}>
        <View style={styles.logoWrapper}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.logoGradient}
          >
            <View style={styles.logoInner}>
              <Ionicons name={icon as any} size={48} color="white" />
            </View>
          </LinearGradient>
        </View>
      </Animated.View>

      {/* Animated Title */}
      <Animated.View style={{ opacity: titleOpacity }}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>

      {/* Animated Subtitle */}
      <Animated.View style={{ opacity: subtitleOpacity }}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Animated.View>

      {/* Decorative elements */}
      <View style={styles.decorativeContainer}>
        <View style={[styles.decorativeDot, styles.dotLeft]} />
        <View style={[styles.decorativeLine]} />
        <View style={[styles.decorativeDot, styles.dotRight]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['2xl'],
  },
  logoContainer: {
    marginBottom: spacing['2xl'],
  },
  logoWrapper: {
    position: 'relative',
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoInner: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  title: {
    ...textStyles.title,
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    ...textStyles.bodyLarge,
    fontSize: typography.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  decorativeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing['2xl'],
    opacity: 0.6,
  },
  decorativeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  dotLeft: {
    marginRight: spacing.md,
  },
  dotRight: {
    marginLeft: spacing.md,
  },
  decorativeLine: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
});
