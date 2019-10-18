import { Component, Input } from '@angular/core';
import { IonicPage, ModalController, ViewController, NavParams, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ContructionsPage } from '../contructions/contructions';
import { SessionSecuredStorageService } from '../../services/securedStorage.service';
import { HomePage } from '../home/home';
import {RegisterPrivacyConditionsPage} from "../register/register-hub/register-privacy-conditions/register-privacy-conditions";
import {QrReaderPage} from "../qr-reader/qr-reader";
import {TestService} from "../../services/test.service";
import {QrResponsePage} from "../qr-response/qr-response";
import {QrResponseFailPage} from "../qr-response-fail/qr-response-fail";
import {Base64} from "js-base64";
import {User} from "../../models/User";
import {clearScreenDown} from "readline";
import {PayLoadJwtCredential} from "../../models/jwtCredentials";
import {ModalServiceProviderPage} from "../modal-service-provider/modal-service-provider";
import { TokenSigner } from 'jsontokens'
import { decodeToken } from 'jsontokens'
import {tick} from "@angular/core/testing";


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
    user: User;
    serviceProvider: string;
    date: Date = new Date();
    expDate: Date = new Date();

    elliptic = require('elliptic');
    jsontokens = require('jsontokens');
    ecurve = new this.elliptic.ec('secp256k1');
    test = this.genKey();

    constructor(
        public barcodeScanner: BarcodeScanner,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public sessionSecuredStorageService: SessionSecuredStorageService,
        private testService: TestService,
        private barcode: BarcodeScanner,) {

        let keys = this.genKey();

        let publicB64 = Base64.encode(keys.public1)
        let base64Encoded  = Base64.encode(publicB64);

        console.log("Base64",base64Encoded);
        localStorage.setItem('base64',base64Encoded);

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
                "procUrl": "https://www.direccion_evento.com/alastria/businessprocess/0001",
                "procHash": "H398sjHd...kldjUYn475n",
                "data": [
                    {
                        "@context": "JWT",
                        "levelOfAssurance": "Low",
                        "required": true,
                        "field_name": "ticketID",
                    }
                ],
            }
        };

        this.generateToken(keys);
    }

     genKey(){
        var keypair = this.ecurve.genKeyPair();
        var key = keypair.getPrivate().toString('hex');
        var prefix = '0'.repeat(64 - key.length);
        var public1 = keypair.getPublic().encode('hex');
        console.log("key privada----"+key);
        console.log("key publica----"+public1);
        return {private: `${prefix}${key}`, public1};
    }


    generateToken(keys:any) {
        // let token = jwt.sign(this.jwtPayload, "-----BEGIN EC PRIVATE KEY-----\n" +
        //     "MHQCAQEEILI8IeZxN1DQskSvfl1rDnWp/9horl1xAwumWlk0fYejoAcGBSuBBAAK\n" +
        //     "oUQDQgAENF5lijsAeVDle1NLoOqt3w0yZ/4VAVBpO3rr6HCOCSDHD+DxirmR0BKW\n" +
        //     "YCoGtSiFSUeekSLkIeohUoxoMUTAng==\n" +
        //     "-----END EC PRIVATE KEY-----", {header: this.headerJwt, algorithm: "ES256"});
        // localStorage.setItem('token',JSON.stringify(token));
        let tokenSigned = new this.jsontokens.TokenSigner('ES256k', keys.private).sign(this.jwtPayload,true,this.headerJwt);
        console.log("TokenSigned --> ",tokenSigned);
        let verified = new this.jsontokens.TokenVerifier('ES256k', keys.public1).verify(tokenSigned);
        console.log("verifincando 333333",verified);
        let testverified = new this.jsontokens.TokenVerifier('ES256k', this.test.public1).verify(tokenSigned);
        console.log("verficando que de false ---> ", testverified);
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
        modal.onDidDismiss( data =>{
            this.serviceProvider = data;
            console.log(this.serviceProvider);
            localStorage.setItem('provider',JSON.stringify(this.serviceProvider));
        });
        modal.present();
    }

    // opneQr(){
    //     this.navCtrl.push(QrReaderPage);
    //     console.log("Ok!");
    //     this.testService.getUID();
    // }


    // qrScannerCam() {
    //     this.barcode.scan().then(barcodeData => {
    //         if (!barcodeData) {
    //             alert('Error: Contacte con el service provider.')
    //         } else {
    //             console.log("barCode", barcodeData.text);
    //             let jwt = require("jsonwebtoken");
    //             let token = jwt.decode(barcodeData.text);
    //             console.log("token decoded", token);
    //             let saveToken: PayLoadJwtCredential = token;
    //             this.decode64 = Base64.decode(saveToken.vp.verifiableCredential);
    //             let ticketId = this.decode64;
    //             let name = saveToken.name;
    //             let email = saveToken.email;
    //
    //             if (saveToken.vp != null && !undefined) {
    //                 this.navCtrl.push(QrResponsePage, {ticketId: ticketId, name:name, email:email});
    //             } else{
    //                 this.navCtrl.push(QrResponseFailPage, {ticketId: ticketId, name:name,email:email});
    //             }
    //         }
    //     }).catch(err => {
    //         console.log('Error', err);
    //     });
    // }

    qrScannerCam(){
        this.barcode.scan().then(barcodeData => {
            if (!barcodeData) {
                alert('Error: Contacte con el service provider.')
            } else {
                let jwt = require("jsonwebtoken");
                let token = jwt.decode(barcodeData.text);
                this.decode64 = undefined;
                this.searchJSON(token);
                let  ticketId = this.decode64;
                console.log("ticket--->",ticketId);
                if(this.decode64 != null && this.decode64 != undefined){
                    this.navCtrl.push(QrResponsePage, {ticketId: this.decode64});
                }else{
                    this.navCtrl.push(QrResponseFailPage, {ticketId: this.decode64});
                }
            }
        }).catch(err => {
            console.log('Error', err);
        });
    }

    searchJSON(data: any) {
        for (let k in data) {
            if (typeof data[k] == "object" && data[k] !== null) {
                if (k == 'verifiableCredential') {
                    this.decode64 = Base64.decode(data[k]);
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
