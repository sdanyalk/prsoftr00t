import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ConfigService } from './config.service';

@Component({
    selector: 'page-config',
    templateUrl: 'config.html',
    providers: [ConfigService]
})

export class ConfigPage {
    private gameUrl: string;
    private adminUrl: string;
    private token: string;
    private errorMessage: string;

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        private _configService: ConfigService) {
    }

    ngOnInit() {
        this.getConfigValues();
    }

    getConfigValues() {
        this._configService.getValue(ConfigService.GAMEURL_KEY).then(val => this.gameUrl = val);
        this._configService.getValue(ConfigService.ADMINURL_KEY).then(val => this.adminUrl = val);
        this._configService.getValue(ConfigService.TOKEN_KEY).then(val => this.token = val);

        console.log(this.gameUrl);
        console.log(this.adminUrl);
        console.log(this.token);
    }

    save() {
        this._configService.setValue(ConfigService.GAMEURL_KEY, this.gameUrl);
        this._configService.setValue(ConfigService.ADMINURL_KEY, this.adminUrl);
        this._configService.setValue(ConfigService.TOKEN_KEY, this.token);

        this.showSuccessAlert();
    }

    mpga() {
        this._configService.mpga().subscribe(
            data => { this.showSuccessAlert(), console.log(data) },
            error => {
                this.errorMessage = <any>error,
                    this.showErrorAlert()
            }
        );
    }

    private showSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'All is good, now you can move on with your life.',
            buttons: ['OK']
        });
        alert.present();
    }

    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'It isnt my fault! G moo backend crapped out. Trust me.',
            buttons: ['OK']
        });
        alert.present();
    }
}