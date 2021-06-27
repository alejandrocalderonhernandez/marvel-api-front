import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
