import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }   from '../app.component';
import { QuizComponent }   from '../components/quiz/quiz.component';
import { LottoNumbersComponent }  from '../components/lotto-numbers/lotto-numbers.component';
import { LottoNumbersConfigurationComponent }  from '../components/lotto-numbers/lotto-numbers-configuration.component';
import { RecommendedHumusComponent }  from '../components/recommended-humus/recommended-humus.component';
import { ConvertersComponent }  from '../components/converter/converters.component';
import { CelsiusToFahrenheitComponent }  from '../components/converter/celsius-to-fahrenheit.component';
import { InchToCentimetersComponent }  from '../components/converter/inch-to-centimeters.component';
import { MilesToKilometersComponent }  from '../components/converter/miles-to-kilometers.component';
import { CouponsComponent }  from '../components/coupons/coupons.component';
import { WelcomeComponent }  from '../components/welcome/welcome.component';
import { PersonalExpensesTrackerComponent } from '../components/personal-expenses-tracker/personal-expenses-tracker.component';
import { GoogleMapComponent }  from '../components/google-map/google-map.component';
import { CouponsOnMapComponent }  from '../components/coupons/coupons-on-map.component';
import { NodeJsComponent }  from '../components/nodejs-client/nodejs-client.component';
import { WebApiComponent }  from '../components/web-api-client/web-api-client.component';

const routes: Routes = [
    // { path: '', redirectTo: '/all', pathMatch: 'full' },
    // { path: 'all', component: AppComponent },
    { path: '', component: WelcomeComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'lotto-numbers', component: LottoNumbersComponent },
    { path: 'lotto-numbers-configuration', component: LottoNumbersConfigurationComponent },
    { path: 'recommended-humus', component: RecommendedHumusComponent },
    { path: 'converters', component: ConvertersComponent },
    { path: 'celsius-to-fahrenheit', component: CelsiusToFahrenheitComponent },
    { path: 'miles-to-kilometers', component: MilesToKilometersComponent },
    { path: 'inch-to-centimeters', component: InchToCentimetersComponent },
    { path: 'coupons', component: CouponsComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'personal-expenses-tracker', component: PersonalExpensesTrackerComponent },
    { path: 'google-map', component: GoogleMapComponent },
    { path: 'coupons-on-map', component: CouponsOnMapComponent },
    { path: 'nodejs-client', component: NodeJsComponent },
    { path: 'web-api-client', component: WebApiComponent }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}