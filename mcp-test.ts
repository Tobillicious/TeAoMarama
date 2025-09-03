
import { globalMCPServer } from './src/utils/mcp-server';

async function main() {
  try {
    await globalMCPServer.start();
    const status = globalMCPServer.getStatus();
    console.log('MCP Server Status:', status);
    const tools = globalMCPServer.getTools();
    console.log('Available Tools:', tools);
    await globalMCPServer.stop();
  } catch (error) {
    console.error('Error interacting with MCP Server:', error);
  }
}

main();
