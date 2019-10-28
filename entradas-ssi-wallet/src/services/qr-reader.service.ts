import {QrResponsePage} from "../pages/qr-response/qr-response";
import {QrResponseFailPage} from "../pages/qr-response-fail/qr-response-fail";
import {Base64} from 'js-base64';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {TestService} from "./verifiable-credential.service";
import {NavController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class QrReaderService {

    decode64: string;
    backendId:string='did_back_end';

    constructor( private barcode: BarcodeScanner,
                 private testService: TestService,
                 public navCtrl: NavController){}

   qrScannerCam(){
        this.barcode.scan().then(barcodeData => {
            let jwt = require("jsontokens");
            let token = undefined;
            this.decode64 = undefined;
            if (barcodeData != null || barcodeData != undefined) {
                try {
                    token  = jwt.decodeToken(barcodeData.text);
                    this.getDid(token);
                    this.searchJSON(token);
                }catch (e) {
                    console.log("error",e);
                }
                if(this.decode64 != null && this.decode64 != undefined){
                    this.navCtrl.push(QrResponsePage);
                }else{
                    this.navCtrl.push(QrResponseFailPage);
                }
            } else {
                alert('Error: Contacte con el service provider.')
            }
        }).catch(err => {
            console.log('Error', err);
        });
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

    getDid(token:any){
        let _kid = this.testService.postValidateDid(this.backendId,token).subscribe( (data:any) =>{
        }).unsubscribe();
        return _kid;
    }

}
