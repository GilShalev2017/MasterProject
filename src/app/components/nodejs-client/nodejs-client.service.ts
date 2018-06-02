import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Jsonp, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from './nodejs-client.models';

@Injectable()
export class NodeJsClientService {

    private usersUrl : string = "http://localhost:3040/api/user";
    private specificUser : string = "http://localhost:3040/api/user/";

    constructor(private http: Http, private jsonp: Jsonp) {
    }

    updateUser(user : User) : Observable<User>{

        let headers = new Headers({ 'Content-Type': 'application/json' });

        //return this.http.put(this.specificUser + user.first_name, JSON.stringify(user), {headers: headers})
        return this.http.put(this.specificUser + user.first_name, user, new RequestOptions({headers: headers, body: user}))
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteUser(user : User) : Observable<User>{

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.delete(this.usersUrl, new RequestOptions({headers: headers, body: user}))
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUserByFirstName(userFirstName: string) : Observable<User> {
        return this.http.get(this.specificUser + userFirstName)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createNewUser(newUser : User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.usersUrl, newUser, options)
        .map(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}