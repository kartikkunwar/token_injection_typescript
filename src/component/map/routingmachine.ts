import { useEffect } from "react";
import { useMap } from "react-leaflet"
import * as L from "leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

// interface IRoutingMachine{
//     timer:number
// }
const RoutingMachine=()=>{
    const map=useMap();
    // let defaulticon=L.icon({
    //     iconUrl:"https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    //     iconSize:[40,41],
    // })

    var latlng=[
        {
            start:[28.5703,77.3218],
            timestamp:"12:00:00"
           
        },
        {
            start:[28.5804,77.3238],
            timestamp:"1:00:00"
        },
        // {
        //     start:[28.5906,77.3298],
           
        // },
        // {
        //     start:[28.6203,77.3318]
        // },
        
        // {
        //     start:[28.6503,77.3378],
            
        // },
        // {
        //     start:[28.6703,77.3388]
        // },
        // {
        //     start:[28.5703,77.3218],
        // },
        // {
        //     start:[28.5703,77.3218]
        // }
    ]

    useEffect(()=>{
        var mark=L.marker([28.5703,77.3218]).addTo(map)
        var m;
        const x=latlng.map((el:any)=>{
            return L.latLng(el.start)
        })
        // map.on("click",function(e){
             m=L.Routing.control({
                waypoints:x,
                lineOptions: {
                    styles: [{ color: "blue", weight: 6 }],
                    extendToWaypoints: false,
                    missingRouteTolerance: 0
                  },
                routeWhileDragging:false,
                addWaypoints:false,
                fitSelectedRoutes:true,
                showAlternatives:false,
            }).on("routesfound",function(e){
                console.log(e)
                e.routes[0].coordinates.forEach((c:any,i:number)=>{  
                    setTimeout(()=>{
                        mark.setLatLng([c.lat,c.lng])
                    },10000*i)
                })
            })
            .addTo(map)
            m.hide()
        // })
    },[])
    return null
}

export default RoutingMachine