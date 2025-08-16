import React, { useState, useRef } from 'react';
// import { GripVertical } from 'lucide-react';

const ques1 = () => {
  const [inputs, setInputs] = useState(['', '']);
  const [items, setItems] = useState(['', '']);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);


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

    newInputs.splice(draggedIndex, 1);
    newInputs.splice(dropIndex, 0, draggedItem);

    setInputs(newInputs);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Add this handler
  const handleCategorySelect = (itemIndex, categoryValue) => {
    setSelectedCategories(prev => ({
      ...prev,
      [itemIndex]: categoryValue
    }));
  };


  // Minimal handleSubmit
  const handleSubmit = async () => {
    alert("Ques1 Submitted")
    try {
      const response = await fetch('https://formbuilder-ztjx.onrender.com/categorise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories: inputs.filter(input => input.trim()).map((input, i) => ({
            id: `cat${i}`,
            name: input
          })),
          items: items.map((item, i) => ({
            id: `item${i}`,
            name: item,
            categoryId: selectedCategories[i] ? `cat${inputs.findIndex(input => input === selectedCategories[i])}` : null
          })).filter(item => item.name.trim() && item.categoryId)
        })
      });

      response.ok ? console.log('Saved!') : console.log('Error!');
    } catch (error) {
      alert('Failed!');
    }
  };

  // File Upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUploadedImage(previewUrl);

      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('https://formbuilder-ztjx.onrender.com/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log(result);
    };
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mb-12 border-b border-gray-200">

      <div className="flex gap-6 mb-6 items-start">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">Question 1</h1>
        <div className="flex gap-4 items-start">
          <div className="w-40 h-14 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              <span className="text-sm text-gray-600">Upload Image</span>
            </label>

          </div>
        </div>
        {uploadedImage && (
          <div className="w-40 h-32 border border-gray-300 rounded overflow-hidden">
            <img
              src={uploadedImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>

        )}
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3 text-gray-700">Categories</h2>
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
              placeholder={`Category ${index + 1}`}
              className="border border-gray-300 px-3 py-2 w-80 cursor-move focus:outline-none focus:ring-2 focus:ring-blue-500"
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addInput}
          className="text-blue-600 mt-2 text-sm hover:text-blue-800"
        >
          + Add Category
        </button>
      </div>

      <div>
        <div className="flex mb-2 gap-5">
          <div className="w-80">
            <h4 className="text-sm font-medium text-gray-700">Items</h4>
          </div>
          <div className="w-80">
            <h4 className="text-sm font-medium text-gray-700">Belongs To</h4>
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="mr-2 text-red-500 hover:text-red-700 font-bold text-lg"
              >
                ×
              </button>
              <div className="w-80 mr-5">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder={`Item ${index + 1}`}
                  className="border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-80">
                <select
                  value={selectedCategories[index] || ''}
                  onChange={(e) => handleCategorySelect(index, e.target.value)}
                  className="border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {inputs.map((value, categoryIndex) => (
                    <option key={categoryIndex} value={value}>
                      {value || `Category ${categoryIndex + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addItems}
            className="text-blue-600 mt-3 text-sm hover:text-blue-800"
          >
            + Add Items
          </button>
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

export default ques1;