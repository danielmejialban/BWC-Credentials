import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {InfoPage, Login} from '../pages/login/login';
import {LoadingService} from '../services/loading-service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {SecureStorage} from '@ionic-native/secure-storage';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import {IdentitySecuredStorageService, SessionSecuredStorageService} from '../services/securedStorage.service';
import {HttpClientModule} from "@angular/common/http"
import {TokenService} from '../services/token-service';
import {ToastService} from '../services/toast-service';
import {SideBarComponent} from "../components/side-bar/side-bar";
import {QRScanner} from "@ionic-native/qr-scanner/ngx";
import {PendingToRegistryPage} from "../pages/pending-to-registry/pending-to-registry";
import {TestService} from "../services/verifiable-credential.service";
import {QrResponsePage} from "../pages/qr-response/qr-response";
import {QrResponseFailPage} from "../pages/qr-response-fail/qr-response-fail";
import {ModalServiceProviderPage} from "../pages/modal-service-provider/modal-service-provider";


@NgModule({
    declarations: [
        MyApp,
        Login,
        InfoPage,
        SideBarComponent,
        PendingToRegistryPage,
        QrResponsePage,
        QrResponseFailPage,
        ModalServiceProviderPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        NgxQRCodeModule,
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Login,
        InfoPage,
        PendingToRegistryPage,
        QrResponsePage,
        QrResponseFailPage,
        ModalServiceProviderPage
    ],
    exports: [
        SideBarComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        LoadingService,
        BarcodeScanner,
        FingerprintAIO,
        SecureStorage,
        SessionSecuredStorageService,
        IdentitySecuredStorageService,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ToastService,
        TokenService,
        QRScanner,
        TestService,
    ]
})
export class AppModule { }
