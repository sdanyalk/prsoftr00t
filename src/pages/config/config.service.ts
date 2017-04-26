import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigService {
    public static GAMEURL_KEY: string = 'gameUrl';
    public static ADMINURL_KEY: string = 'adminUrl';
    public static TOKEN_KEY: string = 'token';
    public static GAMEURL_DEF_VALUE: string = 'http://nwasoft.duckdns.org:8080/api';
    public static ADMINURL_DEF_VALUE: string = 'http://nwasoft.duckdns.org:8888/api';
    public static TOKEN_DEF_VALUE: string = '2653fc5aacecc3a065c502b1aa9793fe';

    constructor(private storage: Storage) {
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
}