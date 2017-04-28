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
    private matchData: Match[] = [];
    private winningTeam: any[] = [];
    private winner: Winner = { token: '', matchID: -1, winningTeamID: -1, points: -1 };
    private errorMessage: string;
    private loading: Loading;
    private logoActive: boolean[] = [false];
    private teamSelected: boolean[] = [false];

    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private _matchService: MatchService) {
    }

    ngOnInit() {
        this.getAll();

        console.log('teamSelected', this.teamSelected);
    }

    getAll() {
        this.presentLoading();
        this._matchService.getAll()
            .subscribe(
            data => {
                this.matchData = data,
                    console.log('matchData', this.matchData)
            },
            error => {
                this.errorMessage = <any>error,
                    this.loading.dismiss(),
                    this.showErrorAlert()
            },
            () => this.loading.dismiss())
    }

    save(matchID: number, matchPoints: number) {
        console.log('winningTeam', this.winningTeam[matchID]);
        console.log('matchPoints', matchPoints);

        this.winner.matchID = matchID;
        this.winner.winningTeamID = this.winningTeam[matchID];
        this.winner.points = matchPoints;

        this.presentLoading();
        this._matchService.save(this.winner)
            .subscribe(
            data => { this.showSuccessAlert(), console.log(data) },
            error => {
                this.errorMessage = <any>error,
                    this.loading.dismiss(),
                    this.showErrorAlert()
            },
            () => this.loading.dismiss())
    }

    doRefresh(refresher) {
        this.getAll();
        refresher.complete();
    }

    pressLogo(e, teamID, matchID){
        this.logoActive = [false];
        this.teamSelected = [false];
        this.logoActive[teamID] = true;
        this.teamSelected[matchID] = true;
        this.winningTeam[matchID] = teamID;
        console.log('logo pressed');
        console.log('teamSelected', this.teamSelected);
        console.log('team', teamID);
        console.log('matchID', matchID);
    }

    presentLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Hold yo horses moo, this service is damn slow...'
        });

        this.loading.onDidDismiss(() => {
            console.log('Dismissed loading');
        });

        this.loading.present();
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