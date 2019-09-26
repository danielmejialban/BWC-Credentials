import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {PendingToRegistryPage} from "../../pages/pending-to-registry/pending-to-registry";
import {QrResponsePage} from "../../pages/qr-response/qr-response";

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

  constructor(private navCtrl: NavController) {
    console.log('Hello SideBarComponent Component');
    this.text = 'Hello World';
  }


    openPage(page: string){
      switch (page) {
          case 'pendingToRegister':
              this.navCtrl.push(PendingToRegistryPage);
              break;
          case 'qr-response' :
              this.navCtrl.push(QrResponsePage);
              break;
      }
    }

}
