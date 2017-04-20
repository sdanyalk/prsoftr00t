import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Match } from './match';
import { Winner } from './match.winner';

@Injectable()
export class MatchService {
    private baseUrl: string = 'http://nwasoft.duckdns.org:8888/api';

    constructor(private http: Http) {

    }

    getAll(): Observable<Match[]> {
        return this.http
            // .get(`${this.baseUrl}/nextMatch`)
            .get('./assets/data/nextmatch.json')
            .map(this.mapMatchData)
            .catch(this.handleError)
    }

    save(winner: Winner): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(`${this.baseUrl}/adminUpdateAfterMatch`, JSON.stringify(winner))
            .catch(this.handleError)
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