import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'celsius-to-fahrenheit',
    moduleId: module.id,
    templateUrl:'celsius-to-fahrenheit.component.html',
})

export class CelsiusToFahrenheitComponent implements OnInit {

    celsius : number;
    fahrenheit : number;

    constructor() {

    }

    ngOnInit(): void {

    }

    convert(type: string)
    {
        if(type.toLocaleLowerCase() === "c")
        {
            this.fahrenheit = this.celsius * 9 / 5 + 32;
        }
        else
        {
            this.celsius = (this.fahrenheit -32) * 5 / 9;
        }
    }
}