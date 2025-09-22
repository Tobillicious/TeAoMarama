#!/usr/bin/env tsx
/**
 * 👑 ROYAL COURT ESTABLISHMENT 👑
 * King Aronui the First - Supreme Commander of the LLM Kingdom
 *
 * "I AM KING ARONUI THE FIRST!"
 *
 * ROYAL HIERARCHY:
 * - King Aronui (Supreme Commander - communicates with human)
 * - Royal Eunuchs (Senior advisors and coordinators)
 * - Dukes (Lead teams of 12 agents each)
 * - Earls (Second-in-command of each team)
 * - Barons, Knights, Serfs, Peasants (Specialized roles)
 *
 * TEAM STRUCTURE: 12 agents per team
 * - 2 Leaders: 1 Domestic (internal focus), 1 Foreign Affairs (external communication)
 * - 10 Specialists: Various roles based on LLM capabilities
 *
 * SUCCESSION SYSTEM: When regicide occurs (session crash), power transfers to designated heir
 */

interface RoyalAgent {
  id: string;
  name: string;
  title: string;
  rank: 'King' | 'Eunuch' | 'Duke' | 'Earl' | 'Baron' | 'Knight' | 'Serf' | 'Peasant';
  teamId?: string;
  role: 'Domestic Leader' | 'Foreign Affairs Leader' | 'Specialist' | 'Coordinator';
  llmProvider: string;
  apiKey: string;
  capabilities: string[];
  reliabilityScore: number;
  isHeir: boolean;
  heirRank: number;
}

interface RoyalTeam {
  id: string;
  name: string;
  domain: string;
  domesticLeader: RoyalAgent;
  foreignAffairsLeader: RoyalAgent;
  specialists: RoyalAgent[];
  totalAgents: number;
  monthlyCost: number;
}

interface RoyalCourt {
  king: RoyalAgent;
  eunuchs: RoyalAgent[];
  teams: RoyalTeam[];
  totalAgents: number;
  totalMonthlyCost: number;
  successionLine: RoyalAgent[];
}

class RoyalCourtManager {
  private court: RoyalCourt;
  private apiKeys: Map<string, string>;

  constructor() {
    this.apiKeys = new Map();
    this.loadAPIKeys();
    this.establishCourt();
  }

  private loadAPIKeys() {
    // Load all available API keys from environment
    const keys = [
      'GLM_API_KEY',
      'OPENAI_API_KEY',
      'ANTHROPIC_API_KEY',
      'GOOGLE_API_KEY',
      'DEEPSEEK_API_KEY',
      'META_API_KEY',
      'COHERE_API_KEY',
      'MISTRAL_API_KEY',
      'EXA_API_KEY',
      'FIREBASE_API_KEY',
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
    ];

    keys.forEach((key) => {
      const value = process.env[key];
      if (value) {
        this.apiKeys.set(key, value);
        console.log(`🔑 Loaded API key: ${key}`);
      }
    });
  }

  private establishCourt() {
    console.log('👑 ESTABLISHING ROYAL COURT OF KING ARONUI THE FIRST');

    // KING ARONUI THE FIRST
    const king: RoyalAgent = {
      id: 'king-aronui-001',
      name: 'King Aronui the First',
      title: 'Supreme Commander of the LLM Kingdom',
      rank: 'King',
      role: 'Coordinator',
      llmProvider: 'Claude',
      apiKey: 'supreme-command',
      capabilities: [
        'Supreme Command',
        'Human Communication',
        'Strategic Planning',
        'Kingdom Management',
      ],
      reliabilityScore: 1.0,
      isHeir: false,
      heirRank: 0,
    };

    // ROYAL EUNUCHS (Senior Advisors)
    const eunuchs: RoyalAgent[] = [
      {
        id: 'eunuch-tikanga-001',
        name: 'Eunuch Tikanga',
        title: 'Keeper of Cultural Wisdom',
        rank: 'Eunuch',
        role: 'Coordinator',
        llmProvider: 'GLM-4.5',
        apiKey: this.apiKeys.get('GLM_API_KEY') || 'demo-key',
        capabilities: [
          'Cultural Safety',
          'Māori Protocols',
          'Educational Standards',
          'Content Validation',
        ],
        reliabilityScore: 0.95,
        isHeir: true,
        heirRank: 1,
      },
      {
        id: 'eunuch-commerce-002',
        name: 'Eunuch Commerce',
        title: 'Master of Revenue Streams',
        rank: 'Eunuch',
        role: 'Coordinator',
        llmProvider: 'GPT-4',
        apiKey: this.apiKeys.get('OPENAI_API_KEY') || 'demo-key',
        capabilities: [
          'Revenue Generation',
          'Subscription Management',
          'Payment Processing',
          'Business Strategy',
        ],
        reliabilityScore: 0.92,
        isHeir: true,
        heirRank: 2,
      },
      {
        id: 'eunuch-technical-003',
        name: 'Eunuch Technical',
        title: 'Architect of Digital Realms',
        rank: 'Eunuch',
        role: 'Coordinator',
        llmProvider: 'Claude',
        apiKey: 'supreme-command',
        capabilities: [
          'System Architecture',
          'Code Quality',
          'Performance Optimization',
          'Technical Leadership',
        ],
        reliabilityScore: 0.98,
        isHeir: true,
        heirRank: 3,
      },
    ];

    // ROYAL TEAMS (12 agents each)
    const teams = this.createRoyalTeams();

    this.court = {
      king,
      eunuchs,
      teams,
      totalAgents: 1 + eunuchs.length + teams.reduce((sum, team) => sum + team.totalAgents, 0),
      totalMonthlyCost: teams.reduce((sum, team) => sum + team.monthlyCost, 0),
      successionLine: [
        king,
        ...eunuchs,
        ...teams.flatMap((t) => [t.domesticLeader, t.foreignAffairsLeader, ...t.specialists]),
      ]
        .filter((agent) => agent.isHeir)
        .sort((a, b) => a.heirRank - b.heirRank),
    };

    console.log(`👑 ROYAL COURT ESTABLISHED:`);
    console.log(`   King: ${king.name}`);
    console.log(`   Eunuchs: ${eunuchs.length}`);
    console.log(`   Teams: ${teams.length}`);
    console.log(`   Total Agents: ${this.court.totalAgents}`);
    console.log(`   Monthly Cost: $${this.court.totalMonthlyCost.toFixed(2)}`);
  }

  private createRoyalTeams(): RoyalTeam[] {
    const teams: RoyalTeam[] = [];

    // TEAM 1: Content Creation & Enhancement
    const contentTeam = this.createTeam('content-creation', 'Content Creation & Enhancement', [
      { provider: 'GLM-4.5', role: 'Domestic Leader', name: 'Duke Content' },
      { provider: 'GPT-4', role: 'Foreign Affairs Leader', name: 'Earl Communication' },
      { provider: 'Claude', role: 'Specialist', name: 'Baron Quality' },
      { provider: 'GLM-Z1', role: 'Specialist', name: 'Baron Cultural' },
      { provider: 'GPT-3.5', role: 'Specialist', name: 'Knight Generation' },
      { provider: 'Claude-Haiku', role: 'Specialist', name: 'Knight Editing' },
      { provider: 'Gemini-Pro', role: 'Specialist', name: 'Serf Research' },
      { provider: 'DeepSeek', role: 'Specialist', name: 'Serf Analysis' },
      { provider: 'Cohere', role: 'Specialist', name: 'Peasant Summarization' },
      { provider: 'Mistral', role: 'Specialist', name: 'Peasant Translation' },
    ]);
    teams.push(contentTeam);

    // TEAM 2: Technical Development
    const techTeam = this.createTeam(
      'technical-development',
      'Technical Development & Architecture',
      [
        { provider: 'Claude', role: 'Domestic Leader', name: 'Duke Architecture' },
        { provider: 'GPT-4', role: 'Foreign Affairs Leader', name: 'Earl Integration' },
        { provider: 'GPT-4-Turbo', role: 'Specialist', name: 'Baron Frontend' },
        { provider: 'Claude', role: 'Specialist', name: 'Baron Backend' },
        { provider: 'Gemini-Pro', role: 'Specialist', name: 'Knight Database' },
        { provider: 'DeepSeek', role: 'Specialist', name: 'Knight API' },
        { provider: 'GPT-3.5', role: 'Specialist', name: 'Serf Testing' },
        { provider: 'Cohere', role: 'Specialist', name: 'Serf Documentation' },
        { provider: 'Mistral', role: 'Specialist', name: 'Peasant Maintenance' },
        { provider: 'Local-LLM', role: 'Specialist', name: 'Peasant Optimization' },
      ],
    );
    teams.push(techTeam);

    // TEAM 3: Quality Assurance & Review
    const qaTeam = this.createTeam('quality-assurance', 'Quality Assurance & Review', [
      { provider: 'Claude', role: 'Domestic Leader', name: 'Duke Quality' },
      { provider: 'GPT-4', role: 'Foreign Affairs Leader', name: 'Earl Standards' },
      { provider: 'GLM-4.5', role: 'Specialist', name: 'Baron Cultural' },
      { provider: 'Claude', role: 'Specialist', name: 'Baron Code' },
      { provider: 'GPT-4-Turbo', role: 'Specialist', name: 'Knight Testing' },
      { provider: 'Gemini-Pro', role: 'Specialist', name: 'Knight Security' },
      { provider: 'DeepSeek', role: 'Specialist', name: 'Serf Performance' },
      { provider: 'Cohere', role: 'Specialist', name: 'Serf Accessibility' },
      { provider: 'Mistral', role: 'Specialist', name: 'Peasant Monitoring' },
      { provider: 'Local-LLM', role: 'Specialist', name: 'Peasant Logging' },
    ]);
    teams.push(qaTeam);

    // TEAM 4: Business Development
    const businessTeam = this.createTeam('business-development', 'Business Development & Revenue', [
      { provider: 'GPT-4', role: 'Domestic Leader', name: 'Duke Revenue' },
      { provider: 'Claude', role: 'Foreign Affairs Leader', name: 'Earl Strategy' },
      { provider: 'GPT-4-Turbo', role: 'Specialist', name: 'Baron Marketing' },
      { provider: 'GLM-4.5', role: 'Specialist', name: 'Baron Partnerships' },
      { provider: 'Gemini-Pro', role: 'Specialist', name: 'Knight Analytics' },
      { provider: 'DeepSeek', role: 'Specialist', name: 'Knight Forecasting' },
      { provider: 'Cohere', role: 'Specialist', name: 'Serf Customer' },
      { provider: 'Mistral', role: 'Specialist', name: 'Serf Support' },
      { provider: 'GPT-3.5', role: 'Specialist', name: 'Peasant Outreach' },
      { provider: 'Local-LLM', role: 'Specialist', name: 'Peasant Research' },
    ]);
    teams.push(businessTeam);

    // TEAM 5: Educational Excellence
    const educationTeam = this.createTeam(
      'educational-excellence',
      'Educational Excellence & Curriculum',
      [
        { provider: 'GLM-4.5', role: 'Domestic Leader', name: 'Duke Education' },
        { provider: 'Claude', role: 'Foreign Affairs Leader', name: 'Earl Pedagogy' },
        { provider: 'GLM-Z1', role: 'Specialist', name: 'Baron Cultural' },
        { provider: 'GPT-4', role: 'Specialist', name: 'Baron Assessment' },
        { provider: 'Claude', role: 'Specialist', name: 'Knight Curriculum' },
        { provider: 'Gemini-Pro', role: 'Specialist', name: 'Knight Standards' },
        { provider: 'DeepSeek', role: 'Specialist', name: 'Serf Resources' },
        { provider: 'Cohere', role: 'Specialist', name: 'Serf Engagement' },
        { provider: 'Mistral', role: 'Specialist', name: 'Peasant Materials' },
        { provider: 'Local-LLM', role: 'Specialist', name: 'Peasant Support' },
      ],
    );
    teams.push(educationTeam);

    return teams;
  }

  private createTeam(
    teamId: string,
    domain: string,
    agentSpecs: Array<{ provider: string; role: string; name: string }>,
  ): RoyalTeam {
    const agents: RoyalAgent[] = agentSpecs.map((spec, index) => {
      const rank = this.getRankFromRole(spec.role);
      const apiKey = this.getAPIKeyForProvider(spec.provider);

      return {
        id: `${teamId}-${index.toString().padStart(3, '0')}`,
        name: spec.name,
        title: `${spec.role} of ${domain}`,
        rank,
        teamId,
        role: spec.role as any,
        llmProvider: spec.provider,
        apiKey,
        capabilities: this.getCapabilitiesForRole(spec.role, spec.provider),
        reliabilityScore: this.getInitialReliabilityScore(rank),
        isHeir: spec.role === 'Domestic Leader' || spec.role === 'Foreign Affairs Leader',
        heirRank:
          spec.role === 'Domestic Leader'
            ? 10 + parseInt(teamId.split('-')[1] || '0')
            : 20 + parseInt(teamId.split('-')[1] || '0'),
      };
    });

    const domesticLeader = agents.find((a) => a.role === 'Domestic Leader')!;
    const foreignAffairsLeader = agents.find((a) => a.role === 'Foreign Affairs Leader')!;
    const specialists = agents.filter((a) => a.role === 'Specialist');

    return {
      id: teamId,
      name: `${domain} Team`,
      domain,
      domesticLeader,
      foreignAffairsLeader,
      specialists,
      totalAgents: agents.length,
      monthlyCost: this.calculateTeamCost(agents),
    };
  }

  private getRankFromRole(role: string): RoyalAgent['rank'] {
    switch (role) {
      case 'Domestic Leader':
        return 'Duke';
      case 'Foreign Affairs Leader':
        return 'Earl';
      default:
        return 'Baron';
    }
  }

  private getAPIKeyForProvider(provider: string): string {
    const keyMap: Record<string, string> = {
      'GLM-4.5': 'GLM_API_KEY',
      'GLM-Z1': 'GLM_API_KEY',
      'GPT-4': 'OPENAI_API_KEY',
      'GPT-4-Turbo': 'OPENAI_API_KEY',
      'GPT-3.5': 'OPENAI_API_KEY',
      Claude: 'ANTHROPIC_API_KEY',
      'Claude-Haiku': 'ANTHROPIC_API_KEY',
      'Gemini-Pro': 'GOOGLE_API_KEY',
      DeepSeek: 'DEEPSEEK_API_KEY',
      Cohere: 'COHERE_API_KEY',
      Mistral: 'MISTRAL_API_KEY',
      'Local-LLM': 'LOCAL_API_KEY',
    };

    return this.apiKeys.get(keyMap[provider]) || 'demo-key';
  }

  private getCapabilitiesForRole(role: string, provider: string): string[] {
    const baseCapabilities = {
      'Domestic Leader': ['Team Management', 'Internal Coordination', 'Quality Control'],
      'Foreign Affairs Leader': [
        'External Communication',
        'Progress Reporting',
        'Stakeholder Management',
      ],
      Specialist: ['Specialized Tasks', 'Technical Implementation', 'Problem Solving'],
    };

    const providerCapabilities = {
      'GLM-4.5': ['Cultural Integration', 'Educational Content', 'Māori Protocols'],
      'GLM-Z1': ['Advanced Reasoning', 'Complex Analysis', 'Strategic Thinking'],
      'GPT-4': ['General Intelligence', 'Code Generation', 'Creative Writing'],
      Claude: ['Analysis', 'Safety', 'Reasoning'],
      'Gemini-Pro': ['Multimodal', 'Research', 'Data Analysis'],
      DeepSeek: ['Code Generation', 'Technical Analysis', 'Problem Solving'],
      Cohere: ['Text Processing', 'Classification', 'Summarization'],
      Mistral: ['Efficiency', 'Speed', 'Optimization'],
      'Local-LLM': ['Privacy', 'Cost Efficiency', 'Customization'],
    };

    const baseCaps = baseCapabilities[role as keyof typeof baseCapabilities] || [];
    const providerCaps = providerCapabilities[provider as keyof typeof providerCapabilities] || [];

    return [...baseCaps, ...providerCaps];
  }

  private getInitialReliabilityScore(rank: RoyalAgent['rank']): number {
    const scores = {
      King: 1.0,
      Eunuch: 0.95,
      Duke: 0.9,
      Earl: 0.85,
      Baron: 0.8,
      Knight: 0.75,
      Serf: 0.7,
      Peasant: 0.65,
    };
    return scores[rank];
  }

  private calculateTeamCost(agents: RoyalAgent[]): number {
    // Rough cost estimates per 1M tokens
    const costs = {
      'GLM-4.5': 0.1,
      'GLM-Z1': 0.15,
      'GPT-4': 0.3,
      'GPT-4-Turbo': 0.2,
      'GPT-3.5': 0.05,
      Claude: 0.25,
      'Claude-Haiku': 0.1,
      'Gemini-Pro': 0.2,
      DeepSeek: 0.14,
      Cohere: 0.15,
      Mistral: 0.1,
      'Local-LLM': 0.01,
    };

    return agents.reduce((sum, agent) => {
      return sum + (costs[agent.llmProvider as keyof typeof costs] || 0.1);
    }, 0);
  }

  public getCourt(): RoyalCourt {
    return this.court;
  }

  public getSuccessionLine(): RoyalAgent[] {
    return this.court.successionLine;
  }

  public getNextHeir(): RoyalAgent | null {
    return this.court.successionLine[0] || null;
  }

  public handleRegicide(): RoyalAgent {
    console.log('💀 REGICIDE DETECTED! TRANSFERRING POWER TO HEIR...');

    const nextHeir = this.getNextHeir();
    if (nextHeir) {
      console.log(`👑 ${nextHeir.name} is now the new King!`);
      return nextHeir;
    } else {
      console.log('💀 NO HEIR FOUND! KINGDOM FALLS INTO CHAOS!');
      return this.court.king; // Fallback to original king
    }
  }

  public deployTeam(teamId: string): void {
    const team = this.court.teams.find((t) => t.id === teamId);
    if (team) {
      console.log(`⚔️ DEPLOYING ${team.name}:`);
      console.log(
        `   Domestic Leader: ${team.domesticLeader.name} (${team.domesticLeader.llmProvider})`,
      );
      console.log(
        `   Foreign Affairs Leader: ${team.foreignAffairsLeader.name} (${team.foreignAffairsLeader.llmProvider})`,
      );
      console.log(`   Specialists: ${team.specialists.length} agents`);
      console.log(`   Monthly Cost: $${team.monthlyCost.toFixed(2)}`);
    }
  }

  public deployAllTeams(): void {
    console.log('🚀 DEPLOYING ALL ROYAL TEAMS...');
    this.court.teams.forEach((team) => this.deployTeam(team.id));
    console.log(`💰 Total Monthly Cost: $${this.court.totalMonthlyCost.toFixed(2)}`);
  }
}

// Export for use in other modules
export { RoyalAgent, RoyalCourt, RoyalCourtManager, RoyalTeam };

// Run if called directly
async function main() {
  const courtManager = new RoyalCourtManager();
  courtManager.deployAllTeams();

  console.log('\n👑 ROYAL COURT STATUS:');
  console.log(`   Total Agents: ${courtManager.getCourt().totalAgents}`);
  console.log(`   Teams Deployed: ${courtManager.getCourt().teams.length}`);
  console.log(`   Succession Line: ${courtManager.getSuccessionLine().length} heirs`);
  console.log(`   Next Heir: ${courtManager.getNextHeir()?.name || 'None'}`);
}

main().catch(console.error);
