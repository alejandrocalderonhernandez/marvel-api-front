import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ItemType, Search } from '../../models/search.model';
import { repeat, delay, map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})

export class SearchComponent implements AfterViewInit {

  @Output()
  close: EventEmitter<void>

  @Output()
  searchEmitter: EventEmitter<Search>

  @Output()
  filterEmitter: EventEmitter<string>

  @ViewChild('searchInput') 
  inputSearch?: ElementRef;
  
  keepOpen: boolean
  closeIcon: IconDefinition
  searchModel: Search
  itemTypes: Array<string>

  constructor() { 
    this.close = new EventEmitter()
    this.searchEmitter = new EventEmitter()
    this.filterEmitter = new EventEmitter()
    this.keepOpen = true
    this.closeIcon = faTimes
    this.itemTypes = new Array()
    this.searchModel = new Search();
    this.getItemsTypes()
  }

  ngAfterViewInit(): void {
    const source = fromEvent<any>(this.inputSearch?.nativeElement, 'keyup')
    .pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()
    );

    source.subscribe(text => (this.onFilter(text)))
  }

  onClose() {
    this.keepOpen = !this.keepOpen
    this.close.emit()
  }

  onSearch(): void {
    this.searchEmitter.emit(this.searchModel)
  }

  onFilter(event: any): void {
    this.filterEmitter.emit(event)
  }

  private getItemsTypes(): void {
    const items = Object.values(ItemType)
    for(let i = 0; i<items.length; i++){
      this.itemTypes.push(items[i])
    }
  } 
}
