
import { globalMCPServer } from './src/utils/mcp-server';

async function main() {
  try {
    console.log('Attempting to start MCP Server...');
    await globalMCPServer.start();
    console.log('MCP Server started.');

    const status = globalMCPServer.getStatus();
    console.log('MCP Server Status:', JSON.stringify(status, null, 2));

    const tools = globalMCPServer.getTools();
    console.log('Available Tools:', JSON.stringify(tools, null, 2));

    console.log('Attempting to stop MCP Server...');
    await globalMCPServer.stop();
    console.log('MCP Server stopped.');
  } catch (error) {
    console.error('Error interacting with MCP Server:', error);
  }
}

main();
