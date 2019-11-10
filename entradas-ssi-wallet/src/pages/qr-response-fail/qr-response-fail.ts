import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Login} from "../login/login";
import {QrResponsePage} from "../qr-response/qr-response";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {TestService} from "../../services/verifiable-credential.service";
/**
 * Generated class for the QrResponseFailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-response-fail',
  templateUrl: 'qr-response-fail.html',
})
export class QrResponseFailPage {
    ticket: string;
    name: string;
    email: string;
    _isMultiScanner: boolean;
    decode64: string;
    backendId:string='did_back_end';
    hash:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private barcode: BarcodeScanner,
              public testService: TestService) {
      this._isMultiScanner =  this.navParams.get('multiScanner');
      console.log("IsMultiScannerValue---->",this._isMultiScanner);
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad QrResponseFailPage');
      this.ticket = this.navParams.get('ticketId');
      this.name = this.navParams.get('name');
      this.email = this.navParams.get('email');
  }

  goBack(){
      if (this._isMultiScanner){
          this.qrScannerCam();
      }else {
          // this.navCtrl.popAll();
          this.navCtrl.setRoot(Login).then( value => {
              console.log(value);
          });
      }
  }


    qrScannerCam(){
        this.barcode.scan().then(barcodeData => {
            let jwt = require("jsontokens");
            let token = undefined;
            this.decode64 = undefined;

            if (barcodeData.cancelled){
                this.navCtrl.popTo(Login);
            }
            if (barcodeData != null || barcodeData != undefined) {
                try {
                    token  = jwt.decodeToken(barcodeData.text);
                    this.getDid(token);
                    this.searchJSON(token);
                    // this.hash = this.pmHash(token,did);
                    // console.log("---HASH2---",this.hash);
                    // this.testService.registerCredential(this.hash);
                }catch (e) {
                    console.log("error",e);
                }
                if(this.decode64 != null && this.decode64 != undefined){
                        this.navCtrl.push(QrResponsePage, {multiScanner: this._isMultiScanner});
                        this.navCtrl.remove(1);
                }else{
                    this.navCtrl.push(QrResponseFailPage, {multiScanner: this._isMultiScanner});
                    this.navCtrl.remove(1);
                }
            } else {
                alert('Error: Contacte con el service provider.')
            }
        }).catch(err => {
            console.log('Error', err);
        });
    }

    getDid(token:any){
        let _kid = this.testService.postValidateDid(this.backendId,token).subscribe( (data:any) =>{
        }).unsubscribe();
        return _kid;
    }


    searchJSON(data: any) {
        for (let k in data) {
            if (typeof data[k] == "object" && data[k] !== null) {
                if (k == 'verifiableCredential') {
                    this.decode64 = data[k];
                }
                else{
                    this.searchJSON(data[k]);
                }
            }
        }
    }

    pmHash(jwt, did){
        let web3 = require('web3');
        let json = jwt.concat(did);
        console.log("--HASH----",web3.utils.sha3(json));
        return web3.utils.sha3(json);
    }

}
