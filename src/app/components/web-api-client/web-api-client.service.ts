import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response, Jsonp, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Product} from './web-api-client.models';

@Injectable()
export class WebApiClientService {

    private valuesUrl : string = "http://localhost:56725/api/values";
    private productsUrl : string = "http://localhost:56725/api/products";
    private specificProduct : string = "http://localhost:56725/api/products/";

    constructor(private http: Http, private jsonp: Jsonp) {
    }

    updateProduct(product : Product) : Observable<Product>{

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.put(`http://localhost:56725/api/Products/${product.Id}`, product, new RequestOptions({headers: headers, body: product}))
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteProduct(product : Product) : Observable<Product>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.delete(`http://localhost:56725/api/Products/${product.Id}`, {headers: headers})
            .map(() => null)
            .catch(this.handleError);
    }

    getProductByFirstName(productId: string) : Observable<Product> {
        return this.http.get(`http://localhost:56725/api/Products/${productId}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get(this.productsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createNewProduct(newProduct : Product): Observable<Product> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.productsUrl, newProduct, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        // return body.data || {};
        return body || {};
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