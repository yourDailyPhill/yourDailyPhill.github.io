import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const browserDir = path.join(__dirname, '..', 'dist', 'your-daily-phill.github.io', 'browser');
const index = path.join(browserDir, 'index.html');
const notFound = path.join(browserDir, '404.html');

if (!fs.existsSync(index)) {
  console.error(`Missing ${index}. Run the production build first.`);
  process.exit(1);
}

fs.copyFileSync(index, notFound);
console.log(`Copied index.html to 404.html in ${browserDir}`);
