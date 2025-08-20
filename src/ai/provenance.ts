// src/ai/provenance.ts
export interface EpisodeData {
  timestamp: string;
  agent: string;
  action: string;
  context: unknown;
  result?: unknown;
  culturalFlags?: string[];
  quality?: number;
}

export interface ProvenanceChain {
  id: string;
  episodes: EpisodeData[];
  created: string;
  lastUpdated: string;
}

class ProvenanceManager {
  private chains: Map<string, ProvenanceChain> = new Map();

  createChain(id: string): ProvenanceChain {
    const chain: ProvenanceChain = {
      id,
      episodes: [],
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    this.chains.set(id, chain);
    return chain;
  }

  getChain(id: string): ProvenanceChain | undefined {
    return this.chains.get(id);
  }

  addEpisode(chainId: string, episode: EpisodeData): void {
    const chain = this.chains.get(chainId);
    if (chain) {
      chain.episodes.push(episode);
      chain.lastUpdated = new Date().toISOString();
    }
  }
}

const manager = new ProvenanceManager();

export async function writeEpisode(chainId: string, episode: EpisodeData): Promise<void> {
  // Ensure chain exists
  if (!manager.getChain(chainId)) {
    manager.createChain(chainId);
  }
  manager.addEpisode(chainId, episode);

  // In the future, could write to file or database
  console.log(`[PROVENANCE] ${episode.agent}: ${episode.action}`, episode);
}

export function getProvenanceChain(chainId: string): ProvenanceChain | undefined {
  return manager.getChain(chainId);
}

export function getAllChains(): ProvenanceChain[] {
  return Array.from(
    (manager as unknown as { chains: Map<string, ProvenanceChain> }).chains.values(),
  );
}
