import { useEffect, useState } from "react"
import "./timerange.css"

const TimeRange = () => {
    const [filled, setFilled] = useState(0);
    const [marginLeft,setMarginLeft]=useState(0)
    const [isrunning, setIsrunning] = useState(false)
    const [progreswidth,setProgresswidth]=useState(0)
    useEffect(() => {
        const thumbwidth=15
        const centerthumb=(thumbwidth/100)*filled*-1
        setMarginLeft(centerthumb)
        setProgresswidth(filled)
        if (filled < 100 && isrunning) {
            setTimeout(() => setFilled(prev => prev += 1), 50)
        }
    }, [filled, isrunning])

    const handleChange = (e: any) => {
        // console.log(e.target.value)
    }

    const timearr = [
        {
            line: "|",
            time: "12:00am"
        },
        {
            line: "|",
            time: "1:00am"
        },
        {
            line: "|",
            time: "2:00am"
        },
        {
            line: "|",
            time: "3:00am"
        },
        {
            line: "|",
            time: "4:00am"
        },
        {
            line: "|",
            time: "5:00am"
        },
        {
            line: "|",
            time: "6:00am"
        },
        {
            line: "|",
            time: "7:00am"
        },
        {
            line: "|",
            time: "8:00am"
        },
        {
            line: "|",
            time: "9:00am"
        },
        {
            line: "|",
            time: "10:00am"
        },
        {
            line: "|",
            time: "11:00am"
        },
        {
            line: "|",
            time: "12:00pm"
        },
        {
            line: "|",
            time: "1:00pm"
        },
        {
            line: "|",
            time: "2:00pm"
        },
        {
            line: "|",
            time: "3:00pm"
        },
        {
            line: "|",
            time: "4:00pm"
        },
        {
            line: "|",
            time: "5:00pm"
        },
        {
            line: "|",
            time: "6:00pm"
        },
        {
            line: "|",
            time: "7:00pm"
        },
        {
            line: "|",
            time: "8:00pm"
        },
        {
            line: "|",
            time: "9:00pm"
        },
        {
            line: "|",
            time: "10:00pm"
        },
        {
            line: "|",
            time: "11:00pm"
        },
        {
            line: "|",
            time: "12:00am"
        },
    ]

    return (
        <div>
            <ul className="pagination pagination-md justify-content-center">
                <li className="page-item"><button className="page-link butts" onClick={() => setIsrunning(true)}>&#x23f8;</button></li>
                <li className="page-item"><button className="page-link butts" onClick={() => setIsrunning(false)}>&#x23f9;</button></li>
            </ul>
            <div className="progressbar">
                {/* <div style={{ height: "100%", width: `${filled}%`, backgroundColor: "blue", transition: "width 0.5s", borderRadius: "10px" }}></div> */}
                {/* <span className="progresspercent">{filled}%</span> */}
            </div>
            <div style={{ marginTop: "50px",position:"relative" }} className="slider-container">
                <div  className='progress-bar-cover' style={{
                    width:`${progreswidth}%`
                }}></div>
                <div className="thumb" style={{
                    left:`${filled}%`,
                    marginLeft:`${marginLeft}px`
                }}></div>
                <input type="range" value={filled} onChange={handleChange} className="range" />
            </div>
            <div style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "space-between", overflow: "hidden" }}>
                    {
                        timearr.map((el) => {
                            return (
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span className="timer">{el.line}</span>
                                    <span className="timer">{el.time}</span>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}
export default TimeRange