import {combineReducers, configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../reducers/AuthReducer';
import TodoReducer from '../reducers/TodoReducer';




const store = configureStore({
    reducer: {
        auth:AuthReducer,
        todos:TodoReducer
    }
      
     
})

export default store;



