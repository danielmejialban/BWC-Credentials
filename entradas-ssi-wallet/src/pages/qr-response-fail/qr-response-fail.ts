import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Login} from "../login/login";
import {errorHandler} from "@angular/platform-browser/src/browser";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrResponseFailPage');
  }

  goScanner(){
      this.navCtrl.popToRoot();
  }

}
