import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/models/response.model';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.sass']
})
export class ComicsComponent implements OnInit {

  response!: Response;
  showDescription: boolean;

  constructor(private service: ComicsService) {
    this.showDescription = true;
  }

  ngOnInit(): void {
    this.service.findByPage(40, 20).subscribe(r => { 
      this.response = r;
   });
  }

}
