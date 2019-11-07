import {Component, Input} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Base64} from 'js-base64';
import {ModalServiceProviderPage} from "../modal-service-provider/modal-service-provider";
import {QrResponsePage} from "../qr-response/qr-response";
import {QrResponseFailPage} from "../qr-response-fail/qr-response-fail";
import {TestService} from "../../services/verifiable-credential.service";
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'login',
    templateUrl: 'login.html',
    styleUrls: ['/login.scss']
})
export class Login {
    @Input() data: any;
    @Input() events: any;
    elementType: 'url' | 'canvas' | 'img' = 'url';
    decode64: string;
    pass: string;
    jwtPayload: any;
    headerJwt;
    serviceProvider: string;
    date: Date = new Date();
    expDate: Date = new Date();
    elliptic = require('elliptic');
    jsontokens = require('jsontokens');
    web3 = require('web3');
    ecurve = new this.elliptic.ec('secp256k1');
    test = this.genKey();
    token: any;
    backendId:string='did_back_end';
    _isMultiScanner:boolean;
    hash:any;
    did:any;

    constructor(
        public barcodeScanner: BarcodeScanner,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public testService: TestService,
        private barcode: BarcodeScanner,
        public event: Events){

        let url = "https://www.in2.es/blockchain2/";
        let hashCode = "be77731ad14a77dd71ddee69c4350f3b";
        let keys = this.genKey();
        let publicB64 = Base64.encode(keys.public1);
        let base64Encoded  = Base64.encode(publicB64);
        localStorage.setItem('base64',base64Encoded);
        let getProvider = localStorage.getItem('provider');
        let providerParse = JSON.parse(getProvider);
        this.headerJwt = {
            kid: "did:ala:quor:redt:" + base64Encoded + "#keys-1",
            typ: "JWT",
            alg: "ES256"
        };
        this.jwtPayload = {
            "iss": "did:alastria:quorum:testnet1:",
            "iat": this.date.getMilliseconds(),
            "exp": 31536000000 + this.expDate.getMilliseconds(),
            "pr": {
                "@context": [
                    "https://www.w3.org/2018/credentials/v1",
                    "JWT"
                ],
                "type": ["VerifiablePresentationRequest", "AlastriaVPRTicket"],
                "procUrl": url,
                "procHash": hashCode,
                "data": [
                    {
                        "@context": "JWT",
                        "levelOfAssurance": "Low",
                        "required": true,
                        "provider": providerParse,
                        "field_name": "ticketID"
                    }
                ],
            }
        };

        this.token = this.generateToken(keys);
        console.log(this.token);
    }

     genKey(){
        let keypair = this.ecurve.genKeyPair();
        let key = keypair.getPrivate().toString('hex');
        let prefix = '0'.repeat(64 - key.length);
        let public1 = keypair.getPublic().encode('hex');
        return {private: `${prefix}${key}`, public1};
    }


    getDid(token:any){
      let _kid = this.testService.postValidateDid(this.backendId,token).subscribe( (data:any) =>{
          console.log("GetDid",data);
        });
      console.log("Kid",_kid);
      return _kid;
    }

    generateToken(keys:any) {
        let tokenSigned = new this.jsontokens.TokenSigner('ES256k', keys.private).sign(this.jwtPayload,false,this.headerJwt);
        return tokenSigned;
    }

    openPage(page: string) {
        let modal = this.modalCtrl.create(InfoPage, {title: page});
        modal.present();
    }


    goToRegister() {
        this.navCtrl.push(ModalServiceProviderPage);
        console.log("Ok");
    }

    openModalToServiceProvider(){
        const modal = this.modalCtrl.create(ModalServiceProviderPage);
        modal.present();
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
                    console.log(token.toString());
                    console.log("--",this.token.toString());
                    this.searchJSON(token);
                }catch (e) {
                    console.log("error",e);
                }
                if(this.decode64 != null && this.decode64 != undefined){
                    this.navCtrl.push(QrResponsePage, {multiScanner: this._isMultiScanner});
                    this.hash = this.pmHash(this.token.toString(),this.headerJwt.kid);
                    this.testService.registerCredential(this.hash).subscribe( data =>{
                        console.log("Data",data);
                    });
                }else{
                    this.navCtrl.push(QrResponseFailPage, {multiScanner: this._isMultiScanner});
                }
            } else {
                alert('Error: Contacte con el service provider.')
            }
        }).catch(err => {
            console.log(err);
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

    multiScanner(event:any){
        this._isMultiScanner = event;
        console.log("Event antes de enviarse",event);
    }

    pmHash(jwt, did){
        console.log("JWT",jwt);
        console.log("DID",did);
        let json = jwt.concat(did);
        console.log("concat--",json);
        console.log("--HASH----",this.web3.utils.sha3(json));
        return this.web3.utils.sha3(json);
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
