import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemClientService } from '../shared/services/item-client.service';

@Injectable({
  providedIn: 'root'
})
export class CreatorsService extends ItemClientService{

  constructor(protected client: HttpClient) {
    super(client, 'creators')
   }
}
