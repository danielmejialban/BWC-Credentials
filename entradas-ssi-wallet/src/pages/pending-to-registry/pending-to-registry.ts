import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TestService} from "../../services/verifiable-credential.service";
import {Provider} from "../../models/User";

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

    _tickets = [];
    serviceProvider: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private testService : TestService) {
        this.serviceProvider = JSON.parse(localStorage.getItem('provider'));
        console.log("obj", this.serviceProvider.provider);
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PendingToRegistryPage');
        let tickets = localStorage.getItem('TicketsID');
        this._tickets.push(tickets);
        console.log("tickets lenght",this._tickets.length);
    }
}
