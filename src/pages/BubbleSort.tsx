import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';

interface ArrayItem {
  value: number;
  isComparing: boolean;
  isSwapping: boolean;
  isSorted: boolean;
}

const BubbleSort = () => {
  const [array, setArray] = useState<ArrayItem[]>([
    { value: 64, isComparing: false, isSwapping: false, isSorted: false },
    { value: 34, isComparing: false, isSwapping: false, isSorted: false },
    { value: 25, isComparing: false, isSwapping: false, isSorted: false },
    { value: 12, isComparing: false, isSwapping: false, isSorted: false },
    { value: 22, isComparing: false, isSwapping: false, isSorted: false },
    { value: 11, isComparing: false, isSwapping: false, isSorted: false },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [newValue, setNewValue] = useState('');
  const [explanation, setExplanation] = useState('Click play to start the bubble sort visualization');

  const resetArray = useCallback(() => {
    setArray(prev => prev.map(item => ({ 
      ...item, 
      isComparing: false, 
      isSwapping: false, 
      isSorted: false 
    })));
    setCurrentStep(0);
    setIsPlaying(false);
    setExplanation('Array reset. Click play to start sorting.');
  }, []);

  const addValue = () => {
    const value = parseInt(newValue);
    if (value && value >= 1 && value <= 100) {
      setArray(prev => [...prev, { 
        value, 
        isComparing: false, 
        isSwapping: false, 
        isSorted: false 
      }]);
      setNewValue('');
      resetArray();
    }
  };

  const removeLastValue = () => {
    if (array.length > 1) {
      setArray(prev => prev.slice(0, -1));
      resetArray();
    }
  };

  const bubbleSortStep = useCallback(() => {
    const n = array.length;
    const pass = Math.floor(currentStep / (n - 1));
    const comparison = currentStep % (n - 1);

    if (pass >= n - 1) {
      // Sorting complete
      setArray(prev => prev.map(item => ({ ...item, isSorted: true, isComparing: false, isSwapping: false })));
      setExplanation('Sorting complete! All elements are now in ascending order.');
      setIsPlaying(false);
      return;
    }

    const i = comparison;
    const j = i + 1;

    if (j >= n - pass) {
      // End of current pass
      setArray(prev => prev.map((item, index) => ({
        ...item,
        isSorted: index >= n - pass - 1 ? true : item.isSorted,
        isComparing: false,
        isSwapping: false
      })));
      setExplanation(`Pass ${pass + 1} complete. Element at position ${n - pass - 1} is now in its final sorted position.`);
      setCurrentStep(prev => prev + 1);
      return;
    }

    setArray(prev => prev.map((item, index) => ({
      ...item,
      isComparing: index === i || index === j,
      isSwapping: false
    })));

    setExplanation(`Comparing elements at positions ${i} and ${j}: ${array[i]?.value} and ${array[j]?.value}`);

    setTimeout(() => {
      if (array[i] && array[j] && array[i].value > array[j].value) {
        // Swap needed
        setArray(prev => {
          const newArray = [...prev];
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          return newArray.map((item, index) => ({
            ...item,
            isSwapping: index === i || index === j,
            isComparing: false
          }));
        });
        setExplanation(`Swapping ${array[i].value} and ${array[j].value} because ${array[i].value} > ${array[j].value}`);
      } else {
        setExplanation(`No swap needed. ${array[i]?.value} ≤ ${array[j]?.value}`);
      }

      setTimeout(() => {
        setArray(prev => prev.map(item => ({ ...item, isSwapping: false, isComparing: false })));
        setCurrentStep(prev => prev + 1);
      }, speed / 2);
    }, speed / 2);
  }, [array, currentStep, speed]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(bubbleSortStep, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, bubbleSortStep, speed]);

  const getBarColor = (item: ArrayItem) => {
    if (item.isSorted) return 'bg-green-500';
    if (item.isSwapping) return 'bg-red-500';
    if (item.isComparing) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bubble Sort Visualization</h1>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>How it works:</strong> Bubble Sort repeatedly steps through the list, compares adjacent elements, 
            and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Time Complexity:</strong> O(n²) | <strong>Space Complexity:</strong> O(1)
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
            isPlaying 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          onClick={resetArray}
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
            min="200"
            max="2000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-gray-600">{(2200 - speed) / 200}x</span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Add value (1-100)"
            min="1"
            max="100"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addValue}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
          <button
            onClick={removeLastValue}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="mb-8">
        <div className="flex items-end justify-center space-x-2 h-80 bg-gray-50 rounded-lg p-6">
          {array.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={`w-12 transition-all duration-300 rounded-t-lg ${getBarColor(item)} flex items-end justify-center text-white font-bold text-sm`}
                style={{ 
                  height: `${(item.value / 100) * 250 + 20}px`,
                  transform: item.isSwapping ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                <span className="mb-2">{item.value}</span>
              </div>
              <span className="text-xs text-gray-600">{index}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap justify-center gap-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-700">Unsorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-700">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-700">Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-700">Sorted</span>
        </div>
      </div>

      {/* Current Step Explanation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Step:</h3>
        <p className="text-gray-700">{explanation}</p>
      </div>
    </div>
  );
};

export default BubbleSort;