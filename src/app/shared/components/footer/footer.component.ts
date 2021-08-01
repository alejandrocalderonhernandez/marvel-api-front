import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  facebook: IconDefinition
  twitter: IconDefinition
  github: IconDefinition
  linkedin: IconDefinition
  
  constructor() { 
    this.facebook = faFacebook
    this.twitter = faTwitter
    this.github = faGithub
    this.linkedin = faLinkedin
  }

  ngOnInit(): void {
  }

}
