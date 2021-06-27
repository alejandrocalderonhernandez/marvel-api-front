import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CharactersComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    CardsModule,
    SharedModule
  ]
})
export class CharactersModule { }
