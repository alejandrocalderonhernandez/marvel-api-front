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

  constructor(private service: ComicsService) {}

  ngOnInit(): void {
    this.service.findByPage(40, 20).subscribe(r => { 
      this.response = r;
   });
  }

}
