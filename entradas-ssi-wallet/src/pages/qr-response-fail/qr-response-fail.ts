import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Login} from "../login/login";

/**
 * Generated class for the QrResponseFailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-response-fail',
  templateUrl: 'qr-response-fail.html',
})
export class QrResponseFailPage {


    ticket: string;
    name: string;
    email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad QrResponseFailPage');
      this.ticket = this.navParams.get('ticketId');
      this.name = this.navParams.get('name');
      this.email = this.navParams.get('email');
  }

  goScanner(){
      this.navCtrl.popTo(Login);
  }

}
