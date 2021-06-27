import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/models/response.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  response!: Response;
  showDescription: boolean;

  constructor(private service: EventsService) {
    this.showDescription = true;
   }

  ngOnInit(): void {
    this.service.findByPage(40, 20).subscribe(r => { 
      this.response = r;
   });
  }

}
