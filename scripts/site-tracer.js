#!/usr/bin/env node

/**
 * Site Tracer - Monitor and debug the TeKeteAkoClient platform
 * Uses tracer library to provide detailed logging and monitoring
 */

import tracer from 'tracer';
const logger = tracer.colorConsole({
  format: '{{timestamp}} [{{title}}] {{file}}:{{line}} - {{message}}',
  dateformat: 'HH:MM:ss',
  preprocess: function (data) {
    data.title = data.title.toUpperCase();
  },
});

import http from 'http';

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
    logger.info('🚀 Starting Site Tracer - Monitoring TeKeteAkoClient Platform');
    logger.info('📍 Base URL:', this.baseUrl);

    // Check if dev server is running
    await this.checkDevServer();

    // Test all endpoints
    await this.testEndpoints();

    // Generate report
    this.generateReport();
  }

  async checkDevServer() {
    logger.info('🔍 Checking if development server is running...');

    try {
      const response = await this.makeRequest('/');
      if (response.statusCode === 200) {
        logger.info('✅ Development server is running');
        return true;
      } else {
        logger.warn('⚠️  Development server responded with status:', response.statusCode);
        return false;
      }
    } catch (error) {
      logger.error('❌ Development server is not running or not accessible');
      logger.error('Error:', error.message);
      return false;
    }
  }

  async testEndpoints() {
    logger.info('🧪 Testing all endpoints...');

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
        logger.info(`✅ ${endpoint} - OK (${response.responseTime}ms)`);
      } else {
        logger.warn(`⚠️  ${endpoint} - Status ${response.statusCode} (${response.responseTime}ms)`);
      }
    } catch (error) {
      this.results[endpoint] = {
        status: 'ERROR',
        success: false,
        error: error.message,
        responseTime: null,
      };
      logger.error(`❌ ${endpoint} - Error: ${error.message}`);
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
    logger.info('📊 Generating Site Tracer Report...');

    const totalEndpoints = this.endpoints.length;
    const successfulEndpoints = Object.values(this.results).filter((r) => r.success).length;
    const failedEndpoints = totalEndpoints - successfulEndpoints;

    logger.info('='.repeat(60));
    logger.info('📈 SITE TRACER REPORT');
    logger.info('='.repeat(60));
    logger.info(`Total Endpoints Tested: ${totalEndpoints}`);
    logger.info(`✅ Successful: ${successfulEndpoints}`);
    logger.info(`❌ Failed: ${failedEndpoints}`);
    logger.info(`📊 Success Rate: ${((successfulEndpoints / totalEndpoints) * 100).toFixed(1)}%`);
    logger.info('');

    // Detailed results
    logger.info('📋 DETAILED RESULTS:');
    logger.info('-'.repeat(60));

    for (const [endpoint, result] of Object.entries(this.results)) {
      const status = result.success ? '✅' : '❌';
      const time = result.responseTime ? `${result.responseTime}ms` : 'N/A';
      logger.info(`${status} ${endpoint.padEnd(20)} - Status: ${result.status} - Time: ${time}`);

      if (result.error) {
        logger.error(`   Error: ${result.error}`);
      }
    }

    logger.info('');
    logger.info('🎯 RECOMMENDATIONS:');
    logger.info('-'.repeat(60));

    if (failedEndpoints === 0) {
      logger.info('🎉 All endpoints are working perfectly!');
      logger.info('🚀 Site is ready for production use');
    } else {
      logger.warn('⚠️  Some endpoints need attention:');
      for (const [endpoint, result] of Object.entries(this.results)) {
        if (!result.success) {
          logger.warn(`   - Fix ${endpoint}: ${result.error || `Status ${result.status}`}`);
        }
      }
    }

    logger.info('');
    logger.info('🔧 NEXT STEPS:');
    logger.info('-'.repeat(60));
    logger.info('1. Fix any failed endpoints');
    logger.info('2. Optimize response times if needed');
    logger.info('3. Test user workflows end-to-end');
    logger.info('4. Deploy to production when ready');

    logger.info('='.repeat(60));
  }
}

// Run the tracer
async function main() {
  const tracer = new SiteTracer();
  await tracer.traceSite();
}

main().catch(console.error);

export default SiteTracer;
