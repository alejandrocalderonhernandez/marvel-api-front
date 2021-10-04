import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from './stories/stories.component';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from '../shared/shared.module';
import { StoriesRoutingModule } from './stories-routing.module';



@NgModule({
  declarations: [
    StoriesComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    CardsModule,
    SharedModule
  ]
})
export class StoriesModule { }
