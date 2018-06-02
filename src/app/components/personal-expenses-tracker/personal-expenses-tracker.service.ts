import {Injectable} from '@angular/core';
import {AngularIndexedDB} from "./indexed-db-wrapper";
import {Expense} from './personal-expenses-tracker.models';
import {ExpenseCategory} from './personal-expenses-tracker.models';
import {Observable} from 'rxjs/Observable';
import {createExecutor} from "selenium-webdriver/executors";

@Injectable()
export class PersonalExpensesTrackerService {

    _db: IDBDatabase;
    _map: Map<ExpenseCategory, number>;

    constructor() {

        this.initDB();
    }

    initDB() {

        var serviceReference = this;

        const request = indexedDB.open("my-expenses", 1);

        request.onupgradeneeded = function (ev: IDBVersionChangeEvent) {

            const db = <IDBDatabase>this.result;

            db.createObjectStore("my-expenses", {autoIncrement: true});

            serviceReference.loadExpenses();
        };

        request.onsuccess = function (ev: Event) {

            serviceReference._db = <IDBDatabase>this.result;
        };

    }

    // addItem(sum: number, category: ExpenseCategory) {
    addItem(sum: number, category: string) {
        const expense = {category: category, sum: sum, date: new Date};
        // const expense = {category: ExpenseCategory, sum: sum, date: new Date};

        const tx = this._db.transaction("my-expenses", "readwrite");

        const store = tx.objectStore("my-expenses");

        const request = store.add(expense);

        request.onerror = function (ev) {
            console.log("adding an expense to the storage failed");
        }

        request.onsuccess = function (ev) {
            console.log("adding an expense to the storage succeeded");
        }
    }

    cleanStorage() {

        const request = this._db.transaction("my-expenses", "readwrite")
            .objectStore("my-expenses")
            .clear();

        request.onerror = function (ev) {
            console.log("cleaning the storage failed");
        }

        request.onsuccess = function (ev) {
            console.log("cleaning the storage succeeded");
        }
    }

    deleteDatabase() {

        window.indexedDB.deleteDatabase("my-expenses");
    }

    loadExpenses(): Promise<Map<ExpenseCategory, number>> {

        // return new Observable<Map<ExpenseCategory, number>>((resolve, reject) => {
        // });

        return new Promise<Map<ExpenseCategory, number>>((resolve, reject) => {

            this._map = new Map<ExpenseCategory, number>();

            const request = this._db.transaction("my-expenses")
                .objectStore("my-expenses")
                .openCursor();

            request.onerror = ev => {
                reject(request.error);
            }

            request.onsuccess = ev => {
                const cursor = <IDBCursorWithValue>request.result;

                if (cursor == null) {
                    resolve(this._map);
                }
                else {
                    const expense = <Expense>cursor.value;
                    let total = this._map.get(expense.category);
                    if (total === undefined) total = 0;
                    total += expense.sum;

                    this._map.set(expense.category, total);

                    cursor.continue();
                }
            }
        });
    }

    loadExpenses2(): Observable<Map<ExpenseCategory, number>> {

        return Observable.create((observer: any) => {

            this._map = new Map<ExpenseCategory, number>();

            const request = this._db.transaction("my-expenses")
                .objectStore("my-expenses")
                .openCursor();

            request.onerror = ev => {
                console.log("I'm here");
                observer.next(null);
            }

            request.onsuccess = ev => {
                const cursor = <IDBCursorWithValue>request.result;

                if (cursor == null) {
                    console.log("I'm here");
                    observer.next(this._map);
                }
                else {
                    const expense = <Expense>cursor.value;
                    let total = this._map.get(expense.category);
                    if (total === undefined) total = 0;
                    total += expense.sum;

                    this._map.set(expense.category, total);

                    cursor.continue();
                }
            }
        });
    }
}