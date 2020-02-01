import * as L from 'leaflet';
import { Marker, icon } from 'leaflet';
const iconRetinaUrl = './assets/marker-icon-2x.png';
const iconUrl = './assets/marker-icon.png';
const iconUrl2 = './assets/marker-icon2.png';
const programmer = "./assets/programmer-icon-16.png"
const shadowUrl = './assets/marker-shadow.png';
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


export class Icono {
    blueIcon; redIcon; greenIcon; orangeIcon; yellowIcon; violetIcon; greyIcon; blackIcon
    defaultIcon: L.Icon;
    positionIcon: L.Icon;
    monumentIcon
    parkIcon
    churchIcon
    bibliotecaIcon
    informacionMujeres
    informacionMujeres2
    iglesias2
    informacionTurismo1
    informacionTurismo2
    museos1
    museos2
    wifi
    estudioSala
    cementerio
    deportes
    culturaOcio
    templos
    homeless
    cameraIcon


    constructor() {

        this.positionIcon = icon({
            iconRetinaUrl: programmer,
            // iconRetinaUrl: "./assets/programmer-icon-16.png",

            iconUrl: "./assets/programmer-icon-16.png",
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
            }),
            this.parkIcon = new L.Icon({
                iconUrl: '../assets/parkIcon.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.churchIcon = new L.Icon({
                iconUrl: '../assets/churchIcon.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),

            this.bibliotecaIcon = new L.Icon({
                iconUrl: '../assets/biblioteca2Icon.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),

            this.monumentIcon = new L.Icon({
                iconUrl: '../assets/monumentIcon.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.informacionMujeres = new L.Icon({
                iconUrl: '../assets/informacionMujeres.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.informacionMujeres2 = new L.Icon({
                iconUrl: '../assets/informacionMujeres2.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.iglesias2 = new L.Icon({
                iconUrl: '../assets/iglesias2.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.informacionTurismo1 = new L.Icon({
                iconUrl: '../assets/informacionTurismo.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.informacionTurismo2 = new L.Icon({
                iconUrl: '../assets/informacionTurismo2.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.museos1 = new L.Icon({
                iconUrl: '../assets/museos1.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            this.museos2 = new L.Icon({
                iconUrl: '../assets/museos2.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }), this.wifi = new L.Icon({
                iconUrl: '../assets/freeWifi.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }), this.estudioSala = new L.Icon({
                iconUrl: '../assets/estudioSala2.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [40, 55],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }), this.cementerio = new L.Icon({
                iconUrl: '../assets/cementerio.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }), this.deportes = new L.Icon({
                iconUrl: '../assets/deportes.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }), this.culturaOcio = new L.Icon({
                iconUrl: '../assets/culturaOcio.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }), this.templos = new L.Icon({
                iconUrl: '../assets/templos.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }), this.homeless = new L.Icon({
                iconUrl: '../assets/homeless.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [40, 55],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }), this.cameraIcon = new L.Icon({
                iconUrl: '../assets/cameraIcon.png',
                shadowUrl: '/assets/marker-shadow.png',
                iconSize: [60, 66],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]

            })

    }


}

