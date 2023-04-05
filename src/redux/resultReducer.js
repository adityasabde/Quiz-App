import { createSlice  } from "@reduxjs/toolkit"
import { moveNextQuestion } from "../hooks/FetchQuestion";

export const resultReducer = createSlice({
     name : 'result',
     initialState :{
        userId : null,
        result :[]
     },
     reducers :{
        setUserId : (state , action ) =>{
            state.userId = action.payload
        }
        ,
        pushResultAction : (state , Action) =>{
         state.result.push(Action.payload);
        },
        resetReultAction :()=>{
         return {
            userId : null,
            result :[]
         }
        },
        updateResultAction :(state , action)=>{
           const  { trace , checked } = action.payload;
          state.result.fill(checked , trace , trace +1);
         }
     }
})

export const { setUserId , pushResultAction ,resetReultAction  , updateResultAction } = resultReducer.actions;

export default resultReducer.reducer;