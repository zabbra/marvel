import React from "react";
import { Fragment } from "react";


const ProgressBar = ({idQuestion,maxQuestions}) => {

    const getWidth = (totalQusetions , questionId) => {
        return(
            100 / totalQusetions
        )*questionId
    }

    //console.log(idQuestion,maxQuestions)
    const actualQuestion = idQuestion + 1

    const progressPercent = getWidth(maxQuestions,actualQuestion)
    //console.log(progressPercent)

    return (
        <Fragment>
            <div className='percentage'>
                <div className='progressPercent'>{`Question:${actualQuestion}/${maxQuestions}`}</div>
                <div className='progressPercent'>{`Progression : ${progressPercent}%`}</div>
            </div>
            <div className='progressBar'>
                <div className='progressBarChange' style={{width:`${progressPercent}%`}}></div>
            </div>
        </Fragment>
    )
   
}
export default React.memo(ProgressBar)