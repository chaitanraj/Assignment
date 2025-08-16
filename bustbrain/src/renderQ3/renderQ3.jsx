import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RenderQ3 = () => {
  const [data, setData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://formbuilder-ztjx.onrender.com/comprehension')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async () => {
    try {
      await fetch('https://formbuilder-ztjx.onrender.com/responseQ3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedAnswers }),
      });
      alert('Submitted!');
    } catch (error) {
      alert('Error!');
    } finally {
      navigate("/thankYou");
    }
  };

  // Enhanced loading check - ensure data exists AND has questions array
  if (!data || !data.questions || !Array.isArray(data.questions)) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className='bg-gradient-to-br from-amber-100 to-orange-100'>
      <div className="min-h-screen py-8">
        <h2 className="text-2xl font-bold mb-12 text-center">Question 3</h2>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border p-8">

          {/* Passage Section */}
          <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r">
            <p className="text-gray-800 leading-relaxed text-justify">
              {data.passage}
            </p>
          </div>

          {/* Questions */}
          {data.questions.map((question, index) => (
            <div key={index} className="mb-8 border-b border-gray-100 pb-6 last:border-b-0">
              <h4 className="mb-4 text-gray-600 font-medium">
                Question {index + 1}.1
              </h4>
              <p className="mb-4 font-medium text-gray-800">
                {question.questionText}
              </p>

              <div className="space-y-2">
                {/* Add safety check for options array too */}
                {question.options && Array.isArray(question.options) && question.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className={`flex items-center p-3 border rounded cursor-pointer transition-colors hover:bg-gray-50 ${selectedAnswers[index] === option
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200'
                      }`}
                    onClick={() => setSelectedAnswers(prev => ({ ...prev, [index]: option }))}
                  >
                    <input
                      type="radio"
                      name={`question_${index}`}
                      value={option}
                      checked={selectedAnswers[index] === option}
                      onChange={() => setSelectedAnswers(prev => ({ ...prev, [index]: option }))}
                      className="mr-3 text-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button 
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors" 
              onClick={handleSubmit}
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderQ3;