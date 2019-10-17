import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Provider} from "../../models/User";

/**
 * Generated class for the ModalServiceProviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-service-provider',
  templateUrl: 'modal-service-provider.html',
})
export class ModalServiceProviderPage {

    serviceProvider: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalServiceProviderPage');
  }

  // goBack(){
  //     // this.dismiss();
  //     this.navCtrl.popToRoot();
  //     console.log("ServiceProvider",this.serviceProvider);
  // }

  closeModal(){
      this.viewCtrl.dismiss({ provider: this.serviceProvider});
    }

}
