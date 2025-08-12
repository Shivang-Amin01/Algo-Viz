import React, { useState } from 'react';
import { Play, RotateCcw, Plus } from 'lucide-react';

const QuickSort = () => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [newValue, setNewValue] = useState('');
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
  const [explanation, setExplanation] = useState('Quick Sort uses divide-and-conquer to efficiently sort arrays');

  const addValue = () => {
    const value = parseInt(newValue);
    if (value && value >= 1 && value <= 100) {
      setArray(prev => [...prev, value]);
      setNewValue('');
      setSortedIndices(new Set());
    }
  };

  const resetArray = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setSortedIndices(new Set());
    setExplanation('Array reset. Quick Sort uses divide-and-conquer approach.');
  };

  const quickSort = async () => {
    const arr = [...array];
    setSortedIndices(new Set());
    
    const sort = async (low: number, high: number) => {
      if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await sort(low, pivotIndex - 1);
        await sort(pivotIndex + 1, high);
      }
    };

    const partition = async (arr: number[], low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          setExplanation(`Comparing ${arr[j]} with pivot ${pivot}. Swapping elements at positions ${i} and ${j}.`);
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      setExplanation(`Placing pivot ${pivot} in its correct position at index ${i + 1}.`);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return i + 1;
    };

    await sort(0, arr.length - 1);
    setSortedIndices(new Set(Array.from({ length: arr.length }, (_, i) => i)));
    setExplanation('Quick Sort completed! All elements are now in ascending order.');
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Quick Sort Visualization</h1>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>How it works:</strong> Quick Sort picks a 'pivot' element and partitions the array around it, 
            placing smaller elements before the pivot and larger elements after it. Then recursively sorts the sub-arrays.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Time Complexity:</strong> O(n log n) average, O(n²) worst case | <strong>Space Complexity:</strong> O(log n)
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <button
          onClick={quickSort}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Play className="w-5 h-5" />
          <span>Start Quick Sort</span>
        </button>

        <button
          onClick={resetArray}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Add value (1-100)"
            min="1"
            max="100"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={addValue}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Visualization */}
      <div className="mb-8">
        <div className="flex items-end justify-center space-x-2 h-80 bg-gray-50 rounded-lg p-6">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={`w-12 transition-all duration-300 rounded-t-lg flex items-end justify-center text-white font-bold text-sm ${
                  sortedIndices.has(index) ? 'bg-green-500' : 'bg-purple-500'
                }`}
                style={{ height: `${(value / 100) * 250 + 20}px` }}
              >
                <span className="mb-2">{value}</span>
              </div>
              <span className="text-xs text-gray-600">{index}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 flex justify-center gap-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-sm text-gray-700">Unsorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-700">Sorted</span>
        </div>
      </div>

      {/* Current Step Explanation */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Algorithm Progress:</h3>
        <p className="text-gray-700">{explanation}</p>
      </div>
    </div>
  );
};

export default QuickSort;