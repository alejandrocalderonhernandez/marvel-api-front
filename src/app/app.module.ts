import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchMenuComponent } from './search-menu/search-menu.component';
import { CardsModule } from './cards/cards.module';
import { CharactersModule } from './characters/characters.module';
import { ComicsModule } from './comics/comics.module';
import { CreatorsModule } from './creators/creators.module';
import { EventsModule } from './events/events.module';
import { SeriesModule } from './series/series.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CardsModule,
    CharactersModule,
    ComicsModule,
    CreatorsModule,
    EventsModule,
    SeriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
