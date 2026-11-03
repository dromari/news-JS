import './sources.css';
import { INewsSource } from '../../../interfaces';

class Sources {
  public draw(data: INewsSource[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

    if (!sourceItemTemp) {
      return;
    }

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      const sourceName = sourceClone.querySelector('.source__item-name');
      if (sourceName) {
        sourceName.textContent = item.name;
      }

      const sourceItem = sourceClone.querySelector('.source__item');
      if (sourceItem) {
        sourceItem.setAttribute('data-source-id', item.id);
      }

      fragment.append(sourceClone);
    });

    const sourcesContainer = document.querySelector('.sources');
    if (sourcesContainer) {
      sourcesContainer.append(fragment);
    }
  }
}

export default Sources;
