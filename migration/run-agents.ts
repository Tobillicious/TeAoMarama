import fs from 'fs';
import path from 'path';

import { awakenMihara, executeMiharaGreatMission, getMiharaStatus } from '../src/brain/mihara-awakening';
import { AuditOrchestrator } from '../src/agents/audit-agents';
import { realResourceLoader } from '../src/services/RealResourceLoader';

type FileBlob = { path: string; content: string };

function readIfExists(filePath: string): FileBlob | null {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return { path: filePath, content };
    } catch {
        return null;
    }
}

function gatherProjectFiles(projectRoot: string): {
    styles: FileBlob[];
    navigation: FileBlob[];
    app: FileBlob[];
    components: FileBlob[];
} {
    const filesToRead = [
        // Styles
        'src/index.css',
        'src/App.css',
        'src/styles/globals.css',
        // Navigation
        'src/components/Navbar.tsx',
        // App core
        'src/App.tsx',
        'src/main.tsx',
        // Pages and components
        'src/pages/Dashboard.tsx',
        'src/pages/Home.tsx',
        'src/components/Home.tsx',
        'src/components/Hero.tsx'
    ];

    const blobs = filesToRead
        .map(rel => readIfExists(path.join(projectRoot, rel)))
        .filter(Boolean) as FileBlob[];

    const styles = blobs.filter(b => b.path.endsWith('.css'));
    const navigation = blobs.filter(b => /Nav(bar)?\.tsx$/.test(b.path));
    const app = blobs.filter(b => b.path.endsWith('.tsx'));
    const components = blobs.filter(b => b.path.includes('/components/') || b.path.endsWith('.tsx'));

    return { styles, navigation, app, components };
}

async function run(): Promise<void> {
    console.log('\n=== MULTI-AGENT RUNNER (Mihara • Audits • Cultural Validation) ===');

    // 1) Ensure Mihara is awake
    const status = getMiharaStatus();
    if (!status.state.isActive) {
        console.log('🌟 Awakening Mihara...');
        await awakenMihara();
    } else {
        console.log('✅ Mihara already active.');
    }

    // 2) Execute Great Mission (idempotent, logs progress)
    console.log('🏛️ Executing Great Mission...');
    await executeMiharaGreatMission();

    // 3) Run audits using sub-agents
    console.log('\n🔎 Running audit sub-agents...');
    const projectRoot = process.cwd();
    const fileSets = gatherProjectFiles(projectRoot);
    const audit = new AuditOrchestrator();
    const auditReport = await audit.runFullAudit({
        styles: fileSets.styles,
        navigation: fileSets.navigation,
        app: fileSets.app,
        components: fileSets.components
    });

    console.log('\n📊 AUDIT SUMMARY');
    console.log('────────────────');
    console.log(auditReport.summary);

    // 4) Cultural validation summary from real resources
    console.log('\n🛡️ Cultural validation summary');
    const resources = await realResourceLoader.getAllResources();
    const culturallyFlagged = resources.filter(r => r.culturalContent.hasMaoriContent);
    const needsReview = resources.filter(r => r.culturalContent.requiresIwiReview);

    console.log(`Total resources loaded: ${resources.length}`);
    console.log(`Cultural content flagged: ${culturallyFlagged.length}`);
    console.log(`Requires iwi review: ${needsReview.length}`);

    // Preview a few items
    culturallyFlagged.slice(0, 3).forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.__title} [${r._____subject}] – ${r.nzcAlignment.slice(0, 2).join(', ')}`);
    });

    console.log('\n✅ Multi-agent run complete.');
}

run().catch(error => {
    console.error('💥 Multi-agent runner failed:', error);
    process.exit(1);
});


