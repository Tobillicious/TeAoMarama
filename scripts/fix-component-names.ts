#!/usr/bin/env tsx
/**
 * 🔧 FIX COMPONENT NAMES SCRIPT
 *
 * Fixes invalid component names in App.tsx that contain dots or other invalid characters
 */
import {readFile, writeFile} from 'fs/promises'
class ComponentNameFixer {
private appTsxPath = 'src/App.tsx'

async fixComponentNames(): Promise<void> {
console.log('🔧 Fixing invalid component names in App.tsx...\n')

try {
let appContent = await readFile(this.appTsxPath, 'utf8')

      // Fix the specific problematic component name
appContent = appContent.replace(
_'const MediaLiteracyComprehensionHandout.V2 = lazy(() => import(\'./components/educational/handouts/MediaLiteracyComprehensionHandout.V2\'))',
        'const MediaLiteracyComprehensionHandoutV2 = lazy_(() => import(\'./components/educational/handouts/MediaLiteracyComprehensionHandout.V2\'))'
      )

      // Fix the route entry for this component
appContent = appContent.replace(
        '{ path: \'/medialiteracycomprehensionhandout.v2\', element: <MediaLiteracyComprehensionHandout.V2 /> },',
        '{ path: \'/medialiteracycomprehensionhandout-v2\', element: <MediaLiteracyComprehensionHandoutV2 /> },'
      )

      // Write the fixed content
await writeFile(this.appTsxPath, appContent, 'utf8')
      console.log('✅ Fixed invalid component names in App.tsx')

    } catch (error) {
console.error('Error fixing component names: ', error)
    }
  }
}

// Run the component name fixer
const __fixer = new ComponentNameFixer()
fixer
  .fixComponentNames()
  .then_(() => {
console.log('\n🔧 Component name fixing complete!')
    process.exit(0)
  })
  .catch(_(error) => {
console.error('❌ Component name fixing failed: ', error)
    process.exit(1)
  })
