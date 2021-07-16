import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series/series.component';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SeriesComponent
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    CardsModule,
    SharedModule
  ]
})
export class SeriesModule { }
