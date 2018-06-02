import {Component, OnInit} from '@angular/core';
import {LottoNumbersService} from './lotto-numbers.service';
import {LottoNumbersSettings} from "./lotto-numbers.models";
import set = Reflect.set;

@Component({
    selector: 'lotto-numbers-configuration',
    moduleId: module.id,
    templateUrl:'lotto-numbers-configuration.component.html',
})

export class LottoNumbersConfigurationComponent implements OnInit {

    numbersToGenerate : number;
    minRange : number;
    maxRange : number;

    constructor(private lottoNumbersService: LottoNumbersService) {

    }

    saveSettings()
    {
        let settings:LottoNumbersSettings = {'numberOfNumbers':this.numbersToGenerate,
                                            'minRange':this.minRange,
                                            'maxRange':this.maxRange};

        this.lottoNumbersService.saveToStorage(settings);
    }

    clearSettings()
    {
        this.lottoNumbersService.removeStorage();
    }

    ngOnInit(): void {

        let settings:LottoNumbersSettings = this.lottoNumbersService.getFromStorage();

        this.numbersToGenerate = settings.numberOfNumbers;
        this.minRange = settings.minRange;
        this.maxRange = settings.maxRange;
    }
}