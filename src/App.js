// App.js - Main component that manages routing and state
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataEntryPage from './components/DataEntryPage';
import Portfolio from './components/Portfolio';
import './App.css';

function App() {
  // State to store all user data for the portfolio
  const [portfolioData, setPortfolioData] = useState(null);

  // Function to handle form submission from DataEntryPage
  const handleDataSubmission = (data) => {
    setPortfolioData(data);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<DataEntryPage onSubmit={handleDataSubmission} />} 
          />
          <Route 
            path="/portfolio" 
            element={portfolioData ? <Portfolio data={portfolioData} /> : <div>No data available</div>} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;