import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ApiFront';

  inputValue: string = '';
  isInputDisabled: boolean = false;

  onValueChange(newValue: string) {
    this.inputValue = newValue;
    console.log('Input changed:', newValue);
  }
}
