import React from 'react';
import { Sentry } from '../config/sentry';
import { Button } from './ui/button';

const SentryTest: React.FC = () => {
  const testError = () => {
    throw new Error('Test error for Sentry monitoring');
  };

  const testMessage = () => {
    Sentry.captureMessage('Test message from admin dashboard', 'info');
    alert('Test message sent to Sentry');
  };

  const testException = () => {
    try {
      throw new Error('Test exception from admin dashboard');
    } catch (error) {
      Sentry.captureException(error);
      alert('Test exception sent to Sentry');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Sentry Testing</h2>
      <p className="text-gray-600">
        Use these buttons to test Sentry integration in the admin dashboard:
      </p>
      
      <div className="space-y-2">
        <Button onClick={testMessage} variant="outline">
          Send Test Message
        </Button>
        
        <Button onClick={testException} variant="outline">
          Send Test Exception
        </Button>
        
        <Button onClick={testError} variant="destructive">
          Trigger Unhandled Error
        </Button>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold">Instructions:</h3>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>Check your Sentry dashboard after clicking these buttons</li>
          <li>The "Trigger Unhandled Error" will crash this component</li>
          <li>Messages and exceptions should appear in Sentry within seconds</li>
        </ul>
      </div>
    </div>
  );
};

export default SentryTest;
