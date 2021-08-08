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

  constructor(private service: FilterService) { }

  @ViewChild('searchInput') 
  inputSearch?: ElementRef;

  filterSubscription?: Subscription

  ngOnInit() {
    this.service.textObservable.subscribe();
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
