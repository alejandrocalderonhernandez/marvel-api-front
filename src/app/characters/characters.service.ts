import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from '../shared/models/item.model';
import { Response } from '../shared/models/response.model';
import { ItemClientService } from '../shared/services/item-client.service';

@Injectable({ 
  providedIn: 'root'
})
export class CharactersService extends ItemClientService {

  constructor(client: HttpClient) {
    super(client, 'characters');
   }

   public findByPage(offset: number, limit: number): Observable<Response> {
    const uri = `${environment.baseUrl}${this.resource}`
    const params = new HttpParams()
      .set(this.timestampParamName, environment.ts)
      .set(this.apikeyParamName, environment.publicApiKey)
      .set(this.hashParamName, environment.hash)
      .set(this.offsetParamName, offset.toString())
      .set(this.limitParamName, limit.toString())
    return this.client.get(uri, {params}).pipe(map((response: any) => {
        return new Response(
          response.status, 
          response.data.offset,
          response.data.limit,
          response.data.total,
          this.buildCharacter(response.data.results)
        );
    }));
  }

  private buildCharacter(data: any[]): Item[] {
    let items = new Array<Item>();
    data.forEach(d => {
      items.push(
        new Item(
          d.id, 
          d.name, 
          d.description, 
          this.buildImg(d.thumbnail)));
    })
    return items;
  }

  public getItemTypeName(): string {
    return'characters'
  }
}
