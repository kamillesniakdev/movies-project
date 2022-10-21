export interface SearchResult {
    Search: SearchMovieData[];
    totalResults: number;
    Response: string;
}

export interface SearchMovieData {
    Title: string;
    Year: number;
    imdbID: string;
    Type: MovieType;
    Poster: string;
}

export enum MovieType {
    Movie = 'movie',
    Series = 'series',
    Episode = 'episode'
}

export interface QueryParams {
    title: string;
    type?: string;
    year?: number;
    page: number;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface Movie{
    Title?: string;
    Year?: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster?: string;
    Ratings?: Rating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response?: string;
}