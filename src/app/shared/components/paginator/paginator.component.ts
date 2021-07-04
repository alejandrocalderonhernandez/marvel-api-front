import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { faBackward, faBan, faChevronLeft, faChevronRight, faForward, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
  ban: IconDefinition

  disabledFirst: boolean
  disabledLast: boolean

  currentPage: number
  indexFirst: number
  indexSize: number
  firstLastPage: number
  lastPage: number
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
    this.ban = faBan
    this.totalItems = 0
    this.currentPage = 0
    this.firstLastPage = 0
    this.lastPage = 0
    this.indexSize = 20
    this.indexFirst = 1
    this.indices = new Array()
    this.initIndices();
  }

  ngOnInit(): void {
    this.lastPage = Math.ceil(this.totalItems / environment.itemsPerPage)
    this.firstLastPage = this.lastPage - environment.itemsPerPage
  }

  paginate(keyWord: string): void {

    if (keyWord === 'next') {
      this.currentPage ++
      this.incrementIndices()
    } else if (keyWord === 'previus') {
      this.currentPage --
      this.decrementIndices()
    }
    
    console.log('this.currentPage' + this.currentPage) 
    console.log('this.lastPage' + (this.lastPage - 1)) 
    if(this.currentPage > 0) {
      this.disabledFirst = false
    } else if (this.currentPage === 0) {
      this.disabledFirst = true
    } 
    
    if (this.currentPage === this.lastPage - 1){
      this.disabledLast = true
    } else if(this.currentPage < this.lastPage) {
      this.disabledLast = false
    }

    const nextPage = this.currentPage * environment.itemsPerPage; 
    this.page.emit(nextPage)
  }

  private initIndices(): void {
    for (let i = 0; i <= this.indexSize; i++) {
      this.indices.push(i);
    }
  }

  setFirstPage(): void {
    this.indices = []
    this.initIndices()
    this.currentPage = 0
    this.paginate('firstPage')
  }

  setLastPage(): void {
    this.indices = []
    let cont = environment.itemsPerPage;
    for (let i = this.lastPage; i >= this.firstLastPage; i--) {
      this.indices[cont] = i - 1
      cont --
    }
    this.currentPage = this.indices[this.indices.length-1]
    this.paginate('lastPage')
  }

  setPageByIndex(index: number): void {
    this.currentPage = index
    this.paginate('index')
  }

  private incrementIndices(): void {
    for (let i = 0; i <= this.indexSize; i++) {
      this.indices[i] = this.indices[i] + 1
    }
  }

  private decrementIndices(): void {
    for (let i = 0; i <= this.indexSize; i++) {
      if(this.indices[i] === 0){
        break
      }
      this.indices[i] = this.indices[i] - 1  
    }
  }
}