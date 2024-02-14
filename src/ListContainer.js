// ListContainer.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListContainer.css';

function ListContainer({ lists, updatedList }) {
  const [selectedLists, setSelectedLists] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);

  const handleCheckboxChange = (listNumber, itemId) => {
    if (selectedLists.includes(listNumber)) {
      // Deselecting a list should remove the item from the selected list
      setSelectedLists((prevLists) => prevLists.filter((prevList) => prevList !== listNumber));
      setList3((prevList3) => prevList3.filter((id) => id !== itemId));
    } else {
      // Selecting a list should add the item to the selected list
      setSelectedLists((prevLists) => [...prevLists, listNumber]);
      setList3((prevList3) => [...prevList3, itemId]);
    }
  };

  useEffect(() => {
    // Update selected lists when updatedList changes
    setSelectedLists([]);
  }, [updatedList]);

  return (
    <div>
      <h1 className="list-creation-heading">List Creation</h1>

      <Link to="/list-selection">
        <button className="blue-button">Create New List</button>
      </Link>

      {/* Lists side by side */}
      <div className="list-container1">
        <div className="list-column1">
          <h2>
            <input
              type="checkbox"
              checked={selectedLists.includes(1)}
              onChange={() => handleCheckboxChange(1)}
            />
            List 1
          </h2>
          <div className="scrollable-list">
            {lists
              .filter((list) => list.list_number === 1)
              .map((list) => (
                <div key={list.id} className="list-item">
                  <h3>{list.name}</h3>
                  <button onClick={() => handleCheckboxChange(3, list.id)}>&rarr;</button>
                </div>
              ))}
          </div>
        </div>

        <div className="list-column">
          <h2>
            <input
              type="checkbox"
              checked={selectedLists.includes(2)}
              onChange={() => handleCheckboxChange(2)}
            />
            List 2
          </h2>
          <div className="scrollable-list">
            {lists
              .filter((list) => list.list_number === 2)
              .map((list) => (
                <div key={list.id} className="list-item">
                  <h3>{list.name}</h3>
                  <button onClick={() => handleCheckboxChange(3, list.id)}>&rarr;</button>
                </div>
              ))}
          </div>
        </div>

        
      </div>

      {/* Display updated list */}
      {updatedList && updatedList.length > 0 && (
        <div className="updated-list">
          <h2>Updated List</h2>
          <div className="scrollable-list">
            {updatedList.map((listId) => {
              const list = lists.find((list) => list.id === listId);
              return (
                <div key={list.id} className="list-item">
                  <h3>{list.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListContainer;