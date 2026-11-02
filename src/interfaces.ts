export interface IArticleSource {
  id: string | null;
  name: string;
}

export interface INewsArticle {
  source: IArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface IEverythingResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: INewsArticle[];
}
