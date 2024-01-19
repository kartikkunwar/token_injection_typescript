import { useEffect, useState } from "react";
import { useMap } from "react-leaflet"
import * as L from "leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

// interface IRoutingMachine{
//     timer:number
// }
const init = {
    lat: 0,
    lng: 0
}
const Markers = ({ trial, timer }: any) => {
    const [data, setData] = useState(init)
    const [time,setTime]=useState(1000)
    const map = useMap();
    var line = L.polyline([]).addTo(map)
    // let defaulticon=L.icon({
    //     iconUrl:"https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    //     iconSize:[40,41],
    // })

    var latlng = [
        {
            start: [28.5703, 77.3218],
            timestamp: "12:00:00"

        },
        {
            start: [28.5804, 77.3238],
            timestamp: "1:00:00"
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

    var mark: any;
    
    useEffect(() => {
        if (timer < 1) {
            timer = timer * -1
        }
        mark = L.marker([data.lat, data.lng]).addTo(map)

        // if (data.lat == 0 && data.lng == 0) {
        //     trial.forEach((c: any, i: number) => {
        //         first = setTimeout(() => {
        //             line.addLatLng(c)
        //             setData({ ...init, lat: c.lat, lng: c.lng })
        //             mark.setLatLng([c.lat, c.lng])
        //         }, timer * i)
        //     })

        // } else {
        //     console.log(first)
        //     clearTimeout(first)
        //     if (mark != undefined) {
        //         map.removeLayer(mark)
        //     }
        //     trial.forEach((c: any, i: number) => {
        //         if (data.lat == c.lat && data.lng == c.lng) {
        //             first = setTimeout(() => {
        //                 // console.log(timer, i)
        //                 setData({ ...init, lat: c.lat, lng: c.lng })
        //                 mark.setLatLng([c.lat, c.lng])
        //             }, timer * i)
        //         }

        //     })
        // }


        // trial.forEach((c: any, i: number) => {
        //     if (data.lat == 0 && data.lng == 0) {
        //         first=setTimeout(() => {
        //             line.addLatLng(c)
        //             setData({ ...init, lat: c.lat, lng: c.lng })
        //             mark.setLatLng([c.lat, c.lng])
        //         }, timer * i)
        //     } else if (data.lat == c.lat && data.lng == c.lng) {
        //         if (mark != undefined) {
        //             map.removeControl(mark)
        //         }
        //         clearTimeout(first)
        //         setTimeout(() => {
        //             setData({ ...init, lat: c.lat, lng: c.lng })
        //             mark.setLatLng([c.lat, c.lng])
        //         }, timer * i)
        //     }

        // })
    }, [timer])
    // console.log(data)
    return null
}

export default Markers


