import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  contactInfo = [
    { label: 'Email', value: 'contact@example.com' },
    { label: 'Phone', value: '+123 456 7890' },
    { label: 'Address', value: '123 Example St, City, Country' }
  ];

  constructor() { }

}
