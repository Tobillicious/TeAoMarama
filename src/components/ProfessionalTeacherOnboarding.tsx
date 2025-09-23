import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OnboardingData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  schoolInfo: {
    schoolName: string;
    schoolType: 'primary' | 'intermediate' | 'secondary' | 'composite';
    region: string;
    role: string;
  };
  teachingInfo: {
    subjects: string[];
    yearLevels: string[];
    experience: 'new' | '1-5' | '6-10' | '10+';
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    culturalTraining: boolean;
  };
}

const ProfessionalTeacherOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    schoolInfo: {
      schoolName: '',
      schoolType: 'primary',
      region: '',
      role: '',
    },
    teachingInfo: {
      subjects: [],
      yearLevels: [],
      experience: 'new',
    },
    preferences: {
      notifications: true,
      newsletter: true,
      culturalTraining: true,
    },
  });

  const totalSteps = 5;

  const handleInputChange = (section: keyof OnboardingData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (
    section: keyof OnboardingData,
    field: string,
    value: string,
    checked: boolean,
  ) => {
    setFormData((prev) => {
      const currentArray = (prev[section] as any)[field] as string[];
      const newArray = checked
        ? [...currentArray, value]
        : currentArray.filter((item) => item !== value);

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray,
        },
      };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate account creation
    console.log('Creating account with data:', formData);

    // Navigate to dashboard
    navigate('/teacher-dashboard', {
      state: {
        user: formData,
        isNewUser: true,
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              Welcome to Te Ao Mārama
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
              }}
            >
              Let's get you set up with your account. We'll start with your personal information.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  style={inputStyle}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  style={inputStyle}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              School Information
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
              }}
            >
              Tell us about your school and role.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <input
                type="text"
                placeholder="School Name"
                value={formData.schoolInfo.schoolName}
                onChange={(e) => handleInputChange('schoolInfo', 'schoolName', e.target.value)}
                style={inputStyle}
              />

              <select
                value={formData.schoolInfo.schoolType}
                onChange={(e) => handleInputChange('schoolInfo', 'schoolType', e.target.value)}
                style={inputStyle}
              >
                <option value="primary">Primary School</option>
                <option value="intermediate">Intermediate School</option>
                <option value="secondary">Secondary School</option>
                <option value="composite">Composite School</option>
              </select>

              <select
                value={formData.schoolInfo.region}
                onChange={(e) => handleInputChange('schoolInfo', 'region', e.target.value)}
                style={inputStyle}
              >
                <option value="">Select Region</option>
                <option value="auckland">Auckland</option>
                <option value="waikato">Waikato</option>
                <option value="bay-of-plenty">Bay of Plenty</option>
                <option value="gisborne">Gisborne</option>
                <option value="hawkes-bay">Hawke's Bay</option>
                <option value="taranaki">Taranaki</option>
                <option value="manawatu-wanganui">Manawatu-Wanganui</option>
                <option value="wellington">Wellington</option>
                <option value="tasman">Tasman</option>
                <option value="nelson">Nelson</option>
                <option value="marlborough">Marlborough</option>
                <option value="west-coast">West Coast</option>
                <option value="canterbury">Canterbury</option>
                <option value="otago">Otago</option>
                <option value="southland">Southland</option>
              </select>

              <input
                type="text"
                placeholder="Your Role (e.g., Classroom Teacher, Head of Department)"
                value={formData.schoolInfo.role}
                onChange={(e) => handleInputChange('schoolInfo', 'role', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              Teaching Information
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
              }}
            >
              Help us personalize your experience.
            </p>

            <div style={{ display: 'grid', gap: '2rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '1rem',
                    color: 'white',
                    fontSize: '1.1rem',
                  }}
                >
                  Subjects You Teach
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {[
                    'English',
                    'Mathematics',
                    'Science',
                    'Social Studies',
                    'Health & PE',
                    'Arts',
                    'Technology',
                    'Languages',
                  ].map((subject) => (
                    <label
                      key={subject}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'white',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.teachingInfo.subjects.includes(subject)}
                        onChange={(e) =>
                          handleArrayChange('teachingInfo', 'subjects', subject, e.target.checked)
                        }
                        style={{ margin: 0 }}
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '1rem',
                    color: 'white',
                    fontSize: '1.1rem',
                  }}
                >
                  Year Levels
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {[
                    'Year 1',
                    'Year 2',
                    'Year 3',
                    'Year 4',
                    'Year 5',
                    'Year 6',
                    'Year 7',
                    'Year 8',
                    'Year 9',
                    'Year 10',
                    'Year 11',
                    'Year 12',
                    'Year 13',
                  ].map((year) => (
                    <label
                      key={year}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'white',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.teachingInfo.yearLevels.includes(year)}
                        onChange={(e) =>
                          handleArrayChange('teachingInfo', 'yearLevels', year, e.target.checked)
                        }
                        style={{ margin: 0 }}
                      />
                      {year}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '1rem',
                    color: 'white',
                    fontSize: '1.1rem',
                  }}
                >
                  Teaching Experience
                </label>
                <select
                  value={formData.teachingInfo.experience}
                  onChange={(e) => handleInputChange('teachingInfo', 'experience', e.target.value)}
                  style={inputStyle}
                >
                  <option value="new">New Teacher (0-1 years)</option>
                  <option value="1-5">1-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              Preferences
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
              }}
            >
              Choose your notification and learning preferences.
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'white',
                  fontSize: '1.1rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.preferences.notifications}
                  onChange={(e) =>
                    handleInputChange('preferences', 'notifications', e.target.checked)
                  }
                  style={{ transform: 'scale(1.2)' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>Email Notifications</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Receive updates about new resources and features
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'white',
                  fontSize: '1.1rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.preferences.newsletter}
                  onChange={(e) => handleInputChange('preferences', 'newsletter', e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>Educational Newsletter</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Weekly insights and teaching tips
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  color: 'white',
                  fontSize: '1.1rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.preferences.culturalTraining}
                  onChange={(e) =>
                    handleInputChange('preferences', 'culturalTraining', e.target.checked)
                  }
                  style={{ transform: 'scale(1.2)' }}
                />
                <div>
                  <div style={{ fontWeight: 'bold' }}>Cultural Safety Training</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Access to Te Ao Māori professional development
                  </div>
                </div>
              </label>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '2rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              Welcome to Te Ao Mārama! 🌿
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
              }}
            >
              You're all set! Here's what you can do next:
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.3rem' }}>
                  🎓 Explore Curriculum Resources
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1rem' }}>
                  Access 50+ curriculum-aligned lessons with cultural safety protocols
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.3rem' }}>
                  🌿 Cultural Safety Training
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1rem' }}>
                  Complete your cultural competency training and earn certification
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.3rem' }}>
                  💬 Join the Community
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1rem' }}>
                  Connect with 1,000+ New Zealand teachers in our professional community
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '1rem',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {/* Progress Bar */}
        <div
          style={{
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <span style={{ color: 'white', fontSize: '1rem' }}>
              Step {currentStep} of {totalSteps}
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #4ade80, #22c55e)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '2rem',
          }}
        >
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            style={{
              padding: '1rem 2rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 1 ? 0.5 : 1,
              transition: 'all 0.3s ease',
            }}
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              style={{
                padding: '1rem 2rem',
                borderRadius: '10px',
                border: 'none',
                background: '#059669',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginLeft: 'auto',
              }}
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{
                padding: '1rem 2rem',
                borderRadius: '10px',
                border: 'none',
                background: '#059669',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginLeft: 'auto',
              }}
            >
              Complete Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTeacherOnboarding;
