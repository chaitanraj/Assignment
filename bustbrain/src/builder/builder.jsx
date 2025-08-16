import React from 'react'
import Ques2 from "../ques2/ques2"
import Ques3 from "../ques3/ques3";
import Ques1 from "../ques1/ques1"

const builder = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <div className="py-8"> */}
        <Ques1 />
        <Ques2 />
        <Ques3 />
      {/* </div> */}
      <div className="flex justify-center mb-12">
        <button
          // onClick={handleSubmit}
          className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Form.
        </button>
      </div>
    </div>
  );
};

export default builder;