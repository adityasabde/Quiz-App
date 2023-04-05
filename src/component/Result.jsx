import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "../style/Result.css"
import ResulTable from './ResulTable'

import { resetAllAction } from '../redux/questionReducer'
import {resetReultAction} from '../redux/resultReducer';

import { attempts_Number , earnPoints_Number , flagResult } from '../Helper/helper'
import { userPublishResult } from '../hooks/setResult'

export default function Result() {

  const dispatch = useDispatch();

 const { question : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

 const totalPoints = queue.length * 10; 
 const attempts = attempts_Number(result);
 const earnPoints = earnPoints_Number(result, answers , 10)
 const flag = flagResult(totalPoints, earnPoints)

 
// store user result 
userPublishResult({result , username : userId , attempts , points : earnPoints ,achived: flag ? "passed" : "Failed" })


// console.log();

  function onRestart(){
    console.log("restart function")
    dispatch(resetAllAction);
    dispatch(resetReultAction);
    
}

  return (
    <div className='container'>
      <h1 className='title text-light'> Result  </h1>

      <div className='result flex-conter'>
        <div className='flex'>
            <span > Username</span>
            <span className='bold'>Daily Tution</span>
        </div>

        <div className='flex'>
            <span > Total quiz points </span>
            <span className='bold'>{totalPoints}</span>
        </div>

        <div className='flex'>
            <span > Total Questions </span>
            <span className='bold'>{queue.length}</span>
        </div>

        <div className='flex'>
            <span > Total Attempts </span>
            <span className='bold'>{attempts}</span>
        </div>

        <div className='flex'>
            <span > Total Earn points </span>
            <span className='bold'>{earnPoints}</span>
        </div>
        <div className='flex'>
            <span > Quiz Result </span>
            <span style ={{ color : ` ${flag ? "#2aff95" : "#ff2a66"}`}}className='bold'>{ flag ? 'passed' : 'Failed'} </span>
        </div>
      </div>


      <div className='start'>
        <Link className='btn' to={'/'} onClick={onRestart}> Restart </Link>
      </div>

      <div className='container'>
            <ResulTable />
      </div>
    </div>
  )
}
