import { combineReducers , configureStore } from '@reduxjs/toolkit';
import questionReducer  from './questionReducer';
import  resultReducer from './resultReducer';

// called reducer
const rootReducer = combineReducers({
    question : questionReducer,
    result : resultReducer
})

// create store with reducer

export default configureStore({ reducer : rootReducer })