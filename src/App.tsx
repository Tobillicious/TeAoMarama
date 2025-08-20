import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ResourcesEnhanced = lazy(() => import('./pages/ResourcesEnhanced'));
const DocPage = lazy(() => import('./pages/DocPage'));
const ResourceViewer = lazy(() => import('./pages/ResourceViewer'));
const Login = lazy(() => import('./components/Login'));
const SignUp = lazy(() => import('./components/SignUp'));
const StyleGuide = lazy(() => import('./pages/StyleGuide'));
const MiharaDashboard = lazy(() => import('./components/MiharaDashboard'));
const UnitPlan = lazy(() => import('./pages/UnitPlan'));
const LessonPlan = lazy(() => import('./pages/LessonPlan'));
const StructuredLiteracyUnit = lazy(() => import('./pages/StructuredLiteracyUnit'));
const StructuredLiteracyUnits = lazy(() => import('./pages/StructuredLiteracyUnits'));
const PhoneticsCards = lazy(() => import('./pages/PhoneticsCards'));
const PhonologicalAwareness = lazy(() => import('./pages/PhonologicalAwareness'));
const SightWords = lazy(() => import('./pages/SightWords'));
const AdvancedMorphology = lazy(() => import('./pages/AdvancedMorphology'));
const Year8AcademicVocab = lazy(() => import('./pages/Year8AcademicVocab'));
const Year8ReadingStrategies = lazy(() => import('./pages/Year8ReadingStrategies'));
const Year8WritingRevolution = lazy(() => import('./pages/Year8WritingRevolution'));
const Year8CriticalLiteracy = lazy(() => import('./pages/Year8CriticalLiteracy'));
const Year8ReadingUnits = lazy(() => import('./pages/Year8ReadingUnits'));
const Year8WritingUnits = lazy(() => import('./pages/Year8WritingUnits'));
const Year8SocialStudies = lazy(() => import('./pages/Year8SocialStudies'));
const Year8SocialStudiesUnits = lazy(() => import('./pages/Year8SocialStudiesUnits'));
const ScienceIntegration = lazy(() => import('./pages/ScienceIntegration'));
const AssessmentFramework = lazy(() => import('./pages/AssessmentFramework'));
const LessonsIntegration = lazy(() => import('./pages/LessonsIntegration'));
const CulturalStories = lazy(() => import('./pages/CulturalStories'));
const DesignThinking = lazy(() => import('./pages/DesignThinking'));
const EnvironmentalLiteracy = lazy(() => import('./pages/EnvironmentalLiteracy'));
const GovernmentComponentAnalysis = lazy(() => import('./pages/GovernmentComponentAnalysis'));
const IndigenousWisdomSynthesis = lazy(() => import('./pages/IndigenousWisdomSynthesis'));
const MaoriAstronomy = lazy(() => import('./pages/MaoriAstronomy'));
const MaoriBattalionLegacy = lazy(() => import('./pages/MaoriBattalionLegacy'));

const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const TeReoPhonics = lazy(() => import('./pages/TeReoPhonics'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const Year10CulturalGeometry = lazy(() => import('./pages/Year10CulturalGeometry'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resources" element={<ResourcesEnhanced />} />
            <Route path="/docs/:page" element={<DocPage />} />
            <Route path="/resource/:id" element={<ResourceViewer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/style-guide" element={<StyleGuide />} />
            <Route path="/mihara" element={<MiharaDashboard />} />
            <Route path="/unit-plan" element={<UnitPlan />} />
            <Route path="/lesson-plan" element={<LessonPlan />} />
            <Route path="/structured-literacy" element={<StructuredLiteracyUnit />} />
            <Route path="/structured-literacy-units" element={<StructuredLiteracyUnits />} />
            <Route path="/phonics" element={<PhoneticsCards />} />
            <Route path="/phonological-awareness" element={<PhonologicalAwareness />} />
            <Route path="/sight-words" element={<SightWords />} />
            <Route path="/advanced-morphology" element={<AdvancedMorphology />} />
            <Route path="/year8-academic-vocab" element={<Year8AcademicVocab />} />
            <Route path="/year8-reading" element={<Year8ReadingStrategies />} />
            <Route path="/year8-writing" element={<Year8WritingRevolution />} />
            <Route path="/year8-critical-literacy" element={<Year8CriticalLiteracy />} />
            <Route path="/year8-reading-units" element={<Year8ReadingUnits />} />
            <Route path="/year8-writing-units" element={<Year8WritingUnits />} />
            <Route path="/year8-social-studies" element={<Year8SocialStudies />} />
            <Route path="/year8-social-studies-units" element={<Year8SocialStudiesUnits />} />
            <Route path="/science" element={<ScienceIntegration />} />
            <Route path="/assessment" element={<AssessmentFramework />} />
            <Route path="/lessons" element={<LessonsIntegration />} />
            <Route path="/year10-cultural-geometry" element={<Year10CulturalGeometry />} />
            <Route path="/cultural-stories" element={<CulturalStories />} />
            <Route path="/design-thinking" element={<DesignThinking />} />
            <Route path="/environmental-literacy" element={<EnvironmentalLiteracy />} />
            <Route path="/government-analysis" element={<GovernmentComponentAnalysis />} />
            <Route path="/indigenous-wisdom" element={<IndigenousWisdomSynthesis />} />
            <Route path="/maori-astronomy" element={<MaoriAstronomy />} />
            <Route path="/maori-battalion" element={<MaoriBattalionLegacy culturalAuthenticityScore={0.98} difficultyLevel="intermediate" subjectArea="social-studies" yearLevel="year-9" />} />
            <Route path="/te-reo-phonics" element={<TeReoPhonics />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
