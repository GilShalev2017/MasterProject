import {Component, OnInit} from '@angular/core';
import {CouponsService} from './coupons.service';
import {Coupon} from './coupons.models';

@Component({
    selector: 'coupons',
    moduleId: module.id,
    templateUrl:'coupons.component.html',
})

export class CouponsComponent implements OnInit {

    coupons : Coupon[];

    constructor(private couponsService: CouponsService) {

    }

    ngOnInit(): void {
        this.couponsService.downloadCoupons().subscribe((arrivedData: Coupon[]) => {
            this.populateCoupns(arrivedData);
        });
    }

    populateCoupns(arrivedData: Coupon[]):void
    {
        this.coupons = arrivedData["coupons"];
    }
}