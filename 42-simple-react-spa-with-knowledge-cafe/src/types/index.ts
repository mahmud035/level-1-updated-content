export interface IBlog {
  id: number;
  cover: string;
  title: string;
  authorImg: string;
  author: string;
  postedDate: string;
  readingTime: number;
  hashtags: string[];
  isBookmarked?: boolean;
}
