import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { ItemClientService } from '../shared/services/item-client.service';

@Injectable({
  providedIn: 'root'
})
export class StoriesService extends ItemClientService {

  constructor(protected client: HttpClient) {
    super(client, 'stories', 'storiesStartsWith')
   }

   protected buildItems(data: any[]): Item[] {
    let items = new Array<Item>()
    data.forEach(d => {
      items.push(
        new Item(
          d.id, 
          '', 
          d.title, 
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'))
    })
    return items
  }

   public getItemTypeName(): string {
    return 'stories'
  }
}
