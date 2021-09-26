import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Response } from 'src/app/shared/models/response.model';
import { Search } from 'src/app/shared/models/search.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { environment } from 'src/environments/environment';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.sass']
})
export class ComicsComponent implements OnInit, OnDestroy {

  response!: Response

  isLoading: boolean
  showDescription: boolean
  startPage: number
  searchModel: Search
  itemName: string
  searchText: string
  fromOtherItem: boolean
  filterSubscription?: Subscription

  constructor(private comicsService: ComicsService,
              private filterService: FilterService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.isLoading = true
    this.showDescription = true
    this.startPage = 0
    this.searchModel = new Search();
    this.itemName = ''
    this.searchText = ''
    this.fromOtherItem = false
  } 

  ngOnInit() {
    this.itemName = this.comicsService.getItemTypeName()
    this.searchModel.id = this.activatedRoute.snapshot.params.id
    this.searchModel.itemType = this.activatedRoute.snapshot.params.itemType
    this.filterService.emitEnableInput(true)
    this.filterSubscription = this.filterService.textObservable.subscribe(text => {
      this.filter(text)
      if(text.length === 0) {
        this.getItems(this.startPage)
      }
    })
    if(this.searchModel.id !== undefined) {
      this.getItemsFilteredByItem(this.startPage, this.searchModel)
      this.fromOtherItem = true
    } else {
      this.getItems(this.startPage)
    }
  }

  setNextPage(page: any) {   
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

  private getItems(offset: number) {
    this.isLoading = true
    this.comicsService.findByPage(offset, environment.itemsPerPage).subscribe(r => { 
      this.response = r
      setTimeout(() => { this.isLoading = false; }, 200);
   });
  }

  private getItemsFilteredByItem(offset: number, searchModel: Search): void {
    this.isLoading = true
    this.comicsService.findByPageAndItem(offset, environment.itemsPerFilter, searchModel).subscribe(r => { 
      this.response = r
      setTimeout(() => { this.isLoading = false; }, 100);
   });
  }

  private getItemsStartWith(offset: number, startWith: string) {
    this.isLoading = true
    this.comicsService.findNameStartWith(offset, environment.itemsPerFilter, startWith).subscribe(r => { 
      this.response = r
      this.isLoading = false
   });
  }

  ngOnDestroy(): void {
    this.filterService.emitEnableInput(false)
    this.filterSubscription?.unsubscribe()
  }
}
