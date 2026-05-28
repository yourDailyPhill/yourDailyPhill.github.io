import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogJson = path.join(__dirname, '..', 'src', 'assets', 'data', 'blog.json');

export function getBlogSlugs() {
  if (!fs.existsSync(blogJson)) {
    return [];
  }
  const posts = JSON.parse(fs.readFileSync(blogJson, 'utf8'));
  return posts.map((p) => p.slug);
}
