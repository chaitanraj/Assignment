import React from 'react'
import Ques2 from "../ques2/ques2"
import Ques3 from "../ques3/ques3";
import Ques1 from "../ques1/ques1"
import { useNavigate } from 'react-router-dom';

const builder = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-100">
      <h2 className="text-3xl underline font-bold mb-5 text-center">Form Builder</h2>
        <Ques1 />
        <Ques2 />
        <Ques3 />
      <div className="flex justify-center mb-12">
        <button
          onClick={()=>navigate("/render")}
          className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Form.
        </button>
      </div>
    </div>
  );
};

export default builder;