import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemClientService } from '../shared/services/item-client.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService extends ItemClientService {
  
  constructor(client: HttpClient) {
    super(client, 'series', 'titleStartsWith') 
   }

   public getItemTypeName(): string {
    return'series'
  }
}
