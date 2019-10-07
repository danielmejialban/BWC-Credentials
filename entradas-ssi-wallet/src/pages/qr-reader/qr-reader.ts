import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Login} from "../login/login";
import {User} from "../../models/User";
import {QrResponsePage} from "../qr-response/qr-response";
import {TestService} from "../../services/test.service";
import {Base64} from "js-base64";

/**
 * Generated class for the QrReaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-qr-reader',
    templateUrl: 'qr-reader.html',
    styleUrls: ['/qr-reader.scss']
})
export class QrReaderPage {
    user: User = null;
    elementType: 'url' | 'canvas' | 'img' = 'url';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private barcode: BarcodeScanner,
                private testService: TestService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad QrReaderPage');
    }

    // qrScannerCam() {
    //     console.log("ENTRA");
    //     this.barcode.scan().then(barcode =>{
    //         console.log("Ok escanneando",barcode);
    //         this.user = JSON.parse(barcode.text);
    //         this.navCtrl.push(QrResponsePage,{user:this.user})
    //     }).catch(err =>{
    //         console.log("Nope");
    //     })
    // }

    qrScannerCam() {
        this.barcode.scan().then(barcodeData => {
            if (!barcodeData) {
                alert('Error: Contacte con el service provider.')
            } else {
                let jwt = require("jsonwebtoken");
                let token = jwt.decode(barcodeData.text);
                this.searchJSON(token);
            }
        }).catch(err => {
            console.log('Error', err);
        });
    }

    searchJSON(data: any) {
        for (let k in data) {
            if (typeof data[k] == "object" && data[k] !== null) {
                if (k == 'verifiableCredential') {
                    let decode64 = Base64.decode(data[k]);
                    this.navCtrl.push(QrResponsePage, {wantedRq: decode64});
                }
                else{
                    this.searchJSON(data[k]);
                }
            } else {

            }
        }
    }

    goBack() {
        this.testService.getAlastriaID();
        this.navCtrl.pop();
    }
}
