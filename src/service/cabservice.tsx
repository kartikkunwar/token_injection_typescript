import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-rotatedmarker";
import "./cabservice.css"


interface DataProp {
    sampleData: any;
    name: string
}

const init = {
    lat: 0,
    lng: 0,
}
const CabTracker = ({ sampleData, name }: DataProp) => {
    const [markerSpeed, setMarkerSpeed] = useState(500);
    const [filled, setFilled] = useState(0);
    const [isrunning, setIsrunning] = useState(false)
    const [covered, setCovered] = useState(0)
    const [starttimer, setStarttimer] = useState("00:00:00")
    const [marginLeft, setMarginLeft] = useState(0)
    const [progreswidth, setProgresswidth] = useState(0)
    const positionref = useRef(init)
    const currentIndex = useRef<number>(0);
    const polylineRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const tryRef = useRef<any>([]);

    //handling speed of marker
    const handleSpeedChange = (event: any) => {
        var val = event.target.value
        if (val < 0) {
            val = val * -1
        }
        setMarkerSpeed(parseInt(val, 10));
    };

    //converting timestamp to seconds
    const convertime = (hms: any) => {
        const [hours, minutes, seconds] = hms.split(':');
        const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
        return totalSeconds
    }

    //converting seconds to HHMMSS
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

    //calculating distance travelled 
    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Earth radius in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    };


    //mapping route covered by the cab
    useEffect(() => {
        const thumbwidth = 15
        const percent = Number(((filled / 86400) * 100).toFixed(2))
        const centerthumb = (thumbwidth / 100) * percent * -1
        setMarginLeft(centerthumb)
        setProgresswidth(percent)
        setStarttimer(toHHMMSS(filled))
        let timerRun: any;
        if (filled < 86400 && isrunning) {
            timerRun = setInterval(() => {
                sampleData.forEach((el: any, ind: number, arr: any) => {
                    if (filled === convertime(el.timestamp)) {
                        if (ind < sampleData.length - 1) {
                            var { lat: lat1, lng: lon1 } = arr[ind];
                            var { lat: lat2, lng: lon2 } = arr[ind + 1];
                            setCovered(covered + haversineDistance(lat1, lon1, lat2, lon2));
                        }
                        tryRef.current.push(el)
                        positionref.current = el
                        if (polylineRef.current) {
                            // Update the polyline with the new position
                            polylineRef.current.addLatLng(el)
                        }
                        if (markerRef.current) {
                            // update vehicle direction
                            markerRef.current.setRotationAngle(el.heading)
                        }
                    }
                })
                setFilled(prev => prev += 1)
            }, markerSpeed || 1000)
        } else {
            clearInterval(timerRun)
        }

        return () => {
            clearInterval(timerRun)
        }
    }, [sampleData, filled, isrunning, markerSpeed])

    //getting seconds value from slider
    const handleChange = (e: any) => {
        var currentdistance = 0;
        setFilled(Number(e.target.value))
        currentIndex.current = Number(e.target.value)
        tryRef.current = []
        for (let i = 0; i < sampleData.length; i++) {
            if (i < sampleData.length - 1) {
                var { lat: lat1, lng: lon1 } = sampleData[i];
                var { lat: lat2, lng: lon2 } = sampleData[i + 1];
            }
            if (currentIndex.current > convertime(sampleData[i].timestamp)) {
                currentdistance += haversineDistance(lat1, lon1, lat2, lon2);
                setCovered(currentdistance)
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
            } else if (currentIndex.current === 0) {
                setCovered(0)
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

    const timearrsmaller = [
        {
            line: "|",
            time: "12pm"
        },
        {
            line: "|",
            time: "02am"
        },
        {
            line: "|",
            time: "04am"
        },
        {
            line: "|",
            time: "06am"
        },
        {
            line: "|",
            time: "08am"
        },
        {
            line: "|",
            time: "10am"
        },
        {
            line: "|",
            time: "12am"
        },
        {
            line: "|",
            time: "02pm"
        },
        {
            line: "|",
            time: "04pm"
        },
        {
            line: "|",
            time: "06pm"
        },
        {
            line: "|",
            time: "08pm"
        },
        {
            line: "|",
            time: "10pm"
        },
        {
            line: "|",
            time: "12am"
        },
    ]


    //icon used for marker
    const customicon = L.icon({
        iconUrl: "https://static.vecteezy.com/system/resources/thumbnails/001/193/877/small_2x/sport-car.png",
        iconSize: [30, 50],
    })
    L.Marker.prototype.options.icon = customicon

    return (
        <>
            <span style={{marginLeft:"10%"}}><input type="date" /></span>
            <span><img src="https://p7.hiclipart.com/preview/208/807/684/snail-mail-innovation-clip-art-snails.jpg" alt="runner" className='runner' /></span>
            <input type="range" min='1' max='1000' value={markerSpeed} id="range" onChange={handleSpeedChange} style={{ minWidth: "7%", float: "right" }} className='speed' />
            <span><img src="https://cdn-icons-png.flaticon.com/512/55/55240.png" alt="runner" className='runner' /></span>
            <div className='player'>
                <div>
                    <button onClick={() => setIsrunning(true)} className='playerbuttons'>&#x23f8;</button>
                    <button onClick={() => setIsrunning(false)} className='playerbuttons'>&#x23f9;</button>
                </div>
            </div>
            <MapContainer center={[28.57045, 77.32162]} zoom={14} style={{ height: '83vh',zIndex:"1" }}>
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
                    eventHandlers={{
                        mouseover: (event) => event.target.openPopup(),
                    }}
                >
                    <Popup className='popup'>
                        <div>
                            <div className='popupcontent'>
                                <span>Number</span><span>UP16BV8110</span>
                            </div>
                            <div className='popupcontent'>
                                <span>Speed</span><span>{`86 km/hr`}</span>
                            </div>
                            <div className='popupcontent'>
                                <span>Date</span><span>{`${starttimer}`}</span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
            <div >
                <div style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "space-evenly" }}>
                    <span className='cabdata'>{`Vehicle Number - UP16BV8110`}</span>
                    <span className='cabdata'>{`Showing for- ${name}`}</span>
                    <span className='cabdata'>{`Distance travelled: ${covered.toFixed(2)} km`}</span>
                    <div>
                        <button onClick={() => setIsrunning(true)} className='playerbuttons'>&#x23f8;</button>
                        <button onClick={() => setIsrunning(false)} className='playerbuttons'>&#x23f9;</button>
                    </div>
                </div>
                <div className="slider-container">
                    <div className='progress-bar-cover' style={{
                        width: `${progreswidth}%`
                    }}></div>
                    <div className="thumb" style={{
                        left: `${Number(((filled / 86400) * 100).toFixed(2))}%`,
                        marginLeft: `${marginLeft}px`
                    }}></div>
                    <span className='timer' style={{
                        left: `${Number(((filled / 86400) * 100 - 1).toFixed(2))}%`,
                        marginLeft: `${marginLeft}px`
                    }}>{starttimer}</span>
                    <input type="range" min='0' max='86400' value={filled} onChange={handleChange} className="range" list='listitems' />
                    <datalist id="listitems">
                        {
                            timearr.map((el, ind) => {
                                return (
                                    <option key={ind} value={el.time} label={el.time} className='tick'></option>
                                )
                            })
                        }
                    </datalist>
                </div>
            </div>
            <div className='sidebar'>
                <div>
                    <button className='tab'>{`Vehicles(22)`}</button>
                    <button className='tab'>{`Assets(5)`}</button>
                    <button className='tab'>&#x23f4;</button>
                </div>
                <div>
                    <input type="text" placeholder='search vehicle here'/>
                </div>
                <div>
                    
                </div>
            </div>
        </>
    );
};




export default CabTracker;





