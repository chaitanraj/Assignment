import React, { useState } from 'react';

const Ques1 = () => {
  const [inputs, setInputs] = useState(['', '']);
  const [items, setItems] = useState(['', '']);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const addItems = () => {
    setItems([...items, '']);
  };

  const removeInput = (indexToRemove) => {
    if (inputs.length > 1) {
      const newInputs = inputs.filter((_, index) => index !== indexToRemove);
      setInputs(newInputs);
    }
  };
  const removeItem = (indexToRemove) => {
    if (items.length > 1) {
      const newItems = items.filter((_, index) => index !== indexToRemove);
      setItems(newItems);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newInputs = [...inputs];
    const draggedItem = newInputs[draggedIndex];
    
    // Remove the dragged item
    newInputs.splice(draggedIndex, 1);
    
    // Insert it at the new position
    newInputs.splice(dropIndex, 0, draggedItem);
    
    setInputs(newInputs);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="p-6 max-w-2xl">
      {/* Categories Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Categories</h2>
        {inputs.map((input, index) => (
          <div 
            key={index} 
            className="mb-2 flex items-center"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <button
              type="button"
              onClick={() => removeInput(index)}
              className="mr-2 text-red-500 hover:text-red-700 font-bold text-lg"
              onMouseDown={(e) => e.stopPropagation()}
            >
              ×
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={
                index < 2
                  ? `Category${index + 1}`
                  : `Category ${index + 1}`
              }
              className={`border border-gray-300 px-3 py-2 w-80 cursor-move`}
              onMouseDown={(e) => e.stopPropagation()} // Prevent drag when clicking input
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addInput}
          className="text-blue-600 mt-2 text-sm"
        >
          + Add Category
        </button>
      </div>

      {/* Items Section */}
      <div>
        <div className="flex mb-2 gap-5">
          <div className="w-80 ">
            <h4 className="text-sm font-medium">Items</h4>
          </div>
          <div className="w-80">
            <h4 className="text-sm font-medium">Belongs To</h4>
          </div>
        </div>

        <div className="space-y-10">
          
          {items.map((item, index) => (
            <div key={index} className="flex">  
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="mr-2 text-red-500 hover:text-red-700 font-bold text-lg"
              onMouseDown={(e) => e.stopPropagation()}
            >
              ×
            </button>

              <div className="w-80 mr-16">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder={
                    index < 2
                      ? `Item ${index + 1}`
                      : `Item ${index + 1}`
                  }
                  className="border border-gray-300 px-3 py-2 w-full"
                />
              </div>
              <div className="w-80">
                <select className="border border-gray-300 px-3 py-2 w-full">
                  <option value="">Select Category</option>
                  {inputs.map((value, categoryIndex) => {
                    return (
                      <option key={categoryIndex} value={value}>
                        {value || `Category ${categoryIndex + 1}`}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItems}
            className="text-blue-600 mt-3 text-sm"
          >
            + Add Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ques1;