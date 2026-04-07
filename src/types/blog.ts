export interface PostFrontmatter {
  title: string;
  date: string;
  tags?: string[];
  categories?: string[];
  description?: string;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}
