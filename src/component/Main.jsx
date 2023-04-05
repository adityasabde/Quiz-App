import React , {useRef} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserId } from '../redux/resultReducer';
import '../style/Main.css'
export default function Main() {
  const inputref = useRef(null);
  const dispatch = useDispatch();

  function startQuiz(){
    if(inputref.current?.value){
      // console.log(inputref.current.value)
        dispatch(setUserId(inputref.current?.value))
    }
}
  
    return (
    <div className='container'> 
        <h1 className='title text-light'> Quiz Application</h1>

        <ol>
            <li> You will ask 10 question one after another</li>
            <li> You will ask 10 question one after another</li>
            <li> You will ask 10 question one after another</li>
            <li> You will ask 10 question one after another</li>
            <li> You will ask 10 question one after another</li>
            <li> You will ask 10 question one after another</li>
        </ol>

        <form id='form'> 
            <input className="userid" ref={inputref} type='text' placeholder='Username'/>
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}> Start Quiz</Link>
        </div>
    </div>
  )
}
