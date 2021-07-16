import { Component, EventEmitter, Output } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { 
    this.keepOpen = true
    this.closeIcon = faTimes
  }


  closeComponent() {
    this.keepOpen = !this.keepOpen
    this.close.emit()
  }
}
