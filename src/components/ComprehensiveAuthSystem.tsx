import { sendPasswordResetEmail } from 'firebase/auth';
import { AlertTriangle, CheckCircle, Eye, EyeOff, User, School, BookOpen, Award, Mail, Lock, MapPin } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { useAuth } from '../services/DualRoleAuthProvider';
import './ComprehensiveAuthSystem.css';

interface StudentRegistration {
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // Academic Info
  yearLevel: string;
  school: string;
  subjects: string[];
  learningGoals: string[];
  previousAchievements: string;
  
  // Cultural Context
  iwi: string;
  hapu: string;
  culturalInterests: string[];
  teReoLevel: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
  
  // Learning Preferences
  learningStyle: string[];
  accommodations: string;
  parentGuardianEmail: string;
}

interface TeacherRegistration {
  // Basic Info  
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // Professional Info
  school: string;
  position: string;
  yearsExperience: string;
  qualifications: string[];
  subjectSpecializations: string[];
  
  // Teaching Focus
  yearLevelsTeaching: string[];
  culturalCompetency: string;
  professionalGoals: string;
  teReoCompetency: 'beginner' | 'intermediate' | 'advanced' | 'fluent';
  
  // Registration Number
  teachingRegistrationNumber: string;
  principalReferenceEmail: string;
}

const ComprehensiveAuthSystem: React.FC = () => {
  const navigate = useNavigate();
  const { login, signUp, isAuthenticated, currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'signin' | 'student-signup' | 'teacher-signup' | 'password-reset'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>('');

  // Login form
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'student' as 'student' | 'teacher' | 'kaitiaki'
  });

  // Password reset form
  const [resetForm, setResetForm] = useState({
    email: ''
  });

  // Student registration form
  const [studentForm, setStudentForm] = useState<StudentRegistration>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearLevel: '',
    school: '',
    subjects: [],
    learningGoals: [],
    previousAchievements: '',
    iwi: '',
    hapu: '',
    culturalInterests: [],
    teReoLevel: 'beginner',
    learningStyle: [],
    accommodations: '',
    parentGuardianEmail: ''
  });

  // Teacher registration form
  const [teacherForm, setTeacherForm] = useState<TeacherRegistration>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    position: '',
    yearsExperience: '',
    qualifications: [],
    subjectSpecializations: [],
    yearLevelsTeaching: [],
    culturalCompetency: '',
    professionalGoals: '',
    teReoCompetency: 'beginner',
    teachingRegistrationNumber: '',
    principalReferenceEmail: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const redirectPath = currentUser.role === 'teacher' ? '/teacher-dashboard' : 
                          currentUser.role === 'student' ? '/student-dashboard' :
                          currentUser.role === 'kaitiaki' ? '/kaitiaki-dashboard' : '/';
      navigate(redirectPath);
    }
  }, [isAuthenticated, currentUser, navigate]);

  const yearLevels = [
    'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'
  ];

  const subjects = [
    'English', 'Mathematics', 'Science', 'Social Studies', 'Te Reo Māori',
    'Physical Education', 'Technology', 'The Arts', 'Health'
  ];

  const nzSchools = [
    'Auckland Grammar School',
    'Wellington College', 
    'Christchurch Boys\' High School',
    'Hamilton Boys\' High School',
    'Palmerston North Boys\' High School',
    'Other (please specify in goals)'
  ];

  const qualifications = [
    'Bachelor of Teaching',
    'Master of Education', 
    'Bachelor of Arts',
    'Bachelor of Science',
    'Postgraduate Diploma in Teaching',
    'PhD in Education'
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setErrors(['Please fill in all fields']);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      const result = await login(loginForm.email, loginForm.password, loginForm.role);
      
      if (result.success) {
        setSuccess(`Welcome back! Redirecting to your dashboard...`);
        
        // Navigate based on role
        setTimeout(() => {
          switch (loginForm.role) {
            case 'teacher':
              navigate('/teacher-dashboard');
              break;
            case 'student':
              navigate('/student-dashboard');
              break;
            case 'kaitiaki':
              navigate('/kaitiaki-dashboard');
              break;
            default:
              navigate('/dashboard');
              break;
          }
        }, 1000);
      } else {
        setErrors([result.error || 'Login failed. Please try again.']);
      }
    } catch (error) {
      setErrors(['Login failed. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'yearLevel', 'school', 'parentGuardianEmail'];
    const missingFields = requiredFields.filter(field => !studentForm[field as keyof StudentRegistration]);
    
    if (missingFields.length > 0) {
      setErrors([`Please fill in: ${missingFields.join(', ')}`]);
      return;
    }

    if (studentForm.password !== studentForm.confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }

    if (studentForm.password.length < 8) {
      setErrors(['Password must be at least 8 characters long']);
      return;
    }

    if (studentForm.subjects.length === 0) {
      setErrors(['Please select at least one subject']);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      const result = await signUp({
        email: studentForm.email,
        password: studentForm.password,
        name: `${studentForm.firstName} ${studentForm.lastName}`,
        role: 'student',
        school: studentForm.school,
        grade: studentForm.yearLevel,
        subjects: studentForm.subjects,
        iwiAffiliations: studentForm.iwi ? [studentForm.iwi] : undefined,
      });

      if (result.success) {
        setSuccess('Account created successfully! Welcome to Te Ao Mārama! Redirecting to your dashboard...');
        
        // Navigate to student dashboard after signup
        setTimeout(() => {
          navigate('/student-dashboard');
        }, 1500);
      } else {
        setErrors([result.error || 'Failed to create account. Please try again.']);
      }
    } catch (error) {
      setErrors(['Failed to create account. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeacherSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'school', 'position', 'teachingRegistrationNumber'];
    const missingFields = requiredFields.filter(field => !teacherForm[field as keyof TeacherRegistration]);
    
    if (missingFields.length > 0) {
      setErrors([`Please fill in: ${missingFields.join(', ')}`]);
      return;
    }

    if (teacherForm.password !== teacherForm.confirmPassword) {
      setErrors(['Passwords do not match']);
      return;
    }

    if (teacherForm.subjectSpecializations.length === 0) {
      setErrors(['Please select at least one subject specialization']);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      const result = await signUp({
        email: teacherForm.email,
        password: teacherForm.password,
        name: `${teacherForm.firstName} ${teacherForm.lastName}`,
        role: 'teacher',
        school: teacherForm.school,
        subjects: teacherForm.subjectSpecializations,
      });

      if (result.success) {
        setSuccess('Teacher account created successfully! Welcome to Te Ao Mārama! Redirecting to your dashboard...');
        
        // Navigate to teacher dashboard after signup
        setTimeout(() => {
          navigate('/teacher-dashboard');
        }, 1500);
      } else {
        setErrors([result.error || 'Failed to create account. Please try again.']);
      }
    } catch (error) {
      setErrors(['Failed to create account. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetForm.email) {
      setErrors(['Please enter your email address']);
      return;
    }

    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      await sendPasswordResetEmail(auth, resetForm.email);
      setSuccess('Password reset email sent! Please check your inbox.');
      setResetForm({ email: '' });
    } catch (error) {
      setErrors(['Failed to send password reset email. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSubject = (subject: string, form: 'student' | 'teacher') => {
    if (form === 'student') {
      const currentSubjects = studentForm.subjects;
      const newSubjects = currentSubjects.includes(subject)
        ? currentSubjects.filter(s => s !== subject)
        : [...currentSubjects, subject];
      setStudentForm(prev => ({ ...prev, subjects: newSubjects }));
    } else {
      const currentSubjects = teacherForm.subjectSpecializations;
      const newSubjects = currentSubjects.includes(subject)
        ? currentSubjects.filter(s => s !== subject)
        : [...currentSubjects, subject];
      setTeacherForm(prev => ({ ...prev, subjectSpecializations: newSubjects }));
    }
  };

  return (
    <div className="comprehensive-auth-system">
      <div className="auth-container">
        <div className="auth-header">
          <h1>🌟 Te Kura o TeAoMarama</h1>
          <p>Professional Educational Platform - Alpha Access</p>
        </div>

        {/* Tab Navigation */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            <User className="tab-icon" />
            Sign In
          </button>
          <button
            className={`auth-tab ${activeTab === 'student-signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('student-signup')}
          >
            <BookOpen className="tab-icon" />
            Student Registration
          </button>
          <button
            className={`auth-tab ${activeTab === 'teacher-signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('teacher-signup')}
          >
            <Award className="tab-icon" />
            Teacher Registration
          </button>
          <button
            className={`auth-tab ${activeTab === 'password-reset' ? 'active' : ''}`}
            onClick={() => setActiveTab('password-reset')}
          >
            <Lock className="tab-icon" />
            Reset Password
          </button>
        </div>

        {/* Error/Success Messages */}
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <div key={index} className="error-message">
                <AlertTriangle className="error-icon" />
                {error}
              </div>
            ))}
          </div>
        )}

        {success && (
          <div className="success-message">
            <CheckCircle className="success-icon" />
            {success}
          </div>
        )}

        {/* Sign In Tab */}
        {activeTab === 'signin' && (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Welcome Back</h2>
            
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="role-selector">
              <label>I am a:</label>
              <div className="role-options">
                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={loginForm.role === 'student'}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, role: e.target.value as 'student' }))}
                  />
                  Student / Ākonga
                </label>
                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={loginForm.role === 'teacher'}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, role: e.target.value as 'teacher' }))}
                  />
                  Teacher / Kaiako
                </label>
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* Student Registration Tab */}
        {activeTab === 'student-signup' && (
          <form onSubmit={handleStudentSignup} className="auth-form student-form">
            <h2>Student Registration / Rēhita Ākonga</h2>
            
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-row">
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={studentForm.firstName}
                    onChange={(e) => setStudentForm(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={studentForm.lastName}
                    onChange={(e) => setStudentForm(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={studentForm.password}
                    onChange={(e) => setStudentForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={studentForm.confirmPassword}
                    onChange={(e) => setStudentForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="form-section">
              <h3>Academic Information</h3>
              <div className="form-row">
                <div className="input-group">
                  <BookOpen className="input-icon" />
                  <select
                    value={studentForm.yearLevel}
                    onChange={(e) => setStudentForm(prev => ({ ...prev, yearLevel: e.target.value }))}
                    required
                  >
                    <option value="">Select Year Level</option>
                    {yearLevels.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <School className="input-icon" />
                  <select
                    value={studentForm.school}
                    onChange={(e) => setStudentForm(prev => ({ ...prev, school: e.target.value }))}
                    required
                  >
                    <option value="">Select School</option>
                    {nzSchools.map(school => (
                      <option key={school} value={school}>{school}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="subjects-selector">
                <label>Subjects of Interest:</label>
                <div className="subjects-grid">
                  {subjects.map(subject => (
                    <label key={subject} className="subject-option">
                      <input
                        type="checkbox"
                        checked={studentForm.subjects.includes(subject)}
                        onChange={() => toggleSubject(subject, 'student')}
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Cultural Context */}
            <div className="form-section">
              <h3>Cultural Context / Horopaki Ahurea</h3>
              <div className="form-row">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Iwi (optional)"
                    value={studentForm.iwi}
                    onChange={(e) => setStudentForm(prev => ({ ...prev, iwi: e.target.value }))}
                  />
                </div>
                <div className="input-group">
                  <select
                    value={studentForm.teReoLevel}
                    onChange={(e) => setStudentForm(prev => ({ ...prev, teReoLevel: e.target.value as any }))}
                  >
                    <option value="beginner">Te Reo: Beginner</option>
                    <option value="intermediate">Te Reo: Intermediate</option>
                    <option value="advanced">Te Reo: Advanced</option>
                    <option value="fluent">Te Reo: Fluent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Contact */}
            <div className="form-section">
              <h3>Parent/Guardian Information</h3>
              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Parent/Guardian Email"
                  value={studentForm.parentGuardianEmail}
                  onChange={(e) => setStudentForm(prev => ({ ...prev, parentGuardianEmail: e.target.value }))}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Student Account'}
            </button>
          </form>
        )}

        {/* Teacher Registration Tab */}
        {activeTab === 'teacher-signup' && (
          <form onSubmit={handleTeacherSignup} className="auth-form teacher-form">
            <h2>Teacher Registration / Rēhita Kaiako</h2>
            
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-row">
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={teacherForm.firstName}
                    onChange={(e) => setTeacherForm(prev => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </div>
                <div className="input-group">
                  <User className="input-icon" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={teacherForm.lastName}
                    onChange={(e) => setTeacherForm(prev => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Professional Email"
                  value={teacherForm.email}
                  onChange={(e) => setTeacherForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={teacherForm.password}
                    onChange={(e) => setTeacherForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={teacherForm.confirmPassword}
                    onChange={(e) => setTeacherForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="form-section">
              <h3>Professional Information</h3>
              <div className="form-row">
                <div className="input-group">
                  <School className="input-icon" />
                  <select
                    value={teacherForm.school}
                    onChange={(e) => setTeacherForm(prev => ({ ...prev, school: e.target.value }))}
                    required
                  >
                    <option value="">Select School</option>
                    {nzSchools.map(school => (
                      <option key={school} value={school}>{school}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Position/Role"
                    value={teacherForm.position}
                    onChange={(e) => setTeacherForm(prev => ({ ...prev, position: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Teaching Registration Number (TRN)"
                  value={teacherForm.teachingRegistrationNumber}
                  onChange={(e) => setTeacherForm(prev => ({ ...prev, teachingRegistrationNumber: e.target.value }))}
                  required
                />
              </div>

              <div className="subjects-selector">
                <label>Subject Specializations:</label>
                <div className="subjects-grid">
                  {subjects.map(subject => (
                    <label key={subject} className="subject-option">
                      <input
                        type="checkbox"
                        checked={teacherForm.subjectSpecializations.includes(subject)}
                        onChange={() => toggleSubject(subject, 'teacher')}
                      />
                      {subject}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <select
                    value={teacherForm.yearsExperience}
                    onChange={(e) => setTeacherForm(prev => ({ ...prev, yearsExperience: e.target.value }))}
                  >
                    <option value="">Years of Experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="16+">16+ years</option>
                  </select>
                </div>
                <div className="input-group">
                  <select
                    value={teacherForm.teReoCompetency}
                    onChange={(e) => setTeacherForm(prev => ({ ...prev, teReoCompetency: e.target.value as any }))}
                  >
                    <option value="beginner">Te Reo: Beginner</option>
                    <option value="intermediate">Te Reo: Intermediate</option>
                    <option value="advanced">Te Reo: Advanced</option>
                    <option value="fluent">Te Reo: Fluent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reference */}
            <div className="form-section">
              <h3>Professional Reference</h3>
              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Principal/HOD Reference Email"
                  value={teacherForm.principalReferenceEmail}
                  onChange={(e) => setTeacherForm(prev => ({ ...prev, principalReferenceEmail: e.target.value }))}
                />
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Teacher Account'}
            </button>
          </form>
        )}

        {/* Password Reset Tab */}
        {activeTab === 'password-reset' && (
          <form onSubmit={handlePasswordReset} className="auth-form">
            <h2>Reset Password</h2>
            <p>Enter your email address and we'll send you a password reset link.</p>
            
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={resetForm.email}
                onChange={(e) => setResetForm({ email: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ComprehensiveAuthSystem;