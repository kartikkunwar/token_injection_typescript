import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-rotatedmarker";
import "./clonechat.css"

// Sample data with latitude, longitude, and timestamp
const sampleData = [
    {
        "lat": 28.57045,
        "lng": 77.32162,
        "timestamp": "00:00:00",
        "heading": 230
    },
    {
        "lat": 28.56964,
        "lng": 77.32074,
        "timestamp": "00:01:00",
        "heading": 230
    },
    {
        "lat": 28.56964,
        "lng": 77.32074,
        "timestamp": "00:01:30",
        "heading": 150
    },
    {
        "lat": 28.5685,
        "lng": 77.32181,
        "timestamp": "00:02:00",
        "heading": 150
    },
    {
        "lat": 28.56843,
        "lng": 77.32188,
        "timestamp": "00:02:10",
        "heading": 150
    },
    {
        "lat": 28.56801,
        "lng": 77.32226,
        "timestamp": "00:02:30",
        "heading": 150
    },
    {
        "lat": 28.56792,
        "lng": 77.32235,
        "timestamp": "00:02:50",
        "heading": 150
    },
    {
        "lat": 28.56792,
        "lng": 77.32235,
        "timestamp": "00:03:00",
        "heading": 150
    },
    {
        "lat": 28.56755,
        "lng": 77.32269,
        "timestamp": "00:03:10",
        "heading": 150
    },
    {
        "lat": 28.56693,
        "lng": 77.32323,
        "timestamp": "00:03:30",
        "heading": 150
    },
    {
        "lat": 28.56693,
        "lng": 77.32323,
        "timestamp": "00:04:00",
        "heading": 50
    },
    {
        "lat": 28.56701,
        "lng": 77.32332,
        "timestamp": "00:04:10",
        "heading": 50
    },
    {
        "lat": 28.56729,
        "lng": 77.32377,
        "timestamp": "00:04:30",
        "heading": 50
    },
    {
        "lat": 28.56781,
        "lng": 77.32444,
        "timestamp": "00:05:00",
        "heading": 50
    },
    {
        "lat": 28.56798,
        "lng": 77.32464,
        "timestamp": "00:05:10",
        "heading": 50
    },
    {
        "lat": 28.56823,
        "lng": 77.32487,
        "timestamp": "00:05:30",
        "heading": 50
    },
    {
        "lat": 28.56829,
        "lng": 77.32492,
        "timestamp": "00:05:40",
        "heading": 50
    },
    {
        "lat": 28.56829,
        "lng": 77.32492,
        "timestamp": "00:06:00",
        "heading": 50
    },
    {
        "lat": 28.56913,
        "lng": 77.32601,
        "timestamp": "00:06:30",
        "heading": 50
    },
    {
        "lat": 28.56938,
        "lng": 77.32632,
        "timestamp": "00:06:40",
        "heading": 50
    },
    {
        "lat": 28.57053,
        "lng": 77.32781,
        "timestamp": "00:07:00",
        "heading": 50
    },
    {
        "lat": 28.57074,
        "lng": 77.3281,
        "timestamp": "00:07:20",
        "heading": 50
    },
    {
        "lat": 28.57175,
        "lng": 77.32946,
        "timestamp": "00:07:30",
        "heading": 50
    },
    {
        "lat": 28.57178,
        "lng": 77.32949,
        "timestamp": "00:07:40",
        "heading": 50
    },
    {
        "lat": 28.57212,
        "lng": 77.32992,
        "timestamp": "00:08:00",
        "heading": 50
    },
    {
        "lat": 28.57246,
        "lng": 77.33037,
        "timestamp": "00:09:00",
        "heading": 50
    },
    {
        "lat": 28.57257,
        "lng": 77.33053,
        "timestamp": "00:10:00",
        "heading": 50
    },
    {
        "lat": 28.57262,
        "lng": 77.33059,
        "timestamp": "00:11:00",
        "heading": 50
    },
    {
        "lat": 28.57262,
        "lng": 77.33059,
        "timestamp": "00:12:00",
        "heading": 50
    },
    {
        "lat": 28.57278,
        "lng": 77.33064,
        "timestamp": "00:13:30",
        "heading": 50
    },
    {
        "lat": 28.57332,
        "lng": 77.33137,
        "timestamp": "00:14:00",
        "heading": 50
    },
    {
        "lat": 28.57496,
        "lng": 77.33361,
        "timestamp": "00:15:00",
        "heading": 50
    },
    {
        "lat": 28.57516,
        "lng": 77.33388,
        "timestamp": "00:16:00",
        "heading": 50
    },
    {
        "lat": 28.57516,
        "lng": 77.33388,
        "timestamp": "00:17:00",
        "heading": 50
    },
    {
        "lat": 28.57531,
        "lng": 77.33401,
        "timestamp": "00:18:00",
        "heading": 50
    },
    {
        "lat": 28.5754,
        "lng": 77.33402,
        "timestamp": "00:19:00",
        "heading": 50
    },
    {
        "lat": 28.57547,
        "lng": 77.33401,
        "timestamp": "00:19:30",
        "heading": 320
    },
    {
        "lat": 28.57562,
        "lng": 77.33386,
        "timestamp": "00:20:00",
        "heading": 320
    },
    {
        "lat": 28.57601,
        "lng": 77.33347,
        "timestamp": "00:21:00",
        "heading": 320
    },
    {
        "lat": 28.5762,
        "lng": 77.33333,
        "timestamp": "00:21:30",
        "heading": 320
    },
    {
        "lat": 28.57653,
        "lng": 77.33305,
        "timestamp": "00:22:00",
        "heading": 320
    },
    {
        "lat": 28.57676,
        "lng": 77.33283,
        "timestamp": "00:23:00",
        "heading": 320
    },
    {
        "lat": 28.57714,
        "lng": 77.33247,
        "timestamp": "00:24:00",
        "heading": 320
    },
    {
        "lat": 28.57756,
        "lng": 77.33207,
        "timestamp": "00:25:00",
        "heading": 320
    },
    {
        "lat": 28.57775,
        "lng": 77.33189,
        "timestamp": "00:25:30",
        "heading": 320
    },
    {
        "lat": 28.57793,
        "lng": 77.33172,
        "timestamp": "00:26:00",
        "heading": 320
    },
    {
        "lat": 28.5783,
        "lng": 77.33134,
        "timestamp": "00:26:30",
        "heading": 320
    },
    {
        "lat": 28.57864,
        "lng": 77.33093,
        "timestamp": "00:27:00",
        "heading": 320
    },
    {
        "lat": 28.57878,
        "lng": 77.3308,
        "timestamp": "00:27:30",
        "heading": 320
    },
    {
        "lat": 28.57897,
        "lng": 77.33062,
        "timestamp": "00:28:00",
        "heading": 320
    },
    {
        "lat": 28.5792,
        "lng": 77.33039,
        "timestamp": "00:29:00",
        "heading": 320
    },
    {
        "lat": 28.57929,
        "lng": 77.33031,
        "timestamp": "00:29:30",
        "heading": 320
    },
    {
        "lat": 28.57969,
        "lng": 77.32994,
        "timestamp": "00:30:00",
        "heading": 320
    },
    {
        "lat": 28.5804,
        "lng": 77.32924,
        "timestamp": "00:41:00",
        "heading": 320
    },
    {
        "lat": 28.58049,
        "lng": 77.32915,
        "timestamp": "00:42:00",
        "heading": 320
    },
    {
        "lat": 28.58113,
        "lng": 77.32855,
        "timestamp": "00:43:00",
        "heading": 320
    },
    {
        "lat": 28.58151,
        "lng": 77.32819,
        "timestamp": "00:44:00",
        "heading": 320
    },
    {
        "lat": 28.58178,
        "lng": 77.32793,
        "timestamp": "00:45:00",
        "heading": 320
    },
    {
        "lat": 28.58195,
        "lng": 77.32778,
        "timestamp": "00:46:00",
        "heading": 320
    },
    {
        "lat": 28.58195,
        "lng": 77.32778,
        "timestamp": "00:47:00",
        "heading": 320
    },
    {
        "lat": 28.58265,
        "lng": 77.32711,
        "timestamp": "00:48:00",
        "heading": 320
    },
    {
        "lat": 28.58273,
        "lng": 77.32705,
        "timestamp": "00:49:00",
        "heading": 320
    },
    {
        "lat": 28.58288,
        "lng": 77.32691,
        "timestamp": "00:50:00",
        "heading": 320
    },
    {
        "lat": 28.58288,
        "lng": 77.32691,
        "timestamp": "00:51:00",
        "heading": 320
    },
    {
        "lat": 28.58295,
        "lng": 77.32677,
        "timestamp": "00:52:00",
        "heading": 230
    },
    {
        "lat": 28.58298,
        "lng": 77.32667,
        "timestamp": "00:53:30",
        "heading": 230
    },
    {
        "lat": 28.58298,
        "lng": 77.32655,
        "timestamp": "00:54:00",
        "heading": 230
    },
    {
        "lat": 28.58228,
        "lng": 77.32557,
        "timestamp": "00:55:00",
        "heading": 230
    },
    {
        "lat": 28.58204,
        "lng": 77.32524,
        "timestamp": "00:56:00",
        "heading": 230
    },
    {
        "lat": 28.58175,
        "lng": 77.32486,
        "timestamp": "00:57:00",
        "heading": 230
    },
    {
        "lat": 28.58175,
        "lng": 77.32486,
        "timestamp": "01:58:00",
        "heading": 230
    },
    {
        "lat": 28.58078,
        "lng": 77.32346,
        "timestamp": "01:59:00",
        "heading": 230
    },
    {
        "lat": 28.58078,
        "lng": 77.32346,
        "timestamp": "02:00:00",
        "heading": 230
    }
]

const init = {
    lat: 0,
    lng: 0,
}
const CloneCabTracker: React.FC = () => {
    const [markerSpeed, setMarkerSpeed] = useState(500);
    const [filled, setFilled] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0)
    const [isrunning, setIsrunning] = useState(false)
    const [progreswidth, setProgresswidth] = useState(0)
    const [starttimer, setStarttimer] = useState("00:00:00")
    const [endtimer, setEndtimer] = useState("24:00:00")
    const positionref = useRef(init)
    const currentIndex = useRef<number>(0);
    const polylineRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const tryRef = useRef<any>([]);

    // useEffect(() => {
    //     let intervalId: any;
    //     const moveMarker = (startIndex: number) => {
    //         let updatedIndex = startIndex;
    //         intervalId = setInterval(() => {
    //             if (updatedIndex < sampleData.length - 1) {
    //                 currentIndex.current = updatedIndex
    //                 const nextPosition = sampleData[updatedIndex];
    //                 updatedIndex++;
    //                 tryRef.current.push(nextPosition)
    //                 positionref.current = nextPosition
    //                 if (polylineRef.current) {
    //                     // Update the polyline with the new position
    //                     polylineRef.current.addLatLng(nextPosition)
    //                 }
    //                 if (markerRef.current) {
    //                     // Move the marker to the new position
    //                     markerRef.current.setLatLng([nextPosition.lat, nextPosition.lng]);
    //                 }
    //             } else {
    //                 // If reached the end of the data, stop the interval
    //                 clearInterval(intervalId);
    //             }
    //         }, markerSpeed);
    //     };

    //     moveMarker(currentIndex.current);
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, [currentIndex, markerSpeed]);

    const handleSpeedChange = (event: any) => {
        var val = event.target.value
        if (val < 0) {
            val = val * -1
        }
        setMarkerSpeed(parseInt(val, 10));
        // moveMarker(currentIndex.current); 
    };

    // const moveMarker = (startIndex: number) => {
    //     if (markerRef.current) {
    //         // Move the marker to the starting position
    //         markerRef.current.setLatLng([sampleData[startIndex].lat, sampleData[startIndex].lng]);
    //     }
    //     currentIndex.current = startIndex
    // };


    //converting timestamp to seconds
    const convertime = (hms: any) => {
        const [hours, minutes, seconds] = hms.split(':');
        const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
        return totalSeconds
    }

    const toHHMMSS = (secs: any) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    useEffect(() => {
        const thumbwidth = 15
        const percent = Number(((filled / 86400) * 100).toFixed(2))
        const centerthumb = (thumbwidth / 100) * percent * -1
        setMarginLeft(centerthumb)
        setProgresswidth(percent)
        setStarttimer(toHHMMSS(filled))
        setEndtimer(toHHMMSS(86400 - filled))
        let timerRun: any;
        if (filled < 86400 && isrunning) {
            timerRun = setInterval(() => {
                for (let i = 0; i < sampleData.length; i++) {
                    if (filled === convertime(sampleData[i].timestamp)) {
                        tryRef.current.push(sampleData[i])
                        positionref.current = sampleData[i]
                        if (polylineRef.current) {
                            // Update the polyline with the new position
                            polylineRef.current.addLatLng(sampleData[i])
                        }
                        if (markerRef.current) {
                            // Move the marker to the new position
                            // markerRef.current.setLatLng([sampleData[i].lat, sampleData[i].lng]);
                            markerRef.current.setRotationAngle(sampleData[i].heading)
                        }
                    }
                }
                setFilled(prev => prev += 1)
            }, markerSpeed || 1000)
        } else {
            clearInterval(timerRun)
        }

        return () => {
            clearInterval(timerRun)
        }
    }, [filled, isrunning, markerSpeed])

    //getting seconds value from slider
    const handleChange = (e: any) => {
        setFilled(Number(e.target.value))
        currentIndex.current = Number(e.target.value)
        tryRef.current = []
        for (let i = 0; i < sampleData.length; i++) {
            if (currentIndex.current > convertime(sampleData[i].timestamp)) {
                tryRef.current.push(sampleData[i])
                positionref.current = sampleData[i]
                if (polylineRef.current) {
                    // Update the polyline with the new position
                    polylineRef.current.addLatLng(sampleData[i])
                }
                if (markerRef.current) {
                    // Move the marker to the new position
                    markerRef.current.setRotationAngle(sampleData[i].heading)
                }
            } else {
                return;
            }
        }
    }

    const timearr = [
        {
            line: "|",
            time: "12pm"
        },
        {
            line: "|",
            time: "01am"
        },
        {
            line: "|",
            time: "02am"
        },
        {
            line: "|",
            time: "03am"
        },
        {
            line: "|",
            time: "04am"
        },
        {
            line: "|",
            time: "05am"
        },
        {
            line: "|",
            time: "06am"
        },
        {
            line: "|",
            time: "07am"
        },
        {
            line: "|",
            time: "08am"
        },
        {
            line: "|",
            time: "09am"
        },
        {
            line: "|",
            time: "10am"
        },
        {
            line: "|",
            time: "11am"
        },
        {
            line: "|",
            time: "12am"
        },
        {
            line: "|",
            time: "01pm"
        },
        {
            line: "|",
            time: "02pm"
        },
        {
            line: "|",
            time: "03pm"
        },
        {
            line: "|",
            time: "04pm"
        },
        {
            line: "|",
            time: "05pm"
        },
        {
            line: "|",
            time: "06pm"
        },
        {
            line: "|",
            time: "07pm"
        },
        {
            line: "|",
            time: "08pm"
        },
        {
            line: "|",
            time: "09pm"
        },
        {
            line: "|",
            time: "10pm"
        },
        {
            line: "|",
            time: "11pm"
        },
        {
            line: "|",
            time: "12am"
        },
    ]

    const customicon = L.icon({
        iconUrl: "https://static.vecteezy.com/system/resources/thumbnails/001/193/877/small_2x/sport-car.png",
        iconSize: [30, 50],
    })
    L.Marker.prototype.options.icon = customicon


    return (
        <div>
            <div style={{ width: "10%", margin: "auto" }}>
                <input type="range" min='1' max='1000' value={markerSpeed} id="range" onChange={handleSpeedChange} style={{ width: "100%" }} />
            </div>
            <MapContainer center={[28.57045, 77.32162]} zoom={14} style={{ height: '85vh' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline ref={polylineRef} pathOptions={{ color: 'blue' }} positions={tryRef.current} />
                <Marker
                    position={positionref.current}
                    ref={markerRef}
                    icon={customicon}
                    rotationOrigin='center'
                />
            </MapContainer>
            <div style={{ marginTop: "20px" }}>
                {/* <ul className="pagination pagination-md justify-content-center">
                    <li className="page-item"><button className="page-link butts" onClick={() => setIsrunning(true)}>&#x23f8;</button></li>
                    <li className="page-item"><button className="page-link butts" onClick={() => setIsrunning(false)}>&#x23f9;</button></li>
                </ul> */}
                <div style={{ marginTop: "20px", }} className="slider-container">
                    {/* <div className='progress-bar-cover' style={{
                        width: `${progreswidth}%`
                    }}></div> */}
                    {/* <div className="thumb" style={{
                        left: `${Number(((filled / 86400) * 100).toFixed(2))}%`,
                        marginLeft: `${marginLeft}px`
                    }}></div> */}
                    <input type="range" min='0' max='86400' value={filled} onChange={handleChange} className="range" />
                    <div className='player'>
                        <span style={{ float: "left" }}>{starttimer}</span>
                        <div>
                            <button onClick={() => setIsrunning(true)} className='playerbuttons'>&#x23f8;</button>
                            <button onClick={() => setIsrunning(false)} className='playerbuttons'>&#x23f9;</button>
                        </div>
                        <span style={{ float: "right" }}>{endtimer}</span>
                    </div>
                </div>
                {/* <datalist id="listitems">
                    {
                        timearr.map((el, ind) => {
                            return (
                                <option key={ind} value={el.time} label={el.time}></option>
                            )
                        })
                    }
                </datalist> */}
            </div>
        </div>
    );
};




export default CloneCabTracker;





