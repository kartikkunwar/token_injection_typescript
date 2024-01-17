import { Marker, Popup, TileLayer, MapContainer, Polyline, FeatureGroup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import { useEffect, useState } from "react"
import RoutingMachine from "../component/map/routingmachine"
import TimeRange from "../component/map/timerange"
import Markers from "../component/map/marker"

const initial = {
    loaded: false,
    coordinates: {
        lat: 0,
        long: 0
    }
}
const MapCab = () => {
    const [currentlocation, setCurrentlocation] = useState(initial)
    const [timer, setTimer] = useState(-500);
    const [hithere,setHithere]=useState<any>([])

    const onSuccess = (location: any) => {
        setCurrentlocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                long: location.coords.longitude
            }
        })
    }
    const onFailure = (error: any) => {
        console.log(error)
    }

    // var latlng: [number, number][] =[
    //     [28.5703,77.3218],
    //     [28.5804,77.3238],
        
    // ]

    const trial=[
            {
                "lat": 28.57045,
                "lng": 77.32162
            },
            {
                "lat": 28.56964,
                "lng": 77.32074
            },
            {
                "lat": 28.56964,
                "lng": 77.32074
            },
            {
                "lat": 28.5685,
                "lng": 77.32181
            },
            {
                "lat": 28.56843,
                "lng": 77.32188
            },
            {
                "lat": 28.56801,
                "lng": 77.32226
            },
            {
                "lat": 28.56792,
                "lng": 77.32235
            },
            {
                "lat": 28.56792,
                "lng": 77.32235
            },
            {
                "lat": 28.56755,
                "lng": 77.32269
            },
            {
                "lat": 28.56693,
                "lng": 77.32323
            },
            {
                "lat": 28.56693,
                "lng": 77.32323
            },
            {
                "lat": 28.56701,
                "lng": 77.32332
            },
            {
                "lat": 28.56729,
                "lng": 77.32377
            },
            {
                "lat": 28.56781,
                "lng": 77.32444
            },
            {
                "lat": 28.56798,
                "lng": 77.32464
            },
            {
                "lat": 28.56823,
                "lng": 77.32487
            },
            {
                "lat": 28.56829,
                "lng": 77.32492
            },
            {
                "lat": 28.56829,
                "lng": 77.32492
            },
            {
                "lat": 28.56913,
                "lng": 77.32601
            },
            {
                "lat": 28.56938,
                "lng": 77.32632
            },
            {
                "lat": 28.57053,
                "lng": 77.32781
            },
            {
                "lat": 28.57074,
                "lng": 77.3281
            },
            {
                "lat": 28.57175,
                "lng": 77.32946
            },
            {
                "lat": 28.57178,
                "lng": 77.32949
            },
            {
                "lat": 28.57212,
                "lng": 77.32992
            },
            {
                "lat": 28.57246,
                "lng": 77.33037
            },
            {
                "lat": 28.57257,
                "lng": 77.33053
            },
            {
                "lat": 28.57262,
                "lng": 77.33059
            },
            {
                "lat": 28.57262,
                "lng": 77.33059
            },
            {
                "lat": 28.57278,
                "lng": 77.33064
            },
            {
                "lat": 28.57332,
                "lng": 77.33137
            },
            {
                "lat": 28.57496,
                "lng": 77.33361
            },
            {
                "lat": 28.57516,
                "lng": 77.33388
            },
            {
                "lat": 28.57516,
                "lng": 77.33388
            },
            {
                "lat": 28.57531,
                "lng": 77.33401
            },
            {
                "lat": 28.5754,
                "lng": 77.33402
            },
            {
                "lat": 28.57547,
                "lng": 77.33401
            },
            {
                "lat": 28.57562,
                "lng": 77.33386
            },
            {
                "lat": 28.57601,
                "lng": 77.33347
            },
            {
                "lat": 28.5762,
                "lng": 77.33333
            },
            {
                "lat": 28.57653,
                "lng": 77.33305
            },
            {
                "lat": 28.57676,
                "lng": 77.33283
            },
            {
                "lat": 28.57714,
                "lng": 77.33247
            },
            {
                "lat": 28.57756,
                "lng": 77.33207
            },
            {
                "lat": 28.57775,
                "lng": 77.33189
            },
            {
                "lat": 28.57793,
                "lng": 77.33172
            },
            {
                "lat": 28.5783,
                "lng": 77.33134
            },
            {
                "lat": 28.57864,
                "lng": 77.33093
            },
            {
                "lat": 28.57878,
                "lng": 77.3308
            },
            {
                "lat": 28.57897,
                "lng": 77.33062
            },
            {
                "lat": 28.5792,
                "lng": 77.33039
            },
            {
                "lat": 28.57929,
                "lng": 77.33031
            },
            {
                "lat": 28.57969,
                "lng": 77.32994
            },
            {
                "lat": 28.5804,
                "lng": 77.32924
            },
            {
                "lat": 28.58049,
                "lng": 77.32915
            },
            {
                "lat": 28.58113,
                "lng": 77.32855
            },
            {
                "lat": 28.58151,
                "lng": 77.32819
            },
            {
                "lat": 28.58178,
                "lng": 77.32793
            },
            {
                "lat": 28.58195,
                "lng": 77.32778
            },
            {
                "lat": 28.58195,
                "lng": 77.32778
            },
            {
                "lat": 28.58265,
                "lng": 77.32711
            },
            {
                "lat": 28.58273,
                "lng": 77.32705
            },
            {
                "lat": 28.58288,
                "lng": 77.32691
            },
            {
                "lat": 28.58288,
                "lng": 77.32691
            },
            {
                "lat": 28.58295,
                "lng": 77.32677
            },
            {
                "lat": 28.58298,
                "lng": 77.32667
            },
            {
                "lat": 28.58298,
                "lng": 77.32655
            },
            {
                "lat": 28.58228,
                "lng": 77.32557
            },
            {
                "lat": 28.58204,
                "lng": 77.32524
            },
            {
                "lat": 28.58175,
                "lng": 77.32486
            },
            {
                "lat": 28.58175,
                "lng": 77.32486
            },
            {
                "lat": 28.58078,
                "lng": 77.32346
            },
            {
                "lat": 28.58078,
                "lng": 77.32346
            }
    ]
    
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            alert("location not supported")
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onFailure)
        const poly=trial.map((el)=>{
            return [el.lat,el.lng]
        })
        setHithere(poly)
    }, [])
    return (
        <div>
            <div style={{ width: "10%", margin: "auto" }}>
                <input type="range" min='-500' max='-1' value={timer} id="range" onChange={(e) => setTimer(Number(e.target.value))} style={{ width: "100%" }} />
            </div>
            {
                currentlocation.loaded && <MapContainer style={{ height: "70vh" }} center={[currentlocation.coordinates.lat, currentlocation.coordinates.long]} zoom={14} maxZoom={18}>
                    <TileLayer attribution='&copy; <a href ="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <FeatureGroup>
                        {/* {
                            hithere.map((marker: any, ind:any) => (
                                <Marker key={ind} position={marker} icon={customicon}>
                                    <Popup>{marker.popup}</Popup>
                                </Marker>
                            ))
                        } */}
                        <Markers trial={trial} timer={timer}/>
                        {/* <Polyline positions={hithere} color={'red'} /> */}
                        {/* <RoutingMachine /> */}
                    </FeatureGroup>
                </MapContainer>
                
            }
            <TimeRange timer={timer}/>
        </div>
    )
}

const customicon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
    iconSize: [25, 38]
})
L.Marker.prototype.options.icon = customicon

export default MapCab