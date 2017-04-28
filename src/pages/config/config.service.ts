import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfigService {
    public static GAMEURL_KEY: string = 'gameUrl';
    public static ADMINURL_KEY: string = 'adminUrl';
    public static TOKEN_KEY: string = 'token';
    public static GAMEURL_DEF_VALUE: string = 'http://nwasoft.duckdns.org:8080/api';
    public static ADMINURL_DEF_VALUE: string = 'http://nwasoft.duckdns.org:8888/api';
    public static TOKEN_DEF_VALUE: string = '2653fc5aacecc3a065c502b1aa9793fe';

    constructor(private storage: Storage, private http: Http) {
        this.getValue(ConfigService.GAMEURL_KEY).then(val => { val === null ? this.setValue(ConfigService.GAMEURL_KEY, ConfigService.GAMEURL_DEF_VALUE) : console.log(val) });
        this.getValue(ConfigService.ADMINURL_KEY).then(val => { val === null ? this.setValue(ConfigService.ADMINURL_KEY, ConfigService.ADMINURL_DEF_VALUE) : console.log(val) });
        this.getValue(ConfigService.TOKEN_KEY).then(val => { val === null ? this.setValue(ConfigService.TOKEN_KEY, ConfigService.TOKEN_DEF_VALUE) : console.log(val) });

        console.log('ConfigService constructor');
    }

    getValue(key: string) {
        return this.storage.get(key);
    }

    setValue(key: string, value: string) {
        this.storage.set(key, value);
    }

    mpga(): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.getAdminUrl().flatMap(adminBaseUrl => {
            console.log('adminBaseUrl in mpga()', adminBaseUrl);
            return this.getToken().flatMap(token => {
                console.log('token in mpga()', token);
                return this.http
                    .post(`${adminBaseUrl}/FixTables`, JSON.stringify(token), options)
                    .catch(this.handleError)
            })
        })
    }

    private getAdminUrl() {
        return Observable.fromPromise(this.getValue(ConfigService.ADMINURL_KEY));
    }

    private getToken() {
        return Observable.fromPromise(this.getValue(ConfigService.TOKEN_KEY));
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