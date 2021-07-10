import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CardsContainerComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports: [
    CardsContainerComponent,
    CardComponent
  ]
})
export class CardsModule { }
