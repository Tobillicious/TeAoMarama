import { BookOpen, Clock, Download, Heart, Share2, Star, Target, Users } from 'lucide-react';
import React from 'react';

interface MāoriFocusedResourceDisplayProps {
  resource: unknown;
  onClose: () => void;
}

const MāoriFocusedResourceDisplay: React.FC<MāoriFocusedResourceDisplayProps> = ({
  resource,
  onClose,
}) => {
  // Parse the enriched content properly
  const parseResourceContent = (content: string) => {
    try {
      // If it's JSON, parse it
      if (content.startsWith('{')) {
        return JSON.parse(content);
      }
      // If it's markdown, return as is
      return { content };
    } catch {
      return { content };
    }
  };

  const parsedContent = parseResourceContent(resource.content || '');

  // Format content for Māori ākonga
  const formatContentForMāoriĀkonga = (content: unknown) => {
    if (typeof content === 'string') {
      return content;
    }

    if (content.learningObjectives && content.activities) {
      return {
        title: content.title || resource.title,
        culturalContext:
          content.culturalContext ||
          'He ako ā-tangata, he ako ā-wairua - Learning that connects mind, body, and spirit',
        learningObjectives: content.learningObjectives || [],
        activities: content.activities || [],
        resources: content.resources || [],
        assessment: content.assessment || {},
        nzcAlignment: content.nzcAlignment || [],
        enrichedBy: content.enrichedBy || 'Aronui',
        enrichedAt: content.enrichedAt || new Date().toISOString(),
      };
    }

    return content;
  };

  const formattedContent = formatContentForMāoriĀkonga(parsedContent);

  // Get cultural context color
  const getCulturalContextColor = (context: string) => {
    if (context.includes('Ngāti Kahungunu') || context.includes('Mangakōtukutuku')) {
      return '#059669'; // Green for local context
    }
    if (context.includes('Te Reo Māori') || context.includes('tikanga')) {
      return '#7c3aed'; // Purple for cultural protocols
    }
    if (context.includes('kaitiakitanga') || context.includes('environmental')) {
      return '#0891b2'; // Blue for environmental stewardship
    }
    return '#6b7280'; // Default gray
  };

  return (
    <div
      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '1000px',
          maxHeight: '90vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header */}
        <div
          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
            padding: '24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          }}
        >
          <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ flex: 1 }}>
            <h1
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                fontSize: '1.875rem',
                fontWeight: '700',
                color: '#1e293b',
                margin: '0 0 8px 0',
                lineHeight: '1.2',
              }}
            >
              {formattedContent.title || resource.title}
            </h1>
            <div
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}
            >
              <span
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <BookOpen size={14} />
                {resource.subject}
              </span>
              <span
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                {resource.yearLevel}
              </span>
              <span
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  background: '#f59e0b',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Clock size={14} />
                45-60 min
              </span>
            </div>
            {formattedContent.culturalContext && (
              <div
                style={{
                  background: getCulturalContextColor(formattedContent.culturalContext) + '15',
                  border: `1px solid ${getCulturalContextColor(
                    formattedContent.culturalContext,
                  )}30`,
                  borderRadius: '12px',
                  padding: '16px',
                  marginTop: '12px',
                }}
              >
                <h3
                  /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: getCulturalContextColor(formattedContent.culturalContext),
                    margin: '0 0 8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Star size={16} />
                  He Ako ā-Tangata, He Ako ā-Wairua
                </h3>
                <p
                  /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                    fontSize: '0.95rem',
                    color: '#374151',
                    margin: '0',
                    lineHeight: '1.6',
                  }}
                >
                  {formattedContent.culturalContext}
                </p>
              </div>
            )}
          </div>
          <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
            <button
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Download Resource"
            >
              <Download size={18} color="#6b7280" />
            </button>
            <button
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Share Resource"
            >
              <Share2 size={18} color="#6b7280" />
            </button>
            <button
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Save to Favorites"
            >
              <Heart size={18} color="#6b7280" />
            </button>
            <button
              onClick={onClose}
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
          }}
        >
          {/* Learning Objectives */}
          {formattedContent.learningObjectives &&
            formattedContent.learningObjectives.length > 0 && (
              <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '32px' }}>
                <h2
                  /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 16px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Target size={20} />
                  Ngā Whāinga Ako - Learning Objectives
                </h2>
                <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {formattedContent.learningObjectives.map((objective: string, index: number) => (
                    <div
                      key={index}
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <div
                        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                          background: '#3b82f6',
                          color: 'white',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </div>
                      <p
                        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                          margin: '0',
                          fontSize: '1rem',
                          color: '#374151',
                          lineHeight: '1.6',
                        }}
                      >
                        {objective}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Activities */}
          {formattedContent.activities && formattedContent.activities.length > 0 && (
            <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '32px' }}>
              <h2
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Users size={20} />
                Ngā Mahi - Activities
              </h2>
              <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {formattedContent.activities.map((activity: unknown, index: number) => (
                  <div
                    key={index}
                    /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '20px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <h3
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {activity.title || `Activity ${index + 1}`}
                    </h3>
                    <p
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                        margin: '0',
                        fontSize: '1rem',
                        color: '#374151',
                        lineHeight: '1.6',
                      }}
                    >
                      {activity.description || activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {formattedContent.resources && formattedContent.resources.length > 0 && (
            <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '32px' }}>
              <h2
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <BookOpen size={20} />
                Ngā Rauemi - Resources
              </h2>
              <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formattedContent.resources.map((resource: string, index: number) => (
                  <div
                    key={index}
                    /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        flexShrink: 0,
                      }}
                    >
                      •
                    </div>
                    <span
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                        fontSize: '0.95rem',
                        color: '#374151',
                        lineHeight: '1.5',
                      }}
                    >
                      {resource}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assessment */}
          {formattedContent.assessment && Object.keys(formattedContent.assessment).length > 0 && (
            <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '32px' }}>
              <h2
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Target size={20} />
                Aromatawai - Assessment
              </h2>
              <div
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  background: '#fef3c7',
                  border: '1px solid #f59e0b',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                {formattedContent.assessment.type && (
                  <h3
                    /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#92400e',
                      margin: '0 0 12px 0',
                    }}
                  >
                    Type: {formattedContent.assessment.type}
                  </h3>
                )}
                {formattedContent.assessment.tasks && (
                  <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formattedContent.assessment.tasks.map((task: string, index: number) => (
                      <div
                        key={index}
                        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                          background: 'white',
                          border: '1px solid #f59e0b',
                          borderRadius: '8px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                        }}
                      >
                        <span
                          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                            color: '#92400e',
                            fontWeight: '600',
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}.
                        </span>
                        <span
                          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                            fontSize: '0.95rem',
                            color: '#374151',
                            lineHeight: '1.5',
                          }}
                        >
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NZC Alignment */}
          {formattedContent.nzcAlignment && formattedContent.nzcAlignment.length > 0 && (
            <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '32px' }}>
              <h2
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  margin: '0 0 16px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Star size={20} />
                NZC Alignment - Te Mātaiaho
              </h2>
              <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {formattedContent.nzcAlignment.map((alignment: string, index: number) => (
                  <div
                    key={index}
                    /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                      background: '#ecfdf5',
                      border: '1px solid #10b981',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>
                    <span
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                        fontSize: '0.95rem',
                        color: '#374151',
                        lineHeight: '1.5',
                      }}
                    >
                      {alignment}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enrichment Info */}
          {formattedContent.enrichedBy && (
            <div
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                background: '#f0f9ff',
                border: '1px solid #0ea5e9',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '24px',
              }}
            >
              <p
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                  margin: '0',
                  fontSize: '0.875rem',
                  color: '#0369a1',
                  textAlign: 'center',
                }}
              >
                ✨ Enhanced by {formattedContent.enrichedBy} •{' '}
                {new Date(formattedContent.enrichedAt).toLocaleDateString('en-NZ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MāoriFocusedResourceDisplay;
