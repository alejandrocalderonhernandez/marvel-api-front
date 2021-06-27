import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/shared/models/response.model';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass']
})
export class CharactersComponent implements OnInit {

  response!: Response;
  showDescription: boolean;

  constructor(private service: CharactersService) {
    this.showDescription = true;
   }

  ngOnInit(): void {
    this.service.findByPage(40, 20).subscribe(r => { 
      this.response = r;
   });
  }

}
