import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';import { fromEvent, Subscription } from 'rxjs';
;
import { map, startWith, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FilterService } from '../../services/filter.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements AfterViewInit, OnInit {

  @ViewChild('searchInput') 
  inputSearch?: ElementRef;

  filterSubscription?: Subscription
  enableInput: boolean

  constructor(private service: FilterService) { 
    this.enableInput = false
  }

  ngOnInit() {
    this.service.textObservable.subscribe();
    this.service.enableInputObservable.subscribe(e => this.enableInput = e)
  }

  ngAfterViewInit(): void {
    this.filterSubscription = fromEvent<any>(this.inputSearch?.nativeElement, 'keyup')
    .pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(text => this.service.emitText(text))
  }

  ngOnDestroy(): void {
    this.filterSubscription?.unsubscribe()
  }

}
