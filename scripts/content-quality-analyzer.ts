
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface ContentQualityReport {
  filePath: string;
  wordCount: number;
  hasTitle: boolean;
  hasHeadings: boolean;
}

async function analyzeMarkdownFile(_filePath: string): Promise<ContentQualityReport> {
  const _content = await fs.readFile(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);

  const _wordCount = markdownContent.split(/\s+/).length;
  const _hasTitle = !!data.title;
  const _hasHeadings = /#{1,6}\s.+/g.test(markdownContent);

  return {
    filePath,
    wordCount,
    hasTitle,
    hasHeadings,
  };
}

async function main() {
  const _resourcesDir = path.join(__dirname, '../', 'real-resources');
  const _allFiles = await fs.readdir(resourcesDir, { recursive: true });
  const _markdownFiles = allFiles.filter(file => file.endsWith('.md'));

  const _reports = await Promise.all(
    markdownFiles.map(file => analyzeMarkdownFile(path.join(resourcesDir, file as string)))
  );

  console.log('Content Quality Analysis Report:');
  console.table(reports);
}

main().catch(console.error);
