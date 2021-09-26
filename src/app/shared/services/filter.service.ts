import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private textSubject: BehaviorSubject<string>
  private enableInputSubject: BehaviorSubject<boolean>
  public  textObservable: Observable<string> 
  public  enableInputObservable: Observable<boolean> 

  constructor() { 
    this.textSubject = new BehaviorSubject<string>('')
    this.enableInputSubject = new BehaviorSubject<boolean>(false)
    this.textObservable = this.textSubject.asObservable()
    this.enableInputObservable = this.enableInputSubject.asObservable()
  }

  public emitText(chars: string): void {
    this.textSubject.next(chars)
  }

  public emitEnableInput(enable: boolean): void {
    this.enableInputSubject.next(enable)
  }
}
