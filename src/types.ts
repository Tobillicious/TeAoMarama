export interface EnrichedResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  culturalElements: number;
  [key: string]: any;
}
