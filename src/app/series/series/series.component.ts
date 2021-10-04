import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Response } from 'src/app/shared/models/response.model';
import { Search } from 'src/app/shared/models/search.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { environment } from 'src/environments/environment';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.sass']
})
export class SeriesComponent implements OnInit, OnDestroy {
 
  isLoading: boolean
  response!: Response
  showDescription: boolean
  startPage: number
  totalItems: number
  searchModel: Search
  filtered: boolean
  itemName: string
  searchText: string
  fromOtherItem: boolean
  filterSubscription?: Subscription

  constructor(private service: SeriesService,
              private filterService: FilterService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.isLoading = true
    this.showDescription = true
    this.filtered = false
    this.totalItems = 0
    this.startPage = 0
    this.searchModel = new Search()
    this.itemName = '';
    this.searchText = ''
    this.fromOtherItem = false 
   }

   ngOnInit(): void {
    this.itemName = this.service.getItemTypeName()
    this.searchModel.id = this.activatedRoute.snapshot.params.id
    this.filterService.emitEnableInput(true)
    this.filterSubscription = this.filterService.textObservable.subscribe(text => {
      this.filter(text)
      if(text.length === 0) {
        this.getItems(this.startPage)
      }
    })
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

  filter(text: string) {
    this.searchText += text
    if(text !== '' && text.length > 1) {
      this.getItemsStartWith(0, text)
      this.fromOtherItem = false
    } else if(text === '' && this.fromOtherItem) {
      this.getItems(this.startPage)
    }
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

  private getItemsFiltered(offset: number, searchModel: Search): void {
    this.isLoading = true
    this.service.findByPageAndItem(offset, environment.itemsPerFilter, searchModel).subscribe(r => { 
      this.response = r
      this.totalItems = r.total
      setTimeout(() => { this.isLoading = false; }, 100);
   });
  }

  private getItemsStartWith(offset: number, startWith: string) {
    this.isLoading = true
    this.service.findNameStartWith(offset, environment.itemsPerFilter, startWith).subscribe(r => { 
      this.response = r
      this.isLoading = false
   })
  }

  ngOnDestroy(): void {
    this.filterService.emitEnableInput(false)
    this.filterSubscription?.unsubscribe()
  }
}
