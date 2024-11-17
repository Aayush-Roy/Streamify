import { configureStore } from "@reduxjs/toolkit";
import Appreducer from "./reducers/appreducer";
const store = configureStore({
    reducer:{
        app:Appreducer,
    }
})

export default store;;