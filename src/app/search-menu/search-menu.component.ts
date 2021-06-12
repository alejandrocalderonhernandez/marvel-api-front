import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.sass']
})
export class SearchMenuComponent implements OnInit {

  tittle: string;
  menu: string[];

  constructor(private router:Router) {
    this.tittle = 'Choose a option'
    this.menu = ['Characters', 'Comics', 'Creators', 'Events', 'Series']
   }

  ngOnInit(): void {}

  navigate(option: string): void {
    const path = '/' + option.toLowerCase();
    this.router.navigate([path]);
  }
}
