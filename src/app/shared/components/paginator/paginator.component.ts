import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {

  left: IconDefinition;
  right: IconDefinition;

  constructor() { 
    this.right = faChevronRight;
    this.left = faChevronLeft
  }

  ngOnInit(): void {
  }

}
