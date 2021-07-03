import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { faBackward, faChevronLeft, faChevronRight, faForward, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit {

  left: IconDefinition
  right: IconDefinition
  first: IconDefinition
  last: IconDefinition

  disabledFirst: boolean
  disabledLast: boolean

  currentPage: number
  indexFirst: number
  indexSize: number

  indices: Array<number>

  @Output()
  page = new EventEmitter<number>()

  @Input()
  totalItems: number

  constructor() { 
    this.disabledFirst = true
    this.disabledLast = false
    this.right = faChevronRight
    this.left = faChevronLeft
    this.first = faBackward
    this.last = faForward
    this.totalItems = 0
    this.currentPage = 0
    this.indexSize = 20
    this.indexFirst = 1
    this.indices = new Array()
    this.initIndices();
  }

  ngOnInit(): void {
    this.totalItems = Math.ceil(this.totalItems / environment.itemsPerPage)
  }

  paginate(keyWord: string): void {
    this.indexFirst = this.indices[0]
    
    if(this.indexFirst > 1) {
      this.disabledFirst = false
    } else {
      this.disabledFirst = true
    }

    if (keyWord === 'next') {
      this.currentPage ++
      this.incrementIndices()
    
    } else if (keyWord === 'previus') {
      this.currentPage --
      this.decrementIndices()
    }
    const nextPage = this.currentPage * environment.itemsPerPage; 
    this.page.emit(nextPage)
  }

  private initIndices(): void {
    for (let i = 1; i <= this.indexSize; i++) {
      this.indices.push(i);
    }
  }

  private incrementIndices(): void {
    for (let i = 0; i < this.indexSize; i++) {
      this.indices[i] = this.indices[i] + 1
    }
  }

  private decrementIndices(): void {
    for (let i = 0; i < this.indexSize; i++) {
      this.indices[i] = this.indices[i] - 1
    }
  }
}