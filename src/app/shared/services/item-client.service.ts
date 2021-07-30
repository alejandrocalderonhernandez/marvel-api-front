import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { Response } from '../models/response.model';
import { Search } from '../models/search.model';

export abstract class ItemClientService {

  protected timestampParamName: string;
  protected apikeyParamName: string;
  protected hashParamName: string;
  protected offsetParamName: string;
  protected limitParamName: string;


  constructor(protected client: HttpClient, protected resource: string) { 
    this.timestampParamName = 'ts';
    this.apikeyParamName = 'apikey';
    this.hashParamName = 'hash';
    this.offsetParamName = 'offset';
    this.limitParamName = 'limit';
  }

  public findByPage(offset: number, limit: number): Observable<Response> {
    const uri = `${environment.baseUrl}${this.resource}`;
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
          this.buildItems(response.data.results)
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
          this.buildItems(response.data.results)
        );
     }));
  }

  protected buildItems(data: any[]): Item[] {
    let items = new Array<Item>();
    data.forEach(d => {
      items.push(
        new Item(
          d.id, 
          d.title, 
          d.description, 
          this.buildImg(d.thumbnail)));
    })
    return items;
  }

  protected buildImg(thumbnail: any): string {
    const url = thumbnail.path;
    const extension = thumbnail.extension;
    return `${url}.${extension}`;
  }

  public abstract getItemTypeName() : string
  
}
