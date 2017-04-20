import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Match } from './match';
import { Winner } from './match.winner';
import { MatchService } from './result.service';

@Component({
    selector: 'page-result',
    templateUrl: 'result.html',
    providers: [MatchService]
})

export class ResultPage {
    private fixture: any[] = [];
    private matchData: Match[] = [];
    private winningTeam: any[] = [];
    private winner: Winner;
    private errorMessage: string;
    private loading: Loading;

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private _matchService: MatchService) {

        this.loading = this.loadingCtrl.create({
            content: 'Hold yo horses moo, this service is damn slow...'
        });
    }

    ngOnInit() {
        this.loading.present();
        this._matchService.getAll()
            .subscribe(
            data => this.matchData = data,
            error => {
                this.errorMessage = <any>error,
                    this.showErrorAlert(),
                    this.loading.dismiss()
            },
            () => this.loading.dismiss())
    }

    save(matchID: number) {
        console.log('winningTeam', this.winningTeam[matchID]);
        this.winner.token = '2653fc5aacecc3a065c502b1aa9793fe';
        this.winner.matchID = matchID;
        this.winner.winningTeamID = this.winningTeam[matchID];
        this.loading.present();
        this._matchService.save(this.winner)
            .subscribe(
            data => { this.showSuccessAlert() },
            error => {
                this.errorMessage = <any>error,
                    this.showErrorAlert(),
                    this.loading.dismiss()
            },
            () => this.loading.dismiss())
    }

    selectedTeam(teamID, matchID) {
        this.winningTeam[matchID] = teamID;
        console.log('team', teamID);
        console.log('matchID', matchID);
    }

    showErrorAlert() {
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'It isnt my fault! G moo backend crapped out. Trust me.',
            buttons: ['OK']
        });
        alert.present();
    }

    showSuccessAlert() {
        let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'All is good, now you can move on with your life.',
            buttons: ['OK']
        });
        alert.present();
    }
}