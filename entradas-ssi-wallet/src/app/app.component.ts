import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {PendingToRegistryPage} from "../pages/pending-to-registry/pending-to-registry";
import {QrResponsePage} from "../pages/qr-response/qr-response";
import {Login} from "../pages/login/login";
import {ModalServiceProviderPage} from "../pages/modal-service-provider/modal-service-provider";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = ModalServiceProviderPage;
    @ViewChild(Nav) nav: Nav;
    platform: any;

    constructor(platform: Platform) {
        console.log("[Debug] App enter");
        this.platform = platform;
    }

    openPage(page: string){
        switch (page) {
            case 'pendingToRegister':
                this.nav.push(PendingToRegistryPage);
                break;
            case 'qr-response' :
                this.nav.push(QrResponsePage);
                break;
            case 'login':
                this.nav.push(Login);
                break;
        }
    }


    openUrl(url:string){
        window.open(url,'_system','location=yes');
    }

    exitApp(){
        console.log("cerrando App...");
        this.platform.exitApp();
    }

    comingSoon(){
        alert("Coming Soon...");
    }
}

