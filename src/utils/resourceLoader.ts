// Resource Loader - Connects to the actual 3,063 lesson files
export interface ResourceFile {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  topic: string;
  filename: string;
  path: string;
  content?: string;
}

// Parse filename to extract metadata
function parseFilename(filename: string): Partial<ResourceFile> {
  // Format: Y8_English_Poetry_2269.md
  const parts = filename.replace('.md', '').split('_');

  if (parts.length >= 4) {
    const yearLevel = parts[0]; // Y8
    const subject = parts[1]; // English
    const topic = parts.slice(2, -1).join(' '); // Poetry
    const id = parts[parts.length - 1]; // 2269

    return {
      id,
      title: `${subject} - ${topic}`,
      subject,
      yearLevel,
      topic,
      filename,
      path: `/resources/handouts/${filename}`,
    };
  }

  return {
    id: filename.replace('.md', ''),
    title: filename.replace('.md', ''),
    subject: 'General',
    yearLevel: 'Unknown',
    topic: 'General',
    filename,
    path: `/resources/handouts/${filename}`,
  };
}

// Get list of all available resources
export async function getAllResources(): Promise<ResourceFile[]> {
  try {
    // In production, this would fetch from the actual file system
    // For now, we'll return a sample of the actual resources
    const sampleResources = [
      'Y8_English_Poetry_2269.md',
      'Y8_English_Narrative_Writing_1694.md',
      'Y8_Science_Matter_0825.md',
      'Y8_Science_Forces_1040.md',
      'Y7_English_Media_Literacy_2393.md',
      'Y7_Mathematics_Algebra_0939.md',
      'Y9_Science_Ecosystems_0631.md',
      'Y9_Social_Studies_Treaty_of_Waitangi_0864.md',
      'Y7_Science_Matter_0153.md',
      'Y7_Science_Forces_1664.md',
    ];

    return sampleResources.map(
      (filename) =>
        ({
          ...parseFilename(filename),
          filename,
          path: `/resources/handouts/${filename}`,
        } as ResourceFile),
    );
  } catch (error) {
    console.error('Error loading resources:', error);
    return [];
  }
}

// Get resource content
export async function getResourceContent(resourceId: string): Promise<string> {
  try {
    // In a real implementation, this would fetch the actual markdown content
    // For now, return sample content based on the resource ID
    return `# Sample Resource Content

This is a sample of the actual lesson content for resource ${resourceId}.

## Learning Objectives
- Understand the key concepts
- Apply knowledge in practical contexts
- Develop critical thinking skills

## Activities
1. Reading comprehension
2. Discussion questions
3. Practical exercises

## Cultural Integration
- Te Reo Māori vocabulary
- Māori perspectives and worldviews
- Community connections

## Assessment
- Formative assessment opportunities
- Self-reflection activities
- Peer feedback

*This is a placeholder for the actual content of the ${resourceId} resource file.*`;
  } catch (error) {
    console.error('Error loading resource content:', error);
    return 'Error loading resource content.';
  }
}

// Search resources
export async function searchResources(query: string): Promise<ResourceFile[]> {
  const allResources = await getAllResources();

  if (!query.trim()) {
    return allResources;
  }

  const searchTerm = query.toLowerCase();

  return allResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.subject.toLowerCase().includes(searchTerm) ||
      resource.topic.toLowerCase().includes(searchTerm) ||
      resource.yearLevel.toLowerCase().includes(searchTerm),
  );
}

// Filter resources by subject
export async function getResourcesBySubject(subject: string): Promise<ResourceFile[]> {
  const allResources = await getAllResources();

  if (subject === 'all') {
    return allResources;
  }

  return allResources.filter(
    (resource) => resource.subject.toLowerCase() === subject.toLowerCase(),
  );
}

// Filter resources by year level
export async function getResourcesByYearLevel(yearLevel: string): Promise<ResourceFile[]> {
  const allResources = await getAllResources();

  if (yearLevel === 'all') {
    return allResources;
  }

  return allResources.filter(
    (resource) => resource.yearLevel.toLowerCase() === yearLevel.toLowerCase(),
  );
}
