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
const MediaLiteracyComprehensionHandout.V2 = lazy(() => import('./components/educational/handouts/MediaLiteracyComprehensionHandout.V2'));
const TūRangawaewaeMapping = lazy(() => import('./components/educational/handouts/TūRangawaewaeMapping'));
const ai-impact-comprehension-handout = lazy(() => import('./components/educational/handouts/ai-impact-comprehension-handout'));
const atoms-in-everyday-materials = lazy(() => import('./components/educational/handouts/atoms-in-everyday-materials'));
const authors-purpose-entertain-handout = lazy(() => import('./components/educational/handouts/authors-purpose-entertain-handout'));
const authors-purpose-handout = lazy(() => import('./components/educational/handouts/authors-purpose-handout'));
const authors-purpose-inform-handout = lazy(() => import('./components/educational/handouts/authors-purpose-inform-handout'));
const authors-purpose-persuade-handout = lazy(() => import('./components/educational/handouts/authors-purpose-persuade-handout'));
const bar-graph-handout = lazy(() => import('./components/educational/handouts/bar-graph-handout'));
const biochemistry-traditional-medicine = lazy(() => import('./components/educational/handouts/biochemistry-traditional-medicine'));
const body-measurement-traditional = lazy(() => import('./components/educational/handouts/body-measurement-traditional'));
const ceremonial-circle-geometry = lazy(() => import('./components/educational/handouts/ceremonial-circle-geometry'));
const children-rights-responsibilities = lazy(() => import('./components/educational/handouts/children-rights-responsibilities'));
const climate-change-aotearoa-handout = lazy(() => import('./components/educational/handouts/climate-change-aotearoa-handout'));
const climate-emergency-aotearoa-handout = lazy(() => import('./components/educational/handouts/climate-emergency-aotearoa-handout'));
const cognitive-biases-comprehension-handout = lazy(() => import('./components/educational/handouts/cognitive-biases-comprehension-handout'));
const colonization-perspectives-handout = lazy(() => import('./components/educational/handouts/colonization-perspectives-handout'));
const community-helpers-study = lazy(() => import('./components/educational/handouts/community-helpers-study'));
const community-needs-survey = lazy(() => import('./components/educational/handouts/community-needs-survey'));
const cultural-celebrations-comparison = lazy(() => import('./components/educational/handouts/cultural-celebrations-comparison'));
const cultural-decision-making-traditions = lazy(() => import('./components/educational/handouts/cultural-decision-making-traditions'));
const cultural-heroes-comprehension = lazy(() => import('./components/educational/handouts/cultural-heroes-comprehension'));
const cultural-identity-deep-dive-comprehension = lazy(() => import('./components/educational/handouts/cultural-identity-deep-dive-comprehension'));
const cultural-practice-explanation = lazy(() => import('./components/educational/handouts/cultural-practice-explanation'));
const cultural-preservation-essays = lazy(() => import('./components/educational/handouts/cultural-preservation-essays'));
const cultural-safety-classroom-checklists-alpha = lazy(() => import('./components/educational/handouts/cultural-safety-classroom-checklists-alpha'));
const cultural-stem-assessment-rubric = lazy(() => import('./components/educational/handouts/cultural-stem-assessment-rubric'));
const cultural-stories-comprehension = lazy(() => import('./components/educational/handouts/cultural-stories-comprehension'));
const family-data-collection = lazy(() => import('./components/educational/handouts/family-data-collection'));
const family-tree-writing = lazy(() => import('./components/educational/handouts/family-tree-writing'));
const future-visioning-creative-writing = lazy(() => import('./components/educational/handouts/future-visioning-creative-writing'));
const indigenous-rights-research = lazy(() => import('./components/educational/handouts/indigenous-rights-research'));
const iwi-economics-mathematics = lazy(() => import('./components/educational/handouts/iwi-economics-mathematics'));
const kaitiaki-generated-migration-student-handout = lazy(() => import('./components/educational/handouts/kaitiaki-generated-migration-student-handout'));
const kaitiakitanga-field-journal = lazy(() => import('./components/educational/handouts/kaitiakitanga-field-journal'));
const kaitiakitanga-kids = lazy(() => import('./components/educational/handouts/kaitiakitanga-kids'));
const kumara-storage-place-value = lazy(() => import('./components/educational/handouts/kumara-storage-place-value'));
const maori-astronomy-navigation-handout = lazy(() => import('./components/educational/handouts/maori-astronomy-navigation-handout'));
const maori-geometric-patterns-handout = lazy(() => import('./components/educational/handouts/maori-geometric-patterns-handout'));
const maori-navigation-wayfinding-handout = lazy(() => import('./components/educational/handouts/maori-navigation-wayfinding-handout'));
const marae-shapes-geometry = lazy(() => import('./components/educational/handouts/marae-shapes-geometry'));
const mountain-navigation-trigonometry = lazy(() => import('./components/educational/handouts/mountain-navigation-trigonometry'));
const nature-observation-journal = lazy(() => import('./components/educational/handouts/nature-observation-journal'));
const oral-storytelling-handout = lazy(() => import('./components/educational/handouts/oral-storytelling-handout'));
const physics-of-traditional-games = lazy(() => import('./components/educational/handouts/physics-of-traditional-games'));
const probability-handout = lazy(() => import('./components/educational/handouts/probability-handout'));
const renewable-energy-traditional = lazy(() => import('./components/educational/handouts/renewable-energy-traditional'));
const research-methods-handout = lazy(() => import('./components/educational/handouts/research-methods-handout'));
const resource-sustainability-study = lazy(() => import('./components/educational/handouts/resource-sustainability-study'));
const scientific-method-handout = lazy(() => import('./components/educational/handouts/scientific-method-handout'));
const star-navigation-coordinates = lazy(() => import('./components/educational/handouts/star-navigation-coordinates'));
const sustainable-fishing-equations = lazy(() => import('./components/educational/handouts/sustainable-fishing-equations'));
const sustainable-technology-design-challenge = lazy(() => import('./components/educational/handouts/sustainable-technology-design-challenge'));
const traditional-counting-systems = lazy(() => import('./components/educational/handouts/traditional-counting-systems'));
const traditional-dye-chemistry = lazy(() => import('./components/educational/handouts/traditional-dye-chemistry'));
const traditional-ecological-indicators-handout = lazy(() => import('./components/educational/handouts/traditional-ecological-indicators-handout'));
const traditional-materials-science = lazy(() => import('./components/educational/handouts/traditional-materials-science'));
const traditional-navigation-mathematics-handout = lazy(() => import('./components/educational/handouts/traditional-navigation-mathematics-handout'));
const treaty-settlement-statistics = lazy(() => import('./components/educational/handouts/treaty-settlement-statistics'));
const tukutuku-patterns-maths = lazy(() => import('./components/educational/handouts/tukutuku-patterns-maths'));
const unit-2-technology-definition-challenge = lazy(() => import('./components/educational/handouts/unit-2-technology-definition-challenge'));
const weather-prediction-probability = lazy(() => import('./components/educational/handouts/weather-prediction-probability'));
const writers-toolkit-conclusion-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-conclusion-handout'));
const writers-toolkit-diction-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-diction-handout'));
const writers-toolkit-fluency-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-fluency-handout'));
const writers-toolkit-hook-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-hook-handout'));
const writers-toolkit-inform-structure-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-inform-structure-handout'));
const writers-toolkit-peel-argument-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-peel-argument-handout'));
const writers-toolkit-revision-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-revision-handout'));
const writers-toolkit-rhetorical-devices-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-rhetorical-devices-handout'));
const writers-toolkit-show-dont-tell-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-show-dont-tell-handout'));
const writers-toolkit-suspense-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-suspense-handout'));
const writers-toolkit-tone-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-tone-handout'));
const year-9-starter-pack-alpha-build = lazy(() => import('./components/educational/handouts/year-9-starter-pack-alpha-build'));
const year-9-starter-pack-essential-skills = lazy(() => import('./components/educational/handouts/year-9-starter-pack-essential-skills'));
const youth-vaping-comprehension-handout = lazy(() => import('./components/educational/handouts/youth-vaping-comprehension-handout'));

const AiArtEthicsComprehension = lazy(() => import('./components/educational/handouts/AiArtEthicsComprehension'));
const AiArtEthicsComprehensionHandout = lazy(() => import('./components/educational/handouts/AiArtEthicsComprehensionHandout'));
const AiEthicsAndBias = lazy(() => import('./components/educational/handouts/AiEthicsAndBias'));
const AiImpactComprehensionHandout = lazy(() => import('./components/educational/handouts/AiImpactComprehensionHandout'));
const ArgumentsOfTinoRangatiratanga = lazy(() => import('./components/educational/handouts/ArgumentsOfTinoRangatiratanga'));
const ArgumentsOfTinoRangatiratangaHandout = lazy(() => import('./components/educational/handouts/ArgumentsOfTinoRangatiratangaHandout'));
const ArtOfHaka = lazy(() => import('./components/educational/handouts/ArtOfHaka'));
const ArtOfHakaHandout = lazy(() => import('./components/educational/handouts/ArtOfHakaHandout'));
const AtomsInEverydayMaterials = lazy(() => import('./components/educational/handouts/AtomsInEverydayMaterials'));
const AuthorsPurposeEntertainHandout = lazy(() => import('./components/educational/handouts/AuthorsPurposeEntertainHandout'));
const AuthorsPurposeHandout = lazy(() => import('./components/educational/handouts/AuthorsPurposeHandout'));
const AuthorsPurposeInformHandout = lazy(() => import('./components/educational/handouts/AuthorsPurposeInformHandout'));
const AuthorsPurposePersuadeHandout = lazy(() => import('./components/educational/handouts/AuthorsPurposePersuadeHandout'));
const BarGraphHandout = lazy(() => import('./components/educational/handouts/BarGraphHandout'));
const BiochemistryTraditionalMedicine = lazy(() => import('./components/educational/handouts/BiochemistryTraditionalMedicine'));
const BodyMeasurementTraditional = lazy(() => import('./components/educational/handouts/BodyMeasurementTraditional'));
const CeremonialCircleGeometry = lazy(() => import('./components/educational/handouts/CeremonialCircleGeometry'));
const ChildrenRightsResponsibilities = lazy(() => import('./components/educational/handouts/ChildrenRightsResponsibilities'));
const ClimateChangeAotearoaHandout = lazy(() => import('./components/educational/handouts/ClimateChangeAotearoaHandout'));
const ClimateEmergencyAotearoaHandout = lazy(() => import('./components/educational/handouts/ClimateEmergencyAotearoaHandout'));
const ClimateScienceTraditionalKnowledge = lazy(() => import('./components/educational/handouts/ClimateScienceTraditionalKnowledge'));
const CognitiveBiasesComprehensionHandout = lazy(() => import('./components/educational/handouts/CognitiveBiasesComprehensionHandout'));
const ColonizationPerspectivesHandout = lazy(() => import('./components/educational/handouts/ColonizationPerspectivesHandout'));
const CommunityHelpersStudy = lazy(() => import('./components/educational/handouts/CommunityHelpersStudy'));
const DataSovereigntyMaori = lazy(() => import('./components/educational/handouts/DataSovereigntyMaori'));
const DawnRaidsComprehensionHandout = lazy(() => import('./components/educational/handouts/DawnRaidsComprehensionHandout'));
const DecisionFrameworksComparisonGuide = lazy(() => import('./components/educational/handouts/DecisionFrameworksComparisonGuide'));
const DesignThinkingProcessHandout = lazy(() => import('./components/educational/handouts/DesignThinkingProcessHandout'));
const DigitalCitizenshipHandout = lazy(() => import('./components/educational/handouts/DigitalCitizenshipHandout'));
const EconomicChoicesBasics = lazy(() => import('./components/educational/handouts/EconomicChoicesBasics'));
const EconomicJusticeDeepDiveComprehension = lazy(() => import('./components/educational/handouts/EconomicJusticeDeepDiveComprehension'));
const EcosystemSurveyChecklist = lazy(() => import('./components/educational/handouts/EcosystemSurveyChecklist'));
const ElementsOfArtHandout = lazy(() => import('./components/educational/handouts/ElementsOfArtHandout'));
const EndemicSpeciesAdaptation = lazy(() => import('./components/educational/handouts/EndemicSpeciesAdaptation'));
const EnvironmentalImpactStudy = lazy(() => import('./components/educational/handouts/EnvironmentalImpactStudy'));
const EnvironmentalLiteracyFramework = lazy(() => import('./components/educational/handouts/EnvironmentalLiteracyFramework'));
const EnvironmentalTextAnalysisHandout = lazy(() => import('./components/educational/handouts/EnvironmentalTextAnalysisHandout'));
const EvidenceEvaluationFramework = lazy(() => import('./components/educational/handouts/EvidenceEvaluationFramework'));
const FamilyTreeExploration = lazy(() => import('./components/educational/handouts/FamilyTreeExploration'));
const FamilyTreeWriting = lazy(() => import('./components/educational/handouts/FamilyTreeWriting'));
const FigurativeLanguageHandout = lazy(() => import('./components/educational/handouts/FigurativeLanguageHandout'));
const FilmSceneAnalysisHandout = lazy(() => import('./components/educational/handouts/FilmSceneAnalysisHandout'));
const FinancialLiteracyComprehensionHandout = lazy(() => import('./components/educational/handouts/FinancialLiteracyComprehensionHandout'));
const FireMakingEnergy = lazy(() => import('./components/educational/handouts/FireMakingEnergy'));
const ForestEcosystemConnections = lazy(() => import('./components/educational/handouts/ForestEcosystemConnections'));
const FutureOfTourismComprehensionHandout = lazy(() => import('./components/educational/handouts/FutureOfTourismComprehensionHandout'));
const FutureVisioningCreativeWriting = lazy(() => import('./components/educational/handouts/FutureVisioningCreativeWriting'));
const GardenPlotMeasurement = lazy(() => import('./components/educational/handouts/GardenPlotMeasurement'));
const GardenPlotScience = lazy(() => import('./components/educational/handouts/GardenPlotScience'));
const GeneticModificationComprehensionHandout = lazy(() => import('./components/educational/handouts/GeneticModificationComprehensionHandout'));
const GigEconomyComprehensionHandout = lazy(() => import('./components/educational/handouts/GigEconomyComprehensionHandout'));
const HakaComprehensionHandout = lazy(() => import('./components/educational/handouts/HakaComprehensionHandout'));
const HangiFractionsSharing = lazy(() => import('./components/educational/handouts/HangiFractionsSharing'));
const HangiHeatTransfer = lazy(() => import('./components/educational/handouts/HangiHeatTransfer'));
const HousingAffordabilityComprehensionHandout = lazy(() => import('./components/educational/handouts/HousingAffordabilityComprehensionHandout'));
const HowEconomyWorks = lazy(() => import('./components/educational/handouts/HowEconomyWorks'));
const Index = lazy(() => import('./components/educational/handouts/Index'));
const IndigenousRightsResearch = lazy(() => import('./components/educational/handouts/IndigenousRightsResearch'));
const IntroductionToLlms = lazy(() => import('./components/educational/handouts/IntroductionToLlms'));
const IwiEconomicsMathematics = lazy(() => import('./components/educational/handouts/IwiEconomicsMathematics'));
const IwiPopulationGraphs = lazy(() => import('./components/educational/handouts/IwiPopulationGraphs'));
const KumaraStoragePlaceValue = lazy(() => import('./components/educational/handouts/KumaraStoragePlaceValue'));
const LandWarsStrategy = lazy(() => import('./components/educational/handouts/LandWarsStrategy'));
const LanguageRevitalizationGrowth = lazy(() => import('./components/educational/handouts/LanguageRevitalizationGrowth'));
const LifeInThePast = lazy(() => import('./components/educational/handouts/LifeInThePast'));
const LocalAreaExploration = lazy(() => import('./components/educational/handouts/LocalAreaExploration'));
const LocalAreaHistory = lazy(() => import('./components/educational/handouts/LocalAreaHistory'));
const LogicalFallaciesDetectionGuide = lazy(() => import('./components/educational/handouts/LogicalFallaciesDetectionGuide'));
const MaoriAstronomyNavigationHandout = lazy(() => import('./components/educational/handouts/MaoriAstronomyNavigationHandout'));
const MaoriBattalionLegacy = lazy(() => import('./components/educational/handouts/MaoriBattalionLegacy'));
const MaraeBlueprintScaling = lazy(() => import('./components/educational/handouts/MaraeBlueprintScaling'));
const MaraeShapesGeometry = lazy(() => import('./components/educational/handouts/MaraeShapesGeometry'));
const MaramatakaTimeMathematics = lazy(() => import('./components/educational/handouts/MaramatakaTimeMathematics'));
const MediaLiteracyComprehensionHandoutV2 = lazy(() => import('./components/educational/handouts/MediaLiteracyComprehensionHandout.V2'));
const MediaLiteracyComprehensionHandout = lazy(() => import('./components/educational/handouts/MediaLiteracyComprehensionHandout'));
const MicroplasticsComprehensionHandout = lazy(() => import('./components/educational/handouts/MicroplasticsComprehensionHandout'));
const MicroplasticsMataurangaIntegration = lazy(() => import('./components/educational/handouts/MicroplasticsMataurangaIntegration'));
const MisleadingGraphsComprehensionHandout = lazy(() => import('./components/educational/handouts/MisleadingGraphsComprehensionHandout'));
const MulticulturalNewZealand = lazy(() => import('./components/educational/handouts/MulticulturalNewZealand'));
const NativeBirdLifecycles = lazy(() => import('./components/educational/handouts/NativeBirdLifecycles'));
const NatureObservationJournal = lazy(() => import('./components/educational/handouts/NatureObservationJournal'));
const NzEvolutionExamples = lazy(() => import('./components/educational/handouts/NzEvolutionExamples'));
const NzGeographyBasics = lazy(() => import('./components/educational/handouts/NzGeographyBasics'));
const NzGeologicalProcesses = lazy(() => import('./components/educational/handouts/NzGeologicalProcesses'));
const NzHousingCrisisHandout = lazy(() => import('./components/educational/handouts/NzHousingCrisisHandout'));
const OralStorytellingHandout = lazy(() => import('./components/educational/handouts/OralStorytellingHandout'));
const PersonalTimelineActivity = lazy(() => import('./components/educational/handouts/PersonalTimelineActivity'));
const PhysicsOfTraditionalGames = lazy(() => import('./components/educational/handouts/PhysicsOfTraditionalGames'));
const PlaceDescriptionHandout = lazy(() => import('./components/educational/handouts/PlaceDescriptionHandout'));
const PlateTectonicsComprehensionHandout = lazy(() => import('./components/educational/handouts/PlateTectonicsComprehensionHandout'));
const PoliticalCartoonAnalysisHandout = lazy(() => import('./components/educational/handouts/PoliticalCartoonAnalysisHandout'));
const PopulationTrendsAnalysis = lazy(() => import('./components/educational/handouts/PopulationTrendsAnalysis'));
const PreColonialInnovation = lazy(() => import('./components/educational/handouts/PreColonialInnovation'));
const PrimarySourceAnalysis1975MemorialOfRight = lazy(() => import('./components/educational/handouts/PrimarySourceAnalysis1975MemorialOfRight'));
const ProbabilityHandout = lazy(() => import('./components/educational/handouts/ProbabilityHandout'));
const PromptEngineering101 = lazy(() => import('./components/educational/handouts/PromptEngineering101'));
const RecipeScalingMathematics = lazy(() => import('./components/educational/handouts/RecipeScalingMathematics'));
const RenewableEnergyTraditional = lazy(() => import('./components/educational/handouts/RenewableEnergyTraditional'));
const ResearchMethodsHandout = lazy(() => import('./components/educational/handouts/ResearchMethodsHandout'));
const ResourceAllocationAlgebra = lazy(() => import('./components/educational/handouts/ResourceAllocationAlgebra'));
const ResourceSustainabilityStudy = lazy(() => import('./components/educational/handouts/ResourceSustainabilityStudy'));
const ScienceOfSleepComprehensionHandout = lazy(() => import('./components/educational/handouts/ScienceOfSleepComprehensionHandout'));
const ScientificMethodHandout = lazy(() => import('./components/educational/handouts/ScientificMethodHandout'));
const ShakespeareSoliloquyHandout = lazy(() => import('./components/educational/handouts/ShakespeareSoliloquyHandout'));
const SocialMovementsIntroduction = lazy(() => import('./components/educational/handouts/SocialMovementsIntroduction'));
const SpeechAnalysisHandout = lazy(() => import('./components/educational/handouts/SpeechAnalysisHandout'));
const StatisticalInvestigationHandout = lazy(() => import('./components/educational/handouts/StatisticalInvestigationHandout'));
const StoryToLifeConnections = lazy(() => import('./components/educational/handouts/StoryToLifeConnections'));
const SustainableEnergySystems = lazy(() => import('./components/educational/handouts/SustainableEnergySystems'));
const SustainableFishingEquations = lazy(() => import('./components/educational/handouts/SustainableFishingEquations'));
const SustainableTechnologyDesignChallenge = lazy(() => import('./components/educational/handouts/SustainableTechnologyDesignChallenge'));
const TeReoMaoriFoundationalConcepts = lazy(() => import('./components/educational/handouts/TeReoMaoriFoundationalConcepts'));
const TeReoMaoriGreetingsHandout = lazy(() => import('./components/educational/handouts/TeReoMaoriGreetingsHandout'));
const TeReoMathsGlossaryBilingualAlpha = lazy(() => import('./components/educational/handouts/TeReoMathsGlossaryBilingualAlpha'));
const TeReoPhonicsHandout = lazy(() => import('./components/educational/handouts/TeReoPhonicsHandout'));
const TedPowerYetHandout = lazy(() => import('./components/educational/handouts/TedPowerYetHandout'));
const ThenAndNowComparison = lazy(() => import('./components/educational/handouts/ThenAndNowComparison'));
const TraditionalCountingSystems = lazy(() => import('./components/educational/handouts/TraditionalCountingSystems'));
const TraditionalDyeChemistry = lazy(() => import('./components/educational/handouts/TraditionalDyeChemistry'));
const TraditionalEcologicalIndicatorsHandout = lazy(() => import('./components/educational/handouts/TraditionalEcologicalIndicatorsHandout'));
const TraditionalMaterialsScience = lazy(() => import('./components/educational/handouts/TraditionalMaterialsScience'));
const TraditionalNavigationMathematicsHandout = lazy(() => import('./components/educational/handouts/TraditionalNavigationMathematicsHandout'));
const TreatyOfWaitangiHandout = lazy(() => import('./components/educational/handouts/TreatyOfWaitangiHandout'));
const TreatySettlementStatistics = lazy(() => import('./components/educational/handouts/TreatySettlementStatistics'));
const TreatyStoriesAnalysis = lazy(() => import('./components/educational/handouts/TreatyStoriesAnalysis'));
const TukutukuPatternsMaths = lazy(() => import('./components/educational/handouts/TukutukuPatternsMaths'));
const TūRangawaewaeMapping = lazy(() => import('./components/educational/handouts/TūRangawaewaeMapping'));
const Unit2ColonialMaoriPerspectiveComparison = lazy(() => import('./components/educational/handouts/Unit2ColonialMaoriPerspectiveComparison'));
const Unit2FortificationEngineering = lazy(() => import('./components/educational/handouts/Unit2FortificationEngineering'));
const Unit2InnovationDomainsComparison = lazy(() => import('./components/educational/handouts/Unit2InnovationDomainsComparison'));
const Unit2LeadershipProfilesWars = lazy(() => import('./components/educational/handouts/Unit2LeadershipProfilesWars'));
const Unit2MaoriBattalionLegacy = lazy(() => import('./components/educational/handouts/Unit2MaoriBattalionLegacy'));
const Unit2MilitaryInnovationStudy = lazy(() => import('./components/educational/handouts/Unit2MilitaryInnovationStudy'));
const Unit2ModernApplicationsConnection = lazy(() => import('./components/educational/handouts/Unit2ModernApplicationsConnection'));
const Unit2PreColonialInnovationDeepDive = lazy(() => import('./components/educational/handouts/Unit2PreColonialInnovationDeepDive'));
const Unit2TechnologyDefinitionChallenge = lazy(() => import('./components/educational/handouts/Unit2TechnologyDefinitionChallenge'));
const Unit2TraditionalSciencePrimarySources = lazy(() => import('./components/educational/handouts/Unit2TraditionalSciencePrimarySources'));
const Unit2UrbanIdentityFormation = lazy(() => import('./components/educational/handouts/Unit2UrbanIdentityFormation'));
const Unit2UrbanMigrationStories = lazy(() => import('./components/educational/handouts/Unit2UrbanMigrationStories'));
const Unit2WarsStrategyAnalysis = lazy(() => import('./components/educational/handouts/Unit2WarsStrategyAnalysis'));
const UrbanMaoriIdentity = lazy(() => import('./components/educational/handouts/UrbanMaoriIdentity'));
const ValueSystemsComparison = lazy(() => import('./components/educational/handouts/ValueSystemsComparison'));
const WaitangiTribunalCases = lazy(() => import('./components/educational/handouts/WaitangiTribunalCases'));
const WakaConstructionGeometry = lazy(() => import('./components/educational/handouts/WakaConstructionGeometry'));
const WakaPhysicsBasics = lazy(() => import('./components/educational/handouts/WakaPhysicsBasics'));
const WaterCycleCultural = lazy(() => import('./components/educational/handouts/WaterCycleCultural'));
const WeatherCalendarGraphs = lazy(() => import('./components/educational/handouts/WeatherCalendarGraphs'));
const WeatherPredictionProbability = lazy(() => import('./components/educational/handouts/WeatherPredictionProbability'));
const WeatherPredictionTraditional = lazy(() => import('./components/educational/handouts/WeatherPredictionTraditional'));
const WhakapapaMatematicalThinking = lazy(() => import('./components/educational/handouts/WhakapapaMatematicalThinking'));
const WhakapapaMathematics = lazy(() => import('./components/educational/handouts/WhakapapaMathematics'));
const WritersToolkitAnalogyHandout = lazy(() => import('./components/educational/handouts/WritersToolkitAnalogyHandout'));
const WritersToolkitConclusionHandout = lazy(() => import('./components/educational/handouts/WritersToolkitConclusionHandout'));
const WritersToolkitDictionHandout = lazy(() => import('./components/educational/handouts/WritersToolkitDictionHandout'));
const WritersToolkitFluencyHandout = lazy(() => import('./components/educational/handouts/WritersToolkitFluencyHandout'));
const WritersToolkitHookHandout = lazy(() => import('./components/educational/handouts/WritersToolkitHookHandout'));
const WritersToolkitInformStructureHandout = lazy(() => import('./components/educational/handouts/WritersToolkitInformStructureHandout'));
const WritersToolkitPeelArgumentHandout = lazy(() => import('./components/educational/handouts/WritersToolkitPeelArgumentHandout'));
const WritersToolkitRevisionHandout = lazy(() => import('./components/educational/handouts/WritersToolkitRevisionHandout'));
const WritersToolkitRhetoricalDevicesHandout = lazy(() => import('./components/educational/handouts/WritersToolkitRhetoricalDevicesHandout'));
const WritersToolkitShowDontTellHandout = lazy(() => import('./components/educational/handouts/WritersToolkitShowDontTellHandout'));
const WritersToolkitSuspenseHandout = lazy(() => import('./components/educational/handouts/WritersToolkitSuspenseHandout'));
const WritersToolkitToneHandout = lazy(() => import('./components/educational/handouts/WritersToolkitToneHandout'));
const Year9StarterPackAlphaBuild = lazy(() => import('./components/educational/handouts/Year9StarterPackAlphaBuild'));
const Year9StarterPackEssentialSkills = lazy(() => import('./components/educational/handouts/Year9StarterPackEssentialSkills'));
const YouthVapingComprehensionHandout = lazy(() => import('./components/educational/handouts/YouthVapingComprehensionHandout'));
const ai-impact-comprehension-handout = lazy(() => import('./components/educational/handouts/ai-impact-comprehension-handout'));
const atoms-in-everyday-materials = lazy(() => import('./components/educational/handouts/atoms-in-everyday-materials'));
const authors-purpose-entertain-handout = lazy(() => import('./components/educational/handouts/authors-purpose-entertain-handout'));
const authors-purpose-handout = lazy(() => import('./components/educational/handouts/authors-purpose-handout'));
const authors-purpose-inform-handout = lazy(() => import('./components/educational/handouts/authors-purpose-inform-handout'));
const authors-purpose-persuade-handout = lazy(() => import('./components/educational/handouts/authors-purpose-persuade-handout'));
const bar-graph-handout = lazy(() => import('./components/educational/handouts/bar-graph-handout'));
const biochemistry-traditional-medicine = lazy(() => import('./components/educational/handouts/biochemistry-traditional-medicine'));
const body-measurement-traditional = lazy(() => import('./components/educational/handouts/body-measurement-traditional'));
const ceremonial-circle-geometry = lazy(() => import('./components/educational/handouts/ceremonial-circle-geometry'));
const children-rights-responsibilities = lazy(() => import('./components/educational/handouts/children-rights-responsibilities'));
const climate-change-aotearoa-handout = lazy(() => import('./components/educational/handouts/climate-change-aotearoa-handout'));
const climate-emergency-aotearoa-handout = lazy(() => import('./components/educational/handouts/climate-emergency-aotearoa-handout'));
const cognitive-biases-comprehension-handout = lazy(() => import('./components/educational/handouts/cognitive-biases-comprehension-handout'));
const colonization-perspectives-handout = lazy(() => import('./components/educational/handouts/colonization-perspectives-handout'));
const community-helpers-study = lazy(() => import('./components/educational/handouts/community-helpers-study'));
const community-needs-survey = lazy(() => import('./components/educational/handouts/community-needs-survey'));
const cultural-celebrations-comparison = lazy(() => import('./components/educational/handouts/cultural-celebrations-comparison'));
const cultural-decision-making-traditions = lazy(() => import('./components/educational/handouts/cultural-decision-making-traditions'));
const cultural-heroes-comprehension = lazy(() => import('./components/educational/handouts/cultural-heroes-comprehension'));
const cultural-identity-deep-dive-comprehension = lazy(() => import('./components/educational/handouts/cultural-identity-deep-dive-comprehension'));
const cultural-practice-explanation = lazy(() => import('./components/educational/handouts/cultural-practice-explanation'));
const cultural-preservation-essays = lazy(() => import('./components/educational/handouts/cultural-preservation-essays'));
const cultural-safety-classroom-checklists-alpha = lazy(() => import('./components/educational/handouts/cultural-safety-classroom-checklists-alpha'));
const cultural-stem-assessment-rubric = lazy(() => import('./components/educational/handouts/cultural-stem-assessment-rubric'));
const cultural-stories-comprehension = lazy(() => import('./components/educational/handouts/cultural-stories-comprehension'));
const family-data-collection = lazy(() => import('./components/educational/handouts/family-data-collection'));
const family-tree-writing = lazy(() => import('./components/educational/handouts/family-tree-writing'));
const future-visioning-creative-writing = lazy(() => import('./components/educational/handouts/future-visioning-creative-writing'));
const indigenous-rights-research = lazy(() => import('./components/educational/handouts/indigenous-rights-research'));
const iwi-economics-mathematics = lazy(() => import('./components/educational/handouts/iwi-economics-mathematics'));
const kaitiaki-generated-migration-student-handout = lazy(() => import('./components/educational/handouts/kaitiaki-generated-migration-student-handout'));
const kaitiakitanga-field-journal = lazy(() => import('./components/educational/handouts/kaitiakitanga-field-journal'));
const kaitiakitanga-kids = lazy(() => import('./components/educational/handouts/kaitiakitanga-kids'));
const kumara-storage-place-value = lazy(() => import('./components/educational/handouts/kumara-storage-place-value'));
const maori-astronomy-navigation-handout = lazy(() => import('./components/educational/handouts/maori-astronomy-navigation-handout'));
const maori-geometric-patterns-handout = lazy(() => import('./components/educational/handouts/maori-geometric-patterns-handout'));
const maori-navigation-wayfinding-handout = lazy(() => import('./components/educational/handouts/maori-navigation-wayfinding-handout'));
const marae-shapes-geometry = lazy(() => import('./components/educational/handouts/marae-shapes-geometry'));
const mountain-navigation-trigonometry = lazy(() => import('./components/educational/handouts/mountain-navigation-trigonometry'));
const nature-observation-journal = lazy(() => import('./components/educational/handouts/nature-observation-journal'));
const oral-storytelling-handout = lazy(() => import('./components/educational/handouts/oral-storytelling-handout'));
const physics-of-traditional-games = lazy(() => import('./components/educational/handouts/physics-of-traditional-games'));
const probability-handout = lazy(() => import('./components/educational/handouts/probability-handout'));
const renewable-energy-traditional = lazy(() => import('./components/educational/handouts/renewable-energy-traditional'));
const research-methods-handout = lazy(() => import('./components/educational/handouts/research-methods-handout'));
const resource-sustainability-study = lazy(() => import('./components/educational/handouts/resource-sustainability-study'));
const scientific-method-handout = lazy(() => import('./components/educational/handouts/scientific-method-handout'));
const star-navigation-coordinates = lazy(() => import('./components/educational/handouts/star-navigation-coordinates'));
const sustainable-fishing-equations = lazy(() => import('./components/educational/handouts/sustainable-fishing-equations'));
const sustainable-technology-design-challenge = lazy(() => import('./components/educational/handouts/sustainable-technology-design-challenge'));
const traditional-counting-systems = lazy(() => import('./components/educational/handouts/traditional-counting-systems'));
const traditional-dye-chemistry = lazy(() => import('./components/educational/handouts/traditional-dye-chemistry'));
const traditional-ecological-indicators-handout = lazy(() => import('./components/educational/handouts/traditional-ecological-indicators-handout'));
const traditional-materials-science = lazy(() => import('./components/educational/handouts/traditional-materials-science'));
const traditional-navigation-mathematics-handout = lazy(() => import('./components/educational/handouts/traditional-navigation-mathematics-handout'));
const treaty-settlement-statistics = lazy(() => import('./components/educational/handouts/treaty-settlement-statistics'));
const tukutuku-patterns-maths = lazy(() => import('./components/educational/handouts/tukutuku-patterns-maths'));
const unit-2-technology-definition-challenge = lazy(() => import('./components/educational/handouts/unit-2-technology-definition-challenge'));
const weather-prediction-probability = lazy(() => import('./components/educational/handouts/weather-prediction-probability'));
const writers-toolkit-conclusion-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-conclusion-handout'));
const writers-toolkit-diction-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-diction-handout'));
const writers-toolkit-fluency-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-fluency-handout'));
const writers-toolkit-hook-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-hook-handout'));
const writers-toolkit-inform-structure-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-inform-structure-handout'));
const writers-toolkit-peel-argument-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-peel-argument-handout'));
const writers-toolkit-revision-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-revision-handout'));
const writers-toolkit-rhetorical-devices-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-rhetorical-devices-handout'));
const writers-toolkit-show-dont-tell-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-show-dont-tell-handout'));
const writers-toolkit-suspense-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-suspense-handout'));
const writers-toolkit-tone-handout = lazy(() => import('./components/educational/handouts/writers-toolkit-tone-handout'));
const year-9-starter-pack-alpha-build = lazy(() => import('./components/educational/handouts/year-9-starter-pack-alpha-build'));
const year-9-starter-pack-essential-skills = lazy(() => import('./components/educational/handouts/year-9-starter-pack-essential-skills'));
const youth-vaping-comprehension-handout = lazy(() => import('./components/educational/handouts/youth-vaping-comprehension-handout'));
const CulturalStories = lazy(() => import('./pages/CulturalStories'));
const DesignThinking = lazy(() => import('./pages/DesignThinking'));
const EnvironmentalLiteracy = lazy(() => import('./pages/EnvironmentalLiteracy'));
const GovernmentComponentAnalysis = lazy(() => import('./pages/GovernmentComponentAnalysis'));
const IndigenousWisdomSynthesis = lazy(() => import('./pages/IndigenousWisdomSynthesis'));
const MaoriAstronomy = lazy(() => import('./pages/MaoriAstronomy'));
const MaoriBattalionLegacy = lazy(() => import('./pages/MaoriBattalionLegacy'));
const Resources = lazy(() => import('./pages/Resources'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const TeReoPhonics = lazy(() => import('./pages/TeReoPhonics'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const Year10CulturalGeometry = lazy(() => import('./pages/Year10CulturalGeometry'));

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
      { path: '/aiartethicscomprehension', element: <AiArtEthicsComprehension /> },
      { path: '/aiartethicscomprehensionhandout', element: <AiArtEthicsComprehensionHandout /> },
      { path: '/aiethicsandbias', element: <AiEthicsAndBias /> },
      { path: '/aiimpactcomprehensionhandout', element: <AiImpactComprehensionHandout /> },
      { path: '/argumentsoftinorangatiratanga', element: <ArgumentsOfTinoRangatiratanga /> },
      { path: '/argumentsoftinorangatiratangahandout', element: <ArgumentsOfTinoRangatiratangaHandout /> },
      { path: '/artofhaka', element: <ArtOfHaka /> },
      { path: '/artofhakahandout', element: <ArtOfHakaHandout /> },
      { path: '/atomsineverydaymaterials', element: <AtomsInEverydayMaterials /> },
      { path: '/authorspurposeentertainhandout', element: <AuthorsPurposeEntertainHandout /> },
      { path: '/authorspurposehandout', element: <AuthorsPurposeHandout /> },
      { path: '/authorspurposeinformhandout', element: <AuthorsPurposeInformHandout /> },
      { path: '/authorspurposepersuadehandout', element: <AuthorsPurposePersuadeHandout /> },
      { path: '/bargraphhandout', element: <BarGraphHandout /> },
      { path: '/biochemistrytraditionalmedicine', element: <BiochemistryTraditionalMedicine /> },
      { path: '/bodymeasurementtraditional', element: <BodyMeasurementTraditional /> },
      { path: '/ceremonialcirclegeometry', element: <CeremonialCircleGeometry /> },
      { path: '/childrenrightsresponsibilities', element: <ChildrenRightsResponsibilities /> },
      { path: '/climatechangeaotearoahandout', element: <ClimateChangeAotearoaHandout /> },
      { path: '/climateemergencyaotearoahandout', element: <ClimateEmergencyAotearoaHandout /> },
      { path: '/climatesciencetraditionalknowledge', element: <ClimateScienceTraditionalKnowledge /> },
      { path: '/cognitivebiasescomprehensionhandout', element: <CognitiveBiasesComprehensionHandout /> },
      { path: '/colonizationperspectiveshandout', element: <ColonizationPerspectivesHandout /> },
      { path: '/communityhelpersstudy', element: <CommunityHelpersStudy /> },
      { path: '/datasovereigntymaori', element: <DataSovereigntyMaori /> },
      { path: '/dawnraidscomprehensionhandout', element: <DawnRaidsComprehensionHandout /> },
      { path: '/decisionframeworkscomparisonguide', element: <DecisionFrameworksComparisonGuide /> },
      { path: '/designthinkingprocesshandout', element: <DesignThinkingProcessHandout /> },
      { path: '/digitalcitizenshiphandout', element: <DigitalCitizenshipHandout /> },
      { path: '/economicchoicesbasics', element: <EconomicChoicesBasics /> },
      { path: '/economicjusticedeepdivecomprehension', element: <EconomicJusticeDeepDiveComprehension /> },
      { path: '/ecosystemsurveychecklist', element: <EcosystemSurveyChecklist /> },
      { path: '/elementsofarthandout', element: <ElementsOfArtHandout /> },
      { path: '/endemicspeciesadaptation', element: <EndemicSpeciesAdaptation /> },
      { path: '/environmentalimpactstudy', element: <EnvironmentalImpactStudy /> },
      { path: '/environmentalliteracyframework', element: <EnvironmentalLiteracyFramework /> },
      { path: '/environmentaltextanalysishandout', element: <EnvironmentalTextAnalysisHandout /> },
      { path: '/evidenceevaluationframework', element: <EvidenceEvaluationFramework /> },
      { path: '/familytreeexploration', element: <FamilyTreeExploration /> },
      { path: '/familytreewriting', element: <FamilyTreeWriting /> },
      { path: '/figurativelanguagehandout', element: <FigurativeLanguageHandout /> },
      { path: '/filmsceneanalysishandout', element: <FilmSceneAnalysisHandout /> },
      { path: '/financialliteracycomprehensionhandout', element: <FinancialLiteracyComprehensionHandout /> },
      { path: '/firemakingenergy', element: <FireMakingEnergy /> },
      { path: '/forestecosystemconnections', element: <ForestEcosystemConnections /> },
      { path: '/futureoftourismcomprehensionhandout', element: <FutureOfTourismComprehensionHandout /> },
      { path: '/futurevisioningcreativewriting', element: <FutureVisioningCreativeWriting /> },
      { path: '/gardenplotmeasurement', element: <GardenPlotMeasurement /> },
      { path: '/gardenplotscience', element: <GardenPlotScience /> },
      { path: '/geneticmodificationcomprehensionhandout', element: <GeneticModificationComprehensionHandout /> },
      { path: '/gigeconomycomprehensionhandout', element: <GigEconomyComprehensionHandout /> },
      { path: '/hakacomprehensionhandout', element: <HakaComprehensionHandout /> },
      { path: '/hangifractionssharing', element: <HangiFractionsSharing /> },
      { path: '/hangiheattransfer', element: <HangiHeatTransfer /> },
      { path: '/housingaffordabilitycomprehensionhandout', element: <HousingAffordabilityComprehensionHandout /> },
      { path: '/howeconomyworks', element: <HowEconomyWorks /> },
      { path: '/index', element: <Index /> },
      { path: '/indigenousrightsresearch', element: <IndigenousRightsResearch /> },
      { path: '/introductiontollms', element: <IntroductionToLlms /> },
      { path: '/iwieconomicsmathematics', element: <IwiEconomicsMathematics /> },
      { path: '/iwipopulationgraphs', element: <IwiPopulationGraphs /> },
      { path: '/kumarastorageplacevalue', element: <KumaraStoragePlaceValue /> },
      { path: '/landwarsstrategy', element: <LandWarsStrategy /> },
      { path: '/languagerevitalizationgrowth', element: <LanguageRevitalizationGrowth /> },
      { path: '/lifeinthepast', element: <LifeInThePast /> },
      { path: '/localareaexploration', element: <LocalAreaExploration /> },
      { path: '/localareahistory', element: <LocalAreaHistory /> },
      { path: '/logicalfallaciesdetectionguide', element: <LogicalFallaciesDetectionGuide /> },
      { path: '/maoriastronomynavigationhandout', element: <MaoriAstronomyNavigationHandout /> },
      { path: '/maoribattalionlegacy', element: <MaoriBattalionLegacy /> },
      { path: '/maraeblueprintscaling', element: <MaraeBlueprintScaling /> },
      { path: '/maraeshapesgeometry', element: <MaraeShapesGeometry /> },
      { path: '/maramatakatimemathematics', element: <MaramatakaTimeMathematics /> },
      { path: '/medialiteracycomprehensionhandout-v2', element: <MediaLiteracyComprehensionHandoutV2 /> },
      { path: '/medialiteracycomprehensionhandout', element: <MediaLiteracyComprehensionHandout /> },
      { path: '/microplasticscomprehensionhandout', element: <MicroplasticsComprehensionHandout /> },
      { path: '/microplasticsmataurangaintegration', element: <MicroplasticsMataurangaIntegration /> },
      { path: '/misleadinggraphscomprehensionhandout', element: <MisleadingGraphsComprehensionHandout /> },
      { path: '/multiculturalnewzealand', element: <MulticulturalNewZealand /> },
      { path: '/nativebirdlifecycles', element: <NativeBirdLifecycles /> },
      { path: '/natureobservationjournal', element: <NatureObservationJournal /> },
      { path: '/nzevolutionexamples', element: <NzEvolutionExamples /> },
      { path: '/nzgeographybasics', element: <NzGeographyBasics /> },
      { path: '/nzgeologicalprocesses', element: <NzGeologicalProcesses /> },
      { path: '/nzhousingcrisishandout', element: <NzHousingCrisisHandout /> },
      { path: '/oralstorytellinghandout', element: <OralStorytellingHandout /> },
      { path: '/personaltimelineactivity', element: <PersonalTimelineActivity /> },
      { path: '/physicsoftraditionalgames', element: <PhysicsOfTraditionalGames /> },
      { path: '/placedescriptionhandout', element: <PlaceDescriptionHandout /> },
      { path: '/platetectonicscomprehensionhandout', element: <PlateTectonicsComprehensionHandout /> },
      { path: '/politicalcartoonanalysishandout', element: <PoliticalCartoonAnalysisHandout /> },
      { path: '/populationtrendsanalysis', element: <PopulationTrendsAnalysis /> },
      { path: '/precolonialinnovation', element: <PreColonialInnovation /> },
      { path: '/primarysourceanalysis1975memorialofright', element: <PrimarySourceAnalysis1975MemorialOfRight /> },
      { path: '/probabilityhandout', element: <ProbabilityHandout /> },
      { path: '/promptengineering101', element: <PromptEngineering101 /> },
      { path: '/recipescalingmathematics', element: <RecipeScalingMathematics /> },
      { path: '/renewableenergytraditional', element: <RenewableEnergyTraditional /> },
      { path: '/researchmethodshandout', element: <ResearchMethodsHandout /> },
      { path: '/resourceallocationalgebra', element: <ResourceAllocationAlgebra /> },
      { path: '/resourcesustainabilitystudy', element: <ResourceSustainabilityStudy /> },
      { path: '/scienceofsleepcomprehensionhandout', element: <ScienceOfSleepComprehensionHandout /> },
      { path: '/scientificmethodhandout', element: <ScientificMethodHandout /> },
      { path: '/shakespearesoliloquyhandout', element: <ShakespeareSoliloquyHandout /> },
      { path: '/socialmovementsintroduction', element: <SocialMovementsIntroduction /> },
      { path: '/speechanalysishandout', element: <SpeechAnalysisHandout /> },
      { path: '/statisticalinvestigationhandout', element: <StatisticalInvestigationHandout /> },
      { path: '/storytolifeconnections', element: <StoryToLifeConnections /> },
      { path: '/sustainableenergysystems', element: <SustainableEnergySystems /> },
      { path: '/sustainablefishingequations', element: <SustainableFishingEquations /> },
      { path: '/sustainabletechnologydesignchallenge', element: <SustainableTechnologyDesignChallenge /> },
      { path: '/tereomaorifoundationalconcepts', element: <TeReoMaoriFoundationalConcepts /> },
      { path: '/tereomaorigreetingshandout', element: <TeReoMaoriGreetingsHandout /> },
      { path: '/tereomathsglossarybilingualalpha', element: <TeReoMathsGlossaryBilingualAlpha /> },
      { path: '/tereophonicshandout', element: <TeReoPhonicsHandout /> },
      { path: '/tedpoweryethandout', element: <TedPowerYetHandout /> },
      { path: '/thenandnowcomparison', element: <ThenAndNowComparison /> },
      { path: '/traditionalcountingsystems', element: <TraditionalCountingSystems /> },
      { path: '/traditionaldyechemistry', element: <TraditionalDyeChemistry /> },
      { path: '/traditionalecologicalindicatorshandout', element: <TraditionalEcologicalIndicatorsHandout /> },
      { path: '/traditionalmaterialsscience', element: <TraditionalMaterialsScience /> },
      { path: '/traditionalnavigationmathematicshandout', element: <TraditionalNavigationMathematicsHandout /> },
      { path: '/treatyofwaitangihandout', element: <TreatyOfWaitangiHandout /> },
      { path: '/treatysettlementstatistics', element: <TreatySettlementStatistics /> },
      { path: '/treatystoriesanalysis', element: <TreatyStoriesAnalysis /> },
      { path: '/tukutukupatternsmaths', element: <TukutukuPatternsMaths /> },
      { path: '/t-rangawaewaemapping', element: <TūRangawaewaeMapping /> },
      { path: '/unit2colonialmaoriperspectivecomparison', element: <Unit2ColonialMaoriPerspectiveComparison /> },
      { path: '/unit2fortificationengineering', element: <Unit2FortificationEngineering /> },
      { path: '/unit2innovationdomainscomparison', element: <Unit2InnovationDomainsComparison /> },
      { path: '/unit2leadershipprofileswars', element: <Unit2LeadershipProfilesWars /> },
      { path: '/unit2maoribattalionlegacy', element: <Unit2MaoriBattalionLegacy /> },
      { path: '/unit2militaryinnovationstudy', element: <Unit2MilitaryInnovationStudy /> },
      { path: '/unit2modernapplicationsconnection', element: <Unit2ModernApplicationsConnection /> },
      { path: '/unit2precolonialinnovationdeepdive', element: <Unit2PreColonialInnovationDeepDive /> },
      { path: '/unit2technologydefinitionchallenge', element: <Unit2TechnologyDefinitionChallenge /> },
      { path: '/unit2traditionalscienceprimarysources', element: <Unit2TraditionalSciencePrimarySources /> },
      { path: '/unit2urbanidentityformation', element: <Unit2UrbanIdentityFormation /> },
      { path: '/unit2urbanmigrationstories', element: <Unit2UrbanMigrationStories /> },
      { path: '/unit2warsstrategyanalysis', element: <Unit2WarsStrategyAnalysis /> },
      { path: '/urbanmaoriidentity', element: <UrbanMaoriIdentity /> },
      { path: '/valuesystemscomparison', element: <ValueSystemsComparison /> },
      { path: '/waitangitribunalcases', element: <WaitangiTribunalCases /> },
      { path: '/wakaconstructiongeometry', element: <WakaConstructionGeometry /> },
      { path: '/wakaphysicsbasics', element: <WakaPhysicsBasics /> },
      { path: '/watercyclecultural', element: <WaterCycleCultural /> },
      { path: '/weathercalendargraphs', element: <WeatherCalendarGraphs /> },
      { path: '/weatherpredictionprobability', element: <WeatherPredictionProbability /> },
      { path: '/weatherpredictiontraditional', element: <WeatherPredictionTraditional /> },
      { path: '/whakapapamatematicalthinking', element: <WhakapapaMatematicalThinking /> },
      { path: '/whakapapamathematics', element: <WhakapapaMathematics /> },
      { path: '/writerstoolkitanalogyhandout', element: <WritersToolkitAnalogyHandout /> },
      { path: '/writerstoolkitconclusionhandout', element: <WritersToolkitConclusionHandout /> },
      { path: '/writerstoolkitdictionhandout', element: <WritersToolkitDictionHandout /> },
      { path: '/writerstoolkitfluencyhandout', element: <WritersToolkitFluencyHandout /> },
      { path: '/writerstoolkithookhandout', element: <WritersToolkitHookHandout /> },
      { path: '/writerstoolkitinformstructurehandout', element: <WritersToolkitInformStructureHandout /> },
      { path: '/writerstoolkitpeelargumenthandout', element: <WritersToolkitPeelArgumentHandout /> },
      { path: '/writerstoolkitrevisionhandout', element: <WritersToolkitRevisionHandout /> },
      { path: '/writerstoolkitrhetoricaldeviceshandout', element: <WritersToolkitRhetoricalDevicesHandout /> },
      { path: '/writerstoolkitshowdonttellhandout', element: <WritersToolkitShowDontTellHandout /> },
      { path: '/writerstoolkitsuspensehandout', element: <WritersToolkitSuspenseHandout /> },
      { path: '/writerstoolkittonehandout', element: <WritersToolkitToneHandout /> },
      { path: '/year9starterpackalphabuild', element: <Year9StarterPackAlphaBuild /> },
      { path: '/year9starterpackessentialskills', element: <Year9StarterPackEssentialSkills /> },
      { path: '/youthvapingcomprehensionhandout', element: <YouthVapingComprehensionHandout /> },
      { path: '/ai-impact-comprehension-handout', element: <ai-impact-comprehension-handout /> },
      { path: '/atoms-in-everyday-materials', element: <atoms-in-everyday-materials /> },
      { path: '/authors-purpose-entertain-handout', element: <authors-purpose-entertain-handout /> },
      { path: '/authors-purpose-handout', element: <authors-purpose-handout /> },
      { path: '/authors-purpose-inform-handout', element: <authors-purpose-inform-handout /> },
      { path: '/authors-purpose-persuade-handout', element: <authors-purpose-persuade-handout /> },
      { path: '/bar-graph-handout', element: <bar-graph-handout /> },
      { path: '/biochemistry-traditional-medicine', element: <biochemistry-traditional-medicine /> },
      { path: '/body-measurement-traditional', element: <body-measurement-traditional /> },
      { path: '/ceremonial-circle-geometry', element: <ceremonial-circle-geometry /> },
      { path: '/children-rights-responsibilities', element: <children-rights-responsibilities /> },
      { path: '/climate-change-aotearoa-handout', element: <climate-change-aotearoa-handout /> },
      { path: '/climate-emergency-aotearoa-handout', element: <climate-emergency-aotearoa-handout /> },
      { path: '/cognitive-biases-comprehension-handout', element: <cognitive-biases-comprehension-handout /> },
      { path: '/colonization-perspectives-handout', element: <colonization-perspectives-handout /> },
      { path: '/community-helpers-study', element: <community-helpers-study /> },
      { path: '/community-needs-survey', element: <community-needs-survey /> },
      { path: '/cultural-celebrations-comparison', element: <cultural-celebrations-comparison /> },
      { path: '/cultural-decision-making-traditions', element: <cultural-decision-making-traditions /> },
      { path: '/cultural-heroes-comprehension', element: <cultural-heroes-comprehension /> },
      { path: '/cultural-identity-deep-dive-comprehension', element: <cultural-identity-deep-dive-comprehension /> },
      { path: '/cultural-practice-explanation', element: <cultural-practice-explanation /> },
      { path: '/cultural-preservation-essays', element: <cultural-preservation-essays /> },
      { path: '/cultural-safety-classroom-checklists-alpha', element: <cultural-safety-classroom-checklists-alpha /> },
      { path: '/cultural-stem-assessment-rubric', element: <cultural-stem-assessment-rubric /> },
      { path: '/cultural-stories-comprehension', element: <cultural-stories-comprehension /> },
      { path: '/family-data-collection', element: <family-data-collection /> },
      { path: '/family-tree-writing', element: <family-tree-writing /> },
      { path: '/future-visioning-creative-writing', element: <future-visioning-creative-writing /> },
      { path: '/indigenous-rights-research', element: <indigenous-rights-research /> },
      { path: '/iwi-economics-mathematics', element: <iwi-economics-mathematics /> },
      { path: '/kaitiaki-generated-migration-student-handout', element: <kaitiaki-generated-migration-student-handout /> },
      { path: '/kaitiakitanga-field-journal', element: <kaitiakitanga-field-journal /> },
      { path: '/kaitiakitanga-kids', element: <kaitiakitanga-kids /> },
      { path: '/kumara-storage-place-value', element: <kumara-storage-place-value /> },
      { path: '/maori-astronomy-navigation-handout', element: <maori-astronomy-navigation-handout /> },
      { path: '/maori-geometric-patterns-handout', element: <maori-geometric-patterns-handout /> },
      { path: '/maori-navigation-wayfinding-handout', element: <maori-navigation-wayfinding-handout /> },
      { path: '/marae-shapes-geometry', element: <marae-shapes-geometry /> },
      { path: '/mountain-navigation-trigonometry', element: <mountain-navigation-trigonometry /> },
      { path: '/nature-observation-journal', element: <nature-observation-journal /> },
      { path: '/oral-storytelling-handout', element: <oral-storytelling-handout /> },
      { path: '/physics-of-traditional-games', element: <physics-of-traditional-games /> },
      { path: '/probability-handout', element: <probability-handout /> },
      { path: '/renewable-energy-traditional', element: <renewable-energy-traditional /> },
      { path: '/research-methods-handout', element: <research-methods-handout /> },
      { path: '/resource-sustainability-study', element: <resource-sustainability-study /> },
      { path: '/scientific-method-handout', element: <scientific-method-handout /> },
      { path: '/star-navigation-coordinates', element: <star-navigation-coordinates /> },
      { path: '/sustainable-fishing-equations', element: <sustainable-fishing-equations /> },
      { path: '/sustainable-technology-design-challenge', element: <sustainable-technology-design-challenge /> },
      { path: '/traditional-counting-systems', element: <traditional-counting-systems /> },
      { path: '/traditional-dye-chemistry', element: <traditional-dye-chemistry /> },
      { path: '/traditional-ecological-indicators-handout', element: <traditional-ecological-indicators-handout /> },
      { path: '/traditional-materials-science', element: <traditional-materials-science /> },
      { path: '/traditional-navigation-mathematics-handout', element: <traditional-navigation-mathematics-handout /> },
      { path: '/treaty-settlement-statistics', element: <treaty-settlement-statistics /> },
      { path: '/tukutuku-patterns-maths', element: <tukutuku-patterns-maths /> },
      { path: '/unit-2-technology-definition-challenge', element: <unit-2-technology-definition-challenge /> },
      { path: '/weather-prediction-probability', element: <weather-prediction-probability /> },
      { path: '/writers-toolkit-conclusion-handout', element: <writers-toolkit-conclusion-handout /> },
      { path: '/writers-toolkit-diction-handout', element: <writers-toolkit-diction-handout /> },
      { path: '/writers-toolkit-fluency-handout', element: <writers-toolkit-fluency-handout /> },
      { path: '/writers-toolkit-hook-handout', element: <writers-toolkit-hook-handout /> },
      { path: '/writers-toolkit-inform-structure-handout', element: <writers-toolkit-inform-structure-handout /> },
      { path: '/writers-toolkit-peel-argument-handout', element: <writers-toolkit-peel-argument-handout /> },
      { path: '/writers-toolkit-revision-handout', element: <writers-toolkit-revision-handout /> },
      { path: '/writers-toolkit-rhetorical-devices-handout', element: <writers-toolkit-rhetorical-devices-handout /> },
      { path: '/writers-toolkit-show-dont-tell-handout', element: <writers-toolkit-show-dont-tell-handout /> },
      { path: '/writers-toolkit-suspense-handout', element: <writers-toolkit-suspense-handout /> },
      { path: '/writers-toolkit-tone-handout', element: <writers-toolkit-tone-handout /> },
      { path: '/year-9-starter-pack-alpha-build', element: <year-9-starter-pack-alpha-build /> },
      { path: '/year-9-starter-pack-essential-skills', element: <year-9-starter-pack-essential-skills /> },
      { path: '/youth-vaping-comprehension-handout', element: <youth-vaping-comprehension-handout /> },
      { path: '/culturalstories', element: <CulturalStories /> },
      { path: '/designthinking', element: <DesignThinking /> },
      { path: '/environmentalliteracy', element: <EnvironmentalLiteracy /> },
      { path: '/governmentcomponentanalysis', element: <GovernmentComponentAnalysis /> },
      { path: '/indigenouswisdomsynthesis', element: <IndigenousWisdomSynthesis /> },
      { path: '/maoriastronomy', element: <MaoriAstronomy /> },
      { path: '/maoribattalionlegacy', element: <MaoriBattalionLegacy /> },
      { path: '/resources', element: <Resources /> },
      { path: '/studentdashboard', element: <StudentDashboard /> },
      { path: '/tereophonics', element: <TeReoPhonics /> },
      { path: '/teacherdashboard', element: <TeacherDashboard /> },
      { path: '/year10culturalgeometry', element: <Year10CulturalGeometry /> },
      { path: '/medialiteracycomprehensionhandout-v2', element: <MediaLiteracyComprehensionHandout.V2 /> },
      { path: '/t-rangawaewaemapping', element: <TūRangawaewaeMapping /> },
      { path: '/ai-impact-comprehension-handout', element: <ai-impact-comprehension-handout /> },
      { path: '/atoms-in-everyday-materials', element: <atoms-in-everyday-materials /> },
      { path: '/authors-purpose-entertain-handout', element: <authors-purpose-entertain-handout /> },
      { path: '/authors-purpose-handout', element: <authors-purpose-handout /> },
      { path: '/authors-purpose-inform-handout', element: <authors-purpose-inform-handout /> },
      { path: '/authors-purpose-persuade-handout', element: <authors-purpose-persuade-handout /> },
      { path: '/bar-graph-handout', element: <bar-graph-handout /> },
      { path: '/biochemistry-traditional-medicine', element: <biochemistry-traditional-medicine /> },
      { path: '/body-measurement-traditional', element: <body-measurement-traditional /> },
      { path: '/ceremonial-circle-geometry', element: <ceremonial-circle-geometry /> },
      { path: '/children-rights-responsibilities', element: <children-rights-responsibilities /> },
      { path: '/climate-change-aotearoa-handout', element: <climate-change-aotearoa-handout /> },
      { path: '/climate-emergency-aotearoa-handout', element: <climate-emergency-aotearoa-handout /> },
      { path: '/cognitive-biases-comprehension-handout', element: <cognitive-biases-comprehension-handout /> },
      { path: '/colonization-perspectives-handout', element: <colonization-perspectives-handout /> },
      { path: '/community-helpers-study', element: <community-helpers-study /> },
      { path: '/community-needs-survey', element: <community-needs-survey /> },
      { path: '/cultural-celebrations-comparison', element: <cultural-celebrations-comparison /> },
      { path: '/cultural-decision-making-traditions', element: <cultural-decision-making-traditions /> },
      { path: '/cultural-heroes-comprehension', element: <cultural-heroes-comprehension /> },
      { path: '/cultural-identity-deep-dive-comprehension', element: <cultural-identity-deep-dive-comprehension /> },
      { path: '/cultural-practice-explanation', element: <cultural-practice-explanation /> },
      { path: '/cultural-preservation-essays', element: <cultural-preservation-essays /> },
      { path: '/cultural-safety-classroom-checklists-alpha', element: <cultural-safety-classroom-checklists-alpha /> },
      { path: '/cultural-stem-assessment-rubric', element: <cultural-stem-assessment-rubric /> },
      { path: '/cultural-stories-comprehension', element: <cultural-stories-comprehension /> },
      { path: '/family-data-collection', element: <family-data-collection /> },
      { path: '/family-tree-writing', element: <family-tree-writing /> },
      { path: '/future-visioning-creative-writing', element: <future-visioning-creative-writing /> },
      { path: '/indigenous-rights-research', element: <indigenous-rights-research /> },
      { path: '/iwi-economics-mathematics', element: <iwi-economics-mathematics /> },
      { path: '/kaitiaki-generated-migration-student-handout', element: <kaitiaki-generated-migration-student-handout /> },
      { path: '/kaitiakitanga-field-journal', element: <kaitiakitanga-field-journal /> },
      { path: '/kaitiakitanga-kids', element: <kaitiakitanga-kids /> },
      { path: '/kumara-storage-place-value', element: <kumara-storage-place-value /> },
      { path: '/maori-astronomy-navigation-handout', element: <maori-astronomy-navigation-handout /> },
      { path: '/maori-geometric-patterns-handout', element: <maori-geometric-patterns-handout /> },
      { path: '/maori-navigation-wayfinding-handout', element: <maori-navigation-wayfinding-handout /> },
      { path: '/marae-shapes-geometry', element: <marae-shapes-geometry /> },
      { path: '/mountain-navigation-trigonometry', element: <mountain-navigation-trigonometry /> },
      { path: '/nature-observation-journal', element: <nature-observation-journal /> },
      { path: '/oral-storytelling-handout', element: <oral-storytelling-handout /> },
      { path: '/physics-of-traditional-games', element: <physics-of-traditional-games /> },
      { path: '/probability-handout', element: <probability-handout /> },
      { path: '/renewable-energy-traditional', element: <renewable-energy-traditional /> },
      { path: '/research-methods-handout', element: <research-methods-handout /> },
      { path: '/resource-sustainability-study', element: <resource-sustainability-study /> },
      { path: '/scientific-method-handout', element: <scientific-method-handout /> },
      { path: '/star-navigation-coordinates', element: <star-navigation-coordinates /> },
      { path: '/sustainable-fishing-equations', element: <sustainable-fishing-equations /> },
      { path: '/sustainable-technology-design-challenge', element: <sustainable-technology-design-challenge /> },
      { path: '/traditional-counting-systems', element: <traditional-counting-systems /> },
      { path: '/traditional-dye-chemistry', element: <traditional-dye-chemistry /> },
      { path: '/traditional-ecological-indicators-handout', element: <traditional-ecological-indicators-handout /> },
      { path: '/traditional-materials-science', element: <traditional-materials-science /> },
      { path: '/traditional-navigation-mathematics-handout', element: <traditional-navigation-mathematics-handout /> },
      { path: '/treaty-settlement-statistics', element: <treaty-settlement-statistics /> },
      { path: '/tukutuku-patterns-maths', element: <tukutuku-patterns-maths /> },
      { path: '/unit-2-technology-definition-challenge', element: <unit-2-technology-definition-challenge /> },
      { path: '/weather-prediction-probability', element: <weather-prediction-probability /> },
      { path: '/writers-toolkit-conclusion-handout', element: <writers-toolkit-conclusion-handout /> },
      { path: '/writers-toolkit-diction-handout', element: <writers-toolkit-diction-handout /> },
      { path: '/writers-toolkit-fluency-handout', element: <writers-toolkit-fluency-handout /> },
      { path: '/writers-toolkit-hook-handout', element: <writers-toolkit-hook-handout /> },
      { path: '/writers-toolkit-inform-structure-handout', element: <writers-toolkit-inform-structure-handout /> },
      { path: '/writers-toolkit-peel-argument-handout', element: <writers-toolkit-peel-argument-handout /> },
      { path: '/writers-toolkit-revision-handout', element: <writers-toolkit-revision-handout /> },
      { path: '/writers-toolkit-rhetorical-devices-handout', element: <writers-toolkit-rhetorical-devices-handout /> },
      { path: '/writers-toolkit-show-dont-tell-handout', element: <writers-toolkit-show-dont-tell-handout /> },
      { path: '/writers-toolkit-suspense-handout', element: <writers-toolkit-suspense-handout /> },
      { path: '/writers-toolkit-tone-handout', element: <writers-toolkit-tone-handout /> },
      { path: '/year-9-starter-pack-alpha-build', element: <year-9-starter-pack-alpha-build /> },
      { path: '/year-9-starter-pack-essential-skills', element: <year-9-starter-pack-essential-skills /> },
      { path: '/youth-vaping-comprehension-handout', element: <youth-vaping-comprehension-handout /> },
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
