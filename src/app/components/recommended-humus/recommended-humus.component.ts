import {Component, OnInit} from '@angular/core';
import {RecommendedHumusService} from './recommended-humus.service';

interface MapItem {
    name: string;
    address: string;
    latlng: { lat: number; lng: number; }
}

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

@Component({
    selector: 'recommended-humus',
    moduleId: module.id,
    templateUrl:'recommended-humus.component.html'
})

export class RecommendedHumusComponent implements OnInit {

    // Map style taken from https://snazzymaps.com/style/2/midnight-commander
    // mapOptions: any = {
    // center: new google.maps.LatLng(32.1015817, 34.7445845),
    // zoom: 9,
    // mapTypeId: google.maps.MapTypeId.HYBRID
    // };

    mapStyle: any = [{"stylers":[{"visibility":"on"},
                                 {"saturation":-100},
                                 {"gamma":0.54}]},
                                 {"featureType":"road",
                                  "elementType":"labels.icon",
                                  "stylers":[{"visibility":"off"}]},
                                 {"featureType":"water","stylers":[{"color":"#2f323b"}]},
                                 {"featureType":"poi","elementType":"labels.icon",
                                  "stylers":[{"visibility":"off"}]},
                                 {"featureType":"poi",
                                  "elementType":"labels.text",
                                  "stylers":[{"visibility":"simplified"}]},
                                 {"featureType":"road","elementType":"geometry.fill",
                                  "stylers":[{"color":"#ffffff"}]},
        {"featureType":"road.local",
            "elementType":"labels.text",
            "stylers":[{"visibility":"simplified"}]},
        {"featureType":"water",
            "elementType":"labels.text.fill",
            "stylers":[{"color":"#ffffff"}]},
        {"featureType":"transit.line",
            "elementType":"geometry",
            "stylers":[{"gamma":0.48}]},
        {"featureType":"transit.station",
            "elementType":"labels.icon",
            "stylers":[{"visibility":"off"}]},
        {"featureType":"road",
            "elementType":"geometry.stroke",
            "stylers":[{"gamma":7.18}]}];

    locations: MapItem[];

    constructor(private recommendedHumusService: RecommendedHumusService) {

    }

    calcDistance() {
        var source: any;
        var destination: any;

        // initialize the location of the map on Chichester in England (ref lat and lng)
        var options:google.maps.MapOptions =  {
            center: { lat: 50.834697, lng: -0.773792 },
            zoom: 13,
            mapTypeId : 1
        };

        var map = new google.maps.Map(document.getElementById('dvMap'),options);

        var request = {
            origin: source,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        };

        var directionsDisplay = new google.maps.DirectionsRenderer({'draggable': true});

        var directionsService = new google.maps.DirectionsService();

        directionsService.route(request, function (response: any, status: any) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        var service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix({
                origins: [source],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false

            },

            function (response, status) {

                if (status == google.maps.DistanceMatrixStatus.OK &&
                    // response.rows[0].elements[0].status != DistanceMatrixElementStatus.ZERO_RESULTS) {
                    response.rows[0].elements[0].status == 1) {

                    var distance = response.rows[0].elements[0].distance.text;
                    var duration = response.rows[0].elements[0].duration.value;
                    var dvDistance = document.getElementById("dvDistance");
                    //duration = parseFloat(duration / 60).toFixed(2);
                    duration = duration / 60;
                    dvDistance.innerHTML = "";
                    dvDistance.innerHTML += "Distance: " + distance + "<br />";
                    dvDistance.innerHTML += "Time:" + duration + " min";
                }
            });
    }

    ngOnInit(): void {
        this.locations = [];
        this.locations.push( {name:"xxx", address: "yyy", latlng:{lat:32.5, lng:32.3}});

        // this.recommendedHumusService.calcDistance();

        // this.calcDistance();
    }

    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    // mapClicked($event: MouseEvent) {
    //     this.markers.push({
    //         lat: $event.coords.lat,
    //         lng: $event.coords.lng
    //     });
    // }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    markers: marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: 'A',
            draggable: true
        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: 'B',
            draggable: false
        },
        {
            lat: 51.723858,
            lng: 7.895982,
            label: 'C',
            draggable: true
        }
    ]
}


