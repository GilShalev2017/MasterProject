import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'miles-to-kilometers',
    moduleId: module.id,
    templateUrl:'miles-to-kilometers.component.html',
})

export class MilesToKilometersComponent implements OnInit {

    distanceInKilometers : number;
    distanceInMiles : number;

    constructor() {

    }

    ngOnInit(): void {

    }

    convert(convertTo:string){

        if(convertTo === "toMiles")
        {
            this.distanceInMiles = this.distanceInKilometers / 1.61;
        }
        else
        {
            this.distanceInKilometers = this.distanceInMiles * 1.61;
        }
    }
}