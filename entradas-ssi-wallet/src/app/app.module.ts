import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {InfoPage, Login} from '../pages/login/login';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {SecureStorage} from '@ionic-native/secure-storage';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
import {SideBarComponent} from "../components/side-bar/side-bar";
import {QRScanner} from "@ionic-native/qr-scanner/ngx";
import {PendingToRegistryPage} from "../pages/pending-to-registry/pending-to-registry";
import {TestService} from "../services/verifiable-credential.service";
import {QrResponsePage} from "../pages/qr-response/qr-response";
import {QrResponseFailPage} from "../pages/qr-response-fail/qr-response-fail";
import {ModalServiceProviderPage} from "../pages/modal-service-provider/modal-service-provider";
import { IonicStorageModule } from '@ionic/storage';
import {ModalTransactionPage} from "../pages/modal-transaction/modal-transaction";

@NgModule({
    declarations: [
        MyApp,
        Login,
        InfoPage,
        SideBarComponent,
        PendingToRegistryPage,
        QrResponsePage,
        QrResponseFailPage,
        ModalServiceProviderPage,
        ModalTransactionPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {mode:'md'}),
        NgxQRCodeModule,
        HttpClientModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Login,
        InfoPage,
        PendingToRegistryPage,
        QrResponsePage,
        QrResponseFailPage,
        ModalServiceProviderPage,
        ModalTransactionPage

    ],
    exports: [
        SideBarComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BarcodeScanner,
        FingerprintAIO,
        SecureStorage,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        QRScanner,
        TestService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: ImpersonateInterceptor,
        //     multi: true,
        // }
        // QrReaderService
    ]
})
export class AppModule { }
