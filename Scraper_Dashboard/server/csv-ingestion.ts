import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ReelMetricData {
  username: string;
  url: string;
  likes: number;
  comments: number;
  views: number;
  caption: string;
  hashtags: string;
  mentions: string;
  videoUrl: string;
  datePosted: string;
}

export async function parseCSV(filePath: string): Promise<ReelMetricData[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const data: ReelMetricData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      data.push({
        username: row['Creator'] || row['Username'] || '',
        url: row['Reel URL'] || row['URL'] || '',
        likes: parseInt(row['Likes'] || '0'),
        comments: parseInt(row['Comments'] || '0'),
        views: parseInt(row['Views'] || '0'),
        caption: row['Caption'] || '',
        hashtags: row['Hashtags'] || '',
        mentions: row['Mentions'] || '',
        videoUrl: row['Video URL'] || '',
        datePosted: row['Date Posted'] || row['Date'] || '',
      });
    }
  }

  return data;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result.map(v => v.replace(/^"|"$/g, ''));
}

export async function findCSVFiles(): Promise<string[]> {
  const projectRoot = path.resolve(__dirname, '..', '..');
  const dataDir = path.join(projectRoot, 'data');

  try {
    const files = await fs.readdir(dataDir);
    return files
      .filter(file => file.endsWith('_reels_metrics.csv'))
      .map(file => path.join(dataDir, file));
  } catch (error) {
    console.error('Error reading data directory:', error);
    return [];
  }
}

export function extractInstagramId(url: string): string {
  const match = url.match(/\/reel\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : '';
}
