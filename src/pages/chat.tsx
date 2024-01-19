import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TimeRange from '../component/map/timerange';

// Sample data with latitude, longitude, and timestamp
const sampleData = [
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

const init = {
    lat: 0,
    lng: 0
}
const CabTracker:React.FC = () => {
    const [markerSpeed, setMarkerSpeed] = useState(-500); // Default marker speed in milliseconds
    const currentIndex = useRef<number>(0);
    const positionref = useRef(init)
    const polylineRef = useRef<any>(null); 
    const markerRef = useRef<any>(null);
    const tryRef = useRef<any>([])


    useEffect(() => {
        let intervalId:any;
        const moveMarker = (startIndex:number) => {
            let updatedIndex = startIndex;
            intervalId = setInterval(() => {
                if (updatedIndex < sampleData.length - 1) {
                    currentIndex.current = updatedIndex
                    const nextPosition = sampleData[updatedIndex];
                    updatedIndex++;
                    tryRef.current.push(nextPosition)
                    positionref.current = nextPosition
                    if (polylineRef.current) {
                        // Update the polyline with the new position
                        polylineRef.current.addLatLng(nextPosition)
                    }
                    if (markerRef.current) {
                        // Move the marker to the new position
                        markerRef.current.setLatLng([nextPosition.lat, nextPosition.lng]);
                    }
                } else {
                    // If reached the end of the data, stop the interval
                    clearInterval(intervalId);
                }
            }, markerSpeed);
        };

        moveMarker(currentIndex.current);
        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, markerSpeed]);

    const handleSpeedChange = (event:any) => {
        var val=event.target.value
        if(val<0){
            val=val*-1
        }
        setMarkerSpeed(parseInt(val, 10));
        moveMarker(currentIndex.current); // Restart the marker movement from the current index
    };

    const moveMarker = (startIndex:number) => {
        if (markerRef.current) {
            // Move the marker to the starting position
            markerRef.current.setLatLng([sampleData[startIndex].lat, sampleData[startIndex].lng]);
        }
        currentIndex.current = startIndex
    };

    return (
        <div>
            <div style={{ width: "10%", margin: "auto" }}>
                <input type="range" min='-500' max='-1'  value={markerSpeed} id="range" onChange={handleSpeedChange} style={{ width: "100%" }} />
            </div>
            <MapContainer center={[28.57045, 77.32162]} zoom={14} style={{ height: '70vh' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline ref={polylineRef} pathOptions={{ color: 'blue' }} positions={tryRef.current} />
                <Marker
                    position={positionref.current}
                    ref={markerRef}
                    icon={customicon}
                />
            </MapContainer>
            <TimeRange timer={markerSpeed}/>
        </div>
    );
};

const customicon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
    iconSize: [25, 38]
})
L.Marker.prototype.options.icon = customicon
export default CabTracker;





