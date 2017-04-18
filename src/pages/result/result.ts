import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Match } from './match';
import { MatchService } from './result.service';

@Component({
    selector: 'page-result',
    templateUrl: 'result.html',
    providers: [MatchService]
})

export class ResultPage {
    matchData: Match[] = [];
    fixture: any[] = [];
    winningTeam: any[] = [];

    constructor(public navCtrl: NavController, private _matchService: MatchService) {
    }

    ngOnInit(){
        this.matchData = this._matchService.getAll();
    }

    save(matchID: number){
        console.log('button clicked');
        console.log('winningTeam', this.winningTeam[matchID]);
    }

    selectedTeam(teamID, matchID){
        this.winningTeam[matchID] = teamID;
        console.log('team', teamID);
        console.log('matchID', matchID);
    }
}