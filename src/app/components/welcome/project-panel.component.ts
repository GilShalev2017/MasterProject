import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'project-panel',
    moduleId: module.id,
    templateUrl:'project-panel.component.html',
})

export class ProjectPanelComponent implements OnInit {

    @Input()
    panelTitle:string;

    imgSrc:string = "";

    constructor(private router: Router) {


    }

    ngOnInit(): void {
        switch(this.panelTitle.toLowerCase())
        {
            case 'converters':
                this.imgSrc = "assets/images/converters.png";
                break;
            case 'coupons':
                this.imgSrc = "assets/images/coupons.png";
                break;
            case 'lotto numbers':
                this.imgSrc = "assets/images/lotto.png";
                break;
            case 'personal expenses tracker':
                this.imgSrc = "assets/images/tracker.png";
                break;
            case 'quiz':
                this.imgSrc = "assets/images/quiz.png";
                break;
            case 'recommended humus':
                this.imgSrc = "assets/images/humus1.png";
                break;
            case 'google map':
                this.imgSrc = "assets/images/google_map.png";
                break;
            case 'nodejs client':
                this.imgSrc = "assets/images/nodejs.png";
                break;
            case 'web api client':
                this.imgSrc = "assets/images/web-api.png";
                break;
        }
    }

    openPage()
    {
        switch(this.panelTitle.toLowerCase())
        {
            case 'converters':
                this.imgSrc = "assets/images/lottery.jpg";
                this.router.navigate(['/converters']);
                break;
            case 'coupons':
                this.router.navigate(['/coupons']);
                break;
            case 'lotto numbers':
                this.router.navigate(['/lotto-numbers']);
                break;
            case 'personal expenses tracker':
                this.router.navigate(['/personal-expenses-tracker']);
                break;
            case 'quiz':
                this.router.navigate(['/quiz']);
                break;
            case 'recommended humus':
                this.router.navigate(['/recommended-humus']);
                break;

            case 'nodejs client':
                this.router.navigate(['/nodejs-client']);
                break;

            case 'google map':
                this.router.navigate(['/google-map']);
                break;

            case 'web api client':
                this.router.navigate(['/web-api-client']);
                break;
        }
    }
}
