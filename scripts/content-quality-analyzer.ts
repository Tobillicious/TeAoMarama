
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface ContentQualityReport {
  filePath: string;
  wordCount: number;
  hasTitle: boolean;
  hasHeadings: boolean;
}

async function analyzeMarkdownFile(filePath: string): Promise<ContentQualityReport> {
  const content = await fs.readFile(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  const wordCount = markdownContent.split(/\s+/).length;
  const hasTitle = !!data.title;
  const hasHeadings = /#{1,6}\s.+/g.test(markdownContent);

  return {
    filePath,
    wordCount,
    hasTitle,
    hasHeadings,
  };
}

async function main() {
  const resourcesDir = path.join(__dirname, '../', 'real-resources');
  const allFiles = await fs.readdir(resourcesDir, { recursive: true });
  const markdownFiles = allFiles.filter(file => file.endsWith('.md'));

  const reports = await Promise.all(
    markdownFiles.map(file => analyzeMarkdownFile(path.join(resourcesDir, file as string)))
  );

  console.log('Content Quality Analysis Report:');
  console.table(reports);
}

main().catch(console.error);
