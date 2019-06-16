import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { DeviceData } from '../models/device';

@Injectable({
    providedIn: 'root'
})
export class ApplicationSettings {
    static isApplicationOnline = false;
    static deviceData: DeviceData;
    static deviceLang = 'en';
    static appVersion = '0.0.1';
    static async showToast(
        tc: ToastController,
        message: any,
        css: string,
        position: string
    ) {
        const m = message;
        const p: any = position;
        // tslint:disable-next-line:prefer-const
        let toast = await tc.create({
            message: m,
            duration: 2000,
            position: p,
            color: css
        });
        await toast.present();
    }


    static async showErrorToast(
        tc: ToastController,
        messageDisp: any,
        css: string,
        positionDisp: string,
        timeDispl: number
    ) {
        const p: any = positionDisp;
        const toast = await tc.create({
            message: messageDisp,
            duration: timeDispl,
            position: p,
            color: css
        });
        await toast.present();

    }

    static async translate(trans: TranslateService, key: string) {
        return await trans.get(key).toPromise();
    }

}

