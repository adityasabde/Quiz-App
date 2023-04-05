import React, { useEffect, useState } from "react";
import data from "../database/data";

import { useFetchQuestion } from "../hooks/FetchQuestion";

import { useDispatch, useSelector } from "react-redux";

import { updateResult } from "../hooks/setResult";




export default function Question({onChecked}) {
  // useEffect(()=>{
  //     // console.log(data);
  // })
  const [checked, setchecked] = useState(undefined);

  const [{ isLoading, apiData, serverError }] = useFetchQuestion();

  const state = useSelector((state) => state);

  const questions = useSelector(
    (state) => state.question.queue[state.question.trace]
  );
  const result = useSelector((state) => state.result.result);
  
  const trace = useSelector((state) => state.question.trace);

  const dispatch = useDispatch();


  
  
  
  useEffect(() => {

    console.log(state)

    dispatch(updateResult({trace , checked}))
  } , [checked]); 




  function onSelect(i) {
    onChecked(i);
    setchecked(i)
    dispatch(updateResult({trace , checked}))
  }

  if (isLoading) return <h3 className="text-light"> isLoading </h3>;

  if (serverError)
    return <h3 className="text-light"> serverError || "unknown error " </h3>;

  return (
    <div className="questions">
      <h1 className=" text-light"> {questions?.question} </h1>

      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />

            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>

            <div className= {`check ${ result[trace] == i ? 'checked' : ''}`}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
