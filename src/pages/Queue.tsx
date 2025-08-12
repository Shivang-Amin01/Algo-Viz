import React, { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface QueueItem {
  value: string;
  id: number;
  isAnimating: boolean;
}

const Queue = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastOperation, setLastOperation] = useState<string>('');
  const [nextId, setNextId] = useState(1);

  const enqueue = () => {
    if (inputValue.trim()) {
      const newItem: QueueItem = {
        value: inputValue.trim(),
        id: nextId,
        isAnimating: true
      };
      
      setQueue(prev => [...prev, newItem]);
      setLastOperation(`Enqueued "${inputValue.trim()}" to the queue`);
      setInputValue('');
      setNextId(prev => prev + 1);

      setTimeout(() => {
        setQueue(prev => prev.map(item => 
          item.id === newItem.id ? { ...item, isAnimating: false } : item
        ));
      }, 300);
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const dequeuedItem = queue[0];
      setQueue(prev => prev.slice(1));
      setLastOperation(`Dequeued "${dequeuedItem.value}" from the queue`);
    } else {
      setLastOperation('Cannot dequeue from empty queue');
    }
  };

  const front = () => {
    if (queue.length > 0) {
      const frontItem = queue[0];
      setLastOperation(`Front element is "${frontItem.value}"`);
    } else {
      setLastOperation('Queue is empty');
    }
  };

  const rear = () => {
    if (queue.length > 0) {
      const rearItem = queue[queue.length - 1];
      setLastOperation(`Rear element is "${rearItem.value}"`);
    } else {
      setLastOperation('Queue is empty');
    }
  };

  const clear = () => {
    setQueue([]);
    setLastOperation('Queue cleared');
    setNextId(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      enqueue();
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Queue Data Structure</h1>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>FIFO (First In, First Out):</strong> A queue is a linear data structure where elements are added at one end (rear) and removed from the other end (front).
            Think of it like a line of people - the first person in line is the first person served.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Operations:</strong> Enqueue (add to rear), Dequeue (remove from front), Front (view first), Rear (view last)
            | <strong>Time Complexity:</strong> O(1) for all operations
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Operations</h3>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter value to enqueue"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  onClick={enqueue}
                  disabled={!inputValue.trim()}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enqueue</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={dequeue}
                  disabled={queue.length === 0}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                  <span>Dequeue</span>
                </button>
                <button
                  onClick={front}
                  disabled={queue.length === 0}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                >
                  Front
                </button>
                <button
                  onClick={rear}
                  disabled={queue.length === 0}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                >
                  Rear
                </button>
                <button
                  onClick={clear}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          {/* Queue Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Size:</span>
                <span className="font-semibold text-green-600">{queue.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Is Empty:</span>
                <span className={`font-semibold ${queue.length === 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {queue.length === 0 ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Front Element:</span>
                <span className="font-semibold text-blue-600">
                  {queue.length > 0 ? queue[0].value : 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Rear Element:</span>
                <span className="font-semibold text-purple-600">
                  {queue.length > 0 ? queue[queue.length - 1].value : 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Last Operation */}
          {lastOperation && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-800 mb-1">Last Operation:</h4>
              <p className="text-green-700">{lastOperation}</p>
            </div>
          )}
        </div>

        {/* Queue Visualization */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Visualization</h3>
          
          <div className="relative">
            {/* Queue Container */}
            <div className="border-2 border-gray-400 w-full bg-white min-h-20 rounded-lg overflow-hidden">
              {queue.length === 0 ? (
                <div className="flex items-center justify-center h-20 text-gray-400">
                  <span>Empty Queue</span>
                </div>
              ) : (
                <div className="flex p-2 space-x-2 overflow-x-auto">
                  {queue.map((item, index) => (
                    <div
                      key={item.id}
                      className={`min-w-16 bg-green-500 text-white text-center py-3 px-3 rounded font-medium transform transition-all duration-300 relative ${
                        item.isAnimating ? 'scale-110 bg-green-600' : ''
                      }`}
                    >
                      {item.value}
                      {/* Front indicator */}
                      {index === 0 && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                          FRONT
                        </div>
                      )}
                      {/* Rear indicator */}
                      {index === queue.length - 1 && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-purple-400 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                          REAR
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Direction arrows */}
            <div className="flex justify-between items-center mt-12 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-red-400"></div>
                <span>Dequeue (Remove)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Enqueue (Add)</span>
                <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-green-400"></div>
              </div>
            </div>
          </div>

          {/* Queue Operations Guide */}
          <div className="mt-6 text-sm text-gray-600">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Queue elements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span>Front (first in)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded"></div>
                <span>Rear (last in)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="mt-8 bg-gray-900 text-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Common Queue Operations (JavaScript)</h3>
        <pre className="text-sm overflow-x-auto">
          <code>{`// Create a queue using array
let queue = [];

// Enqueue operation - add element to rear
queue.push("first");
queue.push("second");
queue.push("third");

// Dequeue operation - remove element from front
let dequeuedItem = queue.shift(); // returns "first"

// Front operation - view front element
let frontItem = queue[0]; // returns "second"

// Rear operation - view rear element
let rearItem = queue[queue.length - 1]; // returns "third"

// Check if queue is empty
let isEmpty = queue.length === 0; // returns false`}</code>
        </pre>
      </div>
    </div>
  );
};

export default Queue;