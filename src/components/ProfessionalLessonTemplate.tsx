import { Award, BookOpen, Clock, Download, Eye, Users } from 'lucide-react';
import React, { useState } from 'react';
import './ProfessionalLessonTemplate.css';

interface LessonTemplate {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: string;
  curriculumLevel: string;
  whakatauki: string;
  whakataukiTranslation: string;
  whakataukiContext: string;
  learningObjectives: {
    knowledge: string[];
    skills: string[];
    values: string[];
  };
  lessonPhases: {
    name: string;
    duration: string;
    activities: string[];
    teacherNotes: string;
    differentiation: string;
  }[];
  materials: {
    downloadable: string[];
    digital: string[];
    assessment: string[];
  };
  culturalSafety: string[];
  assessmentCriteria: string[];
}

const ProfessionalLessonTemplate: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<LessonTemplate | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const lessonTemplates: LessonTemplate[] = [
    {
      id: 'decolonized-history-lesson',
      title: 'Decolonized Aotearoa History',
      subject: 'Social Studies',
      yearLevel: 'Years 9-13',
      duration: '60 minutes',
      curriculumLevel: 'NZ Curriculum Level 5-8',
      whakatauki: 'Ko te pae tawhiti whāia kia tata, ko te pae tata whakamaua kia tīna',
      whakataukiTranslation: 'Seek the distant horizons, cherish those you attain',
      whakataukiContext:
        'This whakataukī reminds us to honor our past while building our future, connecting to our lesson on decolonized history.',
      learningObjectives: {
        knowledge: [
          'Understand the sophistication of pre-colonial Māori society',
          'Analyze the strategic brilliance of Māori leaders during the New Zealand Wars',
          'Evaluate the long-term impacts of colonization on Māori structures',
        ],
        skills: [
          'Critical analysis of historical sources',
          'Cultural perspective-taking',
          'Evidence-based argumentation',
        ],
        values: [
          'Respect for diverse historical perspectives',
          'Commitment to truth and reconciliation',
          'Appreciation of cultural resilience',
        ],
      },
      lessonPhases: [
        {
          name: 'Opening/Karakia',
          duration: '10 minutes',
          activities: [
            'Cultural opening with whakataukī discussion',
            'Connection to lesson theme and learning objectives',
            'Setting cultural safety protocols',
          ],
          teacherNotes:
            'Ensure all students feel culturally safe. Explain the significance of the whakataukī respectfully.',
          differentiation:
            'Provide written copies of whakataukī for visual learners, offer pronunciation support for Māori language.',
        },
        {
          name: 'Main Learning Activities',
          duration: '35 minutes',
          activities: [
            'Gallery walk through historical sources (15 minutes)',
            'Group analysis of Māori strategic decisions (20 minutes)',
          ],
          teacherNotes:
            'Use primary sources where possible. Encourage respectful discussion of sensitive topics.',
          differentiation:
            'Provide scaffolded analysis templates for struggling students, extension activities for advanced learners.',
        },
        {
          name: 'Application/Practice',
          duration: '10 minutes',
          activities: ['Individual reflection on learning', 'Connection to contemporary issues'],
          teacherNotes:
            'Guide students to make meaningful connections between historical events and current situations.',
          differentiation:
            'Offer choice of reflection format: written, visual, or oral presentation.',
        },
        {
          name: 'Reflection/Consolidation',
          duration: '5 minutes',
          activities: ['Group sharing of key insights', 'Cultural closing and next steps'],
          teacherNotes: 'End with a sense of cultural respect and forward momentum.',
          differentiation: 'Allow students to choose their preferred sharing method.',
        },
      ],
      materials: {
        downloadable: [
          'Historical source analysis template',
          'Māori strategic decisions worksheet',
          'Cultural safety guidelines',
        ],
        digital: [
          'Interactive timeline of New Zealand Wars',
          'Primary source document collection',
          'Cultural context videos',
        ],
        assessment: [
          'Learning reflection rubric',
          'Cultural competency checklist',
          'Historical analysis assessment',
        ],
      },
      culturalSafety: [
        'Respect for diverse cultural perspectives',
        'Safe space for difficult conversations',
        'Cultural consultation protocols',
        'Acknowledgment of historical trauma',
        'Celebration of cultural resilience',
      ],
      assessmentCriteria: [
        'Demonstrates understanding of Māori perspectives',
        'Uses evidence to support arguments',
        'Shows cultural respect and sensitivity',
        'Makes connections to contemporary relevance',
        'Reflects on personal learning journey',
      ],
    },
    {
      id: 'fractions-math-lesson',
      title: 'Fractions, Decimals, and Percentages',
      subject: 'Mathematics',
      yearLevel: 'Years 7-10',
      duration: '45 minutes',
      curriculumLevel: 'NZ Curriculum Level 4-5',
      whakatauki: 'He aha te mea nui o te ao? He tangata, he tangata, he tangata',
      whakataukiTranslation:
        'What is the most important thing in the world? It is people, it is people, it is people',
      whakataukiContext:
        'This whakataukī reminds us that mathematics serves people and communities, connecting to our practical work with fractions.',
      learningObjectives: {
        knowledge: [
          'Understand relationships between fractions, decimals, and percentages',
          'Master conversion techniques between different representations',
          'Apply conversions to real-world problems',
        ],
        skills: [
          'Mathematical conversion calculations',
          'Problem-solving with multiple representations',
          'Real-world application of mathematical concepts',
        ],
        values: [
          'Persistence in mathematical problem-solving',
          'Appreciation of mathematical beauty and order',
          'Recognition of mathematics in everyday life',
        ],
      },
      lessonPhases: [
        {
          name: 'Opening/Engagement',
          duration: '8 minutes',
          activities: [
            'Real-world examples of fractions/decimals/percentages',
            'Connection to whakataukī about serving people',
            'Setting learning objectives',
          ],
          teacherNotes:
            "Use examples from students' daily lives: food portions, sports statistics, shopping discounts.",
          differentiation:
            'Provide visual aids for struggling students, challenge advanced students with complex examples.',
        },
        {
          name: 'Main Learning Activities',
          duration: '25 minutes',
          activities: [
            'Conversion practice with guided examples (15 minutes)',
            'Partner problem-solving activities (10 minutes)',
          ],
          teacherNotes:
            'Model conversions step-by-step. Encourage peer teaching and collaboration.',
          differentiation:
            'Provide conversion charts for struggling students, extension problems for advanced learners.',
        },
        {
          name: 'Application/Practice',
          duration: '8 minutes',
          activities: [
            'Real-world problem scenarios',
            'Individual practice with immediate feedback',
          ],
          teacherNotes: 'Connect mathematical concepts to practical situations students encounter.',
          differentiation:
            'Offer choice of problem difficulty, provide calculators for students who need them.',
        },
        {
          name: 'Reflection/Consolidation',
          duration: '4 minutes',
          activities: ['Quick review of key concepts', 'Connection to next lesson'],
          teacherNotes: "Summarize key learning points and preview what's coming next.",
          differentiation: 'Allow students to choose their preferred review method.',
        },
      ],
      materials: {
        downloadable: [
          'Conversion practice worksheet',
          'Real-world problem scenarios',
          'Conversion reference chart',
        ],
        digital: [
          'Interactive conversion calculator',
          'Online practice problems',
          'Video tutorials',
        ],
        assessment: [
          'Conversion accuracy rubric',
          'Problem-solving checklist',
          'Real-world application assessment',
        ],
      },
      culturalSafety: [
        'Inclusive mathematical language',
        'Respect for different problem-solving approaches',
        'Celebration of mathematical diversity',
        'Safe space for mathematical mistakes',
        'Recognition of cultural mathematical practices',
      ],
      assessmentCriteria: [
        'Accurately converts between representations',
        'Solves real-world problems effectively',
        'Demonstrates mathematical reasoning',
        'Shows persistence in problem-solving',
        'Connects math to practical situations',
      ],
    },
  ];

  const handleTemplateSelect = (template: LessonTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewMode(false);
  };

  const handlePreview = () => {
    setIsPreviewMode(true);
  };

  const handleDownload = (template: LessonTemplate) => {
    // In a real implementation, this would generate and download a PDF
    console.log('Downloading lesson template:', template.title);
  };

  return (
    <div className="professional-lesson-template">
      <div className="template-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="template-title">
              <BookOpen className="title-icon" />
              Professional Lesson Templates
            </h1>
            <p className="template-subtitle">
              Culturally authentic, pedagogically sound lesson templates based on TeKeteAko
              standards
            </p>
          </div>
        </div>
      </div>

      <div className="template-grid">
        {lessonTemplates.map((template) => (
          <div key={template.id} className="template-card">
            <div className="template-header-card">
              <div className="template-icon">
                <BookOpen className="icon" />
              </div>
              <div className="template-meta">
                <span className="template-subject">{template.subject}</span>
                <span className="template-duration">
                  <Clock className="meta-icon" />
                  {template.duration}
                </span>
              </div>
            </div>

            <div className="template-content">
              <h3 className="template-title">{template.title}</h3>
              <p className="template-year">{template.yearLevel}</p>
              <p className="template-curriculum">{template.curriculumLevel}</p>

              <div className="template-whakatauki">
                <h4>Whakataukī | Proverb</h4>
                <p className="whakatauki-text">{template.whakatauki}</p>
                <p className="whakatauki-translation">{template.whakataukiTranslation}</p>
              </div>

              <div className="template-objectives">
                <h4>Learning Objectives</h4>
                <div className="objectives-grid">
                  <div className="objective-card">
                    <h5>Knowledge</h5>
                    <ul>
                      {template.learningObjectives.knowledge.map((obj, index) => (
                        <li key={index}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="objective-card">
                    <h5>Skills</h5>
                    <ul>
                      {template.learningObjectives.skills.map((obj, index) => (
                        <li key={index}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="objective-card">
                    <h5>Values</h5>
                    <ul>
                      {template.learningObjectives.values.map((obj, index) => (
                        <li key={index}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="template-actions">
              <button
                onClick={() => handleTemplateSelect(template)}
                className="action-button preview"
              >
                <Eye className="action-icon" />
                Full Preview
              </button>
              <button onClick={() => handleDownload(template)} className="action-button download">
                <Download className="action-icon" />
                Download Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="template-modal-overlay" onClick={() => setSelectedTemplate(null)}>
          <div className="template-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTemplate.title}</h2>
              <button onClick={() => setSelectedTemplate(null)} className="modal-close">
                ×
              </button>
            </div>

            <div className="modal-content">
              {!isPreviewMode ? (
                <div className="template-overview">
                  <div className="overview-section">
                    <h3>Lesson Overview</h3>
                    <div className="overview-grid">
                      <div className="overview-item">
                        <Clock className="overview-icon" />
                        <span>
                          <strong>Duration:</strong> {selectedTemplate.duration}
                        </span>
                      </div>
                      <div className="overview-item">
                        <Users className="overview-icon" />
                        <span>
                          <strong>Year Level:</strong> {selectedTemplate.yearLevel}
                        </span>
                      </div>
                      <div className="overview-item">
                        <Award className="overview-icon" />
                        <span>
                          <strong>Curriculum:</strong> {selectedTemplate.curriculumLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="overview-section">
                    <h3>Cultural Context</h3>
                    <div className="whakatauki-section">
                      <p className="whakatauki-text">{selectedTemplate.whakatauki}</p>
                      <p className="whakatauki-translation">
                        {selectedTemplate.whakataukiTranslation}
                      </p>
                      <p className="whakatauki-context">{selectedTemplate.whakataukiContext}</p>
                    </div>
                  </div>

                  <div className="overview-section">
                    <h3>Materials & Resources</h3>
                    <div className="materials-grid">
                      <div className="material-card">
                        <h4>📄 Downloadable</h4>
                        <ul>
                          {selectedTemplate.materials.downloadable.map((material, index) => (
                            <li key={index}>{material}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="material-card">
                        <h4>🔗 Digital</h4>
                        <ul>
                          {selectedTemplate.materials.digital.map((material, index) => (
                            <li key={index}>{material}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="material-card">
                        <h4>🎯 Assessment</h4>
                        <ul>
                          {selectedTemplate.materials.assessment.map((material, index) => (
                            <li key={index}>{material}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="template-preview">
                  <div className="preview-section">
                    <h3>Lesson Phases</h3>
                    {selectedTemplate.lessonPhases.map((phase, index) => (
                      <div key={index} className="phase-card">
                        <div className="phase-header">
                          <h4>
                            {phase.name} ({phase.duration})
                          </h4>
                        </div>
                        <div className="phase-content">
                          <h5>Main Activities:</h5>
                          <ul>
                            {phase.activities.map((activity, actIndex) => (
                              <li key={actIndex}>{activity}</li>
                            ))}
                          </ul>
                          <div className="teacher-notes">
                            <strong>Teacher Notes:</strong> {phase.teacherNotes}
                          </div>
                          <div className="differentiation">
                            <strong>Differentiation:</strong> {phase.differentiation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="preview-section">
                    <h3>Cultural Safety & Assessment</h3>
                    <div className="safety-grid">
                      <div className="safety-card">
                        <h4>🌿 Cultural Safety</h4>
                        <ul>
                          {selectedTemplate.culturalSafety.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="safety-card">
                        <h4>📊 Assessment Criteria</h4>
                        <ul>
                          {selectedTemplate.assessmentCriteria.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                onClick={handlePreview}
                className={`modal-button ${!isPreviewMode ? 'primary' : 'secondary'}`}
              >
                {!isPreviewMode ? 'View Full Lesson' : 'View Overview'}
              </button>
              <button
                onClick={() => handleDownload(selectedTemplate)}
                className="modal-button download"
              >
                <Download className="action-icon" />
                Download Complete Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalLessonTemplate;
