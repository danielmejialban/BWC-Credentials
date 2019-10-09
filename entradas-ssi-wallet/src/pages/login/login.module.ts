import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { Camera } from '../tabsPage/camera/camera';
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
    declarations: [
    ],
    imports: [
        IonicPageModule.forChild(Login),
        NgxQRCodeModule,
    ],
    exports: [
        Login
    ],
    entryComponents:[
        Camera
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LoginModule { }
