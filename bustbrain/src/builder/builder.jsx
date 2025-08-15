import React from 'react'
import Ques2 from "../ques2/ques2"
import Ques3 from "../ques3/ques3";
import Ques1 from "../ques1/ques1"

const builder = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <Ques1 />
        <Ques2 />
        <Ques3 />
      </div>
    </div>
  );
};

export default builder;