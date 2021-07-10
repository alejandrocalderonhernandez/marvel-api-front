import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PaginatorComponent,
    LoadingComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    PaginatorComponent,
    LoadingComponent,
    SearchComponent
  ]
})
export class SharedModule { }
