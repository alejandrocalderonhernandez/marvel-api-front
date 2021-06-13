import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { Response } from 'src/app/shared/models/response.model';
import { CreatorsService } from '../creators.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.sass']
})
export class CreatorsComponent implements OnInit {

  response!: Response;

  constructor(private service: CreatorsService) { }

  ngOnInit(): void {
    this.service.findByPage(40, 20).subscribe(r => { 
        this.response = r;
        console.log(r)
     });
  }

}
