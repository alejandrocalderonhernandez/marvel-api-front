import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/models/response.model';
import { environment } from 'src/environments/environment';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass']
})
export class CharactersComponent implements OnInit {

  response!: Response
  showDescription: boolean
  startPage: number
  totalItems: number

  constructor(private service: CharactersService) {
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
    this.service.findByPage(offset, environment.itemsPerPage).subscribe(r => { 
      this.response = r
      if(this.totalItems === 0) {
        this.totalItems = r.total
      }
   });
  }
}
