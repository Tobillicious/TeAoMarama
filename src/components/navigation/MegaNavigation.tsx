import React, { useState, useMemo } from 'react'
import {Link} from 'react-router-dom'

interface NavigationCategory {,
id: string,
name: string,
icon: string,
components: {,
path: string,
name: string,
description: string
    culturalContext?: string
    yearLevel?: string
    subject?: string}[]
}
interface MegaNavigationProps {className?: string}
const MegaNavigation: React.FC<MegaNavigationProps> = (_{ className = '' }) => {
const [activeCategory, setActiveCategory] = useState<string>('cultural')
  const [searchQuery, setSearchQuery] = useState('')

const navigationData: NavigationCategory[] = useMemo_(() => [
    {,
id: 'cultural',,
name: 'Cultural Knowledge',,
icon: '🌿',,
components: [
        {,
path: '/whakatauki-wisdom',,
name: 'Whakataukī Wisdom',,
description: 'Traditional Māori proverbs with cultural context',,
culturalContext: 'Traditional knowledge and cultural wisdom',,
yearLevel: 'Year 7-10',,
subject: 'Te Reo Māori, Social Studies'
        },
        {,
path: '/cultural-celebrations-comparison',,
name: 'Cultural Celebrations',,
description: 'Cross-cultural understanding and celebration analysis',,
culturalContext: 'Cultural diversity and understanding',,
yearLevel: 'Year 7-9',,
subject: 'Social Studies, Cultural Studies'
        },
        {,
path: '/cultural-decision-making-traditions',,
name: 'Cultural Decision Making',,
description: 'Traditional governance and decision-making processes',,
culturalContext: 'Traditional leadership and governance',,
yearLevel: 'Year 8-10',,
subject: 'Social Studies, Civics'
        },
        {,
path: '/cultural-heroes-comprehension',,
name: 'Cultural Heroes',,
description: 'Reading comprehension with cultural heroes',,
culturalContext: 'Cultural role models and leadership',,
yearLevel: 'Year 7-8',,
subject: 'English, Social Studies'
        },
        {,
path: '/cultural-identity-deep-dive-comprehension',,
name: 'Cultural Identity Deep Dive',,
description: 'Identity exploration and cultural understanding',,
culturalContext: 'Cultural identity and belonging',,
yearLevel: 'Year 8-10',,
subject: 'English, Social Studies'
        }
      ]
    },
    {,
id: 'mathematics',,
name: 'Mathematics & Culture',,
icon: '🔢',,
components: [
        {,
path: '/whakapapa-mathematical-thinking',,
name: 'Whakapapa Mathematical Thinking',,
description: 'Genealogy, networks & exponential growth with cultural context',,
culturalContext: 'Mathematical concepts in cultural context',,
yearLevel: 'Year 9-10',,
subject: 'Mathematics, Social Studies'
        },
        {,
path: '/maori-geometric-patterns-handout',,
name: 'Māori Geometric Patterns',,
description: 'Mathematics with traditional patterns and design',,
culturalContext: 'Traditional patterns and mathematical thinking',,
yearLevel: 'Year 7-9',,
subject: 'Mathematics, Arts'
        },
        {,
path: '/mountain-navigation-trigonometry',,
name: 'Mountain Navigation Trigonometry',,
description: 'Mathematical navigation concepts',,
culturalContext: 'Traditional navigation and mathematics',,
yearLevel: 'Year 9-10',,
subject: 'Mathematics, Geography'
        },
        {,
path: '/star-navigation-coordinates',,
name: 'Star Navigation Coordinates',,
description: 'Astronomy and coordinate systems with cultural context',,
culturalContext: 'Traditional navigation and astronomy',,
yearLevel: 'Year 8-10',,
subject: 'Mathematics, Science'
        }
      ]
    },
    {,
id: 'environment',,
name: 'Environmental Science',,
icon: '🌊',,
components: [
        {,
path: '/microplastics-matauranga-integration',,
name: 'Microplastics & Mātauranga',,
description: 'Ocean health through traditional and modern science',,
culturalContext: 'Environmental guardianship and kaitiakitanga',,
yearLevel: 'Year 9-10',,
subject: 'Science, Environmental Studies'
        },
        {,
path: '/climate-science-traditional-knowledge',,
name: 'Climate Science & Traditional Knowledge',,
description: 'Two ways of understanding environmental change',,
culturalContext: 'Environmental stewardship and climate action',,
yearLevel: 'Year 9-10',,
subject: 'Science, Social Studies'
        },
        {,
path: '/kaitiakitanga-field-journal',,
name: 'Kaitiakitanga Field Journal',,
description: 'Environmental guardianship and field studies',,
culturalContext: 'Environmental guardianship and stewardship',,
yearLevel: 'Year 7-9',,
subject: 'Science, Environmental Studies'
        },
        {,
path: '/kaitiakitanga-kids',,
name: 'Kaitiakitanga for Kids',,
description: 'Environmental stewardship for young learners',,
culturalContext: 'Environmental education and responsibility',,
yearLevel: 'Year 5-7',,
subject: 'Science, Environmental Studies'
        }
      ]
    },
    {,
id: 'navigation',,
name: 'Traditional Navigation',,
icon: '🧭',,
components: [
        {,
path: '/maori-astronomy-navigation',,
name: 'Māori Astronomy Navigation',,
description: 'Traditional navigation and astronomical knowledge',,
culturalContext: 'Traditional navigation and star knowledge',,
yearLevel: 'Year 8-10',,
subject: 'Science, Mathematics, Cultural Studies'
        },
        {,
path: '/maori-navigation-wayfinding-handout',,
name: 'Māori Wayfinding',,
description: 'Traditional wayfinding techniques and knowledge',,
culturalContext: 'Traditional navigation and ocean knowledge',,
yearLevel: 'Year 8-10',,
subject: 'Geography, Science, Cultural Studies'
        }
      ]
    },
    {,
id: 'assessment',,
name: 'Assessment & Safety',,
icon: '📋',,
components: [
        {,
path: '/cultural-stem-assessment-rubric',,
name: 'Cultural STEM Assessment',,
description: 'STEM assessment with cultural integration',,
culturalContext: 'Culturally responsive assessment',,
yearLevel: 'Year 7-10',,
subject: 'STEM, Assessment'
        },
        {,
path: '/cultural-safety-classroom-checklists-alpha',,
name: 'Cultural Safety Checklists',,
description: 'Cultural safety protocols in educational settings',,
culturalContext: 'Cultural safety and inclusive education',,
yearLevel: 'Teachers/Educators',,
subject: 'Professional Development'
        }
      ]
    },
    {,
id: 'ethics',,
name: 'Technology & Ethics',,
icon: '🤖',,
components: [
        {,
path: '/ai-ethics-and-bias',,
name: 'AI Ethics and Bias',,
description: 'Digital ethics with cultural responsibility focus',,
culturalContext: 'Technology ethics and cultural values',,
yearLevel: 'Year 9-10',,
subject: 'Technology, Ethics, Social Studies'
        }
      ]
    },
    {,
id: 'health',,
name: 'Health & Education',,
icon: '🏥',,
components: [
        {,
path: '/health-education-correlation',,
name: 'Health Education Correlation',,
description: 'Health and wellbeing in cultural context',,
culturalContext: 'Holistic health and wellbeing',,
yearLevel: 'Year 7-9',,
subject: 'Health & Physical Education'
        }
      ]
    }
  ], [])

const filteredComponents = useMemo_(() => {
if (!searchQuery) return navigationData
    
return navigationData.map(category => ({
      ...category,;,
components: category.components.filter(component =>
component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
component.subject?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.components.length > 0)
  }, [navigationData, searchQuery])

return (
    <div className={`mega-navigation ${className}`} style={{,
backgroundColor: 'var(--color-background)',,
border: '1px solid var(--color-border)',,
borderRadius: 'var(--radius-lg)',,
padding: 'var(--space-6)',,
marginBottom: 'var(--space-8)'
    }}>
      <div className="navigation-header" style={{,
marginBottom: 'var(--space-6)',,
textAlign: 'center'
      }}>
        <h2 style={{,
color: 'var(--color-primary)',,
fontSize: 'var(--text-xl)',,
marginBottom: 'var(--space-2)'
        }}>
          🌟 TeAoMarama Educational Resources
        </h2>
        <p style={{,
color: 'var(--color-text-secondary)',,
fontSize: 'var(--text-sm)'
        }}>
Explore 260+ culturally integrated educational components
        </p>
        
        <div style={{ marginTop: 'var(--space-4)' }}>
          <input
type="text"
placeholder="Search components..."
value={searchQuery}
onChange={(_e) => setSearchQuery(e.target.value)}
style={{,
width: '100%',,
maxWidth: '400px',,
padding: 'var(--space-3)',,
border: '1px solid var(--color-border)',,
borderRadius: 'var(--radius-md)',,
fontSize: 'var(--text-sm)'
            }}
          />
        </div>
      </div>

      <div className="navigation-categories" style={{,
display: 'flex',,
flexWrap: 'wrap',,
gap: 'var(--space-2)',,
justifyContent: 'center',,
marginBottom: 'var(--space-6)'
      }}>
        {navigationData.map(_category => (
          <button
key={category.id}
onClick={() => setActiveCategory(category.id)}
style={{,
padding: 'var(--space-2) var(--space-4)',,
border: '1px solid var(--color-border)',,
borderRadius: 'var(--radius-md)',,
backgroundColor: activeCategory === category.id ? 'var(--color-primary)' : 'var(--color-background)',,
color: activeCategory === category.id ? 'white' : 'var(--color-text)',,
cursor: 'pointer',,
fontSize: 'var(--text-sm)',,
display: 'flex',,
alignItems: 'center',,
gap: 'var(--space-1)'
            }}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="navigation-content">
        {filteredComponents
          .filter(category => !activeCategory || category.id === activeCategory)
          .map(category => (
            <div key={category.id} className="category-section" style={{,
marginBottom: 'var(--space-6)'
            }}>
              <h3 style={{,
color: 'var(--color-secondary)',,
fontSize: 'var(--text-lg)',,
marginBottom: 'var(--space-4)',,
display: 'flex',,
alignItems: 'center',,
gap: 'var(--space-2)'
              }}>
                <span>{category.icon}</span>
                {category.name}
              </h3>
              
              <div className="component-grid" style={{,
display: 'grid',,
gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',,
gap: 'var(--space-4)'
              }}>
                {category.components.map(component => (
                  <Link
key={component.path}
to={component.path}
style={{,
textDecoration: 'none',,
color: 'inherit'
                    }}
                  >
                    <div style={{,
padding: 'var(--space-4)',,
border: '1px solid var(--color-border)',,
borderRadius: 'var(--radius-md)',,
backgroundColor: 'var(--color-surface)',,
transition: 'all 0.2s ease',,
cursor: 'pointer'
                    }}
onMouseOver={(_e) => {
e.currentTarget.style.borderColor = 'var(--color-primary)'
                      e.currentTarget.style.backgroundColor = 'var(--color-background)'
                    }}
onMouseOut={(_e) => {
e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.backgroundColor = 'var(--color-surface)'
                    }}
                    >
                      <h4 style={{,
color: 'var(--color-primary)',,
fontSize: 'var(--text-md)',,
marginBottom: 'var(--space-2)'
                      }}>
                        {component.name}
                      </h4>
                      
                      <p style={{,
color: 'var(--color-text-secondary)',,
fontSize: 'var(--text-sm)',,
lineHeight: 1.5,,
marginBottom: 'var(--space-3)'
                      }}>
                        {component.description}
                      </p>
                      
                      <div className="component-meta" style={{,
display: 'flex',,
flexWrap: 'wrap',,
gap: 'var(--space-1)',,
fontSize: 'var(--text-xs)'
                      }}>
                        {component.yearLevel && (
                          <span style={{,
padding: 'var(--space-1) var(--space-2)',,
backgroundColor: 'var(--color-accent)',,
color: 'white',,
borderRadius: 'var(--radius-sm)',,
fontSize: 'var(--text-xs)'
                          }}>
                            {component.yearLevel}
                          </span>
                        )}
                        {component.subject && (
                          <span style={{,
padding: 'var(--space-1) var(--space-2)',,
backgroundColor: 'var(--color-secondary)',,
color: 'white',,
borderRadius: 'var(--radius-sm)',,
fontSize: 'var(--text-xs)'
                          }}>
                            {component.subject}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MegaNavigation