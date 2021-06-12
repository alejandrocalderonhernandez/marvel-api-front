import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { Response } from '../models/response.model';

export abstract class ItemClientService {

  private timestampParamName: string;
  private apikeyParamName: string;
  private hashParamName: string;
  private offsetParamName: string;
  private limitParamName: string;


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

  private buildItems(data: any[]): Item[] {
   // data.forEach(d => console.log(d))
    let items = new Array<Item>();
    data.forEach(d => {
      items.push(new Item(d.id, d.tittle, d.description, 'img', d.start, d.end));
    })
    return items;
  }
}
