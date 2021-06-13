import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatorsRoutingModule } from './creators-routing.module';
import { CreatorsComponent } from './creators/creators.component';
import { CardsModule } from '../cards/cards.module';


@NgModule({
  declarations: [
    CreatorsComponent
  ],
  imports: [
    CommonModule,
    CreatorsRoutingModule,
    CardsModule
  ]
})
export class CreatorsModule { }
