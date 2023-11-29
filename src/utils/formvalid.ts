

export const formvalid=(err:any)=>{
    if(Object.keys(err).length>0){
        return true
    }
    return false
}