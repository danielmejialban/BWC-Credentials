import { Component, Input } from '@angular/core';
import { IonicPage, ModalController, ViewController, NavParams, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ContructionsPage } from '../contructions/contructions';
import { SessionSecuredStorageService } from '../../services/securedStorage.service';
import {TestService} from "../../services/verifiable-credential.service";
import {QrResponsePage} from "../qr-response/qr-response";
import {QrResponseFailPage} from "../qr-response-fail/qr-response-fail";
import {Base64} from 'js-base64';
import {ModalServiceProviderPage} from "../modal-service-provider/modal-service-provider";
import { TokenSigner } from 'jsontokens'
import { decodeToken } from 'jsontokens'
import {readFileSync} from 'fs';
import {createHash} from "crypto";

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
    multiScanner: boolean = false;
    serviceProvider: string;
    date: Date = new Date();
    expDate: Date = new Date();
    elliptic = require('elliptic');
    jsontokens = require('jsontokens');
    ecurve = new this.elliptic.ec('secp256k1');
    test = this.genKey();
    token: any;
    backendId:string='did_back_end';

    constructor(
        public barcodeScanner: BarcodeScanner,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public sessionSecuredStorageService: SessionSecuredStorageService,
        private testService: TestService,
        private barcode: BarcodeScanner,) {

        let url = "https://www.in2.es/blockchain2/";
        let hashCode = "be77731ad14a77dd71ddee69c4350f3b";
        let keys = this.genKey();
        let publicB64 = Base64.encode(keys.public1);
        let base64Encoded  = Base64.encode(publicB64);
        console.log("Base64",base64Encoded);
        localStorage.setItem('base64',base64Encoded);
        let getProvider = localStorage.getItem('provider');
        console.log("Provider",getProvider);
        let providerParse = JSON.parse(getProvider);
        console.log(JSON.parse(getProvider));
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
        console.log("key privada----"+key);
        console.log("key publica----"+public1);
        return {private: `${prefix}${key}`, public1};
    }


    getDid(token:any){
        console.log("entra en el kid -->",token);
      let _kid = this.testService.postValidateDid(this.backendId,token).subscribe( (data:any) =>{
            console.log("KID --->",data);
        }).unsubscribe();
      return _kid;
    }

    generateToken(keys:any) {
        // let token = jwt.sign(this.jwtPayload, "-----BEGIN EC PRIVATE KEY-----\n" +
        //     "MHQCAQEEILI8IeZxN1DQskSvfl1rDnWp/9horl1xAwumWlk0fYejoAcGBSuBBAAK\n" +
        //     "oUQDQgAENF5lijsAeVDle1NLoOqt3w0yZ/4VAVBpO3rr6HCOCSDHD+DxirmR0BKW\n" +
        //     "YCoGtSiFSUeekSLkIeohUoxoMUTAng==\n" +
        //     "-----END EC PRIVATE KEY-----", {header: this.headerJwt, algorithm: "ES256"});
        // localStorage.setItem('token',JSON.stringify(token));
        let tokenSigned = new this.jsontokens.TokenSigner('ES256k', keys.private).sign(this.jwtPayload,false,this.headerJwt);
        console.log("TokenSigned --> ",tokenSigned);
        return tokenSigned;
    }

    openPage(page: string) {
        let modal = this.modalCtrl.create(InfoPage, {title: page});
        modal.present();
    }

    navegateTo(text: string) {
        let modal = this.modalCtrl.create(ContructionsPage);
        modal.present();
        console.log('Navigating to page: ' + text);
    }

    goToRegister() {
        this.navCtrl.push(ModalServiceProviderPage);
        console.log("Ok");
    }

    openModalToServiceProvider(){
        const modal = this.modalCtrl.create(ModalServiceProviderPage);
        // modal.onDidDismiss( data =>{
        //     this.serviceProvider = data;
        //     console.log(this.serviceProvider);
        //     localStorage.setItem('provider',JSON.stringify(this.serviceProvider));
        // });
        modal.present();
    }

    qrScannerCam(){
        this.barcode.scan().then(barcodeData => {
            console.log("BarcodeInit --->",barcodeData);
            let jwt = require("jsontokens");
            let token = undefined;
            this.decode64 = undefined;
            if (barcodeData != null || barcodeData != undefined) {
                try {
                    token  = jwt.decodeToken(barcodeData.text);
                    console.log("Token recibido",token);
                    this.getDid(token);
                    let token_aux = token;
                    console.log("KID --->",token_aux.header.kid);
                    let tokenText = new this.jsontokens.decodeToken(barcodeData.text);
                    console.log("KID JSONTOKENS---->",tokenText.header.kid);
                    console.log("barcodeData",token);
                    this.searchJSON(token);
                }catch (e) {
                    console.log("error",e);
                }
                if(this.decode64 != null && this.decode64 != undefined){
                    console.log("Entra pantalla aceptado");
                    this.navCtrl.push(QrResponsePage, {ticketId: this.decode64});
                }else{
                    console.log("--- token ---",token);
                    console.log("Entra en la pantalla rechazado");
                    this.navCtrl.push(QrResponseFailPage, {ticketId: this.decode64});
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
                    console.log("---DECODE64---",this.decode64);
                }
                else{
                    this.searchJSON(data[k]);
                }
            }
        }
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
