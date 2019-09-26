import { Component, Input } from '@angular/core';
import { IonicPage, ModalController, ViewController, NavParams, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ContructionsPage } from '../contructions/contructions';
import { SessionSecuredStorageService } from '../../services/securedStorage.service';
import { HomePage } from '../home/home';
import {RegisterPrivacyConditionsPage} from "../register/register-hub/register-privacy-conditions/register-privacy-conditions";
import {QrReaderPage} from "../qr-reader/qr-reader";

@IonicPage()
@Component({
    selector: 'login',
    templateUrl: 'login.html',
    styleUrls: ['/login.scss']
})
export class Login {
    @Input() data: any;
    @Input() events: any;

    jwtqr:string = "src/assets/images/jwtQr.PNG";
    user: string;
    pass: string;

    constructor(
        public barcodeScanner: BarcodeScanner,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public sessionSecuredStorageService: SessionSecuredStorageService
    ) {}


    openPage(page: string) {
        let modal = this.modalCtrl.create(InfoPage, { title: page });
        modal.present();
    }

    navegateTo(text: string) {
        let modal = this.modalCtrl.create(ContructionsPage);

        modal.present();
        console.log('Navigating to page: ' + text);
    }

    goToRegister(){
        this.navCtrl.push(RegisterPrivacyConditionsPage);
        console.log("Ok");
    }

    opneQr(){
        this.navCtrl.push(QrReaderPage);
        console.log("Ok!");
    }

}

@Component({
    selector: 'info',
    templateUrl: 'info.html',
    styleUrls: ['/info.scss']
})
export class InfoPage {

    title: string;

    constructor(
        public viewCtrl: ViewController,
        params: NavParams
    ) {
        this.title = params.get('title');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
