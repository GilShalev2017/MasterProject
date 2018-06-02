import { Injectable } from '@angular/core';
import {LottoNumbersSettings} from "./lotto-numbers.models";

@Injectable()
export class LottoNumbersService {

    saveToStorage(lottoNumbersSettings:LottoNumbersSettings)
    {
        localStorage.setItem("lottoNumbersSettingsJson", JSON.stringify(lottoNumbersSettings));
    }

    removeStorage()
    {
        localStorage.removeItem("lottoNumbersSettingsJson");
    }

    getFromStorage():LottoNumbersSettings
    {
        return <LottoNumbersSettings>JSON.parse(localStorage.getItem("lottoNumbersSettingsJson"));
    }
}