import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'content', 'blog');
const outFile = path.join(root, 'src', 'assets', 'data', 'blog.json');

marked.setOptions({ gfm: true, breaks: true });

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readPosts() {
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(blogDir, filename), 'utf8');
      const { data, content } = matter(raw);
      const slug = data.slug ?? filename.replace(/\.md$/, '');
      const body = content.trim();

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '1970-01-01',
        excerpt: data.excerpt ?? body.slice(0, 160),
        tags: data.tags ?? [],
        body,
        html: marked.parse(body),
        readMinutes: Math.max(1, Math.ceil(wordCount(body) / 200)),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const posts = readPosts();
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
console.log(`Wrote ${posts.length} post(s) to ${path.relative(root, outFile)}`);
