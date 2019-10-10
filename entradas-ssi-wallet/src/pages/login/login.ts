import { Component, Input } from '@angular/core';
import { IonicPage, ModalController, ViewController, NavParams, NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ContructionsPage } from '../contructions/contructions';
import { SessionSecuredStorageService } from '../../services/securedStorage.service';
import { HomePage } from '../home/home';
import {RegisterPrivacyConditionsPage} from "../register/register-hub/register-privacy-conditions/register-privacy-conditions";
import {QrReaderPage} from "../qr-reader/qr-reader";
import {TestService} from "../../services/test.service";
import * as fs from "fs";

@IonicPage()
@Component({
    selector: 'login',
    templateUrl: 'login.html',
    styleUrls: ['/login.scss']
})
export class Login {
    @Input() data: any;
    @Input() events: any;



    // jwtqr:string = "assets/images/jwtQr.PNG";
    user: string;
    pass: string;
    jwtPayload:any;
    headerJwt = {
        kid: "did:ala:quor:redt:345#keys-1",
        typ: "JWT",
        alg: "ES256"
    };


    constructor(
        public barcodeScanner: BarcodeScanner,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public sessionSecuredStorageService: SessionSecuredStorageService,
        private testService: TestService) {
        this.jwtPayload = {
            "iss": "did:alastria:quorum:testnet1:"+"MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAENF5lijsAeVDle1NLoOqt3w0yZ/4VAVBpO3rr6HCOCSDHD+DxirmR0BKWYCoGtSiFSUeekSLkIeohUoxoMUTAng==",
            "iat": 1525465044,
            "exp": 1530735444,
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
        this.generateToken();
    }

    generateToken(){
        // let privatekey = fs.readFileSync("src/PEM/privateKyudo.pem");
        let jwt = require("jsonwebtoken");
        let token = jwt.sign(this.jwtPayload,"-----BEGIN EC PRIVATE KEY-----\n" +
        "MHQCAQEEILI8IeZxN1DQskSvfl1rDnWp/9horl1xAwumWlk0fYejoAcGBSuBBAAK\n" +
        "oUQDQgAENF5lijsAeVDle1NLoOqt3w0yZ/4VAVBpO3rr6HCOCSDHD+DxirmR0BKW\n" +
        "YCoGtSiFSUeekSLkIeohUoxoMUTAng==\n" +
        "-----END EC PRIVATE KEY-----",{header: this.headerJwt,algorithm:"ES256"});
    }

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
        this.testService.getUID();
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
