# Sentry MCP Integration for TAPANGO

This document outlines the Sentry Model Context Protocol (MCP) integration for
the TAPANGO mobile application.

## Overview

The Sentry MCP Server provides secure connectivity between Sentry
issues/debugging data and LLM clients. This integration enables:

- Access to Sentry issues and errors directly in your development workflow
- Search for errors in specific files
- Query projects and organizations
- Automated issue analysis with Sentry's Seer AI agent
- Performance monitoring integration

## Configuration

### Windsurf Configuration

The MCP server is configured in Windsurf via Cascade (CMD + L) with the
following configuration:

#### Recommended: OAuth Configuration

```json
{
  "mcpServers": {
    "Sentry": {
      "url": "https://mcp.sentry.dev/mcp"
    }
  }
}
```

#### Alternative: Legacy Remote Configuration

```json
{
  "mcpServers": {
    "Sentry": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "https://mcp.sentry.dev/mcp"]
    }
  }
}
```

## Project Setup

### 1. Sentry Configuration

The project uses `sentry-expo` with enhanced configuration in `src/sentry.ts`:

- Performance monitoring with appropriate sampling rates
- Session replay for error debugging
- MCP-specific error filtering and context
- Helper functions for MCP integration testing

### 2. Environment Variables

Ensure your environment has the Sentry DSN configured:

```bash
EXPO_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### 3. MCP Test Component

A development-only test component (`MCPTestComponent`) is available on the
dashboard to verify MCP integration:

- Test error capture
- MCP event breadcrumbs
- Performance monitoring
- User flow simulation

## Available MCP Tools

Once configured, you'll have access to these Sentry MCP tools:

### Core Tools

- **Organizations**: List and query organization information
- **Projects**: Find, list, and create projects
- **Teams**: Manage and query team information
- **Issues**: Access issue details, search, and analyze problems
- **DSNs**: List and create Data Source Names for projects

### Analysis Tools

- **Error Searching**: Find errors in specific files or across projects
- **Issue Analysis**: Detailed issue investigation with context
- **Seer Integration**: AI-powered root cause analysis and automated fixes

### Advanced Features

- **Release Management**: Query and analyze release information
- **Performance Monitoring**: Access transaction and performance data
- **Custom Queries**: Execute complex searches across Sentry data

## Example MCP Queries

Here are example prompts you can use with the Sentry MCP integration:

```
Tell me about the issues in the tapango-mobile project

Check Sentry for errors in app/(tabs)/index.tsx and propose solutions

Diagnose the most recent React Native error and propose a fix

Show me performance issues in the last 24 hours

Find all unresolved errors related to navigation

Use Sentry's Seer to analyze and fix the top crash in production

Create a summary of errors by component for the last week
```

## Integration Benefits

### Development Workflow

- **Contextual Debugging**: Get issue context directly in your IDE/chat
- **AI-Powered Analysis**: Leverage Seer for automated root cause analysis
- **Performance Insights**: Query performance data without leaving your workflow
- **Error Triage**: Quickly identify and prioritize issues

### Production Monitoring

- **Real-time Issue Access**: Query live production issues
- **User Impact Analysis**: Understand user-facing errors
- **Release Monitoring**: Track error rates across releases
- **Team Collaboration**: Share issue context with team members

## Testing the Integration

### 1. MCP Test Component

Use the development-only test component in the app to generate test data:

- Navigate to the Customer Home screen in development
- Scroll to the bottom to find the "Sentry MCP Integration Test" card
- Use the test buttons to generate various types of Sentry events

### 2. Verify MCP Connection

Once configured in Windsurf:

1. Open Cascade (CMD + L)
2. Try queries like "Show me recent Sentry issues"
3. Verify authentication with your Sentry organization
4. Test error searching and analysis features

### 3. Helper Functions

The following helper functions are available for custom integration:

```typescript
import { captureTestError, captureMCPEvent } from '../src/sentry';

// Capture a test error for MCP debugging
captureTestError('Test error message', { extra: 'context' });

// Add MCP breadcrumbs for user actions
captureMCPEvent('user_action', {
  action: 'button_click',
  component: 'Dashboard',
});
```

## Troubleshooting

### Common Issues

1. **OAuth Authentication Problems**

   - Ensure Windsurf supports OAuth authentication
   - Try the legacy remote configuration if OAuth fails
   - Check Sentry organization permissions

2. **Missing Tools**

   - Verify authentication completed successfully
   - Check Sentry organization access
   - Look for error messages in Windsurf console

3. **Connection Issues**
   - Verify MCP server URL: `https://mcp.sentry.dev/mcp`
   - Check network connectivity
   - Ensure Windsurf MCP configuration is correct

### Development vs Production

- Test errors are only sent in development when they contain "Sentry test error"
- All other development errors are filtered out to avoid noise
- Production errors are sampled at lower rates for performance

## Support

For additional support:

- [Sentry MCP Server Documentation](https://docs.sentry.io/platforms/javascript/mcp/)
- [GitHub Repository](https://github.com/getsentry/sentry-mcp)
- Sentry Support Team

## Security Considerations

- MCP server uses OAuth for secure authentication
- All communication is encrypted via HTTPS
- Access is scoped to your Sentry organization
- No sensitive data is stored locally

---

This integration provides a seamless bridge between your development workflow
and Sentry's powerful error tracking and performance monitoring capabilities.
