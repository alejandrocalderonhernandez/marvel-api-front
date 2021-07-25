import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/shared/models/response.model';
import { environment } from 'src/environments/environment';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass']
})
export class CharactersComponent implements OnInit {

  isLoading: boolean
  response!: Response
  showDescription: boolean
  startPage: number
  totalItems: number

  constructor(private service: CharactersService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
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

  filter(event: any) {
    this.router.navigate([event.itemType, event.id, 'characters'])
  }

  private getItems(offset: number, id?:number, item?: string): void {
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
