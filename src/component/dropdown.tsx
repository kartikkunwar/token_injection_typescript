


export const Dropdown=(props:any)=>{
    return(
        <div className="dropdown">
            <select onChange={props.onChange}>
                <option value={'en'}>English</option>
                <option value={'hin'}>Hindi</option>
                <option value={'chi'}>Chinese</option>
            </select>
        </div>
    )
}