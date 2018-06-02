import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'google-map',
    moduleId: module.id,
    templateUrl: 'google-map.component.html',
})

export class GoogleMapComponent implements OnInit {

    @ViewChild('travelfrom') travelfromElement: ElementRef;
    @ViewChild('travelto') traveltoElement: ElementRef;

    source: any;
    destination: any;
    directionsDisplay: any;
    // directionsService:any;
    directionsService: google.maps.DirectionsService;
    map: any;

    constructor() {

    }

    ngOnInit(): void {

        this.directionsService = new google.maps.DirectionsService();

        // initialise the location of the map on Chichester in England (ref lat and lng)
        this.map = new google.maps.Map(document.getElementById('dvMap'), {
            center: {lat: 50.834697, lng: -0.773792},
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        //new google.maps.places.SearchBox(document.getElementById('travelfrom'));
        //new google.maps.places.SearchBox(this.travelfromElement.nativeElement);//$('travelfrom').get(0));
        new google.maps.places.SearchBox((<HTMLInputElement>document.getElementById("travelfrom")));//$('travelfrom').get(0));

        new google.maps.places.SearchBox((<HTMLInputElement>document.getElementById("travelto")));

        this.directionsDisplay = new google.maps.DirectionsRenderer({'draggable': true});
    }

    GetRoute() {

        this.directionsDisplay.setMap(this.map);

        this.source = (<HTMLInputElement>document.getElementById("travelfrom")).value;
        this.destination = (<HTMLInputElement>document.getElementById("travelto")).value;

        var request = {
            origin: this.source,
            destination: this.destination,
            travelMode: google.maps.TravelMode.DRIVING
        };

        var thisRef = this;

        this.directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                thisRef.directionsDisplay.setDirections(response);
            }
        });

        //*********DISTANCE AND DURATION**********************//
        var service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix({
            origins: [this.source],
            destinations: [this.destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {


            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != google.maps.DistanceMatrixElementStatus.ZERO_RESULTS) {
                var distance = response.rows[0].elements[0].distance.text;
                var duration = response.rows[0].elements[0].duration.value;
                var dvDistance = document.getElementById("dvDistance");
                //duration = parseFloat(duration / 60).toFixed(2);
                var durationString = parseFloat((duration / 60).toString()).toFixed(2);
                dvDistance.innerHTML = "";
                dvDistance.innerHTML += "Distance: " + distance + "<br />";
                dvDistance.innerHTML += "Time:" + durationString + " min";

            } else {
                alert("Unable to find the distance via road.");
            }
        });
    }
}