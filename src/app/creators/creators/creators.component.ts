import { Component, OnInit } from '@angular/core';
import { CreatorsService } from '../creators.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.sass']
})
export class CreatorsComponent implements OnInit {

  constructor(private service: CreatorsService) { }

  ngOnInit(): void {
    this.service.findByPage(40, 20).subscribe(r => console.log(r));
  }

}
