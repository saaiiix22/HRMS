import { useEffect } from "react";
import { specificUserInfo } from "../api/ApiCall";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getData = createAsyncThunk('user/getData',async () => {
    try {
        const token = localStorage.getItem('token')
        const res = await specificUserInfo(token)       
        return res.data
    } catch (error) {
        console.log(error);
    }
})
export default getData