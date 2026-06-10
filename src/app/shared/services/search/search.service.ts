import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

   private readonly SEARCH_KEY = 'current_search_term';

  searchTerm = '';

  constructor() {
    this.searchTerm = localStorage.getItem(this.SEARCH_KEY) || '';
  }

  setSearchTerm(value: string) {
    this.searchTerm = value;
    localStorage.setItem(this.SEARCH_KEY, value);
  }

  getSearchTerm():string {
    this.searchTerm = localStorage.getItem(this.SEARCH_KEY)??'';
    return this.searchTerm
  }

  clearSearchTerm() {
    this.searchTerm = '';
    localStorage.removeItem(this.SEARCH_KEY);
  }
}
