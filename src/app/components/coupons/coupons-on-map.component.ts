import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'coupons-on-map',
    moduleId: module.id,
    templateUrl: 'coupons-on-map.component.html',
})

export class CouponsOnMapComponent implements OnInit {

    source: any;
    destination: any;
    locations: any[];
    directionsDisplay: any;
    directionsService: google.maps.DirectionsService;
    map: any;
    destinationArray: any;

    constructor() {

    }

    ngOnInit(): void {

        this.locations = [];

        this.directionsService = new google.maps.DirectionsService();

        // initialise the location of the map on Chichester in England (ref lat and lng)
        this.map = new google.maps.Map(document.getElementById('dvMap'), {
            center: {lat: 32.06628317, lng: 34.84434418},
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        //new google.maps.places.SearchBox(document.getElementById('travelfrom'));
        //new google.maps.places.SearchBox(this.travelfromElement.nativeElement);//$('travelfrom').get(0));
        new google.maps.places.SearchBox((<HTMLInputElement>document.getElementById("travelfrom")));//$('travelfrom').get(0));

        new google.maps.places.SearchBox((<HTMLInputElement>document.getElementById("travelto")));

        this.directionsDisplay = new google.maps.DirectionsRenderer({'draggable': true});
    }

    PushDestination() {

        this.destination = (<HTMLInputElement>document.getElementById("travelto")).value;

        this.locations.push(this.destination);

        (<HTMLInputElement>document.getElementById("travelto")).value = "";

        this.destinationArray = document.getElementById("destinations");

        this.destinationArray.innerHTML += this.destination + "<br />";
    }

    setDestination(dest: any) {

        (<HTMLInputElement>document.getElementById('travelto')).value = dest;

        this.PushDestination();
    }

    GetRoute() {

        this.directionsDisplay.setMap(this.map);

        this.source = (<HTMLInputElement>document.getElementById("travelfrom")).value;

        this.destination = (<HTMLInputElement>document.getElementById("travelto")).value;

        var waypoints: any[] = [];

        for (var i = 0; i < this.locations.length; i++) {

            var address = this.locations[i];

            if (address !== "") {

                waypoints.push({
                    location: address,
                    stopover: true
                });
            }
        }

        var request = {
            origin: this.source,
            destination: waypoints[0].location,
            waypoints: waypoints, //an array of waypoints
            optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
            travelMode: google.maps.TravelMode.DRIVING
            ///????
        };

        var thisRef = this;

        this.directionsService.route(request, function (response, status) {

            if (status == google.maps.DirectionsStatus.OK) {

                var dvDistance = document.getElementById("dvDistance");
                var distance = 0;
                var minute = 0.00;

                response.routes[0].legs.forEach(function (item, index) {

                    if (index < response.routes[0].legs.length - 1) {

                        distance = distance + parseInt(item.distance.text);

                        minute = parseFloat(minute.toString()) + parseFloat((item.duration.value / 60).toString());

                        // var tbl = <table>document.getElementById("tblResults");
                        // var row = tbl.insertRow(1);
                        // var cell = row.insertCell(0);
                        // cell.innerText = thisRef.source;
                        // var cell = row.insertCell(1);
                        // cell.innerText = item.end_address;
                        // var cell = row.insertCell(2);
                        // cell.innerText = distance;
                        // var cell = row.insertCell(3);
                        // cell.innerText = minute.toFixed(2) + " min";
                    }
                });

                thisRef.directionsDisplay.setDirections(response);
            }
            else {
                //handle error
            }
        })
    };

    // GetRoute() {
    //
    //     this.directionsDisplay.setMap(this.map);
    //
    //     this.source = (<HTMLInputElement>document.getElementById("travelfrom")).value;
    //     this.destination = (<HTMLInputElement>document.getElementById("travelto")).value;
    //
    //     var request = {
    //         origin: this.source,
    //         destination: this.destination,
    //         travelMode: google.maps.TravelMode.DRIVING
    //     };
    //
    //     var thisRef = this;
    //
    //     this.directionsService.route(request, function (response, status) {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             thisRef.directionsDisplay.setDirections(response);
    //         }
    //     });
    //
    //     //*********DISTANCE AND DURATION**********************//
    //     var service = new google.maps.DistanceMatrixService();
    //
    //     service.getDistanceMatrix({
    //         origins: [this.source],
    //         destinations: [this.destination],
    //         travelMode: google.maps.TravelMode.DRIVING,
    //         unitSystem: google.maps.UnitSystem.METRIC,
    //         avoidHighways: false,
    //         avoidTolls: false
    //     }, function (response, status) {
    //
    //
    //         if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != google.maps.DistanceMatrixElementStatus.ZERO_RESULTS) {
    //             var distance = response.rows[0].elements[0].distance.text;
    //             var duration = response.rows[0].elements[0].duration.value;
    //             var dvDistance = document.getElementById("dvDistance");
    //             //duration = parseFloat(duration / 60).toFixed(2);
    //             var durationString = parseFloat((duration / 60).toString()).toFixed(2);
    //             dvDistance.innerHTML = "";
    //             dvDistance.innerHTML += "Distance: " + distance + "<br />";
    //             dvDistance.innerHTML += "Time:" + durationString + " min";
    //
    //         } else {
    //             alert("Unable to find the distance via road.");
    //         }
    //     });
    // }
}