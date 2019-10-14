import {Component, ViewChild} from '@angular/core';
import {Platform, App, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {PendingToRegistryPage} from "../pages/pending-to-registry/pending-to-registry";
import {QrResponsePage} from "../pages/qr-response/qr-response";
import {Login} from "../pages/login/login";
import {platform} from "os";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;
    @ViewChild(Nav) nav: Nav;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, app: App) {
        console.log("[Debug] App enter");
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
}

