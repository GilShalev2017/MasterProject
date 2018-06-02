import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'inch-to-centimeters',
    moduleId: module.id,
    templateUrl:'inch-to-centimeters.component.html',
})

export class InchToCentimetersComponent implements OnInit {

    inches : number;
    centimeters : number;

    constructor() {

    }

    ngOnInit(): void {

    }

    convert(type:string)
    {
        if(type.toLocaleLowerCase() === "i")
        {
            this.centimeters = this.inches * 2.54;
        }
        else
        {
            this.inches = this.centimeters / 2.54;
        }
    }
}