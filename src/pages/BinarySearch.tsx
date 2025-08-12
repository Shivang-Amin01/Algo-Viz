import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Search } from 'lucide-react';

interface ArrayItem {
  value: number;
  isLeft: boolean;
  isRight: boolean;
  isMid: boolean;
  isTarget: boolean;
  isSearched: boolean;
}

const BinarySearch = () => {
  const [array, setArray] = useState<ArrayItem[]>([
    { value: 2, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 5, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 8, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 12, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 16, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 23, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 38, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 45, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 56, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 67, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
    { value: 78, isLeft: false, isRight: false, isMid: false, isTarget: false, isSearched: false },
  ]);
  
  const [target, setTarget] = useState(23);
  const [isSearching, setIsSearching] = useState(false);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(false);
  const [iterations, setIterations] = useState(0);
  const [explanation, setExplanation] = useState('Enter a target value and click search to begin');
  const [speed, setSpeed] = useState(1000);

  const resetSearch = useCallback(() => {
    setArray(prev => prev.map(item => ({
      ...item,
      isLeft: false,
      isRight: false,
      isMid: false,
      isTarget: false,
      isSearched: false
    })));
    setLeft(0);
    setRight(array.length - 1);
    setMid(-1);
    setFound(false);
    setIterations(0);
    setIsSearching(false);
    setExplanation('Ready to search. Click the search button to begin.');
  }, [array.length]);

  const binarySearchStep = useCallback(() => {
    if (left > right) {
      setIsSearching(false);
      setExplanation(`Search completed. Target ${target} was not found in the array after ${iterations} iterations.`);
      return;
    }

    const currentMid = Math.floor((left + right) / 2);
    setMid(currentMid);
    setIterations(prev => prev + 1);

    // Update array visualization
    setArray(prev => prev.map((item, index) => ({
      ...item,
      isLeft: index === left,
      isRight: index === right,
      isMid: index === currentMid,
      isSearched: index < left || index > right ? true : item.isSearched
    })));

    setExplanation(
      `Iteration ${iterations + 1}: Searching in range [${left}, ${right}]. ` +
      `Mid = ${currentMid}, array[${currentMid}] = ${array[currentMid]?.value}. ` +
      `Comparing ${array[currentMid]?.value} with target ${target}.`
    );

    setTimeout(() => {
      if (array[currentMid]?.value === target) {
        setFound(true);
        setArray(prev => prev.map((item, index) => ({
          ...item,
          isTarget: index === currentMid,
          isLeft: false,
          isRight: false,
          isMid: false
        })));
        setExplanation(`Found! Target ${target} found at index ${currentMid} after ${iterations + 1} iterations.`);
        setIsSearching(false);
      } else if (array[currentMid]?.value < target) {
        setLeft(currentMid + 1);
        setExplanation(
          `${array[currentMid]?.value} < ${target}, so target must be in right half. ` +
          `New search range: [${currentMid + 1}, ${right}]`
        );
      } else {
        setRight(currentMid - 1);
        setExplanation(
          `${array[currentMid]?.value} > ${target}, so target must be in left half. ` +
          `New search range: [${left}, ${currentMid - 1}]`
        );
      }
    }, speed / 2);
  }, [left, right, target, array, iterations, speed]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSearching && !found) {
      interval = setInterval(binarySearchStep, speed);
    }
    return () => clearInterval(interval);
  }, [isSearching, found, binarySearchStep, speed]);

  const startSearch = () => {
    resetSearch();
    setIsSearching(true);
  };

  const addRandomValue = () => {
    const newValue = Math.floor(Math.random() * 100) + 1;
    const newArray = [...array, { 
      value: newValue, 
      isLeft: false, 
      isRight: false, 
      isMid: false, 
      isTarget: false, 
      isSearched: false 
    }];
    newArray.sort((a, b) => a.value - b.value);
    setArray(newArray);
    resetSearch();
  };

  const removeLastValue = () => {
    if (array.length > 3) {
      setArray(prev => prev.slice(0, -1));
      resetSearch();
    }
  };

  const getBarColor = (item: ArrayItem) => {
    if (item.isTarget) return 'bg-green-500';
    if (item.isMid) return 'bg-yellow-500';
    if (item.isLeft) return 'bg-blue-500';
    if (item.isRight) return 'bg-purple-500';
    if (item.isSearched) return 'bg-gray-400';
    return 'bg-blue-300';
  };

  const getBarLabel = (item: ArrayItem) => {
    if (item.isTarget) return 'FOUND';
    if (item.isMid) return 'MID';
    if (item.isLeft) return 'LEFT';
    if (item.isRight) return 'RIGHT';
    return '';
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Binary Search Visualization</h1>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>How it works:</strong> Binary Search finds a target value in a sorted array by repeatedly dividing 
            the search interval in half. It compares the target with the middle element and eliminates half of the remaining elements.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Prerequisite:</strong> Array must be sorted | <strong>Time Complexity:</strong> O(log n) | <strong>Space Complexity:</strong> O(1)
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label htmlFor="target" className="text-gray-700 font-medium">Target:</label>
          <input
            id="target"
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-24"
            disabled={isSearching}
          />
        </div>

        <button
          onClick={startSearch}
          disabled={isSearching}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button
          onClick={() => setIsSearching(!isSearching)}
          disabled={found || (!isSearching && iterations === 0)}
          className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
            isSearching 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isSearching ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isSearching ? 'Pause' : 'Resume'}</span>
        </button>

        <button
          onClick={resetSearch}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>

        <div className="flex items-center space-x-2">
          <label htmlFor="speed" className="text-gray-700 font-medium">Speed:</label>
          <input
            id="speed"
            type="range"
            min="300"
            max="2000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-gray-600">{(2300 - speed) / 200}x</span>
        </div>

        <button
          onClick={addRandomValue}
          disabled={isSearching}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
        >
          Add Random
        </button>

        <button
          onClick={removeLastValue}
          disabled={isSearching || array.length <= 3}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
        >
          Remove Last
        </button>
      </div>

      {/* Search Stats */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{array.length}</div>
          <div className="text-sm text-gray-600">Array Size</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{target}</div>
          <div className="text-sm text-gray-600">Target Value</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{iterations}</div>
          <div className="text-sm text-gray-600">Iterations</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className={`text-2xl font-bold ${found ? 'text-green-600' : 'text-gray-400'}`}>
            {found ? 'FOUND' : 'SEARCHING'}
          </div>
          <div className="text-sm text-gray-600">Status</div>
        </div>
      </div>

      {/* Visualization */}
      <div className="mb-8">
        <div className="flex items-end justify-center space-x-1 h-60 bg-gray-50 rounded-lg p-6 overflow-x-auto">
          {array.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 min-w-12">
              <div className="text-xs text-gray-600 font-bold h-4">
                {getBarLabel(item)}
              </div>
              <div
                className={`w-10 transition-all duration-300 rounded-t-lg ${getBarColor(item)} flex items-end justify-center text-white font-bold text-xs relative`}
                style={{ 
                  height: `${(item.value / Math.max(...array.map(i => i.value))) * 150 + 20}px`,
                  transform: item.isMid || item.isTarget ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                <span className="mb-1">{item.value}</span>
              </div>
              <span className="text-xs text-gray-600">{index}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap justify-center gap-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-300 rounded"></div>
          <span className="text-sm text-gray-700">Unsearched</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-700">Left Pointer</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-sm text-gray-700">Right Pointer</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-700">Middle Element</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-700">Found Target</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span className="text-sm text-gray-700">Eliminated</span>
        </div>
      </div>

      {/* Current Step Explanation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Algorithm Progress:</h3>
        <p className="text-gray-700">{explanation}</p>
        {(left <= right && !found && iterations > 0) && (
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Current Range:</strong> [{left}, {right}] ({right - left + 1} elements)</p>
            <p><strong>Theoretical Max Iterations:</strong> {Math.ceil(Math.log2(array.length))} for this array size</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinarySearch;