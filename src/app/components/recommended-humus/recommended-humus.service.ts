import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {MapOptions} from "angular2-google-maps/core/services/google-maps-types";

@Injectable()
export class RecommendedHumusService {

    directionsService: any;
    directionsRenderer: any;

    constructor() {

    }

    // calcDistance() {
    //     var source: any;
    //     var destination: any;
    //
    //     // initialize the location of the map on Chichester in England (ref lat and lng)
    //     var options:google.maps.MapOptions =  {
    //                                             center: { lat: 50.834697, lng: -0.773792 },
    //                                             zoom: 13,
    //                                             mapTypeId : 1
    //                                           };
    //
    //     var map = new google.maps.Map(document.getElementById('dvMap'),options);
    //
    //     var request = {
    //         origin: source,
    //         destination: destination,
    //         travelMode: google.maps.TravelMode.DRIVING
    //     };
    //
    //     var directionsDisplay = new google.maps.DirectionsRenderer({'draggable': true});
    //
    //     this.directionsService = new google.maps.DirectionsService();
    //
    //     this.directionsService.route(request, function (response: any, status: any) {
    //         if (status == google.maps.DirectionsStatus.OK) {
    //             directionsDisplay.setDirections(response);
    //         }
    //     });
    //
    //     var service = new google.maps.DistanceMatrixService();
    //
    //     service.getDistanceMatrix({
    //         origins: [source],
    //         destinations: [destination],
    //         travelMode: google.maps.TravelMode.DRIVING,
    //         unitSystem: google.maps.UnitSystem.METRIC,
    //         avoidHighways: false,
    //         avoidTolls: false
    //
    //     },
    //
    //     function (response, status) {
    //
    //         if (status == google.maps.DistanceMatrixStatus.OK &&
    //                 // response.rows[0].elements[0].status != DistanceMatrixElementStatus.ZERO_RESULTS) {
    //                 response.rows[0].elements[0].status == 1) {
    //
    //             var distance = response.rows[0].elements[0].distance.text;
    //             var duration = response.rows[0].elements[0].duration.value;
    //             var dvDistance = document.getElementById("dvDistance");
    //             //duration = parseFloat(duration / 60).toFixed(2);
    //             duration = duration / 60;
    //             dvDistance.innerHTML = "";
    //             dvDistance.innerHTML += "Distance: " + distance + "<br />";
    //             dvDistance.innerHTML += "Time:" + duration + " min";
    //         }
    //     });
    // }
}
