import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { GripVertical } from 'lucide-react';

const ques2 = () => {
  const [selected, setSelected] = useState([]);
  const [sentence, setSentence] = useState('');
  const dragFrom = useRef(null);
  const dragTo = useRef(null);
  const contentEditableRef = useRef(null);

  const handleUnderline = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      document.execCommand("underline");
      setSelected(prev => [...prev, selection.toString()]);
    }
  };

  const handleDragStart = (index) => {
    dragFrom.current = index;
  };

  const handleDragEnter = (index) => {
    dragTo.current = index;
  };

  const handleDragEnd = () => {
    const from = dragFrom.current;
    const to = dragTo.current;
    if (from === null || to === null || from === to) return;
    const updated = [...selected];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setSelected(updated);
    dragFrom.current = null;
    dragTo.current = null;
  };

   const handleSubmit = async () => {
        alert("Ques2 Submitted")

        const data = {
            sentence: contentEditableRef.current?.innerHTML || '',
            selectedWords: selected
        };

        try {
            const response = await fetch('http://localhost:5000/cloze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Data sent successfully');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div className="p-6 max-w-4xl mx-auto mb-12 border-b border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Question 2</h1>
      
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Sentence <span className="text-red-500">*</span>
        </label>
        
        <div
          contentEditable
          ref={contentEditableRef}
          className="w-full min-h-[120px] p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:content-['Enter_your_sentence_here_and_underline_words_to_create_blanks...'] empty:before:text-gray-400"
          onMouseUp={handleUnderline}
          onInput={(e) => setSentence(e.target.innerHTML)}
          suppressContentEditableWarning={true}
        >
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Selected Words:</h2>
        <div className="space-y-3">
          {selected.length === 0 ? (
            <p className="text-gray-500 text-sm">No words selected yet. Underline words in the sentence above.</p>
          ) : (
            selected.map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded cursor-move hover:bg-gray-50"
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                <GripVertical className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={word} 
                  readOnly
                  className="flex-1 p-2 border border-gray-200 rounded bg-gray-50 text-gray-700 focus:outline-none"
                />
                <button 
                  onClick={() => setSelected(prev => prev.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700 px-2"
                >
                  ×
                </button>
              </div>
            ))
          )}
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

export default ques2;