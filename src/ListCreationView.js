// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListContainer from './ListContainer';
import ListCreationView from './ListCreationView';
import LoadingView from './LoadingView';
import FailureView from './FailureView';
import ListSelectionPage from './ListSelectionPage';

import './App.css';

function App() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLists, setSelectedLists] = useState([]);
  const [updatedList, setUpdatedList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/list-creation/lists');
        const data = await response.json();
        setLists(data.lists);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const updateLists = (selectedList) => {
    setUpdatedList(selectedList);
  };

  if (loading) return <LoadingView />;
  if (error) return <FailureView error={error}  />;

  return (
    <Router>
      <div>
        <h1 className="list-creation-heading">List Creation</h1>

        <Routes>
          <Route
            path="/"
            element={<ListContainer lists={updatedList || lists} selectedLists={selectedLists} />}
          />
          <Route
            path="/list-selection"
            element={
              <ListSelectionPage
                lists={lists}
                navigateTo={navigateTo}
                selectedLists={selectedLists}
                setSelectedLists={setSelectedLists}
                isHomePage={true}
                updateLists={updateLists}
              />
            }
          />
          <Route
            path="/list-creation"
            element={<ListCreationView selectedLists={selectedLists} navigateTo={navigateTo} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;