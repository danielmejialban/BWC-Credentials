import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
    declarations: [
    ],
    imports: [
        IonicPageModule.forChild(Login),
        NgxQRCodeModule,

    ],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LoginModule { }
