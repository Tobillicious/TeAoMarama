import { Suspense, lazy, memo, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';

// Lazy load components for code splitting with preloading
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
// Removed missing modules that were causing build errors
const MaoriAstronomyNavigation = lazy(
  () => import('./components/educational/handouts/MaoriAstronomyNavigation'),
);
const HealthEducationCorrelation = lazy(
  () => import('./components/educational/handouts/HealthEducationCorrelation'),
);
const DesignThinkingProcess = lazy(
  () => import('./components/educational/handouts/DesignThinkingProcess'),
);
const WhakataukiWisdom = lazy(() => import('./components/educational/handouts/WhakataukiWisdom'));
const AIEthicsAndBias = lazy(() => import('./components/educational/handouts/AiEthicsAndBias'));
const ScienceIntegration = lazy(() => import('./pages/ScienceIntegration'));
const AssessmentFramework = lazy(() => import('./pages/AssessmentFramework'));
const LessonsIntegration = lazy(() => import('./pages/LessonsIntegration'));

// Newly migrated components from Te Kete Ako
const CommunityNeedsSurvey = lazy(
  () => import('./components/educational/handouts/community-needs-survey'),
);
const CulturalIdentityDeepDiveComprehension = lazy(
  () => import('./components/educational/handouts/cultural-identity-deep-dive-comprehension'),
);
const CulturalDecisionMakingTraditions = lazy(
  () => import('./components/educational/handouts/cultural-decision-making-traditions'),
);
const CulturalPreservationEssays = lazy(
  () => import('./components/educational/handouts/cultural-preservation-essays'),
);
const CulturalSafetyClassroomChecklistsAlpha = lazy(
  () => import('./components/educational/handouts/cultural-safety-classroom-checklists-alpha'),
);
const CulturalPracticeExplanation = lazy(
  () => import('./components/educational/handouts/cultural-practice-explanation'),
);
const KaitiakitangaKids = lazy(
  () => import('./components/educational/handouts/kaitiakitanga-kids'),
);
const CulturalCelebrationsComparison = lazy(
  () => import('./components/educational/handouts/cultural-celebrations-comparison'),
);
const CulturalStoriesComprehension = lazy(
  () => import('./components/educational/handouts/cultural-stories-comprehension'),
);
const FamilyDataCollection = lazy(
  () => import('./components/educational/handouts/family-data-collection'),
);
const CulturalHeroesComprehension = lazy(
  () => import('./components/educational/handouts/cultural-heroes-comprehension'),
);
const KaitiakitangaFieldJournal = lazy(
  () => import('./components/educational/handouts/kaitiakitanga-field-journal'),
);
const CulturalStemAssessmentRubric = lazy(
  () => import('./components/educational/handouts/cultural-stem-assessment-rubric'),
);
const MountainNavigationTrigonometry = lazy(
  () => import('./components/educational/handouts/mountain-navigation-trigonometry'),
);
const StarNavigationCoordinates = lazy(
  () => import('./components/educational/handouts/star-navigation-coordinates'),
);
const MaoriNavigationWayfindingHandout = lazy(
  () => import('./components/educational/handouts/maori-navigation-wayfinding-handout'),
);
const MaoriGeometricPatternsHandout = lazy(
  () => import('./components/educational/handouts/maori-geometric-patterns-handout'),
);
const KaitiakiGeneratedMigrationStudentHandout = lazy(
  () => import('./components/educational/handouts/kaitiaki-generated-migration-student-handout'),
);

// Optimized loading component with React.memo
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center lcp-optimized loading-spinner-container">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pounamu mx-auto mb-4"></div>
      <p className="text-lg font-medium loading-spinner-text">Loading TeAoMarama...</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Preload critical routes for better performance
const preloadCriticalRoutes = () => {
  // Preload dashboard and resources as they're likely to be accessed
  const preloadDashboard = () => import('./pages/Dashboard');
  const preloadResources = () => import('./pages/ResourcesEnhanced');

  // Preload after initial render
  setTimeout(() => {
    preloadDashboard();
    preloadResources();
  }, 1000);
};

function App() {
  // Memoize routes configuration for better performance
  const routes = useMemo(
    () => [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/resources', element: <ResourcesEnhanced /> },
      { path: '/mihara', element: <MiharaDashboard /> },
      { path: '/resource', element: <ResourceViewer /> },
      { path: '/doc', element: <DocPage /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/styleguide', element: <StyleGuide /> },
      { path: '/unit-plan', element: <UnitPlan /> },
      { path: '/lesson-plan', element: <LessonPlan /> },
      { path: '/structured-literacy', element: <StructuredLiteracyUnit /> },
      { path: '/structured-literacy-units', element: <StructuredLiteracyUnits /> },
      { path: '/phonetics-cards', element: <PhoneticsCards /> },
      { path: '/phonological-awareness', element: <PhonologicalAwareness /> },
      { path: '/sight-words', element: <SightWords /> },
      { path: '/advanced-morphology', element: <AdvancedMorphology /> },
      { path: '/year8-academic-vocab', element: <Year8AcademicVocab /> },
      { path: '/year8-reading-strategies', element: <Year8ReadingStrategies /> },
      { path: '/year8-writing-revolution', element: <Year8WritingRevolution /> },
      { path: '/year8-critical-literacy', element: <Year8CriticalLiteracy /> },
      { path: '/year8-reading-units', element: <Year8ReadingUnits /> },
      { path: '/year8-social-studies', element: <Year8SocialStudies /> },
      { path: '/year8-writing-units', element: <Year8WritingUnits /> },
      { path: '/year8-social-studies-units', element: <Year8SocialStudiesUnits /> },
      { path: '/science-integration', element: <ScienceIntegration /> },
      { path: '/assessment-framework', element: <AssessmentFramework /> },
      { path: '/lessons-integration', element: <LessonsIntegration /> },
      { path: '/maori-astronomy-navigation', element: <MaoriAstronomyNavigation /> },
      { path: '/health-education-correlation', element: <HealthEducationCorrelation /> },
      { path: '/design-thinking-process', element: <DesignThinkingProcess /> },
      { path: '/whakatauki-wisdom', element: <WhakataukiWisdom /> },
      { path: '/ai-ethics-and-bias', element: <AIEthicsAndBias /> },
      { path: '/community-needs-survey', element: <CommunityNeedsSurvey /> },
      {
        path: '/cultural-identity-deep-dive-comprehension',
        element: <CulturalIdentityDeepDiveComprehension />,
      },
      {
        path: '/cultural-decision-making-traditions',
        element: <CulturalDecisionMakingTraditions />,
      },
      { path: '/cultural-preservation-essays', element: <CulturalPreservationEssays /> },
      {
        path: '/cultural-safety-classroom-checklists-alpha',
        element: <CulturalSafetyClassroomChecklistsAlpha />,
      },
      { path: '/cultural-practice-explanation', element: <CulturalPracticeExplanation /> },
      { path: '/kaitiakitanga-kids', element: <KaitiakitangaKids /> },
      { path: '/cultural-celebrations-comparison', element: <CulturalCelebrationsComparison /> },
      { path: '/cultural-stories-comprehension', element: <CulturalStoriesComprehension /> },
      { path: '/family-data-collection', element: <FamilyDataCollection /> },
      { path: '/cultural-heroes-comprehension', element: <CulturalHeroesComprehension /> },
      { path: '/kaitiakitanga-field-journal', element: <KaitiakitangaFieldJournal /> },
      { path: '/cultural-stem-assessment-rubric', element: <CulturalStemAssessmentRubric /> },
      { path: '/mountain-navigation-trigonometry', element: <MountainNavigationTrigonometry /> },
      { path: '/star-navigation-coordinates', element: <StarNavigationCoordinates /> },
      {
        path: '/maori-navigation-wayfinding-handout',
        element: <MaoriNavigationWayfindingHandout />,
      },
      { path: '/maori-geometric-patterns-handout', element: <MaoriGeometricPatternsHandout /> },
      {
        path: '/kaitiaki-generated-migration-student-handout',
        element: <KaitiakiGeneratedMigrationStudentHandout />,
      },
    ],
    [],
  );

  // Preload critical routes after component mounts
  useMemo(() => {
    preloadCriticalRoutes();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default memo(App);
