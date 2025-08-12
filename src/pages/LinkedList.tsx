import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, ArrowRight } from 'lucide-react';

interface ListNode {
  value: string;
  id: number;
  isAnimating: boolean;
}

const LinkedList = () => {
  const [nodes, setNodes] = useState<ListNode[]>([
    { value: 'Head', id: 1, isAnimating: false },
    { value: 'Node1', id: 2, isAnimating: false },
    { value: 'Tail', id: 3, isAnimating: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [insertIndex, setInsertIndex] = useState(0);
  const [lastOperation, setLastOperation] = useState<string>('');
  const [nextId, setNextId] = useState(4);

  const insertNode = () => {
    if (inputValue.trim() && insertIndex >= 0 && insertIndex <= nodes.length) {
      const newNode: ListNode = {
        value: inputValue.trim(),
        id: nextId,
        isAnimating: true
      };
      
      const newNodes = [...nodes];
      newNodes.splice(insertIndex, 0, newNode);
      setNodes(newNodes);
      setLastOperation(`Inserted "${inputValue.trim()}" at position ${insertIndex}`);
      setInputValue('');
      setNextId(prev => prev + 1);

      setTimeout(() => {
        setNodes(prev => prev.map(node => 
          node.id === newNode.id ? { ...node, isAnimating: false } : node
        ));
      }, 300);
    }
  };

  const deleteNode = () => {
    if (insertIndex >= 0 && insertIndex < nodes.length) {
      const deletedNode = nodes[insertIndex];
      setNodes(prev => prev.filter((_, index) => index !== insertIndex));
      setLastOperation(`Deleted "${deletedNode.value}" from position ${insertIndex}`);
      if (insertIndex >= nodes.length - 1) {
        setInsertIndex(Math.max(0, nodes.length - 2));
      }
    } else {
      setLastOperation('Invalid position for deletion');
    }
  };

  const appendNode = () => {
    if (inputValue.trim()) {
      const newNode: ListNode = {
        value: inputValue.trim(),
        id: nextId,
        isAnimating: true
      };
      
      setNodes(prev => [...prev, newNode]);
      setLastOperation(`Appended "${inputValue.trim()}" to end of list`);
      setInputValue('');
      setNextId(prev => prev + 1);

      setTimeout(() => {
        setNodes(prev => prev.map(node => 
          node.id === newNode.id ? { ...node, isAnimating: false } : node
        ));
      }, 300);
    }
  };

  const prependNode = () => {
    if (inputValue.trim()) {
      const newNode: ListNode = {
        value: inputValue.trim(),
        id: nextId,
        isAnimating: true
      };
      
      setNodes(prev => [newNode, ...prev]);
      setLastOperation(`Prepended "${inputValue.trim()}" to beginning of list`);
      setInputValue('');
      setNextId(prev => prev + 1);

      setTimeout(() => {
        setNodes(prev => prev.map(node => 
          node.id === newNode.id ? { ...node, isAnimating: false } : node
        ));
      }, 300);
    }
  };

  const clear = () => {
    setNodes([]);
    setLastOperation('Linked list cleared');
    setNextId(1);
    setInsertIndex(0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      insertNode();
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Linked List Data Structure</h1>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>Dynamic Structure:</strong> A linked list is a linear data structure where elements (nodes) are stored in sequence, 
            but not necessarily in contiguous memory locations. Each node contains data and a pointer/reference to the next node.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Operations:</strong> Insert, Delete, Search, Append, Prepend
            | <strong>Time Complexity:</strong> O(1) insert/delete at known position, O(n) search
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Linked List Operations</h3>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter node value"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="number"
                  value={insertIndex}
                  onChange={(e) => setInsertIndex(parseInt(e.target.value) || 0)}
                  placeholder="Position"
                  min="0"
                  max={nodes.length}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={insertNode}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert</span>
                </button>
                <button
                  onClick={deleteNode}
                  disabled={nodes.length === 0}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={prependNode}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                >
                  Prepend
                </button>
                <button
                  onClick={appendNode}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                >
                  Append
                </button>
                <button
                  onClick={clear}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          {/* List Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">List Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Length:</span>
                <span className="font-semibold text-indigo-600">{nodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Is Empty:</span>
                <span className={`font-semibold ${nodes.length === 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {nodes.length === 0 ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">First Node:</span>
                <span className="font-semibold text-blue-600">
                  {nodes.length > 0 ? nodes[0].value : 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Last Node:</span>
                <span className="font-semibold text-green-600">
                  {nodes.length > 0 ? nodes[nodes.length - 1].value : 'None'}
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

        {/* Linked List Visualization */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Linked List Visualization</h3>
          
          <div className="overflow-x-auto">
            {nodes.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-400">
                <span>Empty Linked List</span>
              </div>
            ) : (
              <div className="flex items-center space-x-4 min-w-full p-4">
                {nodes.map((node, index) => (
                  <React.Fragment key={node.id}>
                    <div className={`flex flex-col items-center transform transition-all duration-300 ${
                      node.isAnimating ? 'scale-110' : ''
                    }`}>
                      <div className={`bg-indigo-500 text-white px-4 py-3 rounded-lg font-medium min-w-20 text-center border-2 border-indigo-600 ${
                        index === insertIndex ? 'ring-2 ring-yellow-400 ring-opacity-60' : ''
                      }`}>
                        {node.value}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Index: {index}</div>
                      {index === insertIndex && (
                        <div className="text-xs text-yellow-600 mt-1 font-semibold">Selected</div>
                      )}
                    </div>
                    {index < nodes.length - 1 && (
                      <div className="flex flex-col items-center">
                        <ArrowRight className="w-6 h-6 text-gray-500" />
                        <div className="text-xs text-gray-500 mt-1">next</div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 font-bold">∅</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">null</div>
                </div>
              </div>
            )}
          </div>

          {/* Position indicator */}
          <div className="mt-6 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Insert/Delete Position: {insertIndex}</span>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                  <span>Node</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>Selected Position</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="mt-8 bg-gray-900 text-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Linked List Operations (JavaScript)</h3>
        <pre className="text-sm overflow-x-auto">
          <code>{`class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Insert at beginning
  prepend(value) {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  // Insert at end
  append(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  // Insert at specific position
  insert(index, value) {
    if (index === 0) return this.prepend(value);
    
    const newNode = new ListNode(value);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.length++;
  }
}`}</code>
        </pre>
      </div>
    </div>
  );
};

export default LinkedList;