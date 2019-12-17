import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-transaction',
  templateUrl: 'modal-transaction.html',
})
export class ModalTransactionPage {
    hash:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.hash = navParams.get('hash');
      console.log('hash',navParams.get('hash'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalTransactionPage');
  }

  closeModal(){
      this.navCtrl.pop().then(value => {
          console.log(value);
      });
  }
}
