import React, { useState } from 'react'
import "./ques3.css"

const ques3 = () => {
  const [mcq, setMcq] = useState(['']);

  const addDiv = () => {
    setMcq([...mcq, '']);
  }

  return (
    <>
      <h1>Question 3</h1>
      <div className="question" contentEditable placeholder="Type your question here">
        <button onClick={() => { addDiv() }}> Add Div</button>
        <div className='flex flex-row'>
          {mcq.map((value, index) => {
            return (
              <div className="mcq ml-10 mt-40 cursor-pointer" key={index}>
                <h1>MCQ DIV</h1>
                <ul className='text-black list-disc'>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ques3
