import React, { useState } from 'react'

const ques3 = () => {
  const [mcq, setMcq] = useState(['']);

  const addDiv = () => {
    setMcq([...mcq, '']);
  };

  const removeDiv = (indexToRemove) => {
    if (mcq.length > 1) {
      const newMcq = mcq.filter((_, index) => index !== indexToRemove);
      setMcq(newMcq);
    }
  };
  const handleSubmit = async () => {
    alert("Ques3 Submitted")

    // const data = {
    //   sentence: contentEditableRef.current?.innerHTML || '',
    //   selectedWords: selected
    // };

    // try {
    //   const response = await fetch('http://localhost:5000/cloze', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    //   });

    //   if (response.ok) {
    //     console.log('Data sent successfully');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mb-12">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Question 3</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3">Question Text</label>
        <div
          className="w-full min-h-[120px] p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:content-['Type_your_question_here'] empty:before:text-gray-400"
          contentEditable
          suppressContentEditableWarning={true}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-700 mb-3">MCQ Options</h2>
        <button
          onClick={addDiv}
          className="text-blue-600 text-sm hover:text-blue-800 mb-4"
        >
          + Add Option
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mcq.map((value, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded p-4 relative"
            >
              <button
                onClick={() => removeDiv(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
              >
                ×
              </button>
               <div className="mt-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">Type your question:</label>
                <div
                  className="w-full min-h-[80px] p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:content-['Enter_your_question_text_here...'] empty:before:text-gray-400"
                  contentEditable
                  suppressContentEditableWarning={true}
                />
              </div>
              <h3 className="font-medium text-gray-700 mb-3">Option {index + 1}</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Option A"
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Option B"
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Option C"
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
             
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  );
};

export default ques3;