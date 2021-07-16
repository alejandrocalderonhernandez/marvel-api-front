import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/models/response.model';
import { environment } from 'src/environments/environment';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {
  isLoading: boolean
  response!: Response
  showDescription: boolean
  startPage: number
  totalItems: number

  constructor(private service: EventsService) {
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
      setTimeout(() => { this.isLoading = false; }, 1000);
   });
  }

}
