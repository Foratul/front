import * as L from 'leaflet';
import { Marker, icon } from 'leaflet';
const iconRetinaUrl = './assets/marker-icon-2x.png';
const iconUrl = './assets/marker-icon.png';
const iconUrl2 = './assets/marker-icon2.png';
const programmer = "./assets/programmer-icon-16.png"
const shadowUrl = './assets/marker-shadow.png';


export class Icono {
    blueIcon; redIcon; greenIcon; orangeIcon; yellowIcon; violetIcon; greyIcon; blackIcon
    defaultIcon: L.Icon;
    positionIcon: L.Icon;

    constructor() {

        this.positionIcon = icon({
            iconRetinaUrl: programmer,
            iconUrl,
            shadowUrl,
            iconSize: [55, 45],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });

        this.defaultIcon = icon({
            iconRetinaUrl,
            iconUrl,
            shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });

        this.blueIcon = new L.Icon({
            iconUrl: 'assets/marker-icon-2x-blue.png',
            shadowUrl: '/assets/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
        this.redIcon = new L.Icon({
            iconUrl: 'assets/marker-icon-2x-red.png',
            shadowUrl: '/assets/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        }),

            this.greenIcon = new L.Icon({
                iconUrl: 'assets/marker-icon-2x-green.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),

            this.orangeIcon = new L.Icon({
                iconUrl: 'assets/marker-icon-2x-orange.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),

            this.yellowIcon = new L.Icon({
                iconUrl: 'assets/marker-icon-2x-yellow.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),

            this.violetIcon = new L.Icon({
                iconUrl: 'assets/marker-icon-2x-violet.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),

            this.greyIcon = new L.Icon({
                iconUrl: 'assets/marker-icon-2x-grey.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.blackIcon = new L.Icon({
                iconUrl: 'assets/marker-icon-2x-black.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
    }
}



