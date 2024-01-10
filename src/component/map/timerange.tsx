import { useEffect, useState } from "react"
import "./timerange.css"

const TimeRange = () => {
    const [filled, setFilled] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0)
    const [isrunning, setIsrunning] = useState(false)
    const [progreswidth, setProgresswidth] = useState(0)
    useEffect(() => {
        const thumbwidth = 15
        const centerthumb = (thumbwidth / 100) * filled * -1
        // const percent=((filled/86400)*100).toFixed(2)
        setMarginLeft(centerthumb)
        setProgresswidth(filled)
        let timer: any;
        if (filled < 86400 && isrunning) {
            timer = setTimeout(() => setFilled(prev => prev += 1), 50)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [filled, isrunning])

    const handleChange = (e: any) => {
        setFilled(Number(e.target.value))
        console.log(e.target.value)
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
            <div style={{ marginTop: "50px", position: "relative" }} className="slider-container">
                <div className='progress-bar-cover' style={{
                    width: `${progreswidth}%`
                }}></div>
                <div className="thumb" style={{
                    left: `${filled}%`,
                    marginLeft: `${marginLeft}px`
                }}></div>
                <input type="range" value={filled} onChange={handleChange} className="range" list="try" />
            </div>
            <datalist id="try">
                {
                    timearr.map((el) => {
                        return (
                            <option value={el.time} label={el.time}></option>
                        )
                    })
                }
            </datalist>
            {/* <div style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "space-between", overflow: "hidden" }}>
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
            </div> */}
        </div>
    )
}
export default TimeRange