export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string;
  html: string;
  readMinutes: number;
}
