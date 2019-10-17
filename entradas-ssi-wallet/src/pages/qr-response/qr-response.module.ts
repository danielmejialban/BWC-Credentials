import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrResponsePage } from './qr-response';
import {AppModule} from "../../app/app.module";

@NgModule({
  declarations: [
  ],
    imports: [
        IonicPageModule.forChild(QrResponsePage),
        AppModule
    ],
})
export class QrResponsePageModule {}
