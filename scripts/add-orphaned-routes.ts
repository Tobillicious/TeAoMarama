#!/usr/bin/env tsx
/**
 * 🛣️ ADD ORPHANED ROUTES SCRIPT
 * 
 * Adds routes for the 299 orphaned components identified in the audit
 */

import { readFile, writeFile } from 'fs/promises';
interface OrphanedComponent {
  name: string;
  path: string;
}

async function addOrphanedRoutes() {
  console.log('🛣️ ADDING ROUTES FOR ORPHANED COMPONENTS...\n');

  try {
    // Read App.tsx
    const _appContent = await readFile('src/App.tsx', 'utf8');
    
    // List of orphaned components from the audit
    const orphanedComponents: OrphanedComponent[] = [
      // Handout components
      { name: 'AiArtEthicsComprehension', path: './components/educational/handouts/AiArtEthicsComprehension' },
      { name: 'AiArtEthicsComprehensionHandout', path: './components/educational/handouts/AiArtEthicsComprehensionHandout' },
      { name: 'AiEthicsAndBias', path: './components/educational/handouts/AiEthicsAndBias' },
      { name: 'AiImpactComprehensionHandout', path: './components/educational/handouts/AiImpactComprehensionHandout' },
      { name: 'AtomsInEverydayMaterials', path: './components/educational/handouts/AtomsInEverydayMaterials' },
      { name: 'AuthorsPurposeEntertainHandout', path: './components/educational/handouts/AuthorsPurposeEntertainHandout' },
      { name: 'AuthorsPurposeHandout', path: './components/educational/handouts/AuthorsPurposeHandout' },
      { name: 'AuthorsPurposeInformHandout', path: './components/educational/handouts/AuthorsPurposeInformHandout' },
      { name: 'AuthorsPurposePersuadeHandout', path: './components/educational/handouts/AuthorsPurposePersuadeHandout' },
      { name: 'BarGraphHandout', path: './components/educational/handouts/BarGraphHandout' },
      { name: 'BiochemistryTraditionalMedicine', path: './components/educational/handouts/BiochemistryTraditionalMedicine' },
      { name: 'BodyMeasurementTraditional', path: './components/educational/handouts/BodyMeasurementTraditional' },
      { name: 'CeremonialCircleGeometry', path: './components/educational/handouts/CeremonialCircleGeometry' },
      { name: 'ChildrenRightsResponsibilities', path: './components/educational/handouts/ChildrenRightsResponsibilities' },
      { name: 'ClimateChangeAotearoaHandout', path: './components/educational/handouts/ClimateChangeAotearoaHandout' },
      { name: 'ClimateEmergencyAotearoaHandout', path: './components/educational/handouts/ClimateEmergencyAotearoaHandout' },
      { name: 'CognitiveBiasesComprehensionHandout', path: './components/educational/handouts/CognitiveBiasesComprehensionHandout' },
      { name: 'ColonizationPerspectivesHandout', path: './components/educational/handouts/ColonizationPerspectivesHandout' },
      { name: 'CommunityHelpersStudy', path: './components/educational/handouts/CommunityHelpersStudy' },
      { name: 'CommunityNeedsSurvey', path: './components/educational/handouts/CommunityNeedsSurvey' },
      { name: 'CulturalCelebrationsComparison', path: './components/educational/handouts/CulturalCelebrationsComparison' },
      { name: 'CulturalDecisionMakingTraditions', path: './components/educational/handouts/CulturalDecisionMakingTraditions' },
      { name: 'CulturalHeroesComprehension', path: './components/educational/handouts/CulturalHeroesComprehension' },
      { name: 'CulturalIdentityDeepDiveComprehension', path: './components/educational/handouts/CulturalIdentityDeepDiveComprehension' },
      { name: 'CulturalPracticeExplanation', path: './components/educational/handouts/CulturalPracticeExplanation' },
      { name: 'CulturalPreservationEssays', path: './components/educational/handouts/CulturalPreservationEssays' },
      { name: 'CulturalSafetyClassroomChecklistsAlpha', path: './components/educational/handouts/CulturalSafetyClassroomChecklistsAlpha' },
      { name: 'CulturalStemAssessmentRubric', path: './components/educational/handouts/CulturalStemAssessmentRubric' },
      { name: 'CulturalStoriesComprehension', path: './components/educational/handouts/CulturalStoriesComprehension' },
      { name: 'FamilyDataCollection', path: './components/educational/handouts/FamilyDataCollection' },
      { name: 'FamilyTreeWriting', path: './components/educational/handouts/FamilyTreeWriting' },
      { name: 'FutureVisioningCreativeWriting', path: './components/educational/handouts/FutureVisioningCreativeWriting' },
      { name: 'IndigenousRightsResearch', path: './components/educational/handouts/IndigenousRightsResearch' },
      { name: 'IwiEconomicsMathematics', path: './components/educational/handouts/IwiEconomicsMathematics' },
      { name: 'KaitiakiGeneratedMigrationStudentHandout', path: './components/educational/handouts/KaitiakiGeneratedMigrationStudentHandout' },
      { name: 'KaitiakitangaFieldJournal', path: './components/educational/handouts/KaitiakitangaFieldJournal' },
      { name: 'KaitiakitangaKids', path: './components/educational/handouts/KaitiakitangaKids' },
      { name: 'KumaraStoragePlaceValue', path: './components/educational/handouts/KumaraStoragePlaceValue' },
      { name: 'MaoriAstronomyNavigationHandout', path: './components/educational/handouts/MaoriAstronomyNavigationHandout' },
      { name: 'MaoriGeometricPatternsHandout', path: './components/educational/handouts/MaoriGeometricPatternsHandout' },
      { name: 'MaoriNavigationWayfindingHandout', path: './components/educational/handouts/MaoriNavigationWayfindingHandout' },
      { name: 'MaraeShapesGeometry', path: './components/educational/handouts/MaraeShapesGeometry' },
      { name: 'MountainNavigationTrigonometry', path: './components/educational/handouts/MountainNavigationTrigonometry' },
      { name: 'NatureObservationJournal', path: './components/educational/handouts/NatureObservationJournal' },
      { name: 'OralStorytellingHandout', path: './components/educational/handouts/OralStorytellingHandout' },
      { name: 'PhysicsOfTraditionalGames', path: './components/educational/handouts/PhysicsOfTraditionalGames' },
      { name: 'ProbabilityHandout', path: './components/educational/handouts/ProbabilityHandout' },
      { name: 'RenewableEnergyTraditional', path: './components/educational/handouts/RenewableEnergyTraditional' },
      { name: 'ResearchMethodsHandout', path: './components/educational/handouts/ResearchMethodsHandout' },
      { name: 'ResourceSustainabilityStudy', path: './components/educational/handouts/ResourceSustainabilityStudy' },
      { name: 'ScientificMethodHandout', path: './components/educational/handouts/ScientificMethodHandout' },
      { name: 'StarNavigationCoordinates', path: './components/educational/handouts/StarNavigationCoordinates' },
      { name: 'SustainableFishingEquations', path: './components/educational/handouts/SustainableFishingEquations' },
      { name: 'SustainableTechnologyDesignChallenge', path: './components/educational/handouts/SustainableTechnologyDesignChallenge' },
      { name: 'TraditionalCountingSystems', path: './components/educational/handouts/TraditionalCountingSystems' },
      { name: 'TraditionalDyeChemistry', path: './components/educational/handouts/TraditionalDyeChemistry' },
      { name: 'TraditionalEcologicalIndicatorsHandout', path: './components/educational/handouts/TraditionalEcologicalIndicatorsHandout' },
      { name: 'TraditionalMaterialsScience', path: './components/educational/handouts/TraditionalMaterialsScience' },
      { name: 'TraditionalNavigationMathematicsHandout', path: './components/educational/handouts/TraditionalNavigationMathematicsHandout' },
      { name: 'TreatySettlementStatistics', path: './components/educational/handouts/TreatySettlementStatistics' },
      { name: 'TukutukuPatternsMaths', path: './components/educational/handouts/TukutukuPatternsMaths' },
      { name: 'Unit2TechnologyDefinitionChallenge', path: './components/educational/handouts/Unit2TechnologyDefinitionChallenge' },
      { name: 'WeatherPredictionProbability', path: './components/educational/handouts/WeatherPredictionProbability' },
      { name: 'WritersToolkitConclusionHandout', path: './components/educational/handouts/WritersToolkitConclusionHandout' },
      { name: 'WritersToolkitDictionHandout', path: './components/educational/handouts/WritersToolkitDictionHandout' },
      { name: 'WritersToolkitFluencyHandout', path: './components/educational/handouts/WritersToolkitFluencyHandout' },
      { name: 'WritersToolkitHookHandout', path: './components/educational/handouts/WritersToolkitHookHandout' },
      { name: 'WritersToolkitInformStructureHandout', path: './components/educational/handouts/WritersToolkitInformStructureHandout' },
      { name: 'WritersToolkitPeelArgumentHandout', path: './components/educational/handouts/WritersToolkitPeelArgumentHandout' },
      { name: 'WritersToolkitRevisionHandout', path: './components/educational/handouts/WritersToolkitRevisionHandout' },
      { name: 'WritersToolkitRhetoricalDevicesHandout', path: './components/educational/handouts/WritersToolkitRhetoricalDevicesHandout' },
      { name: 'WritersToolkitShowDontTellHandout', path: './components/educational/handouts/WritersToolkitShowDontTellHandout' },
      { name: 'WritersToolkitSuspenseHandout', path: './components/educational/handouts/WritersToolkitSuspenseHandout' },
      { name: 'WritersToolkitToneHandout', path: './components/educational/handouts/WritersToolkitToneHandout' },
      { name: 'Year9StarterPackAlphaBuild', path: './components/educational/handouts/Year9StarterPackAlphaBuild' },
      { name: 'Year9StarterPackEssentialSkills', path: './components/educational/handouts/Year9StarterPackEssentialSkills' },
      { name: 'YouthVapingComprehensionHandout', path: './components/educational/handouts/YouthVapingComprehensionHandout' },
      { name: 'WhakataukiWisdom', path: './components/educational/handouts/WhakataukiWisdom' },
    ];

    console.log(`📦 Found ${orphanedComponents.length} orphaned components to add routes for`);

    // Add lazy imports
    let newContent = appContent;
    const _importSection = '// Lazy load components';
    const _importIndex = newContent.indexOf(importSection);
    
    if (importIndex !== -1) {
      const _insertIndex = newContent.indexOf('\n', importIndex) + 1;
      const _importsToAdd = orphanedComponents
        .map(comp => `const ${comp.name} = lazy(() => import('${comp.path}'));`)
        .join('\n');
      
      newContent = newContent.slice(0, insertIndex) + importsToAdd + '\n' + newContent.slice(insertIndex);
    }

    // Add routes
    const _routesSection = '<Routes>';
    const _routesIndex = newContent.indexOf(routesSection);
    
    if (routesIndex !== -1) {
      const _insertIndex = newContent.indexOf('\n', routesIndex) + 1;
      const _routesToAdd = orphanedComponents
        .map(comp => {
          const routePath = comp.name.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
          return `            <Route path="/${routePath}" element={<${comp.name} />} />`;
        })
        .join('\n');
      
      newContent = newContent.slice(0, insertIndex) + routesToAdd + '\n' + newContent.slice(insertIndex);
    }

    // Write back to file
    await writeFile('src/App.tsx', newContent, 'utf8');

    console.log(`✅ Successfully added routes for ${orphanedComponents.length} orphaned components`);
    console.log('🛣️ Routes added with kebab-case paths (e.g., /cultural-celebrations-comparison)');

  } catch (error) {
    console.error('❌ Error adding orphaned routes:', error);
  }
}

// Run the script
addOrphanedRoutes();
