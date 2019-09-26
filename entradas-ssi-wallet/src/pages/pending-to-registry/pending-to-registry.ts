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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private testService : TestService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingToRegistryPage');
    // this.testService.getUID();
  }

}
