import { Component, OnInit, Input } from '@angular/core';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/shared/models/item.model';

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

  searchIcon: IconDefinition
  showToggle:boolean;

  constructor() {
    this.isLoading = true
    this.searchIcon = faSearch
    this.showToggle = false
   }

  ngOnInit(): void {}

  toggle() {
    if(this.showToggle) {
      setTimeout(() => this.showToggle = !this.showToggle, 500)
    } else {
      this.showToggle = !this.showToggle
    }
  }

}
