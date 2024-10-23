import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  constructor() { }
  src: string = 'assets/images/logo.png'; 
  @Input() alt: string = 'Logo'; 
  @Input() size: 'large' | 'medium' | 'small' = 'large'; 

  ngOnInit(): void {
  }

}
