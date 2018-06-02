import {Component, OnInit} from '@angular/core';
import {PersonalExpensesTrackerService} from './personal-expenses-tracker.service';
import {ExpenseCategory} from './personal-expenses-tracker.models';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'personal-expenses-tracker',
    moduleId: module.id,
    templateUrl: 'personal-expenses-tracker.component.html',
})

export class PersonalExpensesTrackerComponent implements OnInit {

    sum: number;

    constructor(private personalExpensesTrackerService: PersonalExpensesTrackerService) {
    }

    ngOnInit(): void {
    }

    cleanStorage() {
        this.personalExpensesTrackerService.cleanStorage();
    }

    deleteDatabase() {
        this.personalExpensesTrackerService.deleteDatabase();
    }

    addItem(categoryString: string) {

        this.personalExpensesTrackerService.addItem(this.sum, categoryString);

        toastr.success('Expense was saved to the data base');

    }

    drawCostsChart() {

        var data:any = [];

        data.push(['Task', 'Hours per Day']);

        this.personalExpensesTrackerService.loadExpenses2().subscribe((expenses: Map<ExpenseCategory, number>) => {

           for (let key of Array.from(expenses.keys()).sort()) {

                let value = expenses.get(key);

                var innerArray = [key, value];

                data.push(innerArray);
            }

            google.charts.load('current', {'packages': ['corechart']});

            google.charts.setOnLoadCallback(()=>this.drawChart(data));
        })
    }

    private handleError(error: any) {

        let errMsg: string;

        errMsg = error.message ? error.message : error.toString();

        console.error(errMsg);

        return Observable.throw(errMsg);
    }

    olddrawCostsChart() {

       var data:any = [];

       data.push(['Task', 'Hours per Day']);

       this.personalExpensesTrackerService.loadExpenses().then((expenses: Map<ExpenseCategory, number>) => {

           for (let key of Array.from(expenses.keys()).sort()) {

               let value = expenses.get(key);

               var innerArray = [key, value];

               data.push(innerArray);
           }

           google.charts.load('current', {'packages': ['corechart']});

           google.charts.setOnLoadCallback(()=>this.drawChart(data));
       })
       .catch(reason => {
            console.log(reason);
       });
    }

    drawChart(dataRaw:any) {

        var data = google.visualization.arrayToDataTable(dataRaw);

        var options = {
            title: 'My Expenses',
            pieHole: 0.4,
            is3D: true,
            backgroundColor: 'transparent',
            legend: {textStyle: {color: 'white', fontSize: 12}},
            titleTextStyle : { color: 'white'}
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}