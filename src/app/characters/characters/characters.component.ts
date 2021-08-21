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

  response!: Response

  isLoading: boolean
  showDescription: boolean
  startPage: number
  searchModel: Search
  itemName: string
  searchText: string
  fromOtherItem: boolean

  constructor(private characterService: CharactersService,
              private filterService: FilterService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.isLoading = true
    this.showDescription = true
    this.startPage = 0
    this.searchModel = new Search()
    this.itemName = ''
    this.searchText = ''
    this.fromOtherItem = false
   }


  ngOnInit() {
    this.itemName = this.characterService.getItemTypeName()
    this.searchModel.id = this.activatedRoute.snapshot.params.id;
    this.searchModel.itemType = this.activatedRoute.snapshot.params.itemType;
    this.filterService.textObservable.subscribe(text => this.filter(text))
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
      this.characterService.findByPage(offset, environment.itemsPerPage).subscribe(r => { 
        this.response = r
        setTimeout(() => { this.isLoading = false; }, 200);
     });
  }

  private getItemsFilteredByItem(offset: number, searchModel: Search) {
    this.isLoading = true
    this.characterService.findByPageAndItem(offset, environment.itemsPerFilter, searchModel).subscribe(r => { 
      this.response = r
      setTimeout(() => { this.isLoading = false; }, 100);
   });
  }

  private getItemsStartWith(offset: number, startWith: string) {
    this.isLoading = true
    this.characterService.findNameStartWith(offset, environment.itemsPerFilter, startWith).subscribe(r => { 
      this.response = r
      this.isLoading = false
   });
  }
}
