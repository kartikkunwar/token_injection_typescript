import { useEffect } from "react";
import { useMap } from "react-leaflet"
import * as L from "leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

interface IRoutingMachine{
    timer:number
}
const RoutingMachine=({timer}:IRoutingMachine)=>{
    const map=useMap();
    // let defaulticon=L.icon({
    //     iconUrl:"https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    //     iconSize:[40,41],
    // })
    var routing:any;
    useEffect(()=>{
        var mark=L.marker([28.5703,77.3218]).addTo(map)
        // map.on("click",function(e){
             routing=L.Routing.control({
                waypoints:[
                    L.latLng(28.5703,77.3218),
                    L.latLng(28.6280,77.3649),
                    // L.latLng(e.latlng.lat,e.latlng.lng)
                ],
                lineOptions: {
                    styles: [{ color: "blue", weight: 6 }],
                    extendToWaypoints: false,
                    missingRouteTolerance: 0
                  },
                routeWhileDragging:false,
                // geocoder:L.Control.Geocoder.nominatim(),
                addWaypoints:false,
                fitSelectedRoutes:true,
                showAlternatives:false
            }).on("routesfound",function(e){
                e.routes[0].coordinates.forEach((c:any,i:number)=>{
                    setTimeout(()=>{
                        mark.setLatLng([c.lat,c.lng])
                    },timer*i)
                })
            })
            routing.addTo(map)
        // })
    },[timer])
    return null
}

export default RoutingMachine