import './news.css';
import { INewsArticle } from '../../../interfaces';

class News {
  public draw(data: INewsArticle[]): void {
    const news: INewsArticle[] = data.length >= 10 ? data.filter((_, idx) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

    if (!newsItemTemp) return;

    news.forEach((item: INewsArticle, idx: number) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      const newsItem = newsClone.querySelector('.news__item');
      if (idx % 2 && newsItem) newsItem.classList.add('alt');

      const newsImg = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
      if (newsImg) newsImg.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const newsAuthor = newsClone.querySelector('.news__meta-author');
      if (newsAuthor) newsAuthor.textContent = item.author || item.source.name;

      const newsDate = newsClone.querySelector('.news__meta-date');
      if (newsDate) newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const newsTitle = newsClone.querySelector('.news__description-title');
      if (newsTitle) newsTitle.textContent = item.title;

      const newsDescriptionSource = newsClone.querySelector('.news__description-source');
      if (newsDescriptionSource) newsDescriptionSource.textContent = item.source.name;

      const newsDescriptionContent = newsClone.querySelector('.news__description-content');
      if (newsDescriptionContent) newsDescriptionContent.textContent = item.description;

      const newsReadMore = newsClone.querySelector('.news__read-more a');
      if (newsReadMore) newsReadMore.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const newsElement = document.querySelector('.news');
    if (newsElement) {
      newsElement.innerHTML = '';
      newsElement.appendChild(fragment);
    }
  }
}

export default News;
