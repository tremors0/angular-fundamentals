import {Component, OnInit} from '@angular/core';
import {GitSearchService} from '../git-search.service';
import {GitSearchRepo} from '../@types';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  searchResult: GitSearchRepo;
  searchQuery: string;
  isLoading = false;
  title: string;
  displayQuery: string;
  page: number;

  constructor(private gitSearchService: GitSearchService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(value => this.title = value.title);
    this.route.paramMap.subscribe((params) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.page = this.parsePaginationParam(params.get('page'));
      this.gitSearch();
    });
  }

  private parsePaginationParam(page: string) {
    const result = parseInt(page, 10);
    if (isNaN(result) || result < 1) {
      return 1;
    }
    return result;
  }

  gitSearch() {
    this.isLoading = true;
    this.gitSearchService.gitSearchRepo(this.searchQuery, this.page)
      .then(response => this.searchResult = response)
      .catch(console.log)
      .finally(() => this.isLoading = false);
  }

  sendQuery() {
    this.searchResult = null;
    this.router.navigate([`/search/${this.searchQuery}/1`]);
  }

  getPreviousPageLink() {
    const page = this.page > 1 ? this.page - 1 : this.page;
    return `/search/${this.searchQuery}/${page}`;
  }

  getNextPageLink() {
    return `/search/${this.searchQuery}/${this.page + 1}`;
  }

}
