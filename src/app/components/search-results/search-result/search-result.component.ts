import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Movie, SearchMovieData } from 'src/app/interfaces/search-data.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent {

  @Input() result?: SearchMovieData | Movie;

  setPlaceholder() {
    if (this.result) {
      this.result = {...this.result, Poster: 'assets/images/placeholder.png'}
    }
  }
}
