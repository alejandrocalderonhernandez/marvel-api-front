import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private textSubject: BehaviorSubject<string>
  public  textObservable: Observable<string> 

  constructor() { 
    this.textSubject = new BehaviorSubject<string>('')
    this.textObservable = this.textSubject.asObservable()
  }

  public emitText(chars: string): void {
    this.textSubject.next(chars)
  }
}
