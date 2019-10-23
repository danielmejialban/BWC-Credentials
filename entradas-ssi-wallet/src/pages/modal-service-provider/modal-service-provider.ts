import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Provider} from "../../models/User";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalServiceProviderPage');
  }

  closeModal(){
      // this.viewCtrl.dismiss({ provider: this.serviceProvider}).catch(reason => {
      //     alert("Lo sentimos ha ocurrido un error");
      //     console.log(reason);
      // });
      localStorage.setItem('provider',JSON.stringify(this.serviceProvider));
      this.navCtrl.push(Login);
    }

    btnCloseModal(){
      this.viewCtrl.dismiss().catch( error =>{
          alert("Lo sentimos ha ocurrido un error");
          console.log(error);
      });
    }

}
