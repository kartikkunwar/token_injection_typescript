import { createAsyncThunk ,createSlice,PayloadAction} from "@reduxjs/toolkit"
import { axiosInstance } from "../../../service/axiosinstance"
import axios from "axios"

interface IInitialState{
    product:any[]
    singleproduct:any[]
    token:any
    isLoading:boolean
    isError:boolean
    logged:boolean
}

const initialState:IInitialState = {
    product: [],
    singleproduct: [],
    token: "",
    isLoading: false,
    isError: false,
    logged: false
}

export const getProduct=createAsyncThunk(
    "getitem",
    async(_,ThunkAPI)=>{
        try{
            const res=await axiosInstance.get("products")
            return res.data
        }catch(err){
            return ThunkAPI.rejectWithValue("something went wrong")
        }
    }
)

export const confirmmail=createAsyncThunk(
    "confirm",
    async(data:any,ThunkAPI)=>{
        try{
            const res=await axios.post("http://localhost:8000/mail",data)
            return res.data
        }catch(err){
            console.log(err)
        }
    }
)

export const edituserinfo=createAsyncThunk(
    "changepass",
    async(data:any,ThunkAPI)=>{
        try{
            const res=await axios.patch("http://localhost:8000/edituser",data)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
)

export const createuser=createAsyncThunk(
    "add user",
    async(data:any,ThunkAPI)=>{
        try{
            const res=await axios.post("http://localhost:8000/signup",data)
            return res.data
        }catch(err){
            console.log(err)
        }
    }
)

export const getLoginToken=createAsyncThunk(
    "gettoken",
    async (login:any,ThunkAPI)=>{
        try{
            const res=await axios.post("http://localhost:8000/login",login) 
            localStorage.setItem("usertoken",JSON.stringify(res.data.token))
            return res.data.token
        }catch(err){
            return ThunkAPI.rejectWithValue("something went wrong")
        }
    }
)

export const getSingleProduct=createAsyncThunk(
    "getSingle",
    async(id:string|undefined,ThunkAPI)=>{
        try{
            const res=await axiosInstance.get(`products/${id}`)
            return res.data
        }catch(err){
            return ThunkAPI.rejectWithValue("something went wrong")
        }
    }
)

const productslice=createSlice({
    name: "product",
    initialState,
    reducers:{

    },
    extraReducers: (build) => {
        build.addCase(getProduct.pending, (state) => {
            state.isLoading=true
        })
        build.addCase(getProduct.fulfilled,(state,action:PayloadAction<[]>)=>{
            state.isLoading=false;
            state.product=action.payload;

        })
        build.addCase(getProduct.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
        })
        build.addCase(getLoginToken.pending,(state)=>{
            state.isLoading=true
        })
        build.addCase(getLoginToken.fulfilled,(state,action:PayloadAction<string>)=>{
            state.isLoading=false;
            state.token=action.payload;
            state.logged=true;
        })
        build.addCase(getLoginToken.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true
        })
        build.addCase(getSingleProduct.pending,(state)=>{
            state.isLoading=true
        })
        build.addCase(getSingleProduct.fulfilled,(state,action:PayloadAction<[]>)=>{
            state.isLoading=false;
            state.singleproduct=[action.payload];
        })
    },

})

export default productslice.reducer
