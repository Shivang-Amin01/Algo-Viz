import React, { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface StackItem {
  value: string;
  id: number;
  isAnimating: boolean;
}

const Stack = () => {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastOperation, setLastOperation] = useState<string>('');
  const [nextId, setNextId] = useState(1);

  const push = () => {
    if (inputValue.trim()) {
      const newItem: StackItem = {
        value: inputValue.trim(),
        id: nextId,
        isAnimating: true
      };
      
      setStack(prev => [...prev, newItem]);
      setLastOperation(`Pushed "${inputValue.trim()}" onto the stack`);
      setInputValue('');
      setNextId(prev => prev + 1);

      // Remove animation class after animation completes
      setTimeout(() => {
        setStack(prev => prev.map(item => 
          item.id === newItem.id ? { ...item, isAnimating: false } : item
        ));
      }, 300);
    }
  };

  const pop = () => {
    if (stack.length > 0) {
      const poppedItem = stack[stack.length - 1];
      setStack(prev => prev.slice(0, -1));
      setLastOperation(`Popped "${poppedItem.value}" from the stack`);
    } else {
      setLastOperation('Cannot pop from empty stack');
    }
  };

  const peek = () => {
    if (stack.length > 0) {
      const topItem = stack[stack.length - 1];
      setLastOperation(`Top element is "${topItem.value}"`);
    } else {
      setLastOperation('Stack is empty');
    }
  };

  const clear = () => {
    setStack([]);
    setLastOperation('Stack cleared');
    setNextId(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      push();
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stack Data Structure</h1>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>LIFO (Last In, First Out):</strong> A stack is a linear data structure where elements are added and removed from the same end (called the "top").
            Think of it like a stack of plates - you can only add or remove plates from the top.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Operations:</strong> Push (add), Pop (remove), Peek (view top), isEmpty
            | <strong>Time Complexity:</strong> O(1) for all operations
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stack Operations</h3>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter value to push"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={push}
                  disabled={!inputValue.trim()}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Push</span>
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={pop}
                  disabled={stack.length === 0}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                  <span>Pop</span>
                </button>
                <button
                  onClick={peek}
                  disabled={stack.length === 0}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                >
                  Peek
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

          {/* Stack Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stack Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Size:</span>
                <span className="font-semibold text-blue-600">{stack.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Is Empty:</span>
                <span className={`font-semibold ${stack.length === 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {stack.length === 0 ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Top Element:</span>
                <span className="font-semibold text-blue-600">
                  {stack.length > 0 ? stack[stack.length - 1].value : 'None'}
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

        {/* Stack Visualization */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stack Visualization</h3>
          
          <div className="relative">
            {/* Stack Container */}
            <div className="border-2 border-gray-400 border-t-0 w-48 mx-auto bg-white min-h-80 flex flex-col-reverse p-2">
              {stack.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-400">
                  <span>Empty Stack</span>
                </div>
              ) : (
                stack.map((item, index) => (
                  <div
                    key={item.id}
                    className={`w-full bg-blue-500 text-white text-center py-3 px-2 rounded mb-1 font-medium transform transition-all duration-300 ${
                      item.isAnimating ? 'scale-110 bg-blue-600' : ''
                    } ${index === stack.length - 1 ? 'ring-2 ring-yellow-400 ring-opacity-60' : ''}`}
                  >
                    {item.value}
                    {index === stack.length - 1 && (
                      <div className="absolute -right-16 top-0 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                        TOP
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Stack Base */}
            <div className="w-52 h-4 bg-gray-400 mx-auto rounded-b-lg"></div>
            
            {/* Top Arrow */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="text-sm text-gray-600 mb-1">Push/Pop Here</div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-400"></div>
            </div>
          </div>

          {/* Stack Operations Guide */}
          <div className="mt-6 text-sm text-gray-600">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Stack elements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span>Top element (last in)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="mt-8 bg-gray-900 text-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Common Stack Operations (JavaScript)</h3>
        <pre className="text-sm overflow-x-auto">
          <code>{`// Create a stack using array
let stack = [];

// Push operation - add element to top
stack.push("first");
stack.push("second");
stack.push("third");

// Pop operation - remove element from top
let poppedItem = stack.pop(); // returns "third"

// Peek operation - view top element without removing
let topItem = stack[stack.length - 1]; // returns "second"

// Check if stack is empty
let isEmpty = stack.length === 0; // returns false`}</code>
        </pre>
      </div>
    </div>
  );
};

export default Stack;