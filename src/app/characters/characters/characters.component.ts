import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/shared/models/response.model';
import { Search } from 'src/app/shared/models/search.model';
import { FilterService } from 'src/app/shared/services/filter.service';
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
  searchModel: Search
  filtered: boolean
  itemName: string
  text: string

  constructor(private service: CharactersService,
              private filterService: FilterService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.isLoading = true
    this.showDescription = true
    this.filtered = false
    this.totalItems = 0
    this.startPage = 0
    this.searchModel = new Search()
    this.itemName = ''
    this.text = ''
   }


  ngOnInit(): void {
    this.itemName = this.service.getItemTypeName()
    this.searchModel.id = this.activatedRoute.snapshot.params.id;
    this.searchModel.itemType = this.activatedRoute.snapshot.params.itemType;
    if(this.searchModel.id !== undefined) {
      this.getItemsFilteredByItem(this.startPage, this.searchModel)
      this.filtered = true
    } else {
      this.getItems(this.startPage)
    }
    this.filterService.textObservable.subscribe(text => this.filter(text));
  }


  setNextPage(page: any): void {   
    this.getItems(page) 
  }

  search(event: any) {
    this.router.navigate([event.itemType, event.id, this.itemName])
  }

  filter(text: string): void {
    this.text += text
    if(text !== '' && text.length > 1) {
      this.getItemsStartWith(0, text)
    } else if(text === '') {
      this.getItems(this.startPage)
    }
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

  private getItemsFilteredByItem(offset: number, searchModel: Search): void {
    this.isLoading = true
    this.service.findByPageAndItem(offset, environment.itemsPerFilter, searchModel).subscribe(r => { 
      this.response = r
      this.totalItems = r.total
      setTimeout(() => { this.isLoading = false; }, 100);
   });
  }


  private getItemsStartWith(offset: number, startWith: string): void {
    this.isLoading = true
    this.service.findNameStartWith(offset, environment.itemsPerFilter, startWith).subscribe(r => { 
      this.response = r
      this.totalItems = r.total
      this.isLoading = false
   });
  }
}
