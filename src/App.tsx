import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BubbleSort from './pages/BubbleSort';
import QuickSort from './pages/QuickSort';
import Stack from './pages/Stack';
import Queue from './pages/Queue';
import BinarySearch from './pages/BinarySearch';
import LinkedList from './pages/LinkedList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bubble-sort" element={<BubbleSort />} />
            <Route path="/quick-sort" element={<QuickSort />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/binary-search" element={<BinarySearch />} />
            <Route path="/linked-list" element={<LinkedList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;