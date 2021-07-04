import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.sass']
})
export class CardsContainerComponent implements OnInit {

  @Input() 
  items!: Array<Item>

  @Input() 
  isLoading: boolean

  @Input()
  showDescription?: boolean

  constructor() {
    this.isLoading = true;
   }

  ngOnInit(): void {}

}
