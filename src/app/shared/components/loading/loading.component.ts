import { Component } from '@angular/core';
import { faAtom, faMask, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading',
  template: `
    <div class=" h-100 d-flex justify-content-center align-items-center vh-100 text-secondary">
        <div>
            <fa-icon [icon]="icon" size="6x" [spin]="true"></fa-icon>
          </div>
    </div>
  ` 
})
export class LoadingComponent {

    icon: IconDefinition

    constructor() {
        this.icon = faAtom
    }
}