import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/models/response.model';
import { environment } from 'src/environments/environment';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.sass']
})
export class ComicsComponent implements OnInit {

  isLoading: boolean
  response!: Response
  showDescription: boolean
  startPage: number
  totalItems: number

  constructor(private service: ComicsService) {
    this.isLoading = true
    this.showDescription = true
    this.totalItems = 0
    this.startPage = 0
  }

  ngOnInit(): void {
    this.getItems(this.startPage)
  }

  setNextPage(page: any): void {   
    this.getItems(page) 
  }

  private getItems(offset: number): void {
    this.isLoading = true
    this.service.findByPage(offset, environment.itemsPerPage).subscribe(r => { 
      this.response = r
      if(this.totalItems === 0) {
        this.totalItems = r.total
      }
      setTimeout(() => { this.isLoading = false; }, 500);
   });
  }

}
