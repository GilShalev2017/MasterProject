import {Component, OnInit} from '@angular/core';
import {LottoNumbersService} from './lotto-numbers.service';
import {LottoNumbersSettings} from "./lotto-numbers.models";

@Component({
    selector: 'lotto-numbers',
    moduleId: module.id,
    templateUrl:'lotto-numbers.component.html',
})

export class LottoNumbersComponent implements OnInit {

    randomNumbers : number[];

    constructor(private lottoNumbersService: LottoNumbersService) {

    }

    ngOnInit(): void {

    }


    getRandomIntInclusive(min:number, max: number):number
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateNumbers() :void {

        var lottoNumbersSettings :LottoNumbersSettings = this.lottoNumbersService.getFromStorage();

        this.randomNumbers = null;

        this.randomNumbers = [];

        for(var i=0; i<lottoNumbersSettings.numberOfNumbers; i++)
        {
            var randomNumber : number = this.getRandomIntInclusive(lottoNumbersSettings.minRange, lottoNumbersSettings.maxRange);

            this.randomNumbers.push(randomNumber)
        }
    }
}