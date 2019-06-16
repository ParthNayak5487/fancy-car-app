import { Injectable } from '@angular/core';
import { ApplicationSettings } from './application-settings.service';
import { AlertController, LoadingController, Events } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { TranslateService } from '@ngx-translate/core';



export enum ConnectionStatusEnum {
    Online,
    Offline
}

@Injectable({
    providedIn: 'root'
})

export class NetworkService {
    previousStatus;
    translation: any;
    pendingLoading: any;


    constructor(
        public alertCtrl: AlertController,
        public network: Network,
        public translateService: TranslateService,
        public loadingCtrl: LoadingController,
        public eventCtrl: Events) {

        console.log('Hello NetworkProvider Provider');

        this.previousStatus = ConnectionStatusEnum.Online;

    }

    public initializeNetworkEvents(): void {

        if (navigator.onLine) {
            this.previousStatus = ConnectionStatusEnum.Online;
            ApplicationSettings.isApplicationOnline = true;
        } else {
            this.previousStatus = ConnectionStatusEnum.Offline;
            ApplicationSettings.isApplicationOnline = false;
        }

        this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            ApplicationSettings.isApplicationOnline = false;
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });


        this.network.onConnect().subscribe(() => {

            console.log('network connected!');
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            setTimeout(async () => {
                ApplicationSettings.isApplicationOnline = true;

                // await this.pendingLoading.present();
                // await this.inspection.checkPending();
                // this.pendingLoading.dismiss();

                if (this.previousStatus === ConnectionStatusEnum.Offline) {
                    this.eventCtrl.publish('network:online');
                }
                this.previousStatus = ConnectionStatusEnum.Online;
                if (this.network.type === 'wifi') {
                    console.log('we got a wifi connection!', this.network.type);
                }
            }, 3000);
        });

    }

}

