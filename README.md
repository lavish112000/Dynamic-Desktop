# Dynamic Desktop

A powerful, customizable live wallpaper application built with Next.js that transforms your desktop experience with dynamic backgrounds, themes, and interactive controls.

## Features

- **Dynamic Wallpapers**: Support for both video and static image wallpapers
- **Theme Generation**: AI-powered theme generation based on descriptions
- **Interactive Sidebar**: Comprehensive sidebar with playback controls and settings
- **Responsive Design**: Works seamlessly across different screen sizes
- **Desktop Packaging**: Can be packaged as a native desktop application

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:9002 in your browser
```

## Code Review Process

This project implements a comprehensive code review system to ensure high code quality and security. 

### Quick Commands
```bash
# Run automated code review checks
npm run review

# Quick lint and type check
npm run review:quick

# Fix auto-fixable linting issues
npm run lint:fix
```

### Review Documentation
- 📋 [Complete Code Review Checklist](./CODE_REVIEW_CHECKLIST.md)
- 🔄 [Detailed Review Process Guide](./CODE_REVIEW_PROCESS.md)
- 📝 [PR Template](./.github/pull_request_template.md)

### Automated Checks
Our CI/CD pipeline automatically runs:
- ESLint code quality checks
- TypeScript type safety verification
- Security vulnerability scanning
- Build verification
- Dependency reviews

To get started, take a look at src/app/page.tsx.
