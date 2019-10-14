import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrResponseFailPage } from './qr-response-fail';
import {AppModule} from "../../app/app.module";

@NgModule({
  declarations: [
    QrResponseFailPage,
  ],
    imports: [
        IonicPageModule.forChild(QrResponseFailPage),
        AppModule,
    ],
})
export class QrResponseFailPageModule {}
