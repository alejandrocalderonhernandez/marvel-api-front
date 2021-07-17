import { Component, EventEmitter, Output } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ItemType, Search } from '../../models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})

export class SearchComponent {

  @Output()
  close = new EventEmitter<void>()

  keepOpen: boolean
  closeIcon: IconDefinition
  searchModel: Search
  itemTypes: Array<string> 

  constructor() { 
    this.keepOpen = true
    this.closeIcon = faTimes
    this.itemTypes = new Array()
    this.searchModel = new Search();
    this.getItemsTypes()
  }

  closeComponent() {
    this.keepOpen = !this.keepOpen
    this.close.emit()
  }

  search(): void {
    console.log(this.searchModel)
  }

  private getItemsTypes(): void {
    const items = Object.values(ItemType)
    for(let i = 0; i<items.length; i++){
      this.itemTypes.push(items[i])
    }
  } 
}
