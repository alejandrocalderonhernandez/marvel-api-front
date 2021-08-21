import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemClientService } from '../shared/services/item-client.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends ItemClientService {

  constructor(client: HttpClient) {
    super(client, 'events', 'nameStartsWith');
   }
  
   public getItemTypeName(): string {
    return'events'
  }
}
