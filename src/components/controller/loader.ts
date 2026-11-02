import { IEverythingResponse, ISourcesResponse } from '../../interfaces';

interface ILoaderOptions {
  apiKey?: string;
  [key: string]: string | undefined;
}

interface IGetRespParams {
  endpoint: 'everything' | 'top-headlines' | 'sources';
  options?: Record<string, string>;
}

type Callback<T> = (data: T) => void;

class Loader {
  private baseLink: string;
  private options: ILoaderOptions;

  constructor(baseLink: string, options: ILoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T = IEverythingResponse | ISourcesResponse>(
    { endpoint, options = {} }: IGetRespParams,
    callback: Callback<T> = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load<T>('GET', endpoint, callback, options);
  }

  protected errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Record<string, string>, endpoint: string): string {
    const urlOptions: ILoaderOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string) => {
      const value = urlOptions[key];
      if (value !== undefined) {
        url += `${key}=${value}&`;
      }
    });

    return url.slice(0, -1);
  }

  private load<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    callback: Callback<T>,
    options: Record<string, string> = {}
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res: Response) => this.errorHandler(res))
      .then((res: Response) => res.json() as Promise<T>)
      .then((data: T) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
