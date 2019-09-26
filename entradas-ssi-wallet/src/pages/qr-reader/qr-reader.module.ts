import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrReaderPage } from './qr-reader';
import {AppModule} from "../../app/app.module";
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
  declarations: [
    QrReaderPage,
  ],
    imports: [
        IonicPageModule.forChild(QrReaderPage),
        AppModule,
        NgxQRCodeModule,
    ],
})
export class QrReaderPageModule {}
