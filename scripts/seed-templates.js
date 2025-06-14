"use client"

const mongoose = require("mongoose")
const Template = require("../models/Template")
const User = require("../models/User")
require("dotenv").config()

const templates = [
  {
    name: "API Endpoint Documentation",
    description: "Template for documenting REST API endpoints with parameters, responses, and examples",
    category: "API",
    icon: "🔌",
    content: `# API Endpoint: [Endpoint Name]

## Overview
Brief description of what this endpoint does.

## Endpoint Details
- **URL:** \`/api/v1/endpoint\`
- **Method:** \`GET\` | \`POST\` | \`PUT\` | \`DELETE\`
- **Authentication:** Required | Optional | None

## Parameters

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`id\` | string | Yes | Unique identifier |

### Query Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| \`limit\` | integer | No | 10 | Number of items to return |
| \`offset\` | integer | No | 0 | Number of items to skip |

### Request Body
\`\`\`json
{
  "name": "string",
  "email": "string",
  "age": "integer"
}
\`\`\`

## Response

### Success Response (200 OK)
\`\`\`json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "Operation successful"
}
\`\`\`

### Error Responses

#### 400 Bad Request
\`\`\`json
{
  "success": false,
  "error": "Invalid input parameters",
  "details": ["Email is required", "Name must be at least 2 characters"]
}
\`\`\`

#### 404 Not Found
\`\`\`json
{
  "success": false,
  "error": "Resource not found"
}
\`\`\`

## Examples

### cURL
\`\`\`bash
curl -X GET "https://api.example.com/api/v1/endpoint?limit=5" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"
\`\`\`

### JavaScript
\`\`\`javascript
const response = await fetch('/api/v1/endpoint', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
\`\`\`

### Python
\`\`\`python
import requests

url = "https://api.example.com/api/v1/endpoint"
headers = {
    "Authorization": "Bearer YOUR_TOKEN",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)
\`\`\`

## Rate Limiting
- **Limit:** 100 requests per minute
- **Headers:** \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`

## Notes
- Additional notes or considerations
- Known limitations
- Related endpoints`,
  },
  {
    name: "Step-by-Step Tutorial",
    description: "Template for creating detailed tutorials with clear steps and examples",
    category: "Tutorial",
    icon: "📚",
    content: `# [Tutorial Title]

## Overview
Brief description of what users will learn and accomplish in this tutorial.

**What you'll learn:**
- Key concept 1
- Key concept 2
- Key concept 3

**Prerequisites:**
- Requirement 1
- Requirement 2
- Basic knowledge of [technology/concept]

**Estimated time:** X minutes

## Before You Begin

### Requirements
- [ ] Software/tool requirement 1
- [ ] Software/tool requirement 2
- [ ] Account setup (if needed)

### Setup
Instructions for initial setup if needed.

## Step 1: [First Step Title]

Brief description of what this step accomplishes.

### Instructions
1. Detailed instruction 1
2. Detailed instruction 2
3. Detailed instruction 3

### Code Example
\`\`\`language
// Code example here
console.log("Hello, World!");
\`\`\`

### Expected Result
Description of what should happen after completing this step.

> **💡 Tip:** Helpful tip or best practice related to this step.

## Step 2: [Second Step Title]

Brief description of what this step accomplishes.

### Instructions
1. Detailed instruction 1
2. Detailed instruction 2

### Code Example
\`\`\`language
// Another code example
function example() {
  return "This is an example";
}
\`\`\`

### Verification
How to verify this step was completed successfully.

## Step 3: [Third Step Title]

Continue with additional steps as needed...

## Troubleshooting

### Common Issues

#### Issue 1: [Problem Description]
**Symptoms:** What the user might see
**Solution:** How to fix it

#### Issue 2: [Problem Description]
**Symptoms:** What the user might see
**Solution:** How to fix it

## Next Steps

What to do after completing this tutorial:
- [ ] Suggested next tutorial
- [ ] Related documentation
- [ ] Advanced topics to explore

## Summary

Recap of what was accomplished:
- ✅ Achievement 1
- ✅ Achievement 2
- ✅ Achievement 3

## Additional Resources

- [Link to related documentation](url)
- [External resource](url)
- [Community forum](url)`,
  },
  {
    name: "How-To Guide",
    description: "Template for practical how-to guides focused on solving specific problems",
    category: "Guide",
    icon: "🛠️",
    content: `# How to [Task Description]

## Overview
Brief explanation of the task and when you might need to do it.

**Use cases:**
- Scenario 1
- Scenario 2
- Scenario 3

## Quick Start

For experienced users, here's the quick version:

\`\`\`bash
# Quick commands
command1
command2
command3
\`\`\`

## Detailed Instructions

### Method 1: [Primary Method]

**When to use:** Best for most situations

1. **Step 1:** Action description
   \`\`\`bash
   command example
   \`\`\`

2. **Step 2:** Action description
   \`\`\`bash
   another command
   \`\`\`

3. **Step 3:** Final action
   \`\`\`bash
   final command
   \`\`\`

### Method 2: [Alternative Method]

**When to use:** When Method 1 doesn't work or for specific scenarios

1. **Step 1:** Alternative action
2. **Step 2:** Follow-up action
3. **Step 3:** Completion

## Configuration Options

### Option 1: [Configuration Name]
\`\`\`json
{
  "setting1": "value1",
  "setting2": "value2"
}
\`\`\`

### Option 2: [Alternative Configuration]
\`\`\`json
{
  "alternativeSetting": "alternativeValue"
}
\`\`\`

## Examples

### Example 1: [Scenario]
\`\`\`bash
# Example commands for specific scenario
example-command --option value
\`\`\`

### Example 2: [Another Scenario]
\`\`\`bash
# Different example
another-example --different-option
\`\`\`

## Verification

How to verify the task was completed successfully:

1. Check 1: What to look for
2. Check 2: Expected output
3. Check 3: Final verification

## Troubleshooting

### Common Problems

**Problem:** Description of issue
**Solution:** How to resolve it

**Problem:** Another common issue
**Solution:** Resolution steps

## Best Practices

- ✅ Do this
- ✅ Also do this
- ❌ Don't do this
- ❌ Avoid this

## Related Topics

- [Related guide 1](link)
- [Related guide 2](link)
- [Advanced configuration](link)`,
  },
  {
    name: "FAQ Section",
    description: "Template for frequently asked questions with clear answers",
    category: "FAQ",
    icon: "❓",
    content: `# Frequently Asked Questions

## General Questions

### What is [Product/Service Name]?
Brief explanation of what your product or service does and its main benefits.

### How do I get started?
Step-by-step overview of the getting started process with links to detailed guides.

### Is there a free trial/version available?
Information about pricing, trials, or free tiers.

### What are the system requirements?
List of technical requirements, supported platforms, browsers, etc.

## Account & Billing

### How do I create an account?
Step-by-step account creation process.

### How do I reset my password?
Password reset instructions with screenshots if helpful.

### How does billing work?
Explanation of billing cycles, payment methods, and pricing structure.

### Can I change my plan?
Information about upgrading, downgrading, or changing subscription plans.

## Technical Questions

### How do I integrate with [Technology/Platform]?
Brief overview with links to detailed integration guides.

### What APIs are available?
List of available APIs with links to documentation.

### How do I troubleshoot connection issues?
Common connection problems and their solutions.

### Is there a rate limit?
Information about API rate limits, quotas, and best practices.

## Features & Functionality

### What features are included in each plan?
Feature comparison table or list.

### How do I use [Specific Feature]?
Brief explanation with link to detailed documentation.

### Can I customize [Feature/Setting]?
Information about customization options and limitations.

### Is there mobile support?
Details about mobile apps, responsive design, or mobile-specific features.

## Security & Privacy

### How is my data protected?
Overview of security measures, encryption, and data protection policies.

### Do you comply with GDPR/CCPA?
Information about privacy compliance and data handling.

### Can I export my data?
Data export options and procedures.

### How do I delete my account?
Account deletion process and data retention policies.

## Support & Community

### How do I contact support?
Available support channels and response times.

### Is there a community forum?
Links to community resources, forums, or discussion groups.

### Do you offer training or onboarding?
Information about available training resources, documentation, or onboarding assistance.

### Where can I find more documentation?
Links to additional resources, guides, and documentation.

## Troubleshooting

### Common Error Messages

#### Error: "[Error Message]"
**Cause:** Why this error occurs
**Solution:** How to fix it

#### Error: "[Another Error Message]"
**Cause:** Explanation of the cause
**Solution:** Step-by-step resolution

### Performance Issues

#### The application is running slowly
**Possible causes:**
- Cause 1
- Cause 2
- Cause 3

**Solutions:**
- Solution 1
- Solution 2
- Solution 3

## Still Have Questions?

If you can't find the answer you're looking for:

- 📧 **Email Support:** [support@example.com](mailto:support@example.com)
- 💬 **Live Chat:** Available on our website
- 📚 **Documentation:** [Link to full documentation](url)
- 🗣️ **Community Forum:** [Link to forum](url)

---

*Last updated: [Date]*`,
  },
  {
    name: "Getting Started Guide",
    description: "Template for onboarding new users with essential first steps",
    category: "Getting Started",
    icon: "🚀",
    content: `# Getting Started with [Product Name]

Welcome! This guide will help you get up and running with [Product Name] in just a few minutes.

## What is [Product Name]?

[Product Name] is [brief description of what your product does and its main value proposition].

### Key Benefits
- ✅ Benefit 1
- ✅ Benefit 2
- ✅ Benefit 3

## Prerequisites

Before you begin, make sure you have:
- [ ] Requirement 1 (e.g., Node.js 16+)
- [ ] Requirement 2 (e.g., A code editor)
- [ ] Requirement 3 (e.g., Basic knowledge of JavaScript)

## Quick Start (5 minutes)

### Step 1: Installation

Choose your preferred installation method:

#### Option A: Package Manager
\`\`\`bash
npm install [package-name]
# or
yarn add [package-name]
\`\`\`

#### Option B: CDN
\`\`\`html
<script src="https://cdn.example.com/[package-name]/latest.js"></script>
\`\`\`

#### Option C: Download
[Download the latest release](https://github.com/example/repo/releases)

### Step 2: Basic Setup

Create a new file and add the following code:

\`\`\`javascript
// Basic setup example
import { ProductName } from '[package-name]';

const app = new ProductName({
  // Basic configuration
  apiKey: 'your-api-key',
  environment: 'development'
});

// Your first function call
app.initialize();
\`\`\`

### Step 3: Verify Installation

Run this simple test to make sure everything is working:

\`\`\`javascript
// Test your setup
app.test()
  .then(result => {
    console.log('✅ Setup successful!', result);
  })
  .catch(error => {
    console.error('❌ Setup failed:', error);
  });
\`\`\`

**Expected output:**
\`\`\`
✅ Setup successful! { status: 'ready', version: '1.0.0' }
\`\`\`

## Your First Project

Let's build a simple example to demonstrate the core functionality:

### Project Structure
\`\`\`
my-first-project/
├── index.html
├── script.js
└── style.css
\`\`\`

### HTML (index.html)
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First [Product Name] Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>Hello [Product Name]!</h1>
        <button id="demo-button">Click me</button>
        <div id="result"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
\`\`\`

### JavaScript (script.js)
\`\`\`javascript
// Initialize [Product Name]
const app = new ProductName({
  container: '#app',
  theme: 'default'
});

// Add event listener
document.getElementById('demo-button').addEventListener('click', () => {
  app.doSomething()
    .then(result => {
      document.getElementById('result').innerHTML = 
        \`<p>Result: \${result.message}</p>\`;
    });
});
\`\`\`

### CSS (style.css)
\`\`\`css
body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

#app {
  text-align: center;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
\`\`\`

## Configuration Options

### Basic Configuration
\`\`\`javascript
const config = {
  apiKey: 'your-api-key',        // Required
  environment: 'development',    // 'development' | 'production'
  debug: true,                   // Enable debug mode
  timeout: 5000                  // Request timeout in ms
};
\`\`\`

### Advanced Configuration
\`\`\`javascript
const advancedConfig = {
  ...config,
  customEndpoint: 'https://api.custom.com',
  retryAttempts: 3,
  cacheEnabled: true,
  plugins: ['plugin1', 'plugin2']
};
\`\`\`

## Next Steps

Now that you have [Product Name] set up, here's what to explore next:

### 📚 Learn More
- [Core Concepts](link) - Understand the fundamental concepts
- [API Reference](link) - Complete API documentation
- [Examples](link) - More code examples and use cases

### 🛠️ Build Something
- [Tutorial: Build a Todo App](link)
- [Tutorial: Create a Dashboard](link)
- [Advanced Integration Guide](link)

### 🤝 Get Help
- [Community Forum](link) - Ask questions and share knowledge
- [Discord/Slack](link) - Real-time community chat
- [GitHub Issues](link) - Report bugs or request features

## Common Issues

### Issue: "Module not found"
**Solution:** Make sure you've installed the package correctly:
\`\`\`bash
npm list [package-name]
\`\`\`

### Issue: "API key invalid"
**Solution:** Check that your API key is correct and has the necessary permissions.

### Issue: "CORS errors in browser"
**Solution:** Configure your server to allow cross-origin requests or use a development server.

## Support

Need help? We're here for you:

- 📖 **Documentation:** [docs.example.com](url)
- 💬 **Community:** [community.example.com](url)
- 📧 **Email:** [support@example.com](mailto:support@example.com)
- 🐛 **Bug Reports:** [GitHub Issues](url)

---

**Congratulations!** 🎉 You've successfully set up [Product Name]. Happy coding!`,
  },
  {
    name: "Troubleshooting Guide",
    description: "Template for comprehensive troubleshooting documentation",
    category: "Troubleshooting",
    icon: "🔧",
    content: `# Troubleshooting Guide

This guide helps you diagnose and resolve common issues with [Product/Service Name].

## Before You Start

### Quick Checklist
Before diving into specific issues, try these general troubleshooting steps:

- [ ] Check your internet connection
- [ ] Verify you're using the latest version
- [ ] Clear your browser cache (if web-based)
- [ ] Restart the application/service
- [ ] Check system requirements

### Getting Help
If you can't resolve the issue:
1. Check this troubleshooting guide
2. Search our [knowledge base](link)
3. Ask in our [community forum](link)
4. Contact [support](mailto:support@example.com)

## Common Issues

### Installation & Setup Issues

#### Issue: Installation fails with permission errors
**Symptoms:**
- Error messages about permissions
- "Access denied" or "EACCES" errors
- Installation stops unexpectedly

**Solutions:**
1. **Run as administrator/sudo:**
   \`\`\`bash
   sudo npm install [package-name]
   \`\`\`

2. **Fix npm permissions:**
   \`\`\`bash
   npm config set prefix ~/.npm-global
   export PATH=~/.npm-global/bin:$PATH
   \`\`\`

3. **Use a Node version manager:**
   \`\`\`bash
   # Install nvm first, then:
   nvm install node
   nvm use node
   \`\`\`

#### Issue: "Module not found" errors
**Symptoms:**
- Import/require statements fail
- "Cannot resolve module" errors
- Application won't start

**Solutions:**
1. **Verify installation:**
   \`\`\`bash
   npm list [package-name]
   \`\`\`

2. **Reinstall dependencies:**
   \`\`\`bash
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

3. **Check import paths:**
   \`\`\`javascript
   // Correct
   import { Component } from '[package-name]';
   
   // Incorrect
   import { Component } from '[package-name]/lib/component';
   \`\`\`

### Authentication Issues

#### Issue: API key authentication fails
**Symptoms:**
- 401 Unauthorized errors
- "Invalid API key" messages
- Authentication timeouts

**Solutions:**
1. **Verify API key format:**
   \`\`\`javascript
   // Correct format
   const apiKey = 'pk_live_abcd1234...';
   
   // Check for extra spaces or characters
   const cleanKey = apiKey.trim();
   \`\`\`

2. **Check API key permissions:**
   - Ensure the key has necessary scopes
   - Verify it's not expired
   - Check rate limits

3. **Environment-specific keys:**
   \`\`\`javascript
   const apiKey = process.env.NODE_ENV === 'production' 
     ? process.env.PROD_API_KEY 
     : process.env.DEV_API_KEY;
   \`\`\`

#### Issue: Session expires too quickly
**Symptoms:**
- Frequent login prompts
- "Session expired" messages
- Unexpected logouts

**Solutions:**
1. **Check session configuration:**
   \`\`\`javascript
   const sessionConfig = {
     maxAge: 24 * 60 * 60 * 1000, // 24 hours
     secure: process.env.NODE_ENV === 'production',
     httpOnly: true
   };
   \`\`\`

2. **Implement token refresh:**
   \`\`\`javascript
   // Auto-refresh tokens before expiry
   setInterval(refreshToken, 50 * 60 * 1000); // 50 minutes
   \`\`\`

### Performance Issues

#### Issue: Slow loading times
**Symptoms:**
- Pages take more than 3 seconds to load
- API requests timeout
- UI feels sluggish

**Diagnostic Steps:**
1. **Check network performance:**
   \`\`\`bash
   # Test API response time
   curl -w "@curl-format.txt" -o /dev/null -s "https://api.example.com/health"
   \`\`\`

2. **Monitor resource usage:**
   - Open browser DevTools → Performance tab
   - Check memory usage
   - Identify slow network requests

**Solutions:**
1. **Optimize API calls:**
   \`\`\`javascript
   // Bad: Multiple sequential calls
   const user = await getUser(id);
   const posts = await getPosts(user.id);
   const comments = await getComments(posts.map(p => p.id));
   
   // Good: Batch or parallel calls
   const [user, posts] = await Promise.all([
     getUser(id),
     getPosts(id)
   ]);
   \`\`\`

2. **Implement caching:**
   \`\`\`javascript
   const cache = new Map();
   
   async function getCachedData(key) {
     if (cache.has(key)) {
       return cache.get(key);
     }
     const data = await fetchData(key);
     cache.set(key, data);
     return data;
   }
   \`\`\`

#### Issue: Memory leaks
**Symptoms:**
- Application becomes slower over time
- Browser tab crashes
- High memory usage

**Solutions:**
1. **Clean up event listeners:**
   \`\`\`javascript
   // Add cleanup in useEffect or componentWillUnmount
   useEffect(() => {
     const handleResize = () => { /* handler */ };
     window.addEventListener('resize', handleResize);
     
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);
   \`\`\`

2. **Clear intervals and timeouts:**
   \`\`\`javascript
   const intervalId = setInterval(updateData, 1000);
   
   // Clear when component unmounts
   return () => clearInterval(intervalId);
   \`\`\`

### Network & Connectivity Issues

#### Issue: CORS errors
**Symptoms:**
- "Access to fetch blocked by CORS policy"
- Cross-origin request errors
- API calls fail in browser but work in Postman

**Solutions:**
1. **Server-side CORS configuration:**
   \`\`\`javascript
   // Express.js example
   app.use(cors({
     origin: ['http://localhost:3000', 'https://yourdomain.com'],
     credentials: true
   }));
   \`\`\`

2. **Use a proxy during development:**
   \`\`\`json
   // package.json
   {
     "proxy": "http://localhost:8000"
   }
   \`\`\`

#### Issue: SSL/TLS certificate errors
**Symptoms:**
- "Certificate not trusted" warnings
- HTTPS connection failures
- Mixed content errors

**Solutions:**
1. **For development (not production):**
   \`\`\`bash
   # Disable SSL verification (development only)
   export NODE_TLS_REJECT_UNAUTHORIZED=0
   \`\`\`

2. **For production:**
   - Use valid SSL certificates
   - Check certificate expiration
   - Verify certificate chain

## Error Codes Reference

### HTTP Status Codes

| Code | Meaning | Common Causes | Solutions |
|------|---------|---------------|-----------|
| 400 | Bad Request | Invalid parameters, malformed JSON | Check request format and parameters |
| 401 | Unauthorized | Invalid or missing API key | Verify authentication credentials |
| 403 | Forbidden | Insufficient permissions | Check API key permissions and scopes |
| 404 | Not Found | Resource doesn't exist, wrong URL | Verify endpoint URL and resource ID |
| 429 | Too Many Requests | Rate limit exceeded | Implement rate limiting and retry logic |
| 500 | Internal Server Error | Server-side issue | Check server logs, contact support |

### Application-Specific Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| E001 | Configuration missing | Check config file and environment variables |
| E002 | Database connection failed | Verify database credentials and connectivity |
| E003 | Invalid input format | Check data types and required fields |

## Diagnostic Tools

### Built-in Diagnostics
\`\`\`javascript
// Enable debug mode
const app = new ProductName({
  debug: true,
  logLevel: 'verbose'
});

// Run health check
app.healthCheck()
  .then(status => console.log('Health:', status))
  .catch(error => console.error('Health check failed:', error));
\`\`\`

### Browser DevTools
1. **Console tab:** Check for JavaScript errors
2. **Network tab:** Monitor API requests and responses
3. **Performance tab:** Identify performance bottlenecks
4. **Application tab:** Check local storage and cookies

### Command Line Tools
\`\`\`bash
# Test API connectivity
curl -I https://api.example.com/health

# Check DNS resolution
nslookup api.example.com

# Test network connectivity
ping api.example.com

# Check port availability
telnet api.example.com 443
\`\`\`

## Getting Additional Help

### Information to Include When Reporting Issues

1. **Environment details:**
   - Operating system and version
   - Browser and version (if applicable)
   - Node.js version
   - Package version

2. **Steps to reproduce:**
   - Exact steps that lead to the issue
   - Expected vs. actual behavior
   - Screenshots or error messages

3. **Code samples:**
   - Minimal reproducible example
   - Configuration files (remove sensitive data)
   - Error logs

### Support Channels

- 🐛 **Bug Reports:** [GitHub Issues](url)
- 💬 **Community Help:** [Forum](url) or [Discord](url)
- 📧 **Direct Support:** [support@example.com](mailto:support@example.com)
- 📚 **Documentation:** [docs.example.com](url)

---

*Last updated: [Date] | If you found this guide helpful, please let us know!*`,
  },
  {
    name: "Reference Documentation",
    description: "Template for comprehensive reference documentation with detailed specifications",
    category: "Reference",
    icon: "📖",
    content: `# [Component/Module] Reference

## Overview

Brief description of the component/module and its primary purpose.

**Key Features:**
- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install [package-name]
\`\`\`

## Import

\`\`\`javascript
// ES6 modules
import { ComponentName } from '[package-name]';

// CommonJS
const { ComponentName } = require('[package-name]');

// CDN
<script src="https://cdn.example.com/[package-name]/latest.js"></script>
\`\`\`

## Constructor

### Syntax
\`\`\`javascript
new ComponentName(options)
\`\`\`

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| \`options\` | Object | No | \`{}\` | Configuration options |

### Options Object

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| \`apiKey\` | string | Yes | - | Your API key |
| \`environment\` | string | No | \`'production'\` | Environment: 'development' or 'production' |
| \`timeout\` | number | No | \`5000\` | Request timeout in milliseconds |
| \`retries\` | number | No | \`3\` | Number of retry attempts |
| \`debug\` | boolean | No | \`false\` | Enable debug logging |

### Example
\`\`\`javascript
const component = new ComponentName({
  apiKey: 'your-api-key',
  environment: 'development',
  timeout: 10000,
  debug: true
});
\`\`\`

## Methods

### method1(parameter1, parameter2)

Brief description of what this method does.

#### Syntax
\`\`\`javascript
component.method1(parameter1, parameter2)
\`\`\`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`parameter1\` | string | Yes | Description of parameter1 |
| \`parameter2\` | Object | No | Configuration object |

#### Returns
- **Type:** \`Promise<Object>\`
- **Description:** Promise that resolves to result object

#### Return Value Structure
\`\`\`javascript
{
  success: boolean,
  data: any,
  message: string,
  timestamp: number
}
\`\`\`

#### Example
\`\`\`javascript
try {
  const result = await component.method1('example', {
    option1: 'value1',
    option2: true
  });
  console.log(result.data);
} catch (error) {
  console.error('Method failed:', error.message);
}
\`\`\`

#### Possible Errors
- \`InvalidParameterError\`: When parameter1 is invalid
- \`NetworkError\`: When network request fails
- \`AuthenticationError\`: When API key is invalid

### method2(options)

Another method description.

#### Syntax
\`\`\`javascript
component.method2(options)
\`\`\`

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`options\` | Object | Yes | Method options |
| \`options.id\` | string | Yes | Unique identifier |
| \`options.data\` | Object | No | Data payload |
| \`options.callback\` | Function | No | Callback function |

#### Returns
- **Type:** \`void\` or \`Promise<void>\`
- **Description:** No return value

#### Example
\`\`\`javascript
component.method2({
  id: 'unique-id',
  data: { key: 'value' },
  callback: (result) => {
    console.log('Callback result:', result);
  }
});
\`\`\`

## Properties

### property1
- **Type:** \`string\`
- **Read-only:** Yes
- **Description:** Description of property1

### property2
- **Type:** \`Object\`
- **Read-only:** No
- **Description:** Configuration object that can be modified

#### Example
\`\`\`javascript
console.log(component.property1); // Read value
component.property2 = { newConfig: true }; // Set value
\`\`\`

## Events

### event1

Fired when something specific happens.

#### Event Data
\`\`\`javascript
{
  type: 'event1',
  data: any,
  timestamp: number
}
\`\`\`

#### Example
\`\`\`javascript
component.on('event1', (eventData) => {
  console.log('Event fired:', eventData);
});
\`\`\`

### event2

Another event description.

#### Event Data
\`\`\`javascript
{
  type: 'event2',
  error: Error,
  context: Object
}
\`\`\`

#### Example
\`\`\`javascript
component.on('event2', (eventData) => {
  console.error('Error occurred:', eventData.error);
});
\`\`\`

## Static Methods

### ComponentName.staticMethod(parameter)

Description of static method.

#### Syntax
\`\`\`javascript
ComponentName.staticMethod(parameter)
\`\`\`

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`parameter\` | string | Yes | Input parameter |

#### Returns
- **Type:** \`boolean\`
- **Description:** True if condition is met

#### Example
\`\`\`javascript
const isValid = ComponentName.staticMethod('test-input');
console.log(isValid); // true or false
\`\`\`

## Constants

### ComponentName.CONSTANT_NAME
- **Type:** \`string\`
- **Value:** \`'constant-value'\`
- **Description:** Description of the constant

### ComponentName.ANOTHER_CONSTANT
- **Type:** \`number\`
- **Value:** \`100\`
- **Description:** Another constant description

#### Example
\`\`\`javascript
if (value === ComponentName.CONSTANT_NAME) {
  // Handle constant value
}
\`\`\`

## Type Definitions

### CustomType

\`\`\`typescript
interface CustomType {
  id: string;
  name: string;
  optional?: boolean;
  data: {
    [key: string]: any;
  };
}
\`\`\`

### ConfigOptions

\`\`\`typescript
interface ConfigOptions {
  apiKey: string;
  environment?: 'development' | 'production';
  timeout?: number;
  retries?: number;
  debug?: boolean;
}
\`\`\`

## Error Handling

### Error Types

#### CustomError
Base error class for all component errors.

\`\`\`javascript
class CustomError extends Error {
  constructor(message, code, details) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.details = details;
  }
}
\`\`\`

#### ValidationError
Thrown when input validation fails.

\`\`\`javascript
try {
  component.method1('invalid-input');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation failed:', error.details);
  }
}
\`\`\`

### Error Codes

| Code | Description | Common Causes |
|------|-------------|---------------|
| \`E001\` | Invalid parameter | Wrong parameter type or format |
| \`E002\` | Authentication failed | Invalid API key |
| \`E003\` | Network error | Connection timeout or server error |
| \`E004\` | Rate limit exceeded | Too many requests |

## Examples

### Basic Usage
\`\`\`javascript
import { ComponentName } from '[package-name]';

const component = new ComponentName({
  apiKey: 'your-api-key'
});

// Basic method call
const result = await component.method1('example');
console.log(result);
\`\`\`

### Advanced Usage
\`\`\`javascript
const component = new ComponentName({
  apiKey: 'your-api-key',
  environment: 'development',
  debug: true
});

// Event handling
component.on('event1', (data) => {
  console.log('Received:', data);
});

// Error handling
try {
  const result = await component.method1('complex-input', {
    advanced: true,
    options: ['a', 'b', 'c']
  });
  
  // Process result
  if (result.success) {
    console.log('Success:', result.data);
  }
} catch (error) {
  console.error('Error:', error.message);
  console.error('Code:', error.code);
}
\`\`\`

### Integration Example
\`\`\`javascript
// Integration with other libraries
import { ComponentName } from '[package-name]';
import axios from 'axios';

class MyService {
  constructor() {
    this.component = new ComponentName({
      apiKey: process.env.API_KEY
    });
  }
  
  async processData(input) {
    try {
      // Use component method
      const processed = await this.component.method1(input);
      
      // Send to external API
      const response = await axios.post('/api/external', processed.data);
      
      return response.data;
    } catch (error) {
      throw new Error(\`Processing failed: \${error.message}\`);
    }
  }
}
\`\`\`

## Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 12+ | Full support |
| Edge | 79+ | Full support |
| IE | Not supported | Use polyfills |

### Polyfills Required
For older browsers, include these polyfills:
- \`Promise\` polyfill for IE
- \`fetch\` polyfill for older browsers

## Performance Considerations

### Best Practices
- Reuse component instances when possible
- Implement proper error handling
- Use appropriate timeout values
- Cache results when applicable

### Memory Usage
- Each instance uses approximately X MB of memory
- Event listeners are automatically cleaned up
- Call \`component.destroy()\` to free resources

## Migration Guide

### From v1.x to v2.x
- Method \`oldMethod()\` is deprecated, use \`newMethod()\`
- Property \`oldProperty\` renamed to \`newProperty\`
- Constructor options changed: see [migration guide](link)

## See Also

- [Getting Started Guide](link)
- [Tutorial: Basic Usage](link)
- [API Examples](link)
- [GitHub Repository](link)

---

*API Version: 2.1.0 | Last updated: [Date]*`,
  },
]

async function seedTemplates() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/docs-site")

    // Find admin user
    const adminUser = await User.findOne({ role: "admin" })
    if (!adminUser) {
      console.error("No admin user found. Please create an admin user first.")
      return
    }

    // Clear existing system templates
    await Template.deleteMany({ isSystem: true })

    // Create templates
    const templatePromises = templates.map((template) =>
      Template.create({
        ...template,
        author: adminUser._id,
        isSystem: true,
      }),
    )

    await Promise.all(templatePromises)

    console.log(`✅ Successfully created ${templates.length} templates:`)
    templates.forEach((template) => {
      console.log(`   ${template.icon} ${template.name} (${template.category})`)
    })
  } catch (error) {
    console.error("Error seeding templates:", error)
  } finally {
    await mongoose.disconnect()
  }
}

seedTemplates()
