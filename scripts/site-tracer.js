#!/usr/bin/env node

/**
 * Site Tracer - Monitor and debug the TeKeteAkoClient platform
 * Uses tracer library to provide detailed logging and monitoring
 */

const tracer = require('tracer').colorConsole({
  format: '{{timestamp}} [{{title}}] {{file}}:{{line}} - {{message}}',
  dateformat: 'HH:MM:ss',
  preprocess: function (data) {
    data.title = data.title.toUpperCase();
  },
});

const http = require('http');
const https = require('https');

class SiteTracer {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.endpoints = [
      '/',
      '/resources',
      '/teacher',
      '/student',
      '/glm-symphony',
      '/supreme-ai',
      '/graphrag',
      '/llm-army',
      '/exa-ai',
      '/teacher-demo',
      '/unified-llm',
    ];
    this.results = {};
  }

  async traceSite() {
    tracer.info('🚀 Starting Site Tracer - Monitoring TeKeteAkoClient Platform');
    tracer.info('📍 Base URL:', this.baseUrl);

    // Check if dev server is running
    await this.checkDevServer();

    // Test all endpoints
    await this.testEndpoints();

    // Generate report
    this.generateReport();
  }

  async checkDevServer() {
    tracer.info('🔍 Checking if development server is running...');

    try {
      const response = await this.makeRequest('/');
      if (response.statusCode === 200) {
        tracer.info('✅ Development server is running');
        return true;
      } else {
        tracer.warn('⚠️  Development server responded with status:', response.statusCode);
        return false;
      }
    } catch (error) {
      tracer.error('❌ Development server is not running or not accessible');
      tracer.error('Error:', error.message);
      return false;
    }
  }

  async testEndpoints() {
    tracer.info('🧪 Testing all endpoints...');

    for (const endpoint of this.endpoints) {
      await this.testEndpoint(endpoint);
      // Small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async testEndpoint(endpoint) {
    try {
      const response = await this.makeRequest(endpoint);
      this.results[endpoint] = {
        status: response.statusCode,
        success: response.statusCode === 200,
        error: null,
        responseTime: response.responseTime,
      };

      if (response.statusCode === 200) {
        tracer.info(`✅ ${endpoint} - OK (${response.responseTime}ms)`);
      } else {
        tracer.warn(`⚠️  ${endpoint} - Status ${response.statusCode} (${response.responseTime}ms)`);
      }
    } catch (error) {
      this.results[endpoint] = {
        status: 'ERROR',
        success: false,
        error: error.message,
        responseTime: null,
      };
      tracer.error(`❌ ${endpoint} - Error: ${error.message}`);
    }
  }

  makeRequest(path) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const url = `${this.baseUrl}${path}`;

      const req = http.get(url, (res) => {
        const responseTime = Date.now() - startTime;
        resolve({
          statusCode: res.statusCode,
          responseTime: responseTime,
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  generateReport() {
    tracer.info('📊 Generating Site Tracer Report...');

    const totalEndpoints = this.endpoints.length;
    const successfulEndpoints = Object.values(this.results).filter((r) => r.success).length;
    const failedEndpoints = totalEndpoints - successfulEndpoints;

    tracer.info('='.repeat(60));
    tracer.info('📈 SITE TRACER REPORT');
    tracer.info('='.repeat(60));
    tracer.info(`Total Endpoints Tested: ${totalEndpoints}`);
    tracer.info(`✅ Successful: ${successfulEndpoints}`);
    tracer.info(`❌ Failed: ${failedEndpoints}`);
    tracer.info(`📊 Success Rate: ${((successfulEndpoints / totalEndpoints) * 100).toFixed(1)}%`);
    tracer.info('');

    // Detailed results
    tracer.info('📋 DETAILED RESULTS:');
    tracer.info('-'.repeat(60));

    for (const [endpoint, result] of Object.entries(this.results)) {
      const status = result.success ? '✅' : '❌';
      const time = result.responseTime ? `${result.responseTime}ms` : 'N/A';
      tracer.info(`${status} ${endpoint.padEnd(20)} - Status: ${result.status} - Time: ${time}`);

      if (result.error) {
        tracer.error(`   Error: ${result.error}`);
      }
    }

    tracer.info('');
    tracer.info('🎯 RECOMMENDATIONS:');
    tracer.info('-'.repeat(60));

    if (failedEndpoints === 0) {
      tracer.info('🎉 All endpoints are working perfectly!');
      tracer.info('🚀 Site is ready for production use');
    } else {
      tracer.warn('⚠️  Some endpoints need attention:');
      for (const [endpoint, result] of Object.entries(this.results)) {
        if (!result.success) {
          tracer.warn(`   - Fix ${endpoint}: ${result.error || `Status ${result.status}`}`);
        }
      }
    }

    tracer.info('');
    tracer.info('🔧 NEXT STEPS:');
    tracer.info('-'.repeat(60));
    tracer.info('1. Fix any failed endpoints');
    tracer.info('2. Optimize response times if needed');
    tracer.info('3. Test user workflows end-to-end');
    tracer.info('4. Deploy to production when ready');

    tracer.info('='.repeat(60));
  }
}

// Run the tracer
async function main() {
  const tracer = new SiteTracer();
  await tracer.traceSite();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SiteTracer;
