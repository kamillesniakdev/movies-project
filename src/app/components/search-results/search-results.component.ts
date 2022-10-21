import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {

  page = this.search.getPage();
  results$ = this.search.results$;
  avaliableItems$ = this.search.getTotalResults();
  isLoading$ = this.search.getIsLoading();

  constructor(private search: SearchService) { }

  onPageChange(pageNumber: PageEvent) {
    this.search.setPage(pageNumber.pageIndex)
  }
}
