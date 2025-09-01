#!/usr/bin/env node

/**
 * Code Review Helper Script
 * Automates basic checks that should be performed during code review
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class CodeReviewHelper {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.suggestions = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '💡',
      warn: '⚠️ ',
      error: '❌',
      success: '✅'
    }[type] || 'ℹ️ ';
    
    console.log(`${prefix} ${message}`);
  }

  addIssue(category, message, severity = 'warning') {
    const issue = { category, message, severity };
    if (severity === 'error') {
      this.issues.push(issue);
    } else {
      this.warnings.push(issue);
    }
  }

  addSuggestion(message) {
    this.suggestions.push(message);
  }

  // Check if required files exist
  checkRequiredFiles() {
    this.log('Checking required files...', 'info');
    
    const requiredFiles = [
      'package.json',
      'README.md',
      'tsconfig.json',
      '.eslintrc.json'
    ];

    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        this.addIssue('Files', `Missing required file: ${file}`, 'error');
      }
    });
  }

  // Run linting checks
  checkLinting() {
    this.log('Running ESLint checks...', 'info');
    
    try {
      execSync('npm run lint', { stdio: 'pipe' });
      this.log('ESLint passed', 'success');
    } catch (error) {
      const output = error.stdout ? error.stdout.toString() : error.message;
      this.addIssue('Linting', 'ESLint found issues that need to be addressed', 'error');
      
      // Parse ESLint output for specific issues
      if (output.includes('@typescript-eslint/no-unused-vars')) {
        this.addSuggestion('Remove unused variables and imports');
      }
      if (output.includes('react/no-unescaped-entities')) {
        this.addSuggestion('Escape special characters in JSX text');
      }
    }
  }

  // Run TypeScript type checking
  checkTypeScript() {
    this.log('Running TypeScript type checks...', 'info');
    
    try {
      execSync('npm run typecheck', { stdio: 'pipe' });
      this.log('TypeScript type checking passed', 'success');
    } catch (error) {
      this.addIssue('Types', 'TypeScript type checking failed', 'error');
    }
  }

  // Check for security issues in dependencies
  checkSecurity() {
    this.log('Checking for security vulnerabilities...', 'info');
    
    try {
      const auditOutput = execSync('npm audit --audit-level=moderate', { stdio: 'pipe' });
      this.log('No moderate or high security vulnerabilities found', 'success');
    } catch (error) {
      this.addIssue('Security', 'Security vulnerabilities found in dependencies', 'warning');
      this.addSuggestion('Run `npm audit fix` to resolve security issues');
    }
  }

  // Analyze bundle size impact
  checkBundleSize() {
    this.log('Analyzing potential bundle size impact...', 'info');
    
    try {
      // Check if build succeeds
      execSync('npm run build', { stdio: 'pipe' });
      this.log('Build successful', 'success');
    } catch (error) {
      this.addIssue('Build', 'Build failed - this will block deployment', 'error');
    }
  }

  // Check code quality metrics
  checkCodeQuality() {
    this.log('Analyzing code quality...', 'info');
    
    const srcDir = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcDir)) {
      this.analyzeDirectory(srcDir);
    }
  }

  analyzeDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.analyzeDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        this.analyzeFile(filePath);
      }
    });
  }

  analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Check file length
    if (lines.length > 300) {
      this.addSuggestion(`Consider breaking down ${filePath} - it's ${lines.length} lines long`);
    }

    // Check for TODO comments
    const todoCount = content.match(/TODO|FIXME|HACK/gi)?.length || 0;
    if (todoCount > 0) {
      this.addSuggestion(`${filePath} contains ${todoCount} TODO/FIXME comments that should be addressed`);
    }

    // Check for console.log statements
    const consoleLogCount = content.match(/console\.log/g)?.length || 0;
    if (consoleLogCount > 0) {
      this.addIssue('Code Quality', `${filePath} contains ${consoleLogCount} console.log statements`, 'warning');
    }

    // Check for large functions (basic heuristic)
    const functionMatches = content.match(/function\s+\w+|const\s+\w+\s*=\s*\(/g) || [];
    if (functionMatches.length > 10) {
      this.addSuggestion(`${filePath} has many functions - consider splitting into multiple files`);
    }
  }

  // Check test coverage
  checkTestCoverage() {
    this.log('Checking test coverage...', 'info');
    
    const testDirs = ['__tests__', 'tests', 'test'];
    const hasTests = testDirs.some(dir => fs.existsSync(dir)) || 
                    fs.existsSync('src') && this.hasTestFiles('src');
    
    if (!hasTests) {
      this.addIssue('Testing', 'No test files found - consider adding tests for new functionality', 'warning');
    }
  }

  hasTestFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.some(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        return this.hasTestFiles(filePath);
      }
      return file.includes('.test.') || file.includes('.spec.');
    });
  }

  // Generate review report
  generateReport() {
    this.log('\n📊 Code Review Summary', 'info');
    console.log('='.repeat(50));
    
    if (this.issues.length === 0 && this.warnings.length === 0) {
      this.log('No issues found! 🎉', 'success');
    } else {
      if (this.issues.length > 0) {
        console.log('\n❌ Issues that must be fixed:');
        this.issues.forEach(issue => {
          console.log(`   • [${issue.category}] ${issue.message}`);
        });
      }
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  Warnings to consider:');
        this.warnings.forEach(warning => {
          console.log(`   • [${warning.category}] ${warning.message}`);
        });
      }
    }
    
    if (this.suggestions.length > 0) {
      console.log('\n💡 Suggestions for improvement:');
      this.suggestions.forEach(suggestion => {
        console.log(`   • ${suggestion}`);
      });
    }

    console.log('\n📋 Next Steps:');
    if (this.issues.length > 0) {
      console.log('   1. Fix all critical issues before requesting review');
    }
    if (this.warnings.length > 0) {
      console.log('   2. Address warnings where applicable');
    }
    console.log('   3. Review the CODE_REVIEW_CHECKLIST.md for complete guidelines');
    console.log('   4. Request review from team members');
    
    console.log('\n' + '='.repeat(50));
    
    // Return exit code based on issues
    return this.issues.length > 0 ? 1 : 0;
  }

  // Run all checks
  async runAllChecks() {
    this.log('🔍 Starting automated code review checks...', 'info');
    
    this.checkRequiredFiles();
    this.checkLinting();
    this.checkTypeScript();
    this.checkSecurity();
    this.checkCodeQuality();
    this.checkTestCoverage();
    this.checkBundleSize();
    
    return this.generateReport();
  }
}

// Run the checks
if (require.main === module) {
  const reviewer = new CodeReviewHelper();
  reviewer.runAllChecks().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('❌ Code review helper failed:', error.message);
    process.exit(1);
  });
}

module.exports = CodeReviewHelper;