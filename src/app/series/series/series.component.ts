import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/models/response.model';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.sass']
})
export class SeriesComponent implements OnInit {

  response!: Response;
  showDescription: boolean;
  
  constructor(private service: SeriesService) {
    this.showDescription = true;
  }

  ngOnInit(): void {
    this.service.findByPage(40, 20).subscribe(r => { 
      this.response = r;
   });
  }

}
