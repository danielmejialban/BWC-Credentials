import { Component } from '@angular/core';

/**
 * Generated class for the SideBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'side-bar',
  templateUrl: 'side-bar.html'
})
export class SideBarComponent {

  text: string;

  constructor() {
    console.log('Hello SideBarComponent Component');
    this.text = 'Hello World';
  }


    openPage(page: string){
      console.log(page);
    }

}
