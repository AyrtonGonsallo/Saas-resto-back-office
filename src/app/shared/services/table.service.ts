import { DecimalPipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';


import { SortColumn, SortDirection } from '../directives/sortable.directive';


interface SearchResult {
  Details: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(countries: any[], column: SortColumn, direction: string): any[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(item: any, term: string) {
  term = term.toLowerCase();

  return Object.values(item).some(value =>
    value != null &&
    String(value).toLowerCase().includes(term)
  );
}

@Injectable({ providedIn: 'root' })
export class TableService {
  public pipe = inject(DecimalPipe);
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _data$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };
  _fullData: any[];

  constructor() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      )
      .subscribe(result => {
        this._data$.next(result.Details);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get supportdata$() {
    return this._data$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
   
    // 1. sort
    let Details = sort(this._fullData, sortColumn, sortDirection);
    console.log(sortColumn, sortDirection)

    // 2. filter
    Details = Details.filter(support => matches(support, searchTerm));
    const total = Details.length;

    // 3. paginate
    Details = Details.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    console.log("searchTerm",searchTerm)
    console.log("search",Details)
    return of({ Details, total });
  }


  setData(data: any[]) {
    this._fullData = data;
    this._search$.next();
    console.log("data",data)
    console.log("this._fullData",this._fullData)
    
  }
}
