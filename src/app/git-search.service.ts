import {Injectable} from '@angular/core';
import {GitSearchRepo, GitSearchUser} from './@types';
import {HttpClient} from '@angular/common/http';

type RepoCachedValues = { [query: string]: GitSearchRepo }[];
type UserCachedValues = { [query: string]: GitSearchUser }[];

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

  repoCachedValues: RepoCachedValues = [];
  userCachedValues: UserCachedValues = [];

  constructor(private http: HttpClient) {
  }

  gitSearchRepo(query: string, page: number): Promise<GitSearchRepo> {
    return this.gitSearch<GitSearchRepo>('https://api.github.com/search/repositories',
      query, page, this.repoCachedValues);
  }

  gitSearchUser(query: string, page: number): Promise<GitSearchUser> {
    return this.gitSearch<GitSearchUser>('https://api.github.com/search/users',
      query, page, this.userCachedValues);
  }

  private gitSearch<T>(baseUrl: string, query: string, page: number, cache: RepoCachedValues | UserCachedValues): Promise<T> {
    return new Promise((resolve) => {
      const cacheKey = `${baseUrl}-${query}-${page}`;
      if (cache[cacheKey]) {
        resolve(cache[cacheKey]);
      } else {
        this.http.get<T>(`${baseUrl}?q=${query}&page=${page}`)
          .toPromise()
          .then(response => {
            cache[cacheKey] = response;
            resolve(response);
          })
          .catch(console.log);
      }
    });
  }
}
