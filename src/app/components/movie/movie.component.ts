import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/interfaces/search-data.interface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {

  movie$: Observable<Movie> = this.activatedRoute.params.pipe(
    switchMap(({id}: Params) => this.search.getSingleMovie(id))
  );

  visited$ = this.activatedRoute.params.pipe(
    switchMap(({id}: Params) =>
      combineLatest(
        this.localStorage.getItemsToDisplay(id).map((id) => {
          return this.search.getSingleMovie(id);
        })
      )
    )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private search: SearchService,
    private localStorage: LocalStorageService
  ) { }
}
