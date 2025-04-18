import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScienceFictionApp from './Component/Storypage/Storypage.jsx';
import StoryDetailPage from './Component/Design2/Detailpage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ScienceFictionApp />} />
          <Route path="/story/:id" element={<StoryDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;