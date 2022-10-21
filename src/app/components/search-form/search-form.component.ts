import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {

  searchForm = new FormGroup({
    title: new FormControl('', [Validators.minLength(2), Validators.required]),
    type: new FormControl(''),
    year: new FormControl('', [Validators.min(1895), Validators.max(new Date().getFullYear())]),
  });

  filtersOpen = false;

  constructor(
    private search: SearchService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.filtersOpen) {
      this.toggleFilters();
    }
    if (this.searchForm.valid) {
      this.search.setQuery(
        {
          ...this.searchForm.value,
          page: 0,
        }
      );
      this.router.navigate(['search'])
    }
  }

  toggleFilters() {
    this.filtersOpen = !this.filtersOpen;
  }
}
