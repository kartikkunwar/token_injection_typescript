import { Marker, Popup, TileLayer, MapContainer, Polyline, FeatureGroup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
import RoutingMachine from "../component/map/routingmachine"

const initial={
    loaded:false,
    coordinates:{
        lat:0,
        long:0
    }
}
const MapCab = () => {
    const [currentlocation,setCurrentlocation]=useState(initial)
    const [timer,setTimer]=useState(0);

    const markers=[
        {
            geocode:[28.5703,77.3218],
            popup:"i m 1"
        },
        {
            geocode:[28.6280,77.3649],
            popup:"i m 2"
        },
        {
            geocode:[28.5534,77.3373],
            popup:"i m 3"
        },
    ]


    // const pos = [
    //     [28.54154673753464, 77.29710961616276],
    //     [28.54105909155295, 77.2972699762126],
    //     [28.540774745526356, 77.2966945433168],
    //     [28.540560014967774, 77.2968301724898],
    //     [28.540600978132275, 77.29707217115468],
    //     [28.539923589482637, 77.29752093733772],
    //     [28.538230116668732, 77.29836966337936],
    //     [28.537644306824678, 77.29691762792734],
    //     [28.53704937540376, 77.29773152040781],
    //     [28.53670005630692, 77.29838698343596],
    //     [28.53681467676324, 77.29861996792465],
    //     [28.536623642604216, 77.29876286505933],
    //     [28.5358891494672, 77.29967066280575],
    //     [28.536429361658847, 77.29969861347438],
    //     [28.536411023048526, 77.3001910829177]
    //   ];
    const onSuccess=(location:any)=>{
        setCurrentlocation({
            loaded:true,
            coordinates:{
                lat:location.coords.latitude,
                long:location.coords.longitude
            }
        })
    }
    const onFailure=(error:any)=>{
        console.log(error)
    }

    useEffect(()=>{
        if(!("geolocation" in navigator)){
            alert("location not supported")
        }
        navigator.geolocation.getCurrentPosition(onSuccess,onFailure)
    },[])
    return (
        <div>
            <input type="range" min='100' max='500' onChange={(e)=>setTimer(Number(e.target.value))}/>
           {
            currentlocation.loaded&& <MapContainer style={{ height: "100vh" }} center={[currentlocation.coordinates.lat,currentlocation.coordinates.long]} zoom={14} maxZoom={18}>
            <TileLayer attribution='&copy; <a href ="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <FeatureGroup>
                {/* {
                    markers.map((marker:any,ind)=>(
                        <Marker key={ind} position={marker.geocode} icon={customicon}>
                            <Popup>{marker.popup}</Popup>
                        </Marker>
                    ))
                } */}
                {/* <Polyline positions={[[28.5703,77.3218],[28.6280,77.3649]]} color={'red'}/> */}
                <RoutingMachine timer={timer}/>
                </FeatureGroup>
        </MapContainer>
           }
        </div>
    )
}

const customicon=L.icon({
    iconUrl:"https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconSize:[25,38]
})
L.Marker.prototype.options.icon=customicon

export default MapCab