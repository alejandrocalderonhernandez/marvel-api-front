import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    CardsModule,
    SharedModule
  ]
})
export class EventsModule { }
