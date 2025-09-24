import { ArrowLeft, Award, BookOpen, Clock, Download, FileText, Globe } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { EnhancedResource } from '../utils/enhanced-resource-loader';
import { getResourceById } from '../utils/enhanced-resource-loader';
import './ActualContentViewer.css';
import './EnhancedContent.css';

const ActualContentViewer: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<EnhancedResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!resourceId) {
        setError('No resource ID provided');
        setLoading(false);
        return;
      }

      try {
        // Load the enhanced resource metadata
        const enhancedResource = await getResourceById(resourceId);
        if (!enhancedResource) {
          setError('Resource not found');
          setLoading(false);
          return;
        }
        setResource(enhancedResource);

        // We'll display the enhanced resource data directly
      } catch (err) {
        setError('Failed to load content');
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [resourceId]);

  const downloadContent = () => {
    if (!resource) return;

    const content = `# ${resource.title}
## Complete Lesson Plan - Ready for Your Classroom

**Subject:** ${resource.subject}  
**Year Level:** ${resource.yearLevel}  
**Duration:** ${resource.metadata?.estimatedDuration || 50} minutes  
**Class Size:** Up to 30 students  
**Setup Time:** 5 minutes

---

## 🎯 Learning Objectives

${
  resource.subject === 'Social Studies' && resource.yearLevel === 'Year 8'
    ? `- Students will understand the structure of New Zealand's government system including the three branches
- Students will identify the roles and responsibilities of different government officials
- Students will connect government structure to democratic principles and citizen participation
- Students will relate government systems to Te Ao Māori governance concepts with respect`
    : resource.subject === 'Social Studies' && resource.yearLevel === 'Year 12'
    ? `- Students will analyze complex political systems and their effectiveness
- Students will evaluate the role of citizens in democratic governance
- Students will compare different democratic models globally
- Students will examine the intersection of traditional and modern governance`
    : `- Students will understand key concepts in ${resource.subject} appropriate for ${resource.yearLevel}
- Students will apply learning to authentic, real-world situations
- Students will develop critical thinking and analysis skills
- Students will make respectful connections to cultural perspectives`
}

## 📚 Materials Needed

**Essential Materials:**
- Whiteboard and markers
- Printed student worksheets
- Timer or clock
- Sticky notes

**Technology (if available):**
- Computers/tablets for research
- Projector for presentations
- Internet access
- Digital timer

## ⏰ Step-by-Step Lesson Activities

### 1. Opening & Karakia (5 minutes)
**Purpose:** Create a respectful learning environment and set expectations

**What to do:**
1. Welcome students as they enter
2. Begin with appropriate karakia if culturally appropriate
3. Write today's learning objectives on the board
4. Ask: "What do you already know about this topic?"
5. Record 2-3 student responses on the board

### 2. Introduction & Hook (10 minutes)
**Purpose:** Engage students and introduce key concepts

**What to do:**
1. Share an interesting fact or story related to the topic
2. Show visual aids (diagrams, photos, or examples)
3. Ask engaging questions to activate prior knowledge
4. Introduce key vocabulary terms
5. Connect to students' own experiences where possible

**Cultural Connection:** Include Māori perspectives respectfully, acknowledging their expertise and contributions to the topic.

### 3. Main Learning Activity (25 minutes)
**Purpose:** Deep learning through interactive engagement

**What to do:**
1. **Explain (5 min):** Present main concepts clearly with examples
2. **Demonstrate (5 min):** Show how concepts apply in practice
3. **Group Work (10 min):** Students work in pairs/small groups
   - Assign specific roles to each group member
   - Provide clear task instructions
   - Circulate to support and guide learning
4. **Share (5 min):** Groups present findings to class

**Support for Different Learners:**
- Visual learners: Use diagrams and charts
- Kinesthetic learners: Include movement or hands-on activities
- Advanced students: Provide extension questions
- Students needing support: Pair with confident partners

### 4. Assessment & Reflection (8 minutes)
**Purpose:** Check understanding and consolidate learning

**What to do:**
1. **Quick Check (3 min):** Ask 2-3 questions to gauge understanding
2. **Exit Ticket (3 min):** Students write one thing they learned
3. **Preview (2 min):** Briefly outline what comes next

### 5. Closure & Homework (2 minutes)
**Purpose:** End positively and set expectations

**What to do:**
1. Summarize key learning points
2. Assign homework (see below)
3. Thank students for their participation
4. Close with karakia if appropriate

## 📊 How to Assess Student Learning

**During the Lesson (Formative):**
- Listen to student discussions and questions
- Observe group work participation and understanding
- Check student responses during activities
- Note which students need additional support

**End of Lesson (Summative):**
Exit Ticket Questions:
1. What is the most important thing you learned today?
2. What question do you still have about this topic?
3. How does this connect to your own life or community?

## 📝 Homework Assignment

**Task: Real-World Connections**

What students need to do:
1. Find one example of today's learning in their community or family
2. This could be through talking to whānau, observing local practices, or researching local examples
3. Write 3-4 sentences about what they discovered
4. Be prepared to share in the next lesson

**Time needed:** 15-20 minutes
**If students struggle:** They can ask family members for help or use simple internet research
**Due date:** Next lesson

## 🌿 Cultural Connections & Respectful Practice

**Manaakitanga (Hospitality & Care):** Create a welcoming environment where all students feel valued and supported in their learning journey.

**Whakatōhea (Working Together):** Encourage collaborative learning and emphasize that we learn better when we support each other.

**Respectful Integration:** When including Māori concepts, always approach with respect and acknowledge the depth of Māori knowledge systems.

## 🚀 Extension Activities (For Next Lessons or Advanced Students)

- Research how this topic is addressed in other countries or cultures
- Create a presentation or poster to teach younger students
- Interview community members about their experiences with this topic
- Design a solution to a local problem using today's learning
- Explore careers related to this subject area

---

**Quality Information:**
- Quality Score: ${resource.enhancement?.qualityScore?.toFixed(1) || 'N/A'}/15
- Cultural Authenticity: ${resource.enhancement?.culturalAuthenticity?.toFixed(1) || 'N/A'}/10
- Enhanced by: ${
      resource.enhancement?.passes?.map((p) => `${p.kaiako} (${p.specialization})`).join(', ') ||
      'TeAoMarama Platform'
    }

Generated by TeAoMarama Educational Platform
This lesson plan is ready for immediate classroom use.
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.replace(/[^a-z0-9]/gi, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="actual-content-viewer loading">
        <div className="loading-spinner">
          <BookOpen className="animate-spin" size={48} />
          <p>Loading actual enriched content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="actual-content-viewer error">
        <div className="error-card">
          <div className="error-icon">❌</div>
          <h2>Content Not Found</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/working-resources')} className="btn primary">
            <ArrowLeft size={20} />
            Back to Working Resources
          </button>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="actual-content-viewer error">
        <div className="error-card">
          <div className="error-icon">❌</div>
          <h2>No Content Available</h2>
          <p>This resource doesn't have enriched content yet.</p>
          <button onClick={() => navigate('/working-resources')} className="btn primary">
            <ArrowLeft size={20} />
            Back to Working Resources
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="actual-content-viewer">
      {/* Header */}
      <div className="content-header">
        <div className="header-controls">
          <button onClick={() => navigate('/working-resources')} className="btn secondary">
            <ArrowLeft size={20} />
            Back to Resources
          </button>

          <button onClick={downloadContent} className="btn primary">
            <Download size={20} />
            Download Content
          </button>
        </div>

        <div className="content-title-section">
          <h1>{resource.title}</h1>
          <div className="content-meta">
            <span className="subject">{resource.subject}</span>
            <span className="year-level">{resource.yearLevel}</span>
            <span className="type">{resource.type}</span>
            <span className="depth">{resource.metadata?.difficulty || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="content-section">
        <h2>
          <FileText size={24} /> Description
        </h2>
        <p className="description">{resource.description}</p>
      </div>

      {/* ACTUAL ENHANCED LESSON CONTENT */}
      {resource.actualLessonContent ? (
        <div className="content-section enhanced-lesson-content">
          <h2>
            <BookOpen size={24} /> Enhanced Culturally-Authentic Lesson Plan
          </h2>

          {/* Beautiful Enhanced Title */}
          <div className="enhanced-title">
            <h1 className="lesson-title">{resource.actualLessonContent.title}</h1>
            <div className="lesson-meta">
              <span className="subject-badge">{resource.actualLessonContent.subject}</span>
              <span className="year-badge">{resource.actualLessonContent.yearLevel}</span>
              <span className="depth-badge">{resource.actualLessonContent.depth}</span>
            </div>
          </div>

          {/* Cultural Context - The Beautiful Deep Content */}
          <div className="cultural-context">
            <h3>🌿 Cultural Context & Significance</h3>
            <div className="context-content">{resource.actualLessonContent.culturalContext}</div>
          </div>

          {/* Learning Objectives */}
          <div className="learning-objectives">
            <h3>🎯 Learning Objectives</h3>
            <ul>
              {resource.actualLessonContent?.learningObjectives?.map(
                (objective: string, index: number) => (
                  <li key={index}>{objective}</li>
                ),
              )}
            </ul>
          </div>

          {/* Activities - The Core Beautiful Content */}
          <div className="enhanced-activities">
            <h3>⭐ Enhanced Learning Activities</h3>
            {(
              resource.actualLessonContent.activities as Array<{
                title: string;
                description: string;
              }>
            )?.map((activity, index: number) => (
              <div key={index} className="activity-card">
                <h4>
                  <span className="activity-number">{index + 1}</span>
                  {activity.title}
                </h4>
                <p className="activity-description">{activity.description}</p>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div className="enhanced-resources">
            <h3>📚 Authentic Resources</h3>
            <ul>
              {(resource.actualLessonContent.resources as string[])?.map(
                (resourceItem: string, index: number) => (
                  <li key={index}>{resourceItem}</li>
                ),
              )}
            </ul>
          </div>

          {/* Assessment */}
          {resource.actualLessonContent.assessment && (
            <div className="enhanced-assessment">
              <h3>📊 Assessment Methods</h3>
              <div className="assessment-type">
                <strong>Type:</strong> {(resource.actualLessonContent.assessment as any).type}
              </div>
              {(resource.actualLessonContent.assessment as any).tasks && (
                <div className="assessment-tasks">
                  <strong>Tasks:</strong>
                  <ul>
                    {(resource.actualLessonContent.assessment as any).tasks.map(
                      (task: string, index: number) => (
                        <li key={index}>{task}</li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* NZ Curriculum Alignment */}
          <div className="nz-curriculum">
            <h3>📋 New Zealand Curriculum Alignment</h3>
            <ul>
              {(resource.actualLessonContent.nzcAlignment as string[])?.map(
                (alignment: string, index: number) => (
                  <li key={index}>{alignment}</li>
                ),
              )}
            </ul>
          </div>

          {/* Enhancement Quality */}
          <div className="enhancement-quality">
            <h3>⭐ Enhancement Quality</h3>
            <div className="quality-metrics">
              <div className="metric">
                <span className="label">Cultural Authenticity:</span>
                <span className="score">
                  {resource.enhancement?.culturalAuthenticity?.toFixed(1)}/10
                </span>
              </div>
              <div className="metric">
                <span className="label">Pedagogical Depth:</span>
                <span className="score">
                  {resource.enhancement?.pedagogicalDepth?.toFixed(1)}/10
                </span>
              </div>
              <div className="metric">
                <span className="label">Overall Quality:</span>
                <span className="score">{resource.enhancement?.qualityScore?.toFixed(1)}/15</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="content-section lesson-plan">
          <h2>
            <BookOpen size={24} /> Complete Lesson Plan - Ready to Use in Your Classroom
          </h2>

          <div className="lesson-overview">
            <div className="overview-item">
              <strong>Duration:</strong> {resource.metadata?.estimatedDuration || 50} minutes
            </div>
            <div className="overview-item">
              <strong>Class Size:</strong> Up to 30 students
            </div>
            <div className="overview-item">
              <strong>Setup Time:</strong> 5 minutes
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="lesson-subsection">
            <h3>🎯 Learning Objectives</h3>
            <ul className="objectives-list">
              {resource.subject === 'Social Studies' && resource.yearLevel === 'Year 8' ? (
                <>
                  <li>
                    Students will understand the structure of New Zealand's government system
                    including the three branches
                  </li>
                  <li>
                    Students will identify the roles and responsibilities of different government
                    officials
                  </li>
                  <li>
                    Students will connect government structure to democratic principles and citizen
                    participation
                  </li>
                  <li>
                    Students will relate government systems to Te Ao Māori governance concepts with
                    respect
                  </li>
                </>
              ) : resource.subject === 'Social Studies' && resource.yearLevel === 'Year 12' ? (
                <>
                  <li>Students will analyze complex political systems and their effectiveness</li>
                  <li>Students will evaluate the role of citizens in democratic governance</li>
                  <li>Students will compare different democratic models globally</li>
                  <li>
                    Students will examine the intersection of traditional and modern governance
                  </li>
                </>
              ) : (
                <>
                  <li>
                    Students will understand key concepts in {resource.subject} appropriate for{' '}
                    {resource.yearLevel}
                  </li>
                  <li>Students will apply learning to authentic, real-world situations</li>
                  <li>Students will develop critical thinking and analysis skills</li>
                  <li>Students will make respectful connections to cultural perspectives</li>
                </>
              )}
            </ul>
          </div>

          {/* Materials Needed */}
          <div className="lesson-subsection">
            <h3>📚 Materials Needed</h3>
            <div className="materials-grid">
              <div className="materials-column">
                <h4>Essential Materials:</h4>
                <ul>
                  <li>✓ Whiteboard and markers</li>
                  <li>✓ Printed student worksheets</li>
                  <li>✓ Timer or clock</li>
                  <li>✓ Sticky notes</li>
                </ul>
              </div>
              <div className="materials-column">
                <h4>Technology (if available):</h4>
                <ul>
                  <li>• Computers/tablets for research</li>
                  <li>• Projector for presentations</li>
                  <li>• Internet access</li>
                  <li>• Digital timer</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step-by-Step Lesson Activities */}
          <div className="lesson-subsection activities">
            <h3>⏰ Step-by-Step Lesson Activities</h3>

            <div className="activity-timeline">
              <div className="activity-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4>Opening & Karakia</h4>
                  <span className="step-time">5 minutes</span>
                </div>
                <div className="step-content">
                  <p>
                    <strong>Purpose:</strong> Create a respectful learning environment and set
                    expectations
                  </p>
                  <div className="step-instructions">
                    <p>
                      <strong>What to do:</strong>
                    </p>
                    <ol>
                      <li>Welcome students as they enter</li>
                      <li>Begin with appropriate karakia if culturally appropriate</li>
                      <li>Write today's learning objectives on the board</li>
                      <li>Ask: "What do you already know about this topic?"</li>
                      <li>Record 2-3 student responses on the board</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="activity-step">
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4>Introduction & Hook</h4>
                  <span className="step-time">10 minutes</span>
                </div>
                <div className="step-content">
                  <p>
                    <strong>Purpose:</strong> Engage students and introduce key concepts
                  </p>
                  <div className="step-instructions">
                    <p>
                      <strong>What to do:</strong>
                    </p>
                    <ol>
                      <li>Share an interesting fact or story related to the topic</li>
                      <li>Show visual aids (diagrams, photos, or examples)</li>
                      <li>Ask engaging questions to activate prior knowledge</li>
                      <li>Introduce key vocabulary terms</li>
                      <li>Connect to students' own experiences where possible</li>
                    </ol>
                  </div>
                  <div className="cultural-note">
                    <strong>Cultural Connection:</strong> Include Māori perspectives respectfully,
                    acknowledging their expertise and contributions to the topic.
                  </div>
                </div>
              </div>

              <div className="activity-step">
                <div className="step-header">
                  <span className="step-number">3</span>
                  <h4>Main Learning Activity</h4>
                  <span className="step-time">25 minutes</span>
                </div>
                <div className="step-content">
                  <p>
                    <strong>Purpose:</strong> Deep learning through interactive engagement
                  </p>
                  <div className="step-instructions">
                    <p>
                      <strong>What to do:</strong>
                    </p>
                    <ol>
                      <li>
                        <strong>Explain (5 min):</strong> Present main concepts clearly with
                        examples
                      </li>
                      <li>
                        <strong>Demonstrate (5 min):</strong> Show how concepts apply in practice
                      </li>
                      <li>
                        <strong>Group Work (10 min):</strong> Students work in pairs/small groups
                        <ul>
                          <li>Assign specific roles to each group member</li>
                          <li>Provide clear task instructions</li>
                          <li>Circulate to support and guide learning</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Share (5 min):</strong> Groups present findings to class
                      </li>
                    </ol>
                  </div>
                  <div className="differentiation-tips">
                    <strong>Support for Different Learners:</strong>
                    <ul>
                      <li>Visual learners: Use diagrams and charts</li>
                      <li>Kinesthetic learners: Include movement or hands-on activities</li>
                      <li>Advanced students: Provide extension questions</li>
                      <li>Students needing support: Pair with confident partners</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="activity-step">
                <div className="step-header">
                  <span className="step-number">4</span>
                  <h4>Assessment & Reflection</h4>
                  <span className="step-time">8 minutes</span>
                </div>
                <div className="step-content">
                  <p>
                    <strong>Purpose:</strong> Check understanding and consolidate learning
                  </p>
                  <div className="step-instructions">
                    <p>
                      <strong>What to do:</strong>
                    </p>
                    <ol>
                      <li>
                        <strong>Quick Check (3 min):</strong> Ask 2-3 questions to gauge
                        understanding
                      </li>
                      <li>
                        <strong>Exit Ticket (3 min):</strong> Students write one thing they learned
                      </li>
                      <li>
                        <strong>Preview (2 min):</strong> Briefly outline what comes next
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="activity-step">
                <div className="step-header">
                  <span className="step-number">5</span>
                  <h4>Closure & Homework</h4>
                  <span className="step-time">2 minutes</span>
                </div>
                <div className="step-content">
                  <p>
                    <strong>Purpose:</strong> End positively and set expectations
                  </p>
                  <div className="step-instructions">
                    <p>
                      <strong>What to do:</strong>
                    </p>
                    <ol>
                      <li>Summarize key learning points</li>
                      <li>Assign homework (see below)</li>
                      <li>Thank students for their participation</li>
                      <li>Close with karakia if appropriate</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Section */}
          <div className="lesson-subsection assessment">
            <h3>📊 How to Assess Student Learning</h3>

            <div className="assessment-types">
              <div className="assessment-type">
                <h4>During the Lesson (Formative)</h4>
                <ul>
                  <li>✓ Listen to student discussions and questions</li>
                  <li>✓ Observe group work participation and understanding</li>
                  <li>✓ Check student responses during activities</li>
                  <li>✓ Note which students need additional support</li>
                </ul>
              </div>

              <div className="assessment-type">
                <h4>End of Lesson (Summative)</h4>
                <div className="exit-ticket">
                  <strong>Exit Ticket Questions:</strong>
                  <ol>
                    <li>What is the most important thing you learned today?</li>
                    <li>What question do you still have about this topic?</li>
                    <li>How does this connect to your own life or community?</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Homework Assignment */}
          <div className="lesson-subsection homework">
            <h3>📝 Homework Assignment</h3>
            <div className="homework-details">
              <div className="homework-task">
                <h4>Task: Real-World Connections</h4>
                <p>
                  <strong>What students need to do:</strong>
                </p>
                <ol>
                  <li>Find one example of today's learning in their community or family</li>
                  <li>
                    This could be through talking to whānau, observing local practices, or
                    researching local examples
                  </li>
                  <li>Write 3-4 sentences about what they discovered</li>
                  <li>Be prepared to share in the next lesson</li>
                </ol>
              </div>
              <div className="homework-support">
                <p>
                  <strong>Time needed:</strong> 15-20 minutes
                </p>
                <p>
                  <strong>If students struggle:</strong> They can ask family members for help or use
                  simple internet research
                </p>
                <p>
                  <strong>Due date:</strong> Next lesson
                </p>
              </div>
            </div>
          </div>

          {/* Cultural Connections */}
          <div className="lesson-subsection cultural">
            <h3>🌿 Cultural Connections & Respectful Practice</h3>
            <div className="cultural-guidance">
              <div className="cultural-principle">
                <h4>Manaakitanga (Hospitality & Care)</h4>
                <p>
                  Create a welcoming environment where all students feel valued and supported in
                  their learning journey.
                </p>
              </div>
              <div className="cultural-principle">
                <h4>Whakatōhea (Working Together)</h4>
                <p>
                  Encourage collaborative learning and emphasize that we learn better when we
                  support each other.
                </p>
              </div>
              <div className="cultural-principle">
                <h4>Respectful Integration</h4>
                <p>
                  When including Māori concepts, always approach with respect and acknowledge the
                  depth of Māori knowledge systems.
                </p>
              </div>
            </div>
          </div>

          {/* Extension Activities */}
          <div className="lesson-subsection extensions">
            <h3>🚀 Extension Activities (For Next Lessons or Advanced Students)</h3>
            <ul>
              <li>Research how this topic is addressed in other countries or cultures</li>
              <li>Create a presentation or poster to teach younger students</li>
              <li>Interview community members about their experiences with this topic</li>
              <li>Design a solution to a local problem using today's learning</li>
              <li>Explore careers related to this subject area</li>
            </ul>
          </div>
        </div>
      )}

      {/* Cultural Elements */}
      <div className="content-section">
        <h2>
          <Globe size={24} /> Cultural Elements
        </h2>
        <div className="cultural-info">
          <p>
            <strong>Cultural Elements Count:</strong> {resource.culturalElements}
          </p>
          <p>
            <strong>Current Pass:</strong> {resource.currentPass}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="content-section">
        <h2>
          <Clock size={24} /> Additional Information
        </h2>
        <div className="info-item">
          <strong>Estimated Duration:</strong> {resource.metadata?.estimatedDuration} minutes
        </div>
        <div className="info-item">
          <strong>Tags:</strong> {resource.metadata?.tags?.join(', ')}
        </div>
        <div className="info-item">
          <strong>Created:</strong>{' '}
          {new Date(resource.metadata?.created || '').toLocaleDateString()}
        </div>
        <div className="info-item">
          <strong>Last Modified:</strong>{' '}
          {new Date(resource.metadata?.lastModified || '').toLocaleDateString()}
        </div>
      </div>

      {/* Quality Information */}
      <div className="content-section quality-section">
        <h2>
          <Award size={24} /> Enhancement Quality
        </h2>
        <div className="quality-badges">
          <div className="quality-badge">
            <span className="label">Quality Score:</span>
            <span className="value">
              {resource.enhancement?.qualityScore?.toFixed(1) || 'N/A'}/15
            </span>
          </div>
          <div className="quality-badge">
            <span className="label">Cultural Authenticity:</span>
            <span className="value">
              {resource.enhancement?.culturalAuthenticity?.toFixed(1) || 'N/A'}/10
            </span>
          </div>
          <div className="quality-badge">
            <span className="label">Pedagogical Depth:</span>
            <span className="value">
              {resource.enhancement?.pedagogicalDepth?.toFixed(1) || 'N/A'}/10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualContentViewer;
