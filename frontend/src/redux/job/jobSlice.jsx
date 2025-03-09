import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:'job',
    initialState:{
        allJobs:[],
        job:null,
        searchQuery:"",
        allAppliedJobs:[],
        adminJobs:[],
        searchJobs:""
    
    },
    reducers:{
        setAllJobs:(state, action) => {
            state.allJobs = action.payload
        },
        setJob:(state, action) => {
            state.job = action.payload;
            
        },
        setSearchQuery:(state,action) => {
            state.searchQuery = action.payload
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload
         
        },
        setAdminJobs:(state,action) => {
            state.adminJobs = action.payload
         
        },
        setSearchJobs:(state,action) => {
            state.searchJobs = action.payload
         
        }
    }
})

export const {setAllJobs, setJob, setSearchQuery,setAllAppliedJobs,setSearchJobs,setAdminJobs} = jobSlice.actions;

export default jobSlice.reducer;