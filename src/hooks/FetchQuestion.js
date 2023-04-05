// fetch question hook to fetch  api dataand set value

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data , {answers } from "../database/data";
import { getServerData } from "../Helper/helper";

import * as Action from '../redux/questionReducer'

export const useFetchQuestion = ()=>{
    
    
    const dispatch = useDispatch()
    const [getData , setGetData ] = useState ({ isloading : false , apiData : [], server : null})

    useEffect(() =>{
        setGetData(prev => ({...prev, isLoading : true}));


        ( async () => {
            try{
                // let question = await data;
                
                const [{ answers , questions }] = await getServerData('http://localhost:8080/api/questions' , (data)=>data);
                
                console.log({ answers , questions });

                if(questions.length > 0){
                    setGetData (prev =>({...prev , isLoading : false}));

                    setGetData (prev =>({...prev , apiData :   questions }));


                      /** dispatch an action */
                      dispatch(Action.startExamAction({ question : questions, answers }))

                }
                else{
                    throw new  Error("No question Available");
                }
            }
            catch(error){
                setGetData (prev =>({...prev , isLoading : false}));

                setGetData (prev =>({...prev , serverError : error}));
            }
        } ) ();

    } , [dispatch])

    // async function fetch backend data
    return [getData , setGetData];

}


export const moveNextQuestion =()=>async  (dispatch) =>{ 
    try{
        dispatch(Action.moveNextAction())
    }
    catch(error){
        console.log("eeroro aala ");
    }
}


export const movePrevQuestion =()=>async  (dispatch) =>{ 
    try{
        dispatch(Action.movePrevAction())
    }
    catch(error){
        console.log("eeroro aala ");
    }
}