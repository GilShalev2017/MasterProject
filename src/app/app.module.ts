import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { AppRoutingModule } from './config/app-routing.module';
import { HttpModule, JsonpModule } from '@angular/http';
import { QuizComponent }  from './components/quiz/quiz.component';
import { QuizService }  from './components/quiz/quiz.service';
import { LottoNumbersComponent }  from './components/lotto-numbers/lotto-numbers.component';
import { LottoNumbersConfigurationComponent }  from './components/lotto-numbers/lotto-numbers-configuration.component';
import { LottoNumbersService }  from './components/lotto-numbers/lotto-numbers.service';
import { RecommendedHumusComponent }  from './components/recommended-humus/recommended-humus.component';
import { RecommendedHumusService } from './components/recommended-humus/recommended-humus.service';
import { ConvertersComponent } from './components/converter/converters.component';
import { CelsiusToFahrenheitComponent }  from './components/converter/celsius-to-fahrenheit.component';
import { InchToCentimetersComponent }  from './components/converter/inch-to-centimeters.component';
import { MilesToKilometersComponent }  from './components/converter/miles-to-kilometers.component';
import { CouponsComponent }  from './components/coupons/coupons.component';
import { CouponsService }  from './components/coupons/coupons.service';
import { WelcomeComponent }  from './components/welcome/welcome.component';
import { ProjectPanelComponent }  from './components/welcome/project-panel.component';
import { PersonalExpensesTrackerComponent }  from './components/personal-expenses-tracker/personal-expenses-tracker.component';
import { PersonalExpensesTrackerService}  from './components/personal-expenses-tracker/personal-expenses-tracker.service';
import { AgmCoreModule } from "angular2-google-maps/core";
import { GoogleMapComponent } from "./components/google-map/google-map.component";
import { CouponsOnMapComponent } from "./components/coupons/coupons-on-map.component";
import { NodeJsComponent } from "./components/nodejs-client/nodejs-client.component";
import { NodeJsClientService } from "./components/nodejs-client/nodejs-client.service";

import { WebApiComponent } from "./components/web-api-client/web-api-client.component";
import { WebApiClientService } from "./components/web-api-client/web-api-client.service";

// import { AngularIndexedDB } from "angular2-indexeddb/angular2-indexeddb";
// import {GoogleChart} from '../../node_modules/angular2-google-chart/directives/angular2-google-chart.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpModule, JsonpModule,
                      // Angular 2 Google Maps
                      AgmCoreModule.forRoot({
                          apiKey: 'AIzaSyDa24_tR6T-qARcCsWzkvZ8Y7eabvZx71c',
                          libraries: []
                      }),
                ],
  declarations: [ AppComponent, QuizComponent,LottoNumbersComponent , LottoNumbersConfigurationComponent, RecommendedHumusComponent,
                  ConvertersComponent, CelsiusToFahrenheitComponent, InchToCentimetersComponent, MilesToKilometersComponent, CouponsComponent,
                  WelcomeComponent, PersonalExpensesTrackerComponent, ProjectPanelComponent, GoogleMapComponent,
                  CouponsOnMapComponent, NodeJsComponent, WebApiComponent],
  providers:    [ QuizService, LottoNumbersService, RecommendedHumusService, CouponsService, PersonalExpensesTrackerService,
                  NodeJsClientService, WebApiClientService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

