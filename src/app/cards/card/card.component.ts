import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs';
import { Item } from 'src/app/shared/models/item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  @Input()
  showDescription?: boolean

  @Input() 
  public item!: Item


  constructor() {
  }

  ngOnInit(): void {
  }

}
