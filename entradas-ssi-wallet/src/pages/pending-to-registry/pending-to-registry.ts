import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TestService} from "../../services/test.service";

/**
 * Generated class for the PendingToRegistryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-to-registry',
  templateUrl: 'pending-to-registry.html',
})
export class PendingToRegistryPage {

    _tickets: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private testService : TestService) {
      let tickets = localStorage.getItem('TicketsID')
      this._tickets.push(tickets);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingToRegistryPage');
  }

}
