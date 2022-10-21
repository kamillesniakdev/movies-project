import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { SearchMovieData, SearchResult, QueryParams, Movie } from '../interfaces/search-data.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private query$ = new BehaviorSubject<QueryParams>({title: '', page: 0});
  private page$: Observable<number> = this.query$.pipe(map((query: QueryParams) => query.page));
  private totalResults$ = new BehaviorSubject<number>(0);
  private isLoading$ = new BehaviorSubject<boolean>(false);

  results$: Observable<SearchMovieData[]> = this.query$.pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap((queryParams: QueryParams) => this.getResults(queryParams)
      .pipe(
        tap((response: SearchResult) => this.totalResults$.next(response.totalResults)),
        map((response: SearchResult) => response.Search),
        tap(() => this.isLoading$.next(false)),
      )),
    );

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  getResults({title, type, year, page}: QueryParams): Observable<SearchResult> {
    const titleURL = `&s=${title}`
    const pageURL = `&page=${page + 1}`;
    const typeURL = type ? `&type=${type}` : '';
    const yearURL = year ? `&y=${year}`  : '';
    const url = 'https://www.omdbapi.com/?apikey=a7fc67d0' + titleURL + typeURL + yearURL + pageURL
    return this.http.get<SearchResult>(url)
  }

  setPage(page: number): void {
    this.query$.next({...this.query$.value, page});
  }

  setQuery(queryParams: QueryParams): void {
    this.query$.next(queryParams);
  }

  getPage(): Observable<number> {
    return this.page$;
  }

  getQuery(): Observable<QueryParams> {
    return this.query$;
  }

  getTotalResults(): Observable<number> {
    return this.totalResults$.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  getSingleMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>('https://www.omdbapi.com/?apikey=a7fc67d0&i=' + id)
  }
}
