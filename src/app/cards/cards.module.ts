import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    CardsContainerComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardsContainerComponent,
    CardComponent
  ]
})
export class CardsModule { }
