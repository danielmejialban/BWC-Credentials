import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Login} from "../login/login";
import {User} from "../../models/User";
import {QrResponsePage} from "../qr-response/qr-response";

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
          this.user = JSON.parse(barcode.text);
          this.navCtrl.push(QrResponsePage,{user:this.user})
      }).catch(err =>{
          console.log("Nope");
      })
  }

  goBack(){
      this.navCtrl.pop();
  }
}
