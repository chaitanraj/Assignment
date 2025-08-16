import React from 'react'
import { useEffect, useState } from 'react'

const RenderQ2 = () => {
  const [sentence, setSentence] = useState("");
  const [words, setWords] = useState(['']);
  const [droppedWords, setDroppedWords] = useState({}); // Track which words are dropped where

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://formbuilder-ztjx.onrender.com/cloze`, {
        method: "GET",
      })
      const data = await res.json();
      const finalSentence = data.sentence.replace(/<u>.*?<\/u>/g, '_____');
      if (res.ok) {
        console.log("Sentence fetched");
        setSentence(finalSentence);
        setWords(data.words);
      }
      else {
        console.log("Frontend Error for GET route");
      }
    }
    fetchData();
  }, [])

  // Handle drag start
  const handleDragStart = (e, word) => {
    e.dataTransfer.setData('text/plain', word);
  };

  // Handle drop
  const handleDrop = (e, blankIndex) => {
    e.preventDefault();
    const draggedWord = e.dataTransfer.getData('text/plain');
    setDroppedWords(prev => ({
      ...prev,
      [blankIndex]: draggedWord
    }));
  };

  // Allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Render sentence with drop zones
  const renderSentenceWithDropZones = () => {
    const parts = sentence.split('_____');
    const result = [];

    for (let i = 0; i < parts.length; i++) {
      result.push(<span key={`text-${i}`}>{parts[i]}</span>);
      if (i < parts.length - 1) {
        result.push(
          <span
            key={`dropzone-${i}`}
            onDrop={(e) => handleDrop(e, i)}
            onDragOver={handleDragOver}
            className={`inline-block min-w-[80px] h-[30px] mx-[5px] px-[10px] py-[5px] border-2 border-dashed border-gray-300 rounded text-center leading-5 ${droppedWords[i] ? 'bg-green-50' : 'bg-gray-50'}`}>
            {droppedWords[i] || ''}
          </span>
        );
      }
    }

    return result;
  };
  const handleSubmit = async () => {
    let finalSentence = sentence;
    const parts = sentence.split('_____');

    for (let i = 0; i < parts.length - 1; i++) {
      const word = droppedWords[i] || '_____';
      finalSentence = finalSentence.replace('_____', word);
    }

    try {
      await fetch('https://formbuilder-ztjx.onrender.com/responseQ2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: finalSentence }),
      });
      alert('Submitted!');
    } catch (error) {
      alert('Error!');
    }
  };


  return (
    <div className='bg-gradient-to-br from-amber-100 to-orange-100'>
      <div className="p-5 font-sans">
        <h2 className="text-2xl font-semibold mb-12 text-center">Question 2</h2>

        {/* Draggable word bubbles */}
        <div className="mb-5 flex justify-center flex-wrap">
          {words
            .filter(word => !Object.values(droppedWords).includes(word))
            .map((word, index) => (
              <span
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, word)}
                className="inline-block bg-purple-500 text-white px-4 py-2 m-[5px] rounded-full text-sm font-medium cursor-grab select-none"
              >
                {word}
              </span>
            ))}
        </div>

        {/* Sentence with drop zones */}
        <div className="text-base leading-6 text-gray-700 mt-5 text-center flex justify-center">
          {renderSentenceWithDropZones()}
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors" onClick={handleSubmit}>
          Submit Answer
        </button>
      </div>
    </div>
  )
}

export default RenderQ2;