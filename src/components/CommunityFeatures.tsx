import React, { useEffect, useState } from 'react';
import './CommunityFeatures.css';

interface CommunityMember {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'kaumātua' | 'community-leader' | 'cultural-expert';
  iwi: string;
  culturalExpertise: string[];
  contributionLevel: number;
  culturalImpact: number;
  lastActive: Date;
  achievements: string[];
  culturalProjects: string[];
  mentoringStudents: number;
  culturalKnowledge: number;
}

interface CulturalProject {
  id: string;
  title: string;
  teReoTitle: string;
  description: string;
  category:
    | 'cultural-preservation'
    | 'community-engagement'
    | 'educational'
    | 'artistic'
    | 'environmental';
  status: 'planning' | 'active' | 'completed' | 'archived';
  participants: number;
  culturalImpact: number;
  startDate: Date;
  endDate?: Date;
  facilitator: string;
  culturalElements: string[];
  communitySupport: number;
  fundingStatus: 'seeking' | 'funded' | 'self-funded';
  culturalProtocols: string[];
}

interface CommunityEvent {
  id: string;
  title: string;
  teReoTitle: string;
  type:
    | 'cultural-workshop'
    | 'community-gathering'
    | 'educational-session'
    | 'celebration'
    | 'ceremony';
  date: Date;
  location: string;
  facilitator: string;
  participants: number;
  maxParticipants: number;
  culturalSignificance: string;
  description: string;
  culturalElements: string[];
  registrationRequired: boolean;
  culturalProtocols: string[];
}

interface CulturalKnowledge {
  id: string;
  title: string;
  teReoTitle: string;
  category:
    | 'traditional-knowledge'
    | 'cultural-practices'
    | 'historical-stories'
    | 'environmental-wisdom'
    | 'artistic-traditions';
  sharedBy: string;
  culturalValue: number;
  accessibility: 'public' | 'community' | 'restricted';
  verificationStatus: 'verified' | 'pending' | 'unverified';
  culturalProtocols: string[];
  relatedTopics: string[];
  culturalSignificance: string;
}

const CommunityFeatures: React.FC = () => {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [projects, setProjects] = useState<CulturalProject[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [knowledge, setKnowledge] = useState<CulturalKnowledge[]>([]);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'members' | 'projects' | 'events' | 'knowledge'
  >('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading community data
    const mockMembers: CommunityMember[] = [
      {
        id: '1',
        name: 'Kaumātua Hone Smith',
        role: 'kaumātua',
        iwi: 'Ngāti Porou',
        culturalExpertise: [
          'Whakapapa',
          'Traditional Stories',
          'Cultural Protocols',
          'Marae Tikanga',
        ],
        contributionLevel: 98,
        culturalImpact: 95,
        lastActive: new Date(),
        achievements: ['Cultural Guardian', 'Storyteller', 'Community Leader'],
        culturalProjects: ['Whakapapa Database', 'Traditional Story Collection'],
        mentoringStudents: 15,
        culturalKnowledge: 98,
      },
      {
        id: '2',
        name: 'Whaea Aroha Johnson',
        role: 'teacher',
        iwi: 'Tainui',
        culturalExpertise: ['Te Reo Māori', 'Cultural Education', 'Student Mentoring'],
        contributionLevel: 92,
        culturalImpact: 88,
        lastActive: new Date(),
        achievements: ['Te Reo Excellence', 'Cultural Educator', 'Student Mentor'],
        culturalProjects: ['Te Reo Immersion Program', 'Cultural Learning Modules'],
        mentoringStudents: 25,
        culturalKnowledge: 85,
      },
      {
        id: '3',
        name: 'Kai Williams',
        role: 'student',
        iwi: 'Te Arawa',
        culturalExpertise: ['Kapa Haka', 'Traditional Arts', 'Cultural Performance'],
        contributionLevel: 78,
        culturalImpact: 82,
        lastActive: new Date(),
        achievements: ['Kapa Haka Leader', 'Cultural Artist', 'Community Performer'],
        culturalProjects: ['Youth Kapa Haka Group', 'Cultural Arts Workshop'],
        mentoringStudents: 8,
        culturalKnowledge: 75,
      },
      {
        id: '4',
        name: 'Mana Cooper',
        role: 'community-leader',
        iwi: 'Ngāpuhi',
        culturalExpertise: ['Community Development', 'Cultural Events', 'Youth Leadership'],
        contributionLevel: 85,
        culturalImpact: 90,
        lastActive: new Date(Date.now() - 86400000),
        achievements: ['Community Leader', 'Event Organizer', 'Youth Mentor'],
        culturalProjects: ['Community Cultural Center', 'Youth Leadership Program'],
        mentoringStudents: 12,
        culturalKnowledge: 80,
      },
      {
        id: '5',
        name: 'Hine Brown',
        role: 'cultural-expert',
        iwi: 'Ngāti Kahungunu',
        culturalExpertise: ['Traditional Weaving', 'Cultural Arts', 'Environmental Knowledge'],
        contributionLevel: 88,
        culturalImpact: 92,
        lastActive: new Date(),
        achievements: ['Master Weaver', 'Cultural Artist', 'Environmental Guardian'],
        culturalProjects: ['Weaving Workshop Series', 'Environmental Cultural Program'],
        mentoringStudents: 18,
        culturalKnowledge: 90,
      },
    ];

    const mockProjects: CulturalProject[] = [
      {
        id: '1',
        title: 'Whakapapa Digital Archive',
        teReoTitle: 'Te Whakapapa Matihiko',
        description:
          'Creating a comprehensive digital archive of whakapapa and genealogical information for future generations.',
        category: 'cultural-preservation',
        status: 'active',
        participants: 45,
        culturalImpact: 95,
        startDate: new Date('2024-01-01'),
        facilitator: 'Kaumātua Hone Smith',
        culturalElements: ['Whakapapa', 'Genealogy', 'Family History', 'Cultural Identity'],
        communitySupport: 92,
        fundingStatus: 'funded',
        culturalProtocols: [
          'Sacred Knowledge Protocols',
          'Cultural Permission',
          'Ancestral Respect',
        ],
      },
      {
        id: '2',
        title: 'Te Reo Māori Immersion Program',
        teReoTitle: 'Te Kaupapa Reo Māori',
        description: 'Intensive Te Reo Māori learning program for community members of all ages.',
        category: 'educational',
        status: 'active',
        participants: 78,
        culturalImpact: 88,
        startDate: new Date('2024-02-01'),
        facilitator: 'Whaea Aroha Johnson',
        culturalElements: ['Te Reo Māori', 'Cultural Context', 'Language Revitalization'],
        communitySupport: 95,
        fundingStatus: 'funded',
        culturalProtocols: ['Language Respect', 'Cultural Sensitivity', 'Traditional Learning'],
      },
      {
        id: '3',
        title: 'Youth Cultural Leadership',
        teReoTitle: 'Te Rangatiratanga o Ngā Rangatahi',
        description:
          'Developing young cultural leaders through mentorship and community engagement.',
        category: 'community-engagement',
        status: 'active',
        participants: 32,
        culturalImpact: 85,
        startDate: new Date('2024-03-01'),
        facilitator: 'Mana Cooper',
        culturalElements: ['Leadership', 'Cultural Values', 'Community Service'],
        communitySupport: 88,
        fundingStatus: 'seeking',
        culturalProtocols: ['Mentorship Protocols', 'Cultural Leadership', 'Community Service'],
      },
      {
        id: '4',
        title: 'Traditional Arts Revival',
        teReoTitle: 'Te Whakaora o Ngā Toi Tuku Iho',
        description:
          'Reviving and teaching traditional Māori arts including weaving, carving, and traditional patterns.',
        category: 'artistic',
        status: 'planning',
        participants: 25,
        culturalImpact: 90,
        startDate: new Date('2024-06-01'),
        facilitator: 'Hine Brown',
        culturalElements: [
          'Traditional Weaving',
          'Carving',
          'Cultural Patterns',
          'Artistic Heritage',
        ],
        communitySupport: 85,
        fundingStatus: 'seeking',
        culturalProtocols: ['Artistic Traditions', 'Cultural Permission', 'Traditional Techniques'],
      },
      {
        id: '5',
        title: 'Environmental Kaitiakitanga',
        teReoTitle: 'Te Kaitiakitanga o Te Taiao',
        description:
          'Community environmental stewardship program based on traditional Māori knowledge.',
        category: 'environmental',
        status: 'active',
        participants: 56,
        culturalImpact: 87,
        startDate: new Date('2024-01-15'),
        facilitator: 'Kai Williams',
        culturalElements: ['Environmental Care', 'Traditional Knowledge', 'Sustainability'],
        communitySupport: 90,
        fundingStatus: 'funded',
        culturalProtocols: [
          'Environmental Respect',
          'Traditional Knowledge',
          'Sustainable Practices',
        ],
      },
    ];

    const mockEvents: CommunityEvent[] = [
      {
        id: '1',
        title: 'Cultural Storytelling Evening',
        teReoTitle: 'Te Kōrero Ahurea',
        type: 'cultural-workshop',
        date: new Date(Date.now() + 86400000 * 7),
        location: 'Community Cultural Center',
        facilitator: 'Kaumātua Hone Smith',
        participants: 45,
        maxParticipants: 60,
        culturalSignificance:
          'Sharing traditional stories and cultural knowledge with the community.',
        description:
          'An evening of traditional Māori storytelling, sharing cultural knowledge and wisdom.',
        culturalElements: ['Traditional Stories', 'Cultural Knowledge', 'Community Sharing'],
        registrationRequired: true,
        culturalProtocols: [
          'Storytelling Protocols',
          'Cultural Respect',
          'Community Participation',
        ],
      },
      {
        id: '2',
        title: 'Te Reo Māori Workshop',
        teReoTitle: 'Te Akoranga Reo Māori',
        type: 'educational-session',
        date: new Date(Date.now() + 86400000 * 3),
        location: 'Language Learning Center',
        facilitator: 'Whaea Aroha Johnson',
        participants: 35,
        maxParticipants: 40,
        culturalSignificance:
          'Supporting Te Reo Māori revitalization and cultural language learning.',
        description: 'Interactive Te Reo Māori workshop for all skill levels.',
        culturalElements: ['Te Reo Māori', 'Language Learning', 'Cultural Context'],
        registrationRequired: true,
        culturalProtocols: ['Language Respect', 'Cultural Sensitivity', 'Learning Protocols'],
      },
      {
        id: '3',
        title: 'Community Cultural Celebration',
        teReoTitle: 'Te Whakanui Ahurea',
        type: 'celebration',
        date: new Date(Date.now() + 86400000 * 14),
        location: 'Marae Grounds',
        facilitator: 'Mana Cooper',
        participants: 120,
        maxParticipants: 200,
        culturalSignificance: 'Celebrating our cultural heritage and community unity.',
        description:
          'Annual community celebration featuring kapa haka, traditional food, and cultural activities.',
        culturalElements: [
          'Kapa Haka',
          'Traditional Food',
          'Cultural Activities',
          'Community Unity',
        ],
        registrationRequired: false,
        culturalProtocols: ['Marae Protocols', 'Cultural Celebration', 'Community Unity'],
      },
      {
        id: '4',
        title: 'Traditional Weaving Workshop',
        teReoTitle: 'Te Akoranga Raranga',
        type: 'cultural-workshop',
        date: new Date(Date.now() + 86400000 * 10),
        location: 'Arts and Crafts Center',
        facilitator: 'Hine Brown',
        participants: 20,
        maxParticipants: 25,
        culturalSignificance:
          'Preserving and teaching traditional weaving techniques and cultural knowledge.',
        description: 'Hands-on workshop learning traditional Māori weaving techniques.',
        culturalElements: ['Traditional Weaving', 'Cultural Techniques', 'Artistic Heritage'],
        registrationRequired: true,
        culturalProtocols: ['Artistic Traditions', 'Cultural Permission', 'Traditional Techniques'],
      },
      {
        id: '5',
        title: 'Environmental Kaitiakitanga Day',
        teReoTitle: 'Te Rā Kaitiakitanga',
        type: 'community-gathering',
        date: new Date(Date.now() + 86400000 * 5),
        location: 'Local Reserve',
        facilitator: 'Kai Williams',
        participants: 65,
        maxParticipants: 80,
        culturalSignificance:
          'Connecting with the environment through traditional Māori knowledge and practices.',
        description:
          'Community environmental care day based on traditional Māori environmental knowledge.',
        culturalElements: ['Environmental Care', 'Traditional Knowledge', 'Community Action'],
        registrationRequired: true,
        culturalProtocols: ['Environmental Respect', 'Traditional Knowledge', 'Community Action'],
      },
    ];

    const mockKnowledge: CulturalKnowledge[] = [
      {
        id: '1',
        title: 'Traditional Navigation Methods',
        teReoTitle: 'Ngā Ara Whakatere Tuku Iho',
        category: 'traditional-knowledge',
        sharedBy: 'Kaumātua Hone Smith',
        culturalValue: 95,
        accessibility: 'community',
        verificationStatus: 'verified',
        culturalProtocols: ['Sacred Knowledge', 'Cultural Permission', 'Traditional Respect'],
        relatedTopics: ['Navigation', 'Traditional Knowledge', 'Environmental Understanding'],
        culturalSignificance:
          'Traditional Māori navigation methods using stars, ocean currents, and environmental signs.',
      },
      {
        id: '2',
        title: 'Marae Protocols and Etiquette',
        teReoTitle: 'Ngā Kawa o Te Marae',
        category: 'cultural-practices',
        sharedBy: 'Whaea Aroha Johnson',
        culturalValue: 90,
        accessibility: 'public',
        verificationStatus: 'verified',
        culturalProtocols: ['Marae Protocols', 'Cultural Respect', 'Traditional Etiquette'],
        relatedTopics: ['Marae', 'Cultural Protocols', 'Traditional Etiquette'],
        culturalSignificance:
          'Essential knowledge for respectful participation in marae activities and cultural ceremonies.',
      },
      {
        id: '3',
        title: 'Traditional Medicinal Plants',
        teReoTitle: 'Ngā Rongoā Tuku Iho',
        category: 'traditional-knowledge',
        sharedBy: 'Hine Brown',
        culturalValue: 88,
        accessibility: 'restricted',
        verificationStatus: 'verified',
        culturalProtocols: ['Sacred Knowledge', 'Cultural Permission', 'Traditional Respect'],
        relatedTopics: ['Medicinal Plants', 'Traditional Medicine', 'Environmental Knowledge'],
        culturalSignificance:
          'Traditional Māori knowledge of medicinal plants and their healing properties.',
      },
      {
        id: '4',
        title: 'Whakapapa and Genealogy',
        teReoTitle: 'Te Whakapapa me Te Kāwai Tupuna',
        category: 'traditional-knowledge',
        sharedBy: 'Kaumātua Hone Smith',
        culturalValue: 92,
        accessibility: 'community',
        verificationStatus: 'verified',
        culturalProtocols: ['Sacred Knowledge', 'Cultural Permission', 'Ancestral Respect'],
        relatedTopics: ['Whakapapa', 'Genealogy', 'Family History', 'Cultural Identity'],
        culturalSignificance:
          'Understanding whakapapa and its importance in Māori culture and identity.',
      },
      {
        id: '5',
        title: 'Traditional Storytelling Techniques',
        teReoTitle: 'Ngā Tikanga Kōrero Tuku Iho',
        category: 'cultural-practices',
        sharedBy: 'Mana Cooper',
        culturalValue: 85,
        accessibility: 'public',
        verificationStatus: 'verified',
        culturalProtocols: ['Storytelling Protocols', 'Cultural Respect', 'Traditional Techniques'],
        relatedTopics: ['Storytelling', 'Cultural Practices', 'Traditional Knowledge'],
        culturalSignificance:
          'Traditional Māori storytelling techniques and their cultural importance.',
      },
    ];

    setMembers(mockMembers);
    setProjects(mockProjects);
    setEvents(mockEvents);
    setKnowledge(mockKnowledge);
    setIsLoading(false);
  }, []);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'kaumātua':
        return '👴';
      case 'teacher':
        return '👩‍🏫';
      case 'student':
        return '👨‍🎓';
      case 'community-leader':
        return '👨‍💼';
      case 'cultural-expert':
        return '🎨';
      default:
        return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'kaumātua':
        return '#8b5cf6';
      case 'teacher':
        return '#3b82f6';
      case 'student':
        return '#10b981';
      case 'community-leader':
        return '#f59e0b';
      case 'cultural-expert':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'planning':
        return '#3b82f6';
      case 'completed':
        return '#8b5cf6';
      case 'archived':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'cultural-workshop':
        return '🎭';
      case 'community-gathering':
        return '👥';
      case 'educational-session':
        return '📚';
      case 'celebration':
        return '🎉';
      case 'ceremony':
        return '🏛️';
      default:
        return '🌟';
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return '#10b981';
    if (value >= 80) return '#3b82f6';
    if (value >= 70) return '#f59e0b';
    return '#ef4444';
  };

  if (isLoading) {
    return (
      <div className="community-features">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Community Features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="community-features">
      <div className="community-header">
        <h1>🌿 Community Features - Ngā Āhuatanga Hapori</h1>
        <p>Cultural sharing, community engagement, and collaborative learning</p>
      </div>

      <div className="community-controls">
        <div className="view-selector">
          <button
            className={selectedView === 'overview' ? 'active' : ''}
            onClick={() => setSelectedView('overview')}
          >
            Overview
          </button>
          <button
            className={selectedView === 'members' ? 'active' : ''}
            onClick={() => setSelectedView('members')}
          >
            Community Members
          </button>
          <button
            className={selectedView === 'projects' ? 'active' : ''}
            onClick={() => setSelectedView('projects')}
          >
            Cultural Projects
          </button>
          <button
            className={selectedView === 'events' ? 'active' : ''}
            onClick={() => setSelectedView('events')}
          >
            Community Events
          </button>
          <button
            className={selectedView === 'knowledge' ? 'active' : ''}
            onClick={() => setSelectedView('knowledge')}
          >
            Cultural Knowledge
          </button>
        </div>
      </div>

      {selectedView === 'overview' && (
        <div className="overview-section">
          <div className="overview-stats">
            <div className="stat-card">
              <h3>Community Members</h3>
              <span className="stat-value">{members.length}</span>
            </div>
            <div className="stat-card">
              <h3>Active Projects</h3>
              <span className="stat-value">
                {projects.filter((p) => p.status === 'active').length}
              </span>
            </div>
            <div className="stat-card">
              <h3>Upcoming Events</h3>
              <span className="stat-value">{events.filter((e) => e.date > new Date()).length}</span>
            </div>
            <div className="stat-card">
              <h3>Cultural Knowledge</h3>
              <span className="stat-value">{knowledge.length}</span>
            </div>
          </div>

          <div className="community-highlights">
            <h2>🌟 Community Highlights</h2>
            <div className="highlights-grid">
              <div className="highlight-card">
                <h4>Top Contributors</h4>
                <div className="contributors-list">
                  {members
                    .sort((a, b) => b.contributionLevel - a.contributionLevel)
                    .slice(0, 3)
                    .map((member) => (
                      <div key={member.id} className="contributor-item">
                        <span className="contributor-name">{member.name}</span>
                        <span className="contribution-level">{member.contributionLevel}%</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="highlight-card">
                <h4>Active Projects</h4>
                <div className="projects-summary">
                  {projects
                    .filter((p) => p.status === 'active')
                    .slice(0, 3)
                    .map((project) => (
                      <div key={project.id} className="project-summary">
                        <span className="project-title">{project.title}</span>
                        <span className="project-impact">{project.culturalImpact}% Impact</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="highlight-card">
                <h4>Upcoming Events</h4>
                <div className="events-summary">
                  {events
                    .filter((e) => e.date > new Date())
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 3)
                    .map((event) => (
                      <div key={event.id} className="event-summary">
                        <span className="event-title">{event.title}</span>
                        <span className="event-date">{event.date.toLocaleDateString()}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'members' && (
        <div className="members-section">
          <h2>👥 Community Members</h2>
          <div className="members-grid">
            {members.map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-header">
                  <span className="role-icon">{getRoleIcon(member.role)}</span>
                  <h3>{member.name}</h3>
                  <span
                    className="role-badge"
                    style={{ backgroundColor: getRoleColor(member.role) }}
                  >
                    {member.role.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="member-details">
                  <div className="detail-row">
                    <span>Iwi:</span>
                    <span>{member.iwi}</span>
                  </div>
                  <div className="detail-row">
                    <span>Contribution Level:</span>
                    <span style={{ color: getProgressColor(member.contributionLevel) }}>
                      {member.contributionLevel}%
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Cultural Impact:</span>
                    <span style={{ color: getProgressColor(member.culturalImpact) }}>
                      {member.culturalImpact}%
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Mentoring Students:</span>
                    <span>{member.mentoringStudents}</span>
                  </div>
                  <div className="detail-row">
                    <span>Cultural Knowledge:</span>
                    <span style={{ color: getProgressColor(member.culturalKnowledge) }}>
                      {member.culturalKnowledge}%
                    </span>
                  </div>
                </div>

                <div className="member-expertise">
                  <h4>Cultural Expertise:</h4>
                  <div className="expertise-tags">
                    {member.culturalExpertise.map((expertise) => (
                      <span key={expertise} className="expertise-tag">
                        {expertise}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="member-achievements">
                  <h4>Achievements:</h4>
                  <div className="achievements-tags">
                    {member.achievements.map((achievement) => (
                      <span key={achievement} className="achievement-tag">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="member-projects">
                  <h4>Cultural Projects:</h4>
                  <div className="projects-tags">
                    {member.culturalProjects.map((project) => (
                      <span key={project} className="project-tag">
                        {project}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="member-activity">
                  <span>Last active: {member.lastActive.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'projects' && (
        <div className="projects-section">
          <h2>🏗️ Cultural Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="te-reo-title">{project.teReoTitle}</span>
                  <div className="project-badges">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getProjectStatusColor(project.status) }}
                    >
                      {project.status.toUpperCase()}
                    </span>
                    <span className="category-badge">
                      {project.category.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="project-content">
                  <p className="project-description">{project.description}</p>

                  <div className="project-metrics">
                    <div className="metric-row">
                      <span>Participants:</span>
                      <span>{project.participants}</span>
                    </div>
                    <div className="metric-row">
                      <span>Cultural Impact:</span>
                      <span style={{ color: getProgressColor(project.culturalImpact) }}>
                        {project.culturalImpact}%
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>Community Support:</span>
                      <span style={{ color: getProgressColor(project.communitySupport) }}>
                        {project.communitySupport}%
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>Funding Status:</span>
                      <span className={`funding-status ${project.fundingStatus}`}>
                        {project.fundingStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="project-details">
                    <div className="detail-section">
                      <h4>Cultural Elements:</h4>
                      <div className="cultural-elements">
                        {project.culturalElements.map((element) => (
                          <span key={element} className="cultural-element-tag">
                            {element}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Cultural Protocols:</h4>
                      <div className="cultural-protocols">
                        {project.culturalProtocols.map((protocol) => (
                          <span key={protocol} className="protocol-tag">
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="project-info">
                    <div className="info-row">
                      <span>Facilitator:</span>
                      <span>{project.facilitator}</span>
                    </div>
                    <div className="info-row">
                      <span>Start Date:</span>
                      <span>{project.startDate.toLocaleDateString()}</span>
                    </div>
                    {project.endDate && (
                      <div className="info-row">
                        <span>End Date:</span>
                        <span>{project.endDate.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="project-actions">
                    <button className="action-btn primary">Join Project</button>
                    <button className="action-btn secondary">View Details</button>
                    <button className="action-btn secondary">Support Project</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'events' && (
        <div className="events-section">
          <h2>📅 Community Events</h2>
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <span className="event-icon">{getEventTypeIcon(event.type)}</span>
                  <h3>{event.title}</h3>
                  <span className="te-reo-title">{event.teReoTitle}</span>
                  <span className="event-type">{event.type.replace('-', ' ').toUpperCase()}</span>
                </div>

                <div className="event-content">
                  <p className="event-description">{event.description}</p>

                  <div className="event-details">
                    <div className="detail-row">
                      <span>Date:</span>
                      <span>{event.date.toLocaleDateString()}</span>
                    </div>
                    <div className="detail-row">
                      <span>Location:</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="detail-row">
                      <span>Facilitator:</span>
                      <span>{event.facilitator}</span>
                    </div>
                    <div className="detail-row">
                      <span>Participants:</span>
                      <span>
                        {event.participants}/{event.maxParticipants}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span>Registration:</span>
                      <span className={event.registrationRequired ? 'required' : 'not-required'}>
                        {event.registrationRequired ? 'Required' : 'Not Required'}
                      </span>
                    </div>
                  </div>

                  <div className="event-cultural">
                    <h4>Cultural Significance:</h4>
                    <p className="cultural-significance">{event.culturalSignificance}</p>

                    <h4>Cultural Elements:</h4>
                    <div className="cultural-elements">
                      {event.culturalElements.map((element) => (
                        <span key={element} className="cultural-element-tag">
                          {element}
                        </span>
                      ))}
                    </div>

                    <h4>Cultural Protocols:</h4>
                    <div className="cultural-protocols">
                      {event.culturalProtocols.map((protocol) => (
                        <span key={protocol} className="protocol-tag">
                          {protocol}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="event-actions">
                    <button className="action-btn primary">Register</button>
                    <button className="action-btn secondary">View Details</button>
                    <button className="action-btn secondary">Share Event</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'knowledge' && (
        <div className="knowledge-section">
          <h2>📚 Cultural Knowledge</h2>
          <div className="knowledge-grid">
            {knowledge.map((item) => (
              <div key={item.id} className="knowledge-card">
                <div className="knowledge-header">
                  <h3>{item.title}</h3>
                  <span className="te-reo-title">{item.teReoTitle}</span>
                  <div className="knowledge-badges">
                    <span className="category-badge">
                      {item.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`accessibility-badge ${item.accessibility}`}>
                      {item.accessibility.toUpperCase()}
                    </span>
                    <span className={`verification-badge ${item.verificationStatus}`}>
                      {item.verificationStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="knowledge-content">
                  <div className="knowledge-metrics">
                    <div className="metric-row">
                      <span>Cultural Value:</span>
                      <span style={{ color: getProgressColor(item.culturalValue) }}>
                        {item.culturalValue}%
                      </span>
                    </div>
                    <div className="metric-row">
                      <span>Shared By:</span>
                      <span>{item.sharedBy}</span>
                    </div>
                  </div>

                  <div className="knowledge-details">
                    <h4>Cultural Significance:</h4>
                    <p className="cultural-significance">{item.culturalSignificance}</p>

                    <h4>Related Topics:</h4>
                    <div className="related-topics">
                      {item.relatedTopics.map((topic) => (
                        <span key={topic} className="topic-tag">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <h4>Cultural Protocols:</h4>
                    <div className="cultural-protocols">
                      {item.culturalProtocols.map((protocol) => (
                        <span key={protocol} className="protocol-tag">
                          {protocol}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="knowledge-actions">
                    <button className="action-btn primary">Access Knowledge</button>
                    <button className="action-btn secondary">Learn More</button>
                    <button className="action-btn secondary">Share Knowledge</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFeatures;
