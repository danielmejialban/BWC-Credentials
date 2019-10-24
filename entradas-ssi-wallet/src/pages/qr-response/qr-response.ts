import {Component} from '@angular/core';
import {IonicPage, List, NavController, NavParams} from 'ionic-angular';
import {Login} from "../login/login";

/**
 * Generated class for the QrResponsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-response',
  templateUrl: 'qr-response.html',
    styleUrls: ['/qr-response.scss']
})
export class QrResponsePage {

    ticket: string;
    name: string;
    email: string;
    ticketsId = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.saveParamsInLocalStorage();
  }

  ionViewDidLoad() {
  }

  saveParamsInLocalStorage(){
      this.ticket = this.navParams.get('ticketId');
      this.name = this.navParams.get('name');
      this.email = this.navParams.get('email');
      this.ticketsId.push(this.ticket);
      localStorage.setItem("TicketsID",JSON.stringify(this.ticketsId));

  }

    goScanner(){
        this.navCtrl.popTo(Login);
    }



}
