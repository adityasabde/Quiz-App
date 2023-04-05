
import { postServerData } from '../Helper/helper'
import { pushResultAction ,updateResultAction} from '../redux/resultReducer'
// import * as Action from '../redux/resultReducer;'

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}

export const updateResult = (index) => async(dispatch)=>{
    try{
        dispatch(updateResultAction(index))
    }
    catch(error){
        console.log(error);
    }
}


// insert user data 

export const userPublishResult = (resultData)=>{
    const { result , username} = resultData;

    (
        async () =>{
            try{
                if(result  != [] && !username){
                    throw new Error("coudn't get result");
                }

                await postServerData('http://localhost:8080/api/result' , resultData , data=>data);
            }
            catch(error){
                console.log(error);
            }
        }
    )();
    
}