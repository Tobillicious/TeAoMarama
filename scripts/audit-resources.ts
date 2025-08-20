#!/usr/bin/env tsx
/**
 * 🔍 COMPREHENSIVE RESOURCE AUDIT - IDENTIFY LOST RESOURCES AND INCONSISTENCIES
 */
import {readdir} from 'fs/promises'
const __TE_KETE_HANDOUTS_PATH = 'te-kete-ako-clean/public/handouts'
const __TARGET_PATH = 'src/components/educational/handouts'

async function auditResources(): Promise<void> {
console.log('🔍 COMPREHENSIVE RESOURCE AUDIT STARTED')

try {
    // Get all Te Kete Ako handouts
const __teKeteFiles = await readdir(TE_KETE_HANDOUTS_PATH)
    const __teKeteHandouts = teKeteFiles.filter(_(f) => f.endsWith('.html') && !f.startsWith('.'))

    // Get all migrated components
const __migratedFiles = await readdir(TARGET_PATH)
    const __migratedComponents = migratedFiles.filter(_(f) => f.endsWith('.tsx'))

console.log(`📊 Te Kete Ako handouts available: ${teKeteHandouts.length}`)
    console.log(`📊 Migrated components: ${migratedComponents.length}`)

    // Check for unmigrated handouts
const unmigratedHandouts: string[] = []
    for (const handout of teKeteHandouts) {
const __componentName = handout
        .replace(/\.html$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .replace(/\s/g, '');

const __componentFile = `${componentName}.tsx`;
      if (!migratedComponents.includes(componentFile)) {
unmigratedHandouts.push(handout)
      }
    }
if (unmigratedHandouts.length > 0) {
console.log(`⚠️ Unmigrated handouts found: ${unmigratedHandouts.length}`)
console.log('📋 Unmigrated handouts: ')
unmigratedHandouts.slice(0, 10).forEach((h) => console.log(`  - ${h}`))
if (unmigratedHandouts.length > 10) {
  console.log(`  ... and ${unmigratedHandouts.length - 10} more`)
}
    } else {
console.log('✅ All Te Kete Ako handouts have been migrated!')
    }

    // Check for orphaned components (components without corresponding Te Kete Ako handout)
const orphanedComponents: string[] = []
    for (const component of migratedComponents) {
const __baseName = component.replace(/\.tsx$/, '')
      const __handoutName =
baseName
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()
          .replace(/^-/, '') + '.html'

if (!teKeteHandouts.includes(handoutName)) {
orphanedComponents.push(component)
      }
    }
if (orphanedComponents.length > 0) {
console.log(`⚠️ Orphaned components found: ${orphanedComponents.length}`)
      console.log('📋 Orphaned components: ')
      orphanedComponents.slice(0, 10).forEach(_(c) => console.log(`  - ${c}`))
      if (orphanedComponents.length > 10) {
console.log(`  ... and ${orphanedComponents.length - 10} more`)
      }
    } else {
console.log('✅ All components have corresponding Te Kete Ako handouts!')
    }

    // Check for missing CSS files
const __cssFiles = migratedFiles.filter(_(f) => f.endsWith('.css'))
    const __componentsWithoutCSS = migratedComponents.filter(_(component) => {
const cssFile = component.replace('.tsx', '.css')
      return !cssFiles.includes(cssFile)
    })

if (componentsWithoutCSS.length > 0) {
console.log(`⚠️ Components without CSS found: ${componentsWithoutCSS.length}`)
      console.log('📋 Components missing CSS: ')
      componentsWithoutCSS.slice(0, 10).forEach(_(c) => console.log(`  - ${c}`))
      if (componentsWithoutCSS.length > 10) {
console.log(`  ... and ${componentsWithoutCSS.length - 10} more`)
      }
    } else {
console.log('✅ All components have corresponding CSS files!')
    }

    // Check for orphaned CSS files
const __orphanedCSS = cssFiles.filter(_(cssFile) => {
const componentFile = cssFile.replace('.css', '.tsx')
      return !migratedComponents.includes(componentFile)
    })

if (orphanedCSS.length > 0) {
console.log(`⚠️ Orphaned CSS files found: ${orphanedCSS.length}`)
      console.log('📋 Orphaned CSS files: ')
      orphanedCSS.slice(0, 10).forEach(_(c) => console.log(`  - ${c}`))
      if (orphanedCSS.length > 10) {
console.log(`  ... and ${orphanedCSS.length - 10} more`)
      }
    } else {
console.log('✅ All CSS files have corresponding components!')
    }
console.log('\n🎯 AUDIT COMPLETE!')
    console.log(`📊 Summary: `)
    console.log(`  - Te Kete Ako handouts: ${teKeteHandouts.length}`)
    console.log(`  - Migrated components: ${migratedComponents.length}`)
    console.log(`  - CSS files: ${cssFiles.length}`)
    console.log(`  - Unmigrated handouts: ${unmigratedHandouts.length}`)
    console.log(`  - Orphaned components: ${orphanedComponents.length}`)
    console.log(`  - Components without CSS: ${componentsWithoutCSS.length}`)
    console.log(`  - Orphaned CSS files: ${orphanedCSS.length}`)
  } catch (error) {
console.error('❌ Audit failed: ', error)
  }
}
if (import.meta.main) {
auditResources()
}
