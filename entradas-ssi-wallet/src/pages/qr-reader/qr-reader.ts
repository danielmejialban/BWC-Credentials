import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Login} from "../login/login";

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
    elementType : 'url' | 'canvas' | 'img' = 'url';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private barcode: BarcodeScanner) {
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad QrReaderPage');
  }

  qrScannerCam() {
      this.barcode.scan().then(barcode =>{
          console.log("Ok escanneando",barcode);
      }).catch(err =>{
          console.log("Nope");
      })
  }

  goBack(){
      this.navCtrl.pop();
  }
}
