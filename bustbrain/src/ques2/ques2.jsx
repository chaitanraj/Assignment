import React, { useState, useRef } from 'react'

const Ques2 = () => {
    const [style, setStyle] = useState({});
    const [selected, setSelected] = useState([]);
    const dragFrom = useRef(null);
    const dragTo = useRef(null);

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

    return (
        <div>
            <div>
                <h1 className="text-white bg-black">Question 2</h1>
                <div
                    contentEditable
                    placeholder="Select the words to underline them and make them blanks"
                    className="border border-black h-[6vh] w-[80vh] empty:before:content-[attr(placeholder)] empty:before:text-[#888]"
                    onMouseUp={handleUnderline}
                ></div>
                <h2>Selected Words:</h2>
                <ul>
                    {selected.map((word, index) => (
                        <li
                            key={index}
                            className="mt-[5vh] border border-black h-auto w-[10vh] cursor-move"
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {word}
                        </li>
                    ))}
                </ul>
            </div>
            <div></div>
        </div>
    );
}

export default Ques2;