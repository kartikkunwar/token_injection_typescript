import  { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-rotatedmarker";
import "./cabservice.css"


interface DataProp{
    sampleData:any;
}

const init = {
    lat: 0,
    lng: 0,
}
const CabTracker= ({sampleData}:DataProp) => {
    const [markerSpeed, setMarkerSpeed] = useState(500);
    const [filled, setFilled] = useState(0);
    // const [marginLeft, setMarginLeft] = useState(0)
    const [isrunning, setIsrunning] = useState(false)
    // const [progreswidth, setProgresswidth] = useState(0)
    const [starttimer, setStarttimer] = useState("00:00:00")
    const [endtimer, setEndtimer] = useState("24:00:00")
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

    //resetting data on data change
    useEffect(()=>{
        tryRef.current=[]
        setFilled(0)
    },[sampleData])


    //mapping route covered by the cab
    useEffect(() => {
        // const thumbwidth = 15
        // const percent = Number(((filled / 86400) * 100).toFixed(2))
        // const centerthumb = (thumbwidth / 100) * percent * -1
        // setMarginLeft(centerthumb)
        // setProgresswidth(percent)
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
    }, [sampleData,filled, isrunning, markerSpeed])

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

    //icon used for marker
    const customicon = L.icon({
        iconUrl: "https://static.vecteezy.com/system/resources/thumbnails/001/193/877/small_2x/sport-car.png",
        iconSize: [30, 50],
    })
    L.Marker.prototype.options.icon = customicon


    return (
        <>
            <input type="range" min='1' max='1000' value={markerSpeed} id="range" onChange={handleSpeedChange} style={{ minWidth: "7%",float:"right" }} />
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
        </>
    );
};




export default CabTracker;





