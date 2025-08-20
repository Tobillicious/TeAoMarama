import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

// Lazy load components
const AiArtEthicsComprehension = lazy(
  () => import('./components/educational/handouts/AiArtEthicsComprehension'),
);
const AiArtEthicsComprehensionHandout = lazy(
  () => import('./components/educational/handouts/AiArtEthicsComprehensionHandout'),
);
const AiEthicsAndBias = lazy(() => import('./components/educational/handouts/AiEthicsAndBias'));
const AiImpactComprehensionHandout = lazy(
  () => import('./components/educational/handouts/AiImpactComprehensionHandout'),
);
const AtomsInEverydayMaterials = lazy(
  () => import('./components/educational/handouts/AtomsInEverydayMaterials'),
);
const AuthorsPurposeEntertainHandout = lazy(
  () => import('./components/educational/handouts/AuthorsPurposeEntertainHandout'),
);
const AuthorsPurposeHandout = lazy(
  () => import('./components/educational/handouts/AuthorsPurposeHandout'),
);
const AuthorsPurposeInformHandout = lazy(
  () => import('./components/educational/handouts/AuthorsPurposeInformHandout'),
);
const AuthorsPurposePersuadeHandout = lazy(
  () => import('./components/educational/handouts/AuthorsPurposePersuadeHandout'),
);
const BarGraphHandout = lazy(() => import('./components/educational/handouts/BarGraphHandout'));
const BiochemistryTraditionalMedicine = lazy(
  () => import('./components/educational/handouts/BiochemistryTraditionalMedicine'),
);
const BodyMeasurementTraditional = lazy(
  () => import('./components/educational/handouts/BodyMeasurementTraditional'),
);
const CeremonialCircleGeometry = lazy(
  () => import('./components/educational/handouts/CeremonialCircleGeometry'),
);
const ChildrenRightsResponsibilities = lazy(
  () => import('./components/educational/handouts/ChildrenRightsResponsibilities'),
);
const ClimateChangeAotearoaHandout = lazy(
  () => import('./components/educational/handouts/ClimateChangeAotearoaHandout'),
);
const ClimateEmergencyAotearoaHandout = lazy(
  () => import('./components/educational/handouts/ClimateEmergencyAotearoaHandout'),
);
const CognitiveBiasesComprehensionHandout = lazy(
  () => import('./components/educational/handouts/CognitiveBiasesComprehensionHandout'),
);
const ColonizationPerspectivesHandout = lazy(
  () => import('./components/educational/handouts/ColonizationPerspectivesHandout'),
);
const CommunityHelpersStudy = lazy(
  () => import('./components/educational/handouts/CommunityHelpersStudy'),
);
const CommunityNeedsSurvey = lazy(
  () => import('./components/educational/handouts/CommunityNeedsSurvey'),
);
const CulturalCelebrationsComparison = lazy(
  () => import('./components/educational/handouts/CulturalCelebrationsComparison'),
);
const CulturalDecisionMakingTraditions = lazy(
  () => import('./components/educational/handouts/CulturalDecisionMakingTraditions'),
);
const CulturalHeroesComprehension = lazy(
  () => import('./components/educational/handouts/CulturalHeroesComprehension'),
);
const CulturalIdentityDeepDiveComprehension = lazy(
  () => import('./components/educational/handouts/CulturalIdentityDeepDiveComprehension'),
);
const CulturalPracticeExplanation = lazy(
  () => import('./components/educational/handouts/CulturalPracticeExplanation'),
);
const CulturalPreservationEssays = lazy(
  () => import('./components/educational/handouts/CulturalPreservationEssays'),
);
const CulturalSafetyClassroomChecklistsAlpha = lazy(
  () => import('./components/educational/handouts/CulturalSafetyClassroomChecklistsAlpha'),
);
const CulturalStemAssessmentRubric = lazy(
  () => import('./components/educational/handouts/CulturalStemAssessmentRubric'),
);
const CulturalStoriesComprehension = lazy(
  () => import('./components/educational/handouts/CulturalStoriesComprehension'),
);
const FamilyDataCollection = lazy(
  () => import('./components/educational/handouts/FamilyDataCollection'),
);
const FamilyTreeWriting = lazy(() => import('./components/educational/handouts/FamilyTreeWriting'));
const FutureVisioningCreativeWriting = lazy(
  () => import('./components/educational/handouts/FutureVisioningCreativeWriting'),
);
const IndigenousRightsResearch = lazy(
  () => import('./components/educational/handouts/IndigenousRightsResearch'),
);
const IwiEconomicsMathematics = lazy(
  () => import('./components/educational/handouts/IwiEconomicsMathematics'),
);
const KaitiakiGeneratedMigrationStudentHandout = lazy(
  () => import('./components/educational/handouts/KaitiakiGeneratedMigrationStudentHandout'),
);
const KaitiakitangaFieldJournal = lazy(
  () => import('./components/educational/handouts/KaitiakitangaFieldJournal'),
);
const KaitiakitangaKids = lazy(() => import('./components/educational/handouts/KaitiakitangaKids'));
const KumaraStoragePlaceValue = lazy(
  () => import('./components/educational/handouts/KumaraStoragePlaceValue'),
);
const MaoriAstronomyNavigationHandout = lazy(
  () => import('./components/educational/handouts/MaoriAstronomyNavigationHandout'),
);
const MaoriGeometricPatternsHandout = lazy(
  () => import('./components/educational/handouts/MaoriGeometricPatternsHandout'),
);
const MaoriNavigationWayfindingHandout = lazy(
  () => import('./components/educational/handouts/MaoriNavigationWayfindingHandout'),
);
const MaraeShapesGeometry = lazy(
  () => import('./components/educational/handouts/MaraeShapesGeometry'),
);
const MountainNavigationTrigonometry = lazy(
  () => import('./components/educational/handouts/MountainNavigationTrigonometry'),
);
const NatureObservationJournal = lazy(
  () => import('./components/educational/handouts/NatureObservationJournal'),
);
const OralStorytellingHandout = lazy(
  () => import('./components/educational/handouts/OralStorytellingHandout'),
);
const PhysicsOfTraditionalGames = lazy(
  () => import('./components/educational/handouts/PhysicsOfTraditionalGames'),
);
const ProbabilityHandout = lazy(
  () => import('./components/educational/handouts/ProbabilityHandout'),
);
const RenewableEnergyTraditional = lazy(
  () => import('./components/educational/handouts/RenewableEnergyTraditional'),
);
const ResearchMethodsHandout = lazy(
  () => import('./components/educational/handouts/ResearchMethodsHandout'),
);
const ResourceSustainabilityStudy = lazy(
  () => import('./components/educational/handouts/ResourceSustainabilityStudy'),
);
const ScientificMethodHandout = lazy(
  () => import('./components/educational/handouts/ScientificMethodHandout'),
);
const StarNavigationCoordinates = lazy(
  () => import('./components/educational/handouts/StarNavigationCoordinates'),
);
const SustainableFishingEquations = lazy(
  () => import('./components/educational/handouts/SustainableFishingEquations'),
);
const SustainableTechnologyDesignChallenge = lazy(
  () => import('./components/educational/handouts/SustainableTechnologyDesignChallenge'),
);
const TraditionalCountingSystems = lazy(
  () => import('./components/educational/handouts/TraditionalCountingSystems'),
);
const TraditionalDyeChemistry = lazy(
  () => import('./components/educational/handouts/TraditionalDyeChemistry'),
);
const TraditionalEcologicalIndicatorsHandout = lazy(
  () => import('./components/educational/handouts/TraditionalEcologicalIndicatorsHandout'),
);
const TraditionalMaterialsScience = lazy(
  () => import('./components/educational/handouts/TraditionalMaterialsScience'),
);
const TraditionalNavigationMathematicsHandout = lazy(
  () => import('./components/educational/handouts/TraditionalNavigationMathematicsHandout'),
);
const TreatySettlementStatistics = lazy(
  () => import('./components/educational/handouts/TreatySettlementStatistics'),
);
const TukutukuPatternsMaths = lazy(
  () => import('./components/educational/handouts/TukutukuPatternsMaths'),
);
const Unit2TechnologyDefinitionChallenge = lazy(
  () => import('./components/educational/handouts/Unit2TechnologyDefinitionChallenge'),
);
const WeatherPredictionProbability = lazy(
  () => import('./components/educational/handouts/WeatherPredictionProbability'),
);
const WritersToolkitConclusionHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitConclusionHandout'),
);
const WritersToolkitDictionHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitDictionHandout'),
);
const WritersToolkitFluencyHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitFluencyHandout'),
);
const WritersToolkitHookHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitHookHandout'),
);
const WritersToolkitInformStructureHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitInformStructureHandout'),
);
const WritersToolkitPeelArgumentHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitPeelArgumentHandout'),
);
const WritersToolkitRevisionHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitRevisionHandout'),
);
const WritersToolkitRhetoricalDevicesHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitRhetoricalDevicesHandout'),
);
const WritersToolkitShowDontTellHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitShowDontTellHandout'),
);
const WritersToolkitSuspenseHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitSuspenseHandout'),
);
const WritersToolkitToneHandout = lazy(
  () => import('./components/educational/handouts/WritersToolkitToneHandout'),
);
const Year9StarterPackAlphaBuild = lazy(
  () => import('./components/educational/handouts/Year9StarterPackAlphaBuild'),
);
const Year9StarterPackEssentialSkills = lazy(
  () => import('./components/educational/handouts/Year9StarterPackEssentialSkills'),
);
const YouthVapingComprehensionHandout = lazy(
  () => import('./components/educational/handouts/YouthVapingComprehensionHandout'),
);
const WhakataukiWisdom = lazy(() => import('./components/educational/handouts/WhakataukiWisdom'));
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
            <Route path="/aiartethicscomprehension" element={<AiArtEthicsComprehension />} />
            <Route
              path="/aiartethicscomprehensionhandout"
              element={<AiArtEthicsComprehensionHandout />}
            />
            <Route path="/aiethicsandbias" element={<AiEthicsAndBias />} />
            <Route
              path="/aiimpactcomprehensionhandout"
              element={<AiImpactComprehensionHandout />}
            />
            <Route path="/atomsineverydaymaterials" element={<AtomsInEverydayMaterials />} />
            <Route
              path="/authorspurposeentertainhandout"
              element={<AuthorsPurposeEntertainHandout />}
            />
            <Route path="/authorspurposehandout" element={<AuthorsPurposeHandout />} />
            <Route path="/authorspurposeinformhandout" element={<AuthorsPurposeInformHandout />} />
            <Route
              path="/authorspurposepersuadehandout"
              element={<AuthorsPurposePersuadeHandout />}
            />
            <Route path="/bargraphhandout" element={<BarGraphHandout />} />
            <Route
              path="/biochemistrytraditionalmedicine"
              element={<BiochemistryTraditionalMedicine />}
            />
            <Route path="/bodymeasurementtraditional" element={<BodyMeasurementTraditional />} />
            <Route path="/ceremonialcirclegeometry" element={<CeremonialCircleGeometry />} />
            <Route
              path="/childrenrightsresponsibilities"
              element={<ChildrenRightsResponsibilities />}
            />
            <Route
              path="/climatechangeaotearoahandout"
              element={<ClimateChangeAotearoaHandout />}
            />
            <Route
              path="/climateemergencyaotearoahandout"
              element={<ClimateEmergencyAotearoaHandout />}
            />
            <Route
              path="/cognitivebiasescomprehensionhandout"
              element={<CognitiveBiasesComprehensionHandout />}
            />
            <Route
              path="/colonizationperspectiveshandout"
              element={<ColonizationPerspectivesHandout />}
            />
            <Route path="/communityhelpersstudy" element={<CommunityHelpersStudy />} />
            <Route path="/communityneedssurvey" element={<CommunityNeedsSurvey />} />
            <Route
              path="/culturalcelebrationscomparison"
              element={<CulturalCelebrationsComparison />}
            />
            <Route
              path="/culturaldecisionmakingtraditions"
              element={<CulturalDecisionMakingTraditions />}
            />
            <Route path="/culturalheroescomprehension" element={<CulturalHeroesComprehension />} />
            <Route
              path="/culturalidentitydeepdivecomprehension"
              element={<CulturalIdentityDeepDiveComprehension />}
            />
            <Route path="/culturalpracticeexplanation" element={<CulturalPracticeExplanation />} />
            <Route path="/culturalpreservationessays" element={<CulturalPreservationEssays />} />
            <Route
              path="/culturalsafetyclassroomchecklistsalpha"
              element={<CulturalSafetyClassroomChecklistsAlpha />}
            />
            <Route
              path="/culturalstemassessmentrubric"
              element={<CulturalStemAssessmentRubric />}
            />
            <Route
              path="/culturalstoriescomprehension"
              element={<CulturalStoriesComprehension />}
            />
            <Route path="/familydatacollection" element={<FamilyDataCollection />} />
            <Route path="/familytreewriting" element={<FamilyTreeWriting />} />
            <Route
              path="/futurevisioningcreativewriting"
              element={<FutureVisioningCreativeWriting />}
            />
            <Route path="/indigenousrightsresearch" element={<IndigenousRightsResearch />} />
            <Route path="/iwieconomicsmathematics" element={<IwiEconomicsMathematics />} />
            <Route
              path="/kaitiakigeneratedmigrationstudenthandout"
              element={<KaitiakiGeneratedMigrationStudentHandout />}
            />
            <Route path="/kaitiakitangafieldjournal" element={<KaitiakitangaFieldJournal />} />
            <Route path="/kaitiakitangakids" element={<KaitiakitangaKids />} />
            <Route path="/kumarastorageplacevalue" element={<KumaraStoragePlaceValue />} />
            <Route
              path="/maoriastronomynavigationhandout"
              element={<MaoriAstronomyNavigationHandout />}
            />
            <Route
              path="/maorigeometricpatternshandout"
              element={<MaoriGeometricPatternsHandout />}
            />
            <Route
              path="/maorinavigationwayfindinghandout"
              element={<MaoriNavigationWayfindingHandout />}
            />
            <Route path="/maraeshapesgeometry" element={<MaraeShapesGeometry />} />
            <Route
              path="/mountainnavigationtrigonometry"
              element={<MountainNavigationTrigonometry />}
            />
            <Route path="/natureobservationjournal" element={<NatureObservationJournal />} />
            <Route path="/oralstorytellinghandout" element={<OralStorytellingHandout />} />
            <Route path="/physicsoftraditionalgames" element={<PhysicsOfTraditionalGames />} />
            <Route path="/probabilityhandout" element={<ProbabilityHandout />} />
            <Route path="/renewableenergytraditional" element={<RenewableEnergyTraditional />} />
            <Route path="/researchmethodshandout" element={<ResearchMethodsHandout />} />
            <Route path="/resourcesustainabilitystudy" element={<ResourceSustainabilityStudy />} />
            <Route path="/scientificmethodhandout" element={<ScientificMethodHandout />} />
            <Route path="/starnavigationcoordinates" element={<StarNavigationCoordinates />} />
            <Route path="/sustainablefishingequations" element={<SustainableFishingEquations />} />
            <Route
              path="/sustainabletechnologydesignchallenge"
              element={<SustainableTechnologyDesignChallenge />}
            />
            <Route path="/traditionalcountingsystems" element={<TraditionalCountingSystems />} />
            <Route path="/traditionaldyechemistry" element={<TraditionalDyeChemistry />} />
            <Route
              path="/traditionalecologicalindicatorshandout"
              element={<TraditionalEcologicalIndicatorsHandout />}
            />
            <Route path="/traditionalmaterialsscience" element={<TraditionalMaterialsScience />} />
            <Route
              path="/traditionalnavigationmathematicshandout"
              element={<TraditionalNavigationMathematicsHandout />}
            />
            <Route path="/treatysettlementstatistics" element={<TreatySettlementStatistics />} />
            <Route path="/tukutukupatternsmaths" element={<TukutukuPatternsMaths />} />
            <Route
              path="/unit2technologydefinitionchallenge"
              element={<Unit2TechnologyDefinitionChallenge />}
            />
            <Route
              path="/weatherpredictionprobability"
              element={<WeatherPredictionProbability />}
            />
            <Route
              path="/writerstoolkitconclusionhandout"
              element={<WritersToolkitConclusionHandout />}
            />
            <Route
              path="/writerstoolkitdictionhandout"
              element={<WritersToolkitDictionHandout />}
            />
            <Route
              path="/writerstoolkitfluencyhandout"
              element={<WritersToolkitFluencyHandout />}
            />
            <Route path="/writerstoolkithookhandout" element={<WritersToolkitHookHandout />} />
            <Route
              path="/writerstoolkitinformstructurehandout"
              element={<WritersToolkitInformStructureHandout />}
            />
            <Route
              path="/writerstoolkitpeelargumenthandout"
              element={<WritersToolkitPeelArgumentHandout />}
            />
            <Route
              path="/writerstoolkitrevisionhandout"
              element={<WritersToolkitRevisionHandout />}
            />
            <Route
              path="/writerstoolkitrhetoricaldeviceshandout"
              element={<WritersToolkitRhetoricalDevicesHandout />}
            />
            <Route
              path="/writerstoolkitshowdonttellhandout"
              element={<WritersToolkitShowDontTellHandout />}
            />
            <Route
              path="/writerstoolkitsuspensehandout"
              element={<WritersToolkitSuspenseHandout />}
            />
            <Route path="/writerstoolkittonehandout" element={<WritersToolkitToneHandout />} />
            <Route path="/year9starterpackalphabuild" element={<Year9StarterPackAlphaBuild />} />
            <Route
              path="/year9starterpackessentialskills"
              element={<Year9StarterPackEssentialSkills />}
            />
            <Route
              path="/youthvapingcomprehensionhandout"
              element={<YouthVapingComprehensionHandout />}
            />
            <Route path="/whakataukiwisdom" element={<WhakataukiWisdom />} />
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
            <Route
              path="/maori-battalion"
              element={
                <MaoriBattalionLegacy
                  culturalAuthenticityScore={0.98}
                  difficultyLevel="intermediate"
                  subjectArea="social-studies"
                  yearLevel="year-9"
                />
              }
            />
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
