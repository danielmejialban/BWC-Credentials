import { Component } from '@angular/core';
import {IonicPage, List, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/User";
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

    wanted:string;
    ticketsId = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     // this.saveParamsInLocalStorage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrResponsePage');
  }


  saveParamsInLocalStorage(){
      this.wanted= this.navParams.get('ticketId');
      console.log(this.wanted);
      this.ticketsId.push(this.wanted);
      console.log("List",this.ticketsId);
      localStorage.setItem("TicketsID",JSON.stringify(this.ticketsId));

  }

    goScanner(){
        this.saveParamsInLocalStorage();
        this.navCtrl.popToRoot();
    }



}
