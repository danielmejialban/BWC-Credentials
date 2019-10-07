import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrResponseFailPage } from './qr-response-fail';

@NgModule({
  declarations: [
    QrResponseFailPage,
  ],
  imports: [
    IonicPageModule.forChild(QrResponseFailPage),
  ],
})
export class QrResponseFailPageModule {}
