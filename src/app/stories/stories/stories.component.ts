import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/shared/models/response.model';
import { Search } from 'src/app/shared/models/search.model';
import { environment } from 'src/environments/environment';
import { StoriesService } from '../stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.sass']
})
export class StoriesComponent implements OnInit {

  isLoading: boolean
  response!: Response
  showDescription: boolean
  startPage: number
  totalItems: number
  searchModel: Search
  filtered: boolean
  itemName: string
  fromOtherItem: boolean

  constructor(private service: StoriesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
this.isLoading = true
this.showDescription = true
this.filtered = false
this.totalItems = 0
this.startPage = 0
this.searchModel = new Search()
this.itemName = '';
this.fromOtherItem = false 
}


  ngOnInit(): void {
    this.itemName = this.service.getItemTypeName()
    this.searchModel.id = this.activatedRoute.snapshot.params.id
    this.searchModel.itemType = this.activatedRoute.snapshot.params.itemType;
    if(this.searchModel.id !== undefined) {
      this.getItemsFiltered(this.startPage, this.searchModel)
      this.filtered = true
    } else {
      this.getItems(this.startPage)
    }
  }

  setNextPage(page: any): void {   
    this.getItems(page) 
  }

  search(event: any) {
    this.router.navigate([event.itemType, event.id, this.itemName])
  }


  private getItems(offset: number): void {
    this.isLoading = true
    this.service.findByPage(offset, environment.itemsPerPage).subscribe(r => {
      console.log(r)

      this.response = r
      if(this.totalItems === 0) {
        this.totalItems = r.total
      }
      setTimeout(() => { this.isLoading = false; }, 1000);
   });
  } 

  private getItemsFiltered(offset: number, searchModel: Search): void {
      this.isLoading = true
      this.service.findByPageAndItem(offset, environment.itemsPerFilter, searchModel).subscribe(r => { 
        this.response = r
        this.totalItems = r.total
        setTimeout(() => { this.isLoading = false; }, 100);
    });
  }

}
