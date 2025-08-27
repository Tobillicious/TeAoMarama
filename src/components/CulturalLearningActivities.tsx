import React, { useState } from 'react';
import './CulturalLearningActivities.css';

interface CulturalActivity {
  id: string;
  title: string;
  description: string;
  category: 'Te Reo' | 'Arts' | 'History' | 'Science' | 'Environment';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  participants: number;
  culturalElements: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  date: Date;
  location: string;
  instructor: string;
}

const CulturalLearningActivities: React.FC = () => {
  const [activities, setActivities] = useState<CulturalActivity[]>([
    {
      id: '1',
      title: 'Te Reo Māori Immersion Workshop',
      description:
        'An intensive workshop focusing on conversational Te Reo Māori with cultural context and traditional stories.',
      category: 'Te Reo',
      difficulty: 'Intermediate',
      duration: 120,
      participants: 15,
      culturalElements: ['Whakapapa', 'Kōrero', 'Waiata'],
      status: 'upcoming',
      date: new Date(Date.now() + 86400000 * 3),
      location: 'Marae Hall',
      instructor: 'Whaea Hine',
    },
    {
      id: '2',
      title: 'Traditional Weaving Workshop',
      description:
        'Learn the art of harakeke weaving, creating traditional Māori baskets and decorative items.',
      category: 'Arts',
      difficulty: 'Beginner',
      duration: 180,
      participants: 12,
      culturalElements: ['Raranga', 'Harakeke', 'Tikanga'],
      status: 'ongoing',
      date: new Date(),
      location: 'Arts Studio',
      instructor: 'Kuia Mārama',
    },
    {
      id: '3',
      title: 'Māori Astronomy and Navigation',
      description:
        'Explore traditional Māori knowledge of the stars, navigation, and seasonal cycles.',
      category: 'Science',
      difficulty: 'Advanced',
      duration: 90,
      participants: 20,
      culturalElements: ['Matariki', 'Navigation', 'Astronomy'],
      status: 'upcoming',
      date: new Date(Date.now() + 86400000 * 7),
      location: 'Observatory',
      instructor: 'Dr. Tāne',
    },
    {
      id: '4',
      title: 'Kaitiakitanga: Environmental Guardianship',
      description: 'Learn about traditional Māori environmental practices and modern conservation.',
      category: 'Environment',
      difficulty: 'Intermediate',
      duration: 150,
      participants: 18,
      culturalElements: ['Kaitiakitanga', 'Conservation', 'Sustainability'],
      status: 'upcoming',
      date: new Date(Date.now() + 86400000 * 5),
      location: 'Native Forest',
      instructor: 'Koro Wiremu',
    },
    {
      id: '5',
      title: 'Traditional Māori Medicine',
      description:
        'Discover the healing properties of native plants and traditional rongoā practices.',
      category: 'Science',
      difficulty: 'Intermediate',
      duration: 120,
      participants: 10,
      culturalElements: ['Rongoā', 'Botany', 'Healing'],
      status: 'completed',
      date: new Date(Date.now() - 86400000 * 2),
      location: 'Botanical Garden',
      instructor: 'Tohunga Rongoā',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || activity.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Te Reo':
        return '#667eea';
      case 'Arts':
        return '#f093fb';
      case 'History':
        return '#f5576c';
      case 'Science':
        return '#4facfe';
      case 'Environment':
        return '#43e97b';
      default:
        return '#667eea';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#10b981';
      case 'Intermediate':
        return '#f59e0b';
      case 'Advanced':
        return '#ef4444';
      default:
        return '#10b981';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#3b82f6';
      case 'ongoing':
        return '#10b981';
      case 'completed':
        return '#6b7280';
      default:
        return '#3b82f6';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-NZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const joinActivity = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId
          ? { ...activity, participants: activity.participants + 1 }
          : activity,
      ),
    );
  };

  return (
    <div className="cultural-learning-activities">
      <div className="activities-header">
        <h1>🌿 Cultural Learning Activities</h1>
        <p>Connect with Māori culture through hands-on learning experiences</p>
      </div>

      <div className="activities-filters">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            <option value="Te Reo">Te Reo Māori</option>
            <option value="Arts">Arts & Crafts</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
            <option value="Environment">Environment</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
            aria-label="Filter by difficulty level"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="activities-grid">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="activity-header">
              <div
                className="activity-category"
                style={{ backgroundColor: getCategoryColor(activity.category) }}
              >
                {activity.category}
              </div>
              <div
                className="activity-status"
                style={{ backgroundColor: getStatusColor(activity.status) }}
              >
                {activity.status}
              </div>
            </div>

            <div className="activity-content">
              <h3>{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>

              <div className="activity-meta">
                <div className="meta-item">
                  <span className="meta-label">Difficulty:</span>
                  <span
                    className="meta-value difficulty"
                    style={{ color: getDifficultyColor(activity.difficulty) }}
                  >
                    {activity.difficulty}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Duration:</span>
                  <span className="meta-value">{activity.duration} minutes</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Participants:</span>
                  <span className="meta-value">{activity.participants}/20</span>
                </div>
              </div>

              <div className="activity-cultural-elements">
                <h4>Cultural Elements:</h4>
                <div className="cultural-tags">
                  {activity.culturalElements.map((element) => (
                    <span key={element} className="cultural-tag">
                      {element}
                    </span>
                  ))}
                </div>
              </div>

              <div className="activity-details">
                <div className="detail-item">
                  <span className="detail-label">📅 Date:</span>
                  <span className="detail-value">{formatDate(activity.date)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📍 Location:</span>
                  <span className="detail-value">{activity.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">👨‍🏫 Instructor:</span>
                  <span className="detail-value">{activity.instructor}</span>
                </div>
              </div>
            </div>

            <div className="activity-actions">
              {activity.status === 'upcoming' && (
                <button
                  className="join-btn"
                  onClick={() => joinActivity(activity.id)}
                  disabled={activity.participants >= 20}
                >
                  {activity.participants >= 20 ? 'Full' : 'Join Activity'}
                </button>
              )}
              {activity.status === 'ongoing' && <button className="view-btn">View Progress</button>}
              {activity.status === 'completed' && (
                <button className="review-btn">View Summary</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="no-activities">
          <h3>No activities found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default CulturalLearningActivities;
