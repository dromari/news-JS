import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IEverythingResponse, ISourcesResponse } from '../../interfaces';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourcesContainer = document.querySelector('.sources');

    if (sourcesContainer) {
      sourcesContainer.addEventListener('click', (e: Event) =>
        this.controller.getNews(e, (data: IEverythingResponse) => this.view.drawNews(data))
      );
    }

    this.controller.getSources((data: ISourcesResponse) => this.view.drawSources(data));
  }
}

export default App;
