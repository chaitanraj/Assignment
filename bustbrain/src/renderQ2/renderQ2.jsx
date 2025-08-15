import React from 'react'
import { useState, useEffect } from 'react'

const RenderQ1 = () => {
  const [category, setcategory] = useState([]);
  const [item, setitem] = useState([]);
  const [droppedItems, setDroppedItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/categorise`, {
        method: "GET",
      })
      const data = await res.json();
      if (res.ok) {
        console.log("Sentence fetched");
        setcategory(data.categories);
        // Extract all items from all categories
        const allItems = data.categories.flatMap(cat => cat.items);
        setitem(allItems);
      }
      else {
        console.log("Frontend Error for GET route");
      }
    }
    fetchData();
  }, [])

  // Helper function to get color for category
  const getCategoryColor = (index) => {
    const colors = ['bg-pink-200', 'bg-yellow-200', 'bg-blue-200', 'bg-green-200', 'bg-purple-200'];
    return colors[index % colors.length];
  }

  // Handle drag start
  const handleDragStart = (e, itemName) => {
    e.dataTransfer.setData('text/plain', itemName);
  };

  // Handle drop
  const handleDrop = (e, categoryIndex) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    setDroppedItems(prev => ({
      ...prev,
      [categoryIndex]: [...(prev[categoryIndex] || []), draggedItem]
    }));
  };

  // Allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Check if item is already dropped
  const isItemDropped = (itemName) => {
    return Object.values(droppedItems).some(items => items && items.includes(itemName));
  };

  return (
    <div className="p-12 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-12 text-center">Categorise Render</h2>
      
      {/* Draggable Items floating independently at the top */}
      <div className="flex justify-center gap-6 mb-16 flex-wrap">
        {item.map((itemObj, itemIndex) => {
          const itemName = itemObj.name;
          return !isItemDropped(itemName) ? (
            <div
              key={itemIndex}
              draggable
              onDragStart={(e) => handleDragStart(e, itemName)}
              className={`${getCategoryColor(itemIndex)} px-6 py-3 rounded-full shadow-md text-lg font-medium text-gray-700 whitespace-nowrap hover:shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing hover:scale-110 transform hover:-translate-y-1 select-none user-select-none hover:brightness-110 active:scale-95`}
            >
              {itemName}
            </div>
          ) : null;
        })}
      </div>
      
      {/* Categories at the bottom - Drop zones */}
      <div className="flex gap-12 justify-center flex-wrap">
        {category.map((categoryObj, categoryIndex) => (
          <div
            key={categoryIndex}
            onDrop={(e) => handleDrop(e, categoryIndex)}
            onDragOver={handleDragOver}
            className={`${getCategoryColor(categoryIndex)} w-48 min-h-32 rounded-xl flex flex-col items-center justify-center text-lg font-semibold text-gray-700 shadow-md hover:shadow-xl transition-all duration-300 border-3 border-dashed border-transparent hover:border-gray-400 hover:border-blue-400 p-4 hover:scale-105 transform hover:bg-opacity-90 active:scale-95`}
          >
            <div className="mb-2">{categoryObj.name}</div>
            
            {/* Show dropped items inside category */}
            <div className="flex flex-wrap gap-2 justify-center">
              {droppedItems[categoryIndex] && droppedItems[categoryIndex].map((droppedItem, idx) => (
                <div
                  key={idx}
                  className="bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 cursor-default border border-gray-200"
                >
                  {droppedItem}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RenderQ1;