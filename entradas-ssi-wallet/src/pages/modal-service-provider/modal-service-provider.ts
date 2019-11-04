import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Login} from "../login/login";

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
    _provider: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
        this._provider = JSON.parse(localStorage.getItem('provider'));
  }

  closeModal(){
      localStorage.setItem('provider',JSON.stringify(this.serviceProvider));
      this.navCtrl.setRoot(Login);
    }

    btnCloseModal(){
       this.navCtrl.pop();
    }
}
