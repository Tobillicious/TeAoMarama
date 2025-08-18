const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

const publicDir = path.join(__dirname, '../public');

// The scripts to be removed
const firebaseScripts = [
    'js/firebase-config.js',
    'js/firebase-auth.js'
];

// The scripts to be added
const supabaseScripts = `
    <!-- Load Supabase Client -->
    <script src="js/supabase-client.js"></script>
    <!-- Load Auth UI -->
    <script src="js/auth-ui.js"></script>
`;

async function migrateHtmlFiles() {
    console.log('🚀 Starting Firebase to Supabase migration...');

    const htmlFiles = glob.sync(`${publicDir}/**/*.html`);
    console.log(`Found ${htmlFiles.length} HTML files to process.`);

    let filesChanged = 0;

    for (const file of htmlFiles) {
        try {
            let content = await fs.readFile(file, 'utf-8');
            let originalContent = content;

            // Remove Firebase script tags
            for (const script of firebaseScripts) {
                const scriptRegex = new RegExp(`<script src="${script}"></script>\\s*`, 'g');
                content = content.replace(scriptRegex, '');
            }

            // Add Supabase scripts if they don't exist
            if (!content.includes('js/supabase-client.js')) {
                content = content.replace('</body>', `${supabaseScripts}</body>`);
            }

            if (content !== originalContent) {
                await fs.writeFile(file, content, 'utf-8');
                console.log(`✅ Migrated: ${path.basename(file)}`);
                filesChanged++;
            }

        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error);
        }
    }

    console.log(`
🎉 Migration Complete!
`);
    console.log(`Processed ${htmlFiles.length} files.`);
    console.log(`${filesChanged} files were modified.`);
}

migrateHtmlFiles();
