import React from 'react'
import { useEffect, useState } from 'react'

const RenderQ2 = () => {
  const [sentence, setSentence] = useState("");
  const [words, setWords] = useState(['']);
  const [droppedWords, setDroppedWords] = useState({}); // Track which words are dropped where
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/cloze`, {
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
            style={{
              display: 'inline-block',
              minWidth: '80px',
              height: '30px',
              margin: '0 5px',
              padding: '5px 10px',
              border: '2px dashed #ccc',
              borderRadius: '4px',
              backgroundColor: droppedWords[i] ? '#e8f5e8' : '#f9f9f9',
              textAlign: 'center',
              lineHeight: '20px',
              cursor: 'pointer'
            }}
          >
            {droppedWords[i] || ''}
          </span>
        );
      }
    }
    
    return result;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Question 2</h2>
      
      {/* Draggable word bubbles */}
      <div style={{ marginBottom: '20px' }}>
        {words
          .filter(word => !Object.values(droppedWords).includes(word))
          .map((word, index) => (
          <span
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, word)}
            style={{
              display: 'inline-block',
              backgroundColor: '#9f7aea',
              color: 'white',
              padding: '8px 16px',
              margin: '5px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'grab',
              userSelect: 'none'
            }}
          >
            {word}
          </span>
        ))}
      </div>
      
      {/* Sentence with drop zones */}
      <div style={{ 
        fontSize: '16px', 
        lineHeight: '1.5',
        color: '#333',
        marginTop: '20px'
      }}>
        {renderSentenceWithDropZones()}
      </div>
    </div>
  )
}

export default RenderQ2