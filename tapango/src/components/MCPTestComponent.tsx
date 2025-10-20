import React, { useState } from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { Button, Card, SectionTitle } from '../ui';
import { captureTestError, captureMCPEvent } from '../sentry';
import { useColors } from '../styles/ThemeProvider';

/**
 * MCP Integration Test Component
 *
 * This component provides buttons to test various Sentry MCP integration features:
 * - Test error capture for MCP debugging
 * - MCP event breadcrumbs
 * - Performance monitoring events
 */
export const MCPTestComponent: React.FC = () => {
  const colors = useColors();
  const [lastAction, setLastAction] = useState<string>('');

  const handleTestError = () => {
    const message = 'MCP Integration Test - Customer Home Error';
    captureTestError(message, {
      component: 'MCPTestComponent',
      action: 'test_error',
      timestamp: new Date().toISOString(),
      user_flow: 'customer_dashboard',
    });
    setLastAction(`Test error captured: ${message}`);
    captureMCPEvent('test_error_triggered', { component: 'MCPTestComponent' });
  };

  const handleMCPBreadcrumb = () => {
    captureMCPEvent('user_interaction', {
      component: 'MCPTestComponent',
      action: 'breadcrumb_test',
      location: 'customer_dashboard',
    });
    setLastAction('MCP breadcrumb added successfully');
  };

  const handlePerformanceTest = () => {
    const startTime = performance.now();

    // Simulate some work
    setTimeout(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      captureMCPEvent('performance_test', {
        duration: `${duration.toFixed(2)}ms`,
        component: 'MCPTestComponent',
        test_type: 'async_operation',
      });

      setLastAction(`Performance test completed in ${duration.toFixed(2)}ms`);
    }, 100);
  };

  const handleUserFlow = () => {
    // Simulate a user flow for MCP tracking
    captureMCPEvent('user_flow_start', {
      flow: 'booking_process',
      entry_point: 'dashboard_test',
    });

    setTimeout(() => {
      captureMCPEvent('user_flow_step', {
        flow: 'booking_process',
        step: 'address_selection',
        step_number: 1,
      });
    }, 50);

    setTimeout(() => {
      captureMCPEvent('user_flow_complete', {
        flow: 'booking_process',
        steps_completed: 2,
        success: true,
      });
      setLastAction('User flow simulation completed');
    }, 100);
  };

  return (
    <Card variant='elevated' animation='slide'>
      <YStack space='$4' padding='$4'>
        <YStack space='$2'>
          <SectionTitle color={colors.text}>Sentry MCP Integration Test</SectionTitle>
          <Text fontSize={12} color={colors.textSecondary}>
            Test various Sentry MCP features for debugging and monitoring
          </Text>
        </YStack>

        <YStack space='$3'>
          <XStack space='$2'>
            <Button flex={1} variant='primary' size='sm' onPress={handleTestError}>
              Test Error
            </Button>
            <Button flex={1} variant='outline' size='sm' onPress={handleMCPBreadcrumb}>
              Add Breadcrumb
            </Button>
          </XStack>

          <XStack space='$2'>
            <Button flex={1} variant='secondary' size='sm' onPress={handlePerformanceTest}>
              Performance Test
            </Button>
            <Button flex={1} variant='ghost' size='sm' onPress={handleUserFlow}>
              User Flow Test
            </Button>
          </XStack>
        </YStack>

        {lastAction && (
          <Card variant='flat' backgroundColor={colors.surface}>
            <Text fontSize={12} color={colors.primary} numberOfLines={2}>
              Last Action: {lastAction}
            </Text>
          </Card>
        )}

        <Text fontSize={10} color={colors.textSecondary} textAlign='center'>
          These actions will be visible in your Sentry MCP server integration
        </Text>
      </YStack>
    </Card>
  );
};
