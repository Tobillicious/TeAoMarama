import fs from 'fs'
import path from 'path'

const __appTsxPath = path.join(process.cwd(), 'src', 'App.tsx')
}
function fixRouteMappings() {console.log('🔧 Fixing route mappings in App.tsx...')

let content = fs.readFileSync(appTsxPath, 'utf8')

  // Fix all instances of MediaLiteracyComprehensionHandout.V2 in route mappings
const __oldPattern = /element: \s*<MediaLiteracyComprehensionHandout\.V2\s*/>/g
  const __newPattern = 'element: <MediaLiteracyComprehensionHandoutV2 />'

const __matches = content.match(oldPattern)
  if (matches) {
content = content.replace(oldPattern, newPattern)
    console.log(`  Fixed ${matches.length} route mappings`)
  }
fs.writeFileSync(appTsxPath, content)

console.log('✅ Route mappings fixed!')
}
fixRouteMappings()
