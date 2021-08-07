import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/shared/models/item.model';
import { Search } from 'src/app/shared/models/search.model';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.sass'],
})
export class CardsContainerComponent implements OnInit {

  @Input() 
  items!: Array<Item>

  @Input() 
  isLoading: boolean

  @Input()
  showDescription?: boolean

  @Input()
  cardStyle: string

  @Output()
  searchEmitter: EventEmitter<Search>;

  searchIcon: IconDefinition
  showToggle:boolean;
  searchModel: Search

  constructor() {
    this.isLoading = true
    this.searchIcon = faSearch
    this.showToggle = false
    this.searchModel = new Search()
    this.searchEmitter = new EventEmitter();
    this.cardStyle = ''
   }

  ngOnInit(): void { }

  toggle() {
    if(this.showToggle) {
      setTimeout(() => this.showToggle = !this.showToggle, 500)
    } else {
      this.showToggle = !this.showToggle
    }
  }

  emitSearch(event: any): void {
    this.searchModel.id = event.id
    this.searchModel.itemType = event.itemType
    this.searchEmitter.emit(this.searchModel)
  }
}
