import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/User";

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

    user:User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.user = navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrResponsePage');
  }

}
