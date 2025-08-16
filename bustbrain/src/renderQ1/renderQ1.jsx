import React from 'react'
import { useState, useEffect } from 'react'

const RenderQ1 = () => {
  const [category, setcategory] = useState([]);
  const [item, setitem] = useState([]);
  const [droppedItems, setDroppedItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/categorise`, {
          method: "GET",
        })
        const data = await res.json();
        if (res.ok) {
          if (data.categories && Array.isArray(data.categories)) {
            setcategory(data.categories);
            const allItems = data.categories.flatMap(cat => cat.items || []);
            setitem(allItems);
          } else if (data.category && data.item) {
            setcategory(data.category);
            setitem(data.item);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, [])

  const getCategoryColor = (index) => {
    const colors = ['bg-pink-200', 'bg-yellow-200', 'bg-blue-200', 'bg-green-200', 'bg-purple-200'];
    return colors[index % colors.length];
  }

  const handleDragStart = (e, itemName) => {
    e.dataTransfer.setData('text/plain', itemName);
  };

  const handleDrop = (e, categoryIndex) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    
    if (draggedItem) {
      setDroppedItems(prev => ({
        ...prev,
        [categoryIndex]: [...(prev[categoryIndex] || []), draggedItem]
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const isItemDropped = (itemName) => {
    return Object.values(droppedItems).some(items => items && items.includes(itemName));
  };

  return (
          <div className='bg-gradient-to-br from-amber-100 to-orange-100'>
    <div className="p-12 min-h-[45vh]">
      <h2 className="text-2xl font-bold mb-12 text-center">Question 1</h2>
      
      {/* Draggable Items */}
      <div className="flex justify-center gap-6 mb-16 flex-wrap">
        {item && item.length > 0 && item.map((itemObj, itemIndex) => {
          const itemName = typeof itemObj === 'string' ? itemObj : itemObj?.name;
          return !isItemDropped(itemName) ? (
            <span
              key={itemIndex}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, itemName)}
              className={`${getCategoryColor(itemIndex)} px-6 py-3 rounded-full shadow-md text-lg font-medium text-gray-700 cursor-grab`}
            >
              {itemName}
            </span>
          ) : null;
        })}
      </div>
      
      {/* Categories - Drop zones */}
      <div className="flex gap-12 justify-center flex-wrap">
        {category.map((categoryObj, categoryIndex) => {
          const categoryName = typeof categoryObj === 'string' ? categoryObj : categoryObj?.name;
          return (
            <div
              key={categoryIndex}
              onDrop={(e) => handleDrop(e, categoryIndex)}
              onDragOver={handleDragOver}
              className={`${getCategoryColor(categoryIndex)} w-48 min-h-32 rounded-xl flex flex-col items-center justify-center text-lg font-semibold text-gray-700 shadow-md p-4`}
            >
              <div className="mb-2">{categoryName}</div>
              
              {/* Show dropped items inside category */}
              <div className="flex flex-wrap gap-2 justify-center">
                {droppedItems[categoryIndex] && droppedItems[categoryIndex].map((droppedItem, idx) => (
                  <span
                    key={idx}
                    className="bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    {droppedItem}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  )
}

export default RenderQ1;