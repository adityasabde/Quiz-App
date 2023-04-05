import React, { useEffect, useState } from "react";
import Question from "./Question";
import { moveNextQuestion, movePrevQuestion } from "../hooks/FetchQuestion";

import { PushAnswer } from "../hooks/setResult";

import { Navigate } from "react-router-dom";
// redux store importing

import { useSelector, useDispatch } from "react-redux";
import { pushResultAction } from "../redux/resultReducer";

export default function Quiz() {
  const [check, setChecked] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const trace = useSelector((state) => state.question.trace);
  const questions = useSelector((state) => state.question.queue);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(result);
  });

  function onNext() {
    // update trace  value by 1 with move next value
    if (trace < questions.length) {
      dispatch(moveNextQuestion());


      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }

    setChecked(undefined);
  }

  function onPrev() {
    if (trace > 0) {
      dispatch(movePrevQuestion());
    }
  }

  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }

  // finish exam after last ques
  if (result.length && result.length >= questions.length) {
    return <Navigate to={"/result"} replace="true"></Navigate>;
  }

  return (
    <div className="container">
      <h1 className="title text-light"> Quiz Application </h1>

      <Question onChecked={onChecked} />

      <div className="grid">
        
        {
          trace > 0 ?   <button className="btn prev" onClick={onPrev}>
          {" "}
          prev{" "}
        </button> : <div></div> 
        }
        <button className="btn next" onClick={onNext}>
          {" "}
          Next{" "}
        </button>
      </div>
    </div>
  );
}
