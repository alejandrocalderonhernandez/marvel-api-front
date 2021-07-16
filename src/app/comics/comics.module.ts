import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics/comics.component';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ComicsComponent
  ],
  imports: [
    CommonModule,
    ComicsRoutingModule,
    CardsModule,
    SharedModule
  ]
})
export class ComicsModule { }
