import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchMenuComponent } from './search-menu/search-menu.component';

const routes: Routes = [
  {path: '', component: SearchMenuComponent},
  {path: 'characters', loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule)},
  {path: 'characters/:id/:itemType', loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule)},
  {path: 'comics', loadChildren: () => import('./comics/comics.module').then(m => m.ComicsModule)},
  {path: 'comics/:id/:itemType', loadChildren: () => import('./comics/comics.module').then(m => m.ComicsModule)},
  {path: 'creators', loadChildren: () => import('./creators/creators.module').then(m => m.CreatorsModule)},
  {path: 'creators/:id/:itemType', loadChildren: () => import('./creators/creators.module').then(m => m.CreatorsModule)},
  {path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule)},
  {path: 'events/:id/:itemType', loadChildren: () => import('./events/events.module').then(m => m.EventsModule)},
  {path: 'series', loadChildren: () => import('./series/series.module').then(m => m.SeriesModule)},
  {path: 'series/:id/:itemType', loadChildren: () => import('./series/series.module').then(m => m.SeriesModule)},
  {path: 'stories', loadChildren: () => import('./stories/stories.module').then(m => m.StoriesModule)},
  {path: 'stories/:id/:itemType', loadChildren: () => import('./stories/stories.module').then(m => m.StoriesModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
