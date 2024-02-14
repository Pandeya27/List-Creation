// src/ListSelectionPage.js

import React, { useState } from 'react';
import './ListSelectionPage.css';

function ListSelectionPage({ lists, navigateTo, isHomePage, updateLists }) {
  const [selectedList, setSelectedList] = useState([]);
  const [newList, setNewList] = useState([]);

  const handleAddToList3 = (listId) => {
    setSelectedList((prevSelectedList) => [...prevSelectedList, listId]);
  };

  const handleMoveRight = (listId) => {
    const selectedListItem = lists.find((item) => item.id === listId);

    if (selectedListItem) {
      // Move the item to List 3 with an updated list_number
      const updatedItem = { ...selectedListItem, list_number: 3 };
      setNewList((prevNewList) => [...prevNewList, updatedItem]);

      // Remove the item from its original list
      const updatedLists = lists.filter((item) => item.id !== listId);

      // Call the updateLists function passed from the App component
      updateLists(updatedLists);
    } else {
      console.error(`Item with ID ${listId} not found.`);
    }
  };

  const handleMoveLeft = (listId) => {
    // Check if the item is in selectedList (List 3)
    if (selectedList.includes(listId)) {
      // Move the item to List 1
      updateLists([...selectedList.filter((id) => id !== listId), listId]);
    } else {
      // Move the item to List 2
      setNewList((prevNewList) => prevNewList.filter((id) => id !== listId));
    }
  };

  const handleCancel = () => {
    if (isHomePage) {
      navigateTo('/List-creation'); // Navigate back to the home page
    }
  };

  const handleUpdate = () => {
    const updatedList = [...selectedList, ...newList];
    updateLists(updatedList);
    navigateTo('/List-creation');
  };

  const getListNumber = (listNumber) => {
    const count = lists.filter((list) => list.list_number === listNumber).length;

    // Check if the list number is 3 and add the count of selectedList
    if (listNumber === 3) {
      return `List ${listNumber} (${count + selectedList.length})`;
    }

    return `List ${listNumber} (${count})`;
  };

  return (
    <div>
      <h1 className="list-creation-heading">List Creation</h1>

      <div className="list-container">
        {/* List 1 */}
        <div className="list-column">
          <h2>{getListNumber(1)}</h2>
          <div className="scrollable-list">
            {lists.filter((list) => list.list_number === 1).map((list) => (
              <div key={list.id} className="list-item" onClick={() => handleAddToList3(list.id)}>
                <h3 className="small-text">{list.name}</h3>
                <button onClick={() => handleMoveRight(list.id)}>&rarr;</button>
              </div>
            ))}
          </div>
        </div>

        {/* List 3 */}
        <div className="list-column">
          <h2>{getListNumber(3)}</h2>
          <div className="scrollable-list">
            {selectedList.map((listId) => {
              const list = lists.find((list) => list.id === listId);
              return (
                <div key={list.id} className="list-item">
                  <h3 className="small-text">{list.name}</h3>
                  <button onClick={() => handleMoveLeft(list.id)}>&larr;</button>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                  <button onClick={() => handleMoveRight(list.id)}>&rarr;</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* List 2 */}
        <div className="list-column">
          <h2>{getListNumber(2)}</h2>
          <div className="scrollable-list">
            {lists.filter((list) => list.list_number === 2).map((list) => (
              <div key={list.id} className="list-item" onClick={() => handleAddToList3(list.id)}>
                <h3 className="small-text">{list.name}</h3>
                <button onClick={() => handleMoveLeft(list.id)}>&larr;</button>
              </div>
            ))}
          </div>
        </div>

        {/* New List */}

        <div className="button-container">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListSelectionPage;