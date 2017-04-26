import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Match } from './match';
import { Winner } from './match.winner';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MatchService {
    constructor(
        private http: Http,
        private _configService: ConfigService) {
    }

    getAll(): Observable<Match[]> {
        return this.getBaseUrl().flatMap(gameBaseUrl => {
            console.log('gameBaseUrl in getAll()', gameBaseUrl);
            return this.http
                .get(`${gameBaseUrl}/nextMatch`)
                //.get('./assets/data/nextmatch.json')
                .map(this.mapMatchData)
                .catch(this.handleError)
        })
    }

    save(winner: Winner): Observable<Response> {
        console.log('Winner', winner);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.getAdminUrl().flatMap(adminBaseUrl => {
            console.log('adminBaseUrl in save()', adminBaseUrl);
            return this.getToken().flatMap(token => {
                console.log('token in save()', token);
                winner.token = token;
                return this.http
                    .post(`${adminBaseUrl}/adminUpdateAfterMatch`, JSON.stringify(winner), options)
                    .catch(this.handleError)
            })
        })
    }

    private getBaseUrl() {
        return Observable.fromPromise(this._configService.getValue(ConfigService.GAMEURL_KEY));
    }

    private getAdminUrl() {
        return Observable.fromPromise(this._configService.getValue(ConfigService.ADMINURL_KEY));
    }

    private getToken() {
        return Observable.fromPromise(this._configService.getValue(ConfigService.TOKEN_KEY));
    }

    private mapMatchData(response: Response): Match[] {
        console.log(response.json());
        return response.json().matchData;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error('errMsg', errMsg);
        console.log('Response', error);

        return Observable.throw(errMsg);
    }
}