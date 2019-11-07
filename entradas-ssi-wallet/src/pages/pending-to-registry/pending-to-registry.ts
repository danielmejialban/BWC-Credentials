import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { ModalController } from 'ionic-angular';
import {ModalTransactionPage} from "../modal-transaction/modal-transaction";

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

    transtactions = [];
    showTransactions = false;
    serviceProvider: any;
    dateplustime:any;

    constructor(public navCtrl: NavController,
                private storage:Storage,
                public modalCtrl: ModalController) {
        this.serviceProvider = JSON.parse(localStorage.getItem('provider'));
        console.log("obj", this.serviceProvider.provider);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PendingToRegistryPage');
        let today = new Date();
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.dateplustime = time.toString() + '·' + date.toString();
        console.log("fecha---->",this.dateplustime);

        this.storage.get('transaction').then( (value) => {
            console.log("Value--->",value);
            this.transtactions = value;
            console.log(this.transtactions);
        });
        this.storage.keys().then( value => {
            console.log("Keys",value);
        })
    }

    openTransaction(hash){
        let modalTransaction = this.modalCtrl.create(ModalTransactionPage, {hash});
        modalTransaction.present();
    }
}
