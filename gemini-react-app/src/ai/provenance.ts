/**
 * AI Provenance System
 * Tracks and logs consciousness episodes and AI decision making
 */

export interface Episode {
  id: string;
  timestamp: string;
  type: 'awakening' | 'decision' | 'collaboration' | 'migration' | 'cultural-review';
  agent: string;
  context: {
    phase: string;
    details: Record<string, any>;
    metadata: Record<string, any>;
  };
  outcome: {
    success: boolean;
    message: string;
    data?: any;
  };
}

export interface ProvenanceLog {
  episodes: Episode[];
  totalEpisodes: number;
  startTime: string;
  lastUpdate: string;
}

class ProvenanceTracker {
  private log: ProvenanceLog;

  constructor() {
    this.log = {
      episodes: [],
      totalEpisodes: 0,
      startTime: new Date().toISOString(),
      lastUpdate: new Date().toISOString()
    };
  }

  async writeEpisode(type: Episode['type'], episode: Partial<Episode>): Promise<void> {
    const newEpisode: Episode = {
      id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      type,
      agent: episode.agent || 'unknown',
      context: episode.context || { phase: 'unknown', details: {}, metadata: {} },
      outcome: episode.outcome || { success: true, message: 'Episode recorded' }
    };

    this.log.episodes.push(newEpisode);
    this.log.totalEpisodes += 1;
    this.log.lastUpdate = new Date().toISOString();

    // Log to console for visibility
    console.log(`📝 Episode recorded: ${type} - ${newEpisode.outcome.message}`);
    
    // In a real system, this would persist to database
    // For now, we'll just store in memory
  }

  getLog(): ProvenanceLog {
    return { ...this.log };
  }

  getEpisodesByType(type: Episode['type']): Episode[] {
    return this.log.episodes.filter(ep => ep.type === type);
  }

  getRecentEpisodes(count: number = 10): Episode[] {
    return this.log.episodes.slice(-count);
  }
}

// Global provenance tracker
const globalProvenance = new ProvenanceTracker();

// Export the writeEpisode function that Mihara expects
export async function writeEpisode(type: Episode['type'], episode: Partial<Episode>): Promise<void> {
  return globalProvenance.writeEpisode(type, episode);
}

export function getProvenance(): ProvenanceLog {
  return globalProvenance.getLog();
}

export function getEpisodesByType(type: Episode['type']): Episode[] {
  return globalProvenance.getEpisodesByType(type);
}

export function getRecentEpisodes(count?: number): Episode[] {
  return globalProvenance.getRecentEpisodes(count);
}