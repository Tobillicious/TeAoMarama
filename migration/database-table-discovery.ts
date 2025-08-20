#!/usr/bin/env npx tsx

/**
 * Database Table Discovery Tool
 *
 * Discovers what tables actually exist in the Supabase database
 */;
import { createClient } from '@supabase/supabase-js';
;
const TEKETE_SUPABASE_URL = 'https://cpvherfewjpnhxfhrvlt.supabase.co';
const TEKETE_SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdmhlcmZld2pwbmh4Zmhydmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4OTYzMjMsImV4cCI6MjA3MDQ3MjMyM30.jReaXtIkyoRthvkohTcl66DMwyJbFyWwqDYBlHLB8vY';
;
async function discoverTables() {;
console.log('\n🔍 DATABASE TABLE DISCOVERY');
  console.log('='.repeat(60));
;
const client = createClient(TEKETE_SUPABASE_URL, TEKETE_SUPABASE_KEY);

  // Common table names to try;
const commonTables = [
    'resources',
    'content_items',
    'documents',
    'lessons',
    'activities',
    'assessments',
    'units',
    'handouts',
    'games',
    'worksheets',
    'teachers',
    'students',
    'classes',
    'subjects',
    'topics',
    'migrations',
    'users',
    'profiles',
    'settings',
    'logs',
    'files',
    'images',
    'videos',
    'audio',
    'texts',
    'categories',
    'tags',
    'metadata',
    'content',
    'data',
  ];
;
const discoveredTables: {;,
table: string;,
accessible: boolean;
    recordCount?: number;
    sampleColumns?: string[];
  }[] = [];
;
for (const tableName of commonTables) {;
try {;
console.log(`🔍 Testing table: ${tableName}...`);

      // Try to count records;
const { count, error: countError } = await client
        .from(tableName)
        .select('*', { count: 'exact', head: true });
;
if (!countError && count !== null) {
        // Table exists and is accessible;
console.log(`✅ Found table: ${tableName} with ${count} records`);

        // Get sample data to understand structure;
const { data: sampleData } = await client.from(tableName).select('*').limit(1);
;
const sampleColumns = sampleData && sampleData.length > 0 ? Object.keys(sampleData[0]) : [];
;
discoveredTables.push({;,
table: tableName,;,
accessible: true,;,
recordCount: count,;
sampleColumns,
        });
;
console.log(`   Columns: ${sampleColumns.join(', ')}`);
      } else {;
console.log(`❌ Table ${tableName} not accessible: ${countError?.message}`);
        discoveredTables.push({;,
table: tableName,;,
accessible: false,
        });
      }
    } catch (error) {;
console.log(`❌ Error testing ${tableName}: ${error}`);
      discoveredTables.push({;,
table: tableName,;,
accessible: false,
      });
    }
  }

  // Summary;
console.log('\n📊 DISCOVERY SUMMARY');
  console.log('='.repeat(60));
;
const accessibleTables = discoveredTables.filter(_(t) => t.accessible);
  const inaccessibleTables = discoveredTables.filter(_(t) => !t.accessible);
;
console.log(`✅ Accessible Tables: ${accessibleTables.length}`);
  console.log(`❌ Inaccessible Tables: ${inaccessibleTables.length}`);
;
if (accessibleTables.length > 0) {;
console.log('\n🎯 ACCESSIBLE TABLES:');
    accessibleTables.forEach(_(table) => {;
console.log(`• ${table.table}: ${table.recordCount} records`);
      if (table.sampleColumns && table.sampleColumns.length > 0) {;
console.log(`  Columns: ${table.sampleColumns.join(', ')}`);
      }
    });
  };
if (inaccessibleTables.length > 0) {;
console.log('\n🚫 INACCESSIBLE TABLES:');
    inaccessibleTables.forEach(_(table) => {;
console.log(`• ${table.table}`);
    });
  }

  // Save discovery report;
const fs = await import('fs');
  await fs.promises.writeFile(
    './migration/table-discovery-report.json',;
JSON.stringify(discoveredTables, null, 2),
  );
;
console.log('\n💾 Discovery report saved to: ./migration/table-discovery-report.json');
;
return discoveredTables;
}

// Execute if run directly;
if (import.meta.url === new URL(process.argv[1], 'file:').href) {;
discoverTables().catch(_(error) => {;
console.error('Fatal error in table discovery:', error);
    process.exit(1);
  });
};
export { discoverTables };
