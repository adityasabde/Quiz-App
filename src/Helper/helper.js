import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';


export function attempts_Number(result){
    return result.filter(r =>  r !== undefined).length; 
}


export function earnPoints_Number (result , answer , points){
    return result.map((element , i) => answer[i] === element
    ).filter(i => i).map(i => points).reduce((prev , curr) => prev + curr  , 0);
}


export function flagResult(totalpoints , earnpoints){
    return (totalpoints * 50 / 100 ) < earnpoints;
}


/** check user auth  */
export function CheckUserExist({ children }){

    const auth = useSelector(state => state.result.userId)
    
    console.log(auth)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

// get server data 

export async function getServerData(url , callback){
    const data  = await  (await axios.get(url))?.data;
    console.log(data);
    return callback ? callback(data) : data;
}


export async function postServerData(url , result  ,callback){
    const data  = await  (await axios.post(url , result))?.data;
    console.log(data);
    return callback ? callback(data) : data;
}




getServerData('http://localhost:8080/api/questions');