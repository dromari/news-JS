import AppLoader from './appLoader';
import { IEverythingResponse, ISourcesResponse } from '../../interfaces';

type SourcesCallback = (data: ISourcesResponse) => void;
type NewsCallback = (data: IEverythingResponse) => void;

class AppController extends AppLoader {
  public getSources(callback: SourcesCallback): void {
    super.getResp<ISourcesResponse>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  public getNews(e: Event, callback: NewsCallback): void {
    let target = e.target as HTMLElement | null;
    const newsContainer = e.currentTarget as HTMLElement | null;
    if (!newsContainer) return;

    while (target && target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');

        if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp<IEverythingResponse>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement | null;
    }
  }
}

export default AppController;
