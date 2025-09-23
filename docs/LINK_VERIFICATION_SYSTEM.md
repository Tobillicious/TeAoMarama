# Educational Link Verification System

## Overview

The Educational Link Verification System ensures that all external links in our educational resources are working, reliable, and provide value to New Zealand teachers. This system is critical for maintaining professional credibility and ensuring students have access to functioning educational resources.

## 🎯 Mission Critical Goals

1. **Teacher Credibility**: Ensure teachers can rely on working links in their lessons
2. **Student Access**: Guarantee students can access all referenced educational materials
3. **Professional Standards**: Maintain high-quality, verified educational resources
4. **Cultural Integrity**: Preserve access to important Māori cultural and historical resources

## 🏗️ System Architecture

### Core Components

1. **Automated Link Verification Script** (`scripts/automated-link-verification-system.ts`)
   - Scans all educational content for external links
   - Tests HTTP status codes and response times
   - Provides intelligent link replacement using Exa.ai
   - Generates comprehensive health reports

2. **False Claims Remover** (`scripts/remove-false-verification-claims.ts`)
   - Identifies and removes misleading verification statements
   - Prevents false "// Link verification required" claims
   - Maintains accuracy in educational content

3. **Link Health Dashboard** (`src/components/LinkHealthDashboard.tsx`)
   - Real-time monitoring of link health
   - Visual representation of educational resource reliability
   - Priority domain health tracking

4. **CI/CD Integration** (`.github/workflows/link-verification.yml`)
   - Daily automated verification checks
   - Emergency response for critical failures
   - Automated reporting and issue creation

## 🔍 Priority Educational Domains

The system prioritizes these critical New Zealand educational domains:

- **archives.govt.nz** - Te Tiriti o Waitangi documents and historical records
- **doc.govt.nz** - Department of Conservation resources (Kākāpō conservation, etc.)
- **stats.govt.nz** - Statistics New Zealand census data and population information
- **tepapa.govt.nz** - Te Papa Museum collections and cultural resources
- **education.govt.nz** - Ministry of Education curriculum resources
- **tki.org.nz** - Te Kete Ipurangi educational resources
- **nzhistory.govt.nz** - New Zealand history resources
- **natlib.govt.nz** - National Library collections
- **tetaurawhiri.govt.nz** - Māori Language Commission resources
- **maoritelevision.com** - Contemporary Māori perspectives and news

## 🚀 Quick Start

### Running Manual Verification

```bash
# Full link verification
npm run verify-links

# Remove false verification claims
npm run remove-false-claims

# Complete health check
npm run link-health

# View detailed report
npm run verify-links:report
```

### Daily Automated Checks

The system runs automatically every day at 6 AM NZ time via GitHub Actions. No manual intervention required unless critical issues are detected.

### Emergency Response

```bash
# For critical link health issues
npm run check-educational-integrity
```

## 📊 Health Score Interpretation

- **90-100%**: Excellent - All educational links reliable
- **70-89%**: Good - Minor issues, monitoring required
- **Below 70%**: Poor - Critical action required for teacher credibility

## 🔧 Configuration

### Environment Variables

```bash
# Required for intelligent link replacement
EXA_API_KEY=your_exa_api_key

# Optional Slack notifications for critical issues
SLACK_WEBHOOK=your_slack_webhook_url
```

### Customizing Verification Patterns

Edit `scripts/automated-link-verification-system.ts`:

```typescript
const CONFIG = {
  patterns: [
    'src/data/**/*.ts',        // Educational data files
    'src/components/**/*.tsx', // React components
    'src/pages/**/*.tsx'       // Page components
  ],
  priorityDomains: [
    'archives.govt.nz',       // Add your priority domains
    'doc.govt.nz'
  ],
  maxResponseTime: 5000,      // 5 second timeout
  retryAttempts: 3           // Retry failed links 3 times
};
```

## 📈 Monitoring and Reporting

### Health Dashboard

Access the Link Health Dashboard at `/link-health` to view:
- Real-time link health scores
- Broken link inventory
- Priority domain status
- Performance metrics
- Recommendations for improvement

### Automated Reports

The system generates:

1. **JSON Health Report** - Machine-readable metrics and statistics
2. **Markdown Summary** - Human-readable overview and recommendations
3. **GitHub Issues** - Automatic creation for critical problems
4. **Slack Notifications** - Immediate alerts for health score drops

### Report Locations

```
reports/
├── link-verification/
│   ├── link-health-report.json
│   └── link-verification-summary.md
└── false-claims-removal/
    ├── false-claims-removal-report.json
    └── false-claims-removal-summary.md
```

## 🔄 CI/CD Integration

### GitHub Actions Workflow

The automated workflow:

1. **Triggers**: Daily schedule, code changes, manual dispatch
2. **Verification**: Tests all educational links
3. **Cleanup**: Removes false verification claims
4. **Reporting**: Generates health reports
5. **Response**: Creates issues for critical problems
6. **Emergency**: Automatic repair attempts for severe failures

### Workflow Inputs

```yaml
# Manual workflow dispatch options
scope:
  - all          # Check all links
  - priority-only # Check only priority domains
  - broken-only   # Re-check previously broken links
```

## 🚨 Emergency Procedures

### Critical Health Score (Below 70%)

When link health drops below 70%:

1. **Automatic Response**:
   - GitHub issue created with "critical" label
   - Slack notification sent (if configured)
   - Emergency repair workflow triggered

2. **Manual Response Required**:
   - Review broken links in priority domains
   - Update content with working alternatives
   - Remove or replace unreliable resources
   - Verify fixes with `npm run verify-links`

### False Verification Claims

The system automatically identifies and flags:
- "// Link verification required" statements
- Outdated verification dates
- Hardcoded "working" status claims
- Generic verification without validation

## 🔗 Link Replacement Intelligence

Using Exa.ai integration, the system can:

1. **Identify Alternative Resources**: Find working replacements for broken links
2. **Maintain Educational Value**: Ensure replacements provide similar educational content
3. **Prioritize Government Sources**: Prefer official NZ government and educational domains
4. **Preserve Cultural Context**: Maintain access to Māori cultural and historical content

### Replacement Strategy

```typescript
// Automatic replacement logic
if (brokenLink.includes('archives.govt.nz')) {
  searchTerms = 'Archives New Zealand Te Tiriti o Waitangi Treaty documents';
} else if (brokenLink.includes('doc.govt.nz')) {
  searchTerms = 'Department of Conservation New Zealand wildlife conservation';
}
// ... additional domain-specific strategies
```

## 📚 Educational Impact

### For Teachers

- **Reliability**: Confidence that all linked resources will work
- **Time Saving**: No need to manually check links before lessons
- **Professional Credibility**: Consistent, high-quality resource delivery
- **Preparation**: Advance notice of any resource issues

### For Students

- **Access**: Guaranteed access to all educational materials
- **Learning Continuity**: No broken links disrupting learning flow
- **Quality Resources**: Curated, verified educational content
- **Cultural Learning**: Preserved access to Māori cultural resources

## 🔮 Future Enhancements

### Planned Features

1. **Machine Learning**: Predictive link failure detection
2. **Content Analysis**: Verify educational value of linked resources
3. **Performance Monitoring**: Track page load times and accessibility
4. **Mobile Testing**: Ensure links work on mobile devices
5. **Offline Detection**: Cache-friendly alternatives for poor connectivity

### Integration Opportunities

- **Learning Management Systems**: Direct integration with school LMS platforms
- **Teacher Dashboards**: Real-time link health in teacher interfaces
- **Student Feedback**: Allow students to report broken links
- **Analytics**: Track most valuable and frequently accessed resources

## 🛠️ Troubleshooting

### Common Issues

**Issue**: High false positive rate
**Solution**: Adjust timeout settings and retry logic in configuration

**Issue**: Exa.ai API rate limiting
**Solution**: Implement exponential backoff and batch processing

**Issue**: GitHub Actions timeout
**Solution**: Process links in smaller batches, increase timeout limits

**Issue**: False claims not detected
**Solution**: Update regex patterns in `FALSE_CLAIM_PATTERNS`

### Debug Commands

```bash
# Test single URL
npm run exa:validate-url

# Check Exa.ai integration
npx tsx -e "import { exaLinkValidator } from './src/utils/exa-link-validator'; console.log('Exa integration:', !!process.env.EXA_API_KEY);"

# Verify report generation
ls -la reports/link-verification/

# Check workflow logs
gh run list --workflow=link-verification.yml
```

## 🤝 Contributing

### Adding New Link Patterns

1. Update `CONFIG.patterns` in verification script
2. Add corresponding test cases
3. Update documentation

### Extending Domain Coverage

1. Add new priority domains to `CONFIG.priorityDomains`
2. Create domain-specific search strategies
3. Update dashboard visualizations

### Improving Replacement Logic

1. Enhance `extractSearchTerms()` method
2. Add domain-specific replacement strategies
3. Implement content quality scoring

## 📞 Support

For issues with the link verification system:

1. **Check GitHub Issues**: Search for existing problems and solutions
2. **Review Workflow Logs**: Check GitHub Actions for detailed error information
3. **Run Manual Verification**: Use npm scripts to diagnose specific issues
4. **Contact Development Team**: Create detailed issue with reproduction steps

---

**This system is essential for maintaining the professional credibility and educational quality of our platform with New Zealand teachers and students.**