import React, { useState } from 'react'

const ques3 = () => {
  const [passage, setPassage] = useState('');
  const [mcq, setMcq] = useState([{
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  }]);

  const addDiv = () => {
    setMcq([...mcq, {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]);
  };

  const removeDiv = (indexToRemove) => {
    if (mcq.length > 1) {
      const newMcq = mcq.filter((_, index) => index !== indexToRemove);
      setMcq(newMcq);
    }
  };

  const updateQuestion = (index, questionText) => {
    const newMcq = [...mcq];
    newMcq[index].questionText = questionText;
    setMcq(newMcq);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newMcq = [...mcq];
    newMcq[questionIndex].options[optionIndex] = value;
    setMcq(newMcq);
  };

  const updateCorrectAnswer = (questionIndex, optionIndex) => {
    const newMcq = [...mcq];
    newMcq[questionIndex].correctAnswer = optionIndex;
    setMcq(newMcq);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        passage,
        questions: mcq.map(q => ({
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer
        }))
      };
      
      console.log('Sending data:', data);
      
      const res = await fetch('http://localhost:5000/comprehension', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      alert(res.ok ? "Saved!" : "Failed!");
    } catch (error) {
      console.error('Error:', error);
      alert("Error!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mb-12">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Question 3</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3">Question Text</label>
        <textarea
          className="w-full min-h-[120px] p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your question here"
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
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
          {mcq.map((question, index) => (
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
                <textarea
                  className="w-full min-h-[80px] p-3 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your question text here..."
                  value={question.questionText}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                />
              </div>
              <h3 className="font-medium text-gray-700 mb-3">Option {index + 1}</h3>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${index}`}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => updateCorrectAnswer(index, optionIndex)}
                      className="w-3 h-3"
                    />
                    <input
                      type="text"
                      placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                      className="flex-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={option}
                      onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save
      </button>
    </div>
  );
};

export default ques3;