// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListContainer from './ListContainer';
import LoadingView from './LoadingView';
import FailureView from './FailureView';
import ListSelectionPage from './ListSelectionPage';

import './App.css';

function App() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedList, setUpdatedList] = useState([]);

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
    // Navigate programmatically
    window.location.href = path;
  };

  const updateLists = (newList) => {
    setUpdatedList(newList);
  };

  if (loading) return <LoadingView />;
  if (error) return <FailureView error={error} />;

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<ListContainer lists={lists} updatedList={updatedList} />} // Pass updatedList as a prop
          />

          <Route
            path="/List-creation"
            element={<ListContainer lists={lists} updatedList={updatedList} />}
          />

          <Route
            path="/list-selection"
            element={<ListSelectionPage lists={lists} navigateTo={navigateTo} isHomePage={true} updateLists={updateLists} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
