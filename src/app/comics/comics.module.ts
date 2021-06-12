import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics/comics.component';
import { CardsModule } from '../cards/cards.module';


@NgModule({
  declarations: [
    ComicsComponent
  ],
  imports: [
    //RouterModule.forChild(pokeroutes),
    CommonModule,
    ComicsRoutingModule,
    CardsModule
  ]
})
export class ComicsModule { }
