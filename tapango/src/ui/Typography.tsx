import React, { memo } from 'react';
import { Text as TText } from 'tamagui';
import { useColors } from '../styles/ThemeProvider';

export type TypographyVariant =
  | 'display'
  | 'headline'
  | 'title'
  | 'section'
  | 'body'
  | 'subtitle'
  | 'caption'
  | 'overline';

export type TypographyWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export interface TypographyProps extends React.ComponentProps<typeof TText> {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'info' | string;
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
}

const getVariantStyles = (variant: TypographyVariant) => {
  switch (variant) {
    case 'display':
      return {
        fontSize: 40, // Direct numeric value for React Native 0.81 compatibility
        lineHeight: 48,
        letterSpacing: -1,
      };
    case 'headline':
      return {
        fontSize: 32,
        lineHeight: 40,
        letterSpacing: -0.5,
      };
    case 'title':
      return {
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
      };
    case 'section':
      return {
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0,
      };
    case 'body':
      return {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
      };
    case 'subtitle':
      return {
        fontSize: 14, // Fixed: Direct numeric value instead of '$subtitle'
        lineHeight: 20,
        letterSpacing: 0.1,
      };
    case 'caption':
      return {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.4,
      };
    case 'overline':
      return {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1,
        textTransform: 'uppercase' as const,
      };
    default:
      return {};
  }
};

const getWeightValue = (weight: TypographyWeight) => {
  switch (weight) {
    case 'light':
      return '300';
    case 'regular':
      return '400';
    case 'medium':
      return '500';
    case 'semibold':
      return '600';
    case 'bold':
      return '700';
    case 'extrabold':
      return '800';
    default:
      return '400';
  }
};

const getLineHeightValue = (lineHeight: NonNullable<TypographyProps['lineHeight']>) => {
  switch (lineHeight) {
    case 'tight':
      return 1.2;
    case 'normal':
      return 1.5;
    case 'relaxed':
      return 1.6;
    case 'loose':
      return 1.8;
    default:
      return 1.5;
  }
};

export const Typography = memo<TypographyProps>(
  ({
    variant = 'body',
    weight = 'regular',
    color,
    align,
    transform,
    lineHeight,
    children,
    ...props
  }) => {
    const colors = useColors();

    const getColor = () => {
      if (!color) return colors.text;

      switch (color) {
        case 'primary':
          return colors.primary;
        case 'secondary':
          return colors.textSecondary;
        case 'tertiary':
          return colors.textSecondary;
        case 'error':
          return colors.error;
        case 'success':
          return colors.success;
        case 'warning':
          return colors.warning;
        case 'info':
          return colors.info;
        default:
          return color;
      }
    };

    const variantStyles = getVariantStyles(variant);

    return (
      <TText
        {...variantStyles}
        fontWeight={getWeightValue(weight)}
        color={getColor()}
        textAlign={align}
        textTransform={transform}
        lineHeight={lineHeight ? getLineHeightValue(lineHeight) : variantStyles.lineHeight}
        {...props}
      >
        {children}
      </TText>
    );
  }
);

// Convenience components for common typography patterns
export const Display = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant='display' weight='bold' {...props} />
);

export const Headline = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant='headline' weight='semibold' {...props} />
);

export const Title = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant='title' weight='semibold' {...props} />
);

export const SectionTitle = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant='section' weight='semibold' {...props} />
);

export const BodyText = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant='body' {...props} />
);

export const Subtitle = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant='subtitle' color='secondary' {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant='caption' color='secondary' {...props} />
);

export const Overline = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant='overline' color='secondary' weight='medium' {...props} />
);

// Semantic text components
export const ErrorText = (props: Omit<TypographyProps, 'color'>) => (
  <Typography color='error' {...props} />
);

export const SuccessText = (props: Omit<TypographyProps, 'color'>) => (
  <Typography color='success' {...props} />
);

export const WarningText = (props: Omit<TypographyProps, 'color'>) => (
  <Typography color='warning' {...props} />
);

export const InfoText = (props: Omit<TypographyProps, 'color'>) => (
  <Typography color='info' {...props} />
);

// Layout text components
export const CenteredText = (props: Omit<TypographyProps, 'align'>) => (
  <Typography align='center' {...props} />
);

export const RightText = (props: Omit<TypographyProps, 'align'>) => (
  <Typography align='right' {...props} />
);
