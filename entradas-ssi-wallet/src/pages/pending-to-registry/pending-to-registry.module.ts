import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingToRegistryPage } from './pending-to-registry';
import {AppModule} from "../../app/app.module";

@NgModule({
  declarations: [

  ],
    imports: [
        IonicPageModule.forChild(PendingToRegistryPage),
        AppModule,
    ],
})
export class PendingToRegistryPageModule {}
