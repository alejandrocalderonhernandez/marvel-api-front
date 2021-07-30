import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ItemClientService } from '../shared/services/item-client.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../shared/models/response.model';
import { map } from 'rxjs/operators';
import { Item } from '../shared/models/item.model';
import { Search } from '../shared/models/search.model';

@Injectable({
  providedIn: 'root' 
})
export class CreatorsService extends ItemClientService{

  constructor(protected client: HttpClient) {
    super(client, 'creators')
   }

   public findByPage(offset: number, limit: number): Observable<Response> {
    const uri = `${environment.baseUrl}${this.resource}`;
    const params = new HttpParams()
      .set(this.timestampParamName, environment.ts)
      .set(this.apikeyParamName, environment.publicApiKey)
      .set(this.hashParamName, environment.hash)
      .set(this.offsetParamName, offset.toString())
      .set(this.limitParamName, limit.toString())
      console.log(uri)
    return this.client.get(uri, {params}).pipe(map((response: any) => {
        return new Response(
          response.status, 
          response.data.offset,
          response.data.limit,
          response.data.total,
          this.buildCreator(response.data.results)
        );
    }));
  }

  public findByPageAndItem(offset: number, limit: number, searchModel: Search): Observable<Response> {
    const uri = `${environment.baseUrl}${searchModel.itemType}/${searchModel.id}/${this.resource}`;
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
          this.buildCreator(response.data.results)
        );
     }));
  }

  private buildCreator(data: any[]): Item[] {
    let items = new Array<Item>();
    data.forEach(d => {
      items.push(
        new Item(
          d.id, 
          d.firstName, 
          d.fullName, 
          this.buildImg(d.thumbnail)));
    })
    return items;
  }

  public getItemTypeName(): string {
    return'creators'
  }
}
