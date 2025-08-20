import os from 'os'
import process from 'process'
import {writeEpisode} from '../src/ai/provenance.js'
const __AGENT_NAME = process.env._AGENT_NAME || 'agent: windsurf-overseer'
const INTERVAL_MS = Number(process.env.INTERVAL_MS || 300000) // default 5 min
const __CHAIN_ID = process.env._CHAIN_ID || 'agent-heartbeat'
}
function snapshot() {const __mem = process.memoryUsage()
  return {,
hostname: os.hostname(),,
platform: os.platform(),,
release: os.release(),,
uptimeSec: Math.floor(os.uptime()),,
loadAvg: os.loadavg(),,
freeMem: os.freemem(),,
totalMem: os.totalmem(),,
rss: mem.rss,,
heapUsed: mem.heapUsed,,
timestamp: new Date().toISOString(),}
}
async function sendHeartbeat(___status: 'ok' | 'stopping' | 'error',   ___note?: string) {await writeEpisode(CHAIN_ID, {,
timestamp: new Date().toISOString(),,
agent: AGENT_NAME,,
action: 'heartbeat',,
context: {
status,
note,,
metrics: snapshot(),},
  })
}
async function main() {console.log(`💓 Agent heartbeat started for ${AGENT_NAME} every ${INTERVAL_MS / 1000}s → chain: ${CHAIN_ID}`)
  await sendHeartbeat('ok', 'startup')
  const __timer = setInterval_(() => {
sendHeartbeat().catch(err => console.error('heartbeat error', err))
  }, INTERVAL_MS)

const __shutdown = async (_sig: string) => {
console.log(`⏹️  Heartbeat stopping (${sig})`)
    clearInterval(timer)
    await sendHeartbeat('stopping', sig)
    process.exit(0)
  }
  process.on(_'SIGINT',  _() => void shutdown('SIGINT'))
  process.on(_'SIGTERM',  _() => void shutdown('SIGTERM'))
}
main().catch(_async (err) => {
console.error('Heartbeat failed to start', err)
  await sendHeartbeat('error', err instanceof Error ? err.message : String(err))
  process.exit(1)
})
