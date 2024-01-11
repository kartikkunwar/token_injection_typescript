import { Marker, Popup, TileLayer, MapContainer, Polyline, FeatureGroup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
import RoutingMachine from "../component/map/routingmachine"
import TimeRange from "../component/map/timerange"

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

    var latlng: [number, number][] =[
        [29.66534,29.64021],
        [29.66535,29.63819],
        [29.66376,29.63817],
        [29.66372,29.63749],
        [29.66352,29.63749],
        [29.66352,29.63749],
        [29.66353,29.63713],
    ]

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            alert("location not supported")
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onFailure)
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
                            markers.map((marker: any, ind) => (
                                <Marker key={ind} position={marker.geocode} icon={customicon}>
                                    <Popup>{marker.popup}</Popup>
                                </Marker>
                            ))
                        } */}
                        {/* <Polyline positions={latlng} color={'red'}/> */}
                        <RoutingMachine/>
                    </FeatureGroup>
                </MapContainer>
            }
            <TimeRange timer={timer}/>
        </div>
    )
}

const customicon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconSize: [25, 38]
})
L.Marker.prototype.options.icon = customicon

export default MapCab