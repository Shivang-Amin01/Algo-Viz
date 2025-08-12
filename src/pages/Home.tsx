import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpDown, Database, Search, List, Clock, Zap } from 'lucide-react';

const Home = () => {
  const algorithmCategories = [
    {
      title: 'Sorting Algorithms',
      icon: <ArrowUpDown className="w-8 h-8" />,
      description: 'Learn how different sorting algorithms work with visual step-by-step demonstrations.',
      algorithms: [
        { name: 'Bubble Sort', path: '/bubble-sort', difficulty: 'Beginner', time: 'O(n²)' },
        { name: 'Quick Sort', path: '/quick-sort', difficulty: 'Advanced', time: 'O(n log n)' },
      ],
      color: 'blue',
    },
    {
      title: 'Data Structures',
      icon: <Database className="w-8 h-8" />,
      description: 'Understand how data structures store and organize information efficiently.',
      algorithms: [
        { name: 'Stack', path: '/stack', difficulty: 'Beginner', time: 'O(1)' },
        { name: 'Queue', path: '/queue', difficulty: 'Beginner', time: 'O(1)' },
        { name: 'Linked List', path: '/linked-list', difficulty: 'Intermediate', time: 'O(n)' },
      ],
      color: 'green',
    },
    {
      title: 'Search Algorithms',
      icon: <Search className="w-8 h-8" />,
      description: 'Discover efficient ways to find elements in different data structures.',
      algorithms: [
        { name: 'Binary Search', path: '/binary-search', difficulty: 'Intermediate', time: 'O(log n)' },
      ],
      color: 'orange',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColors = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600 text-white';
      case 'green': return 'bg-green-600 text-white';
      case 'orange': return 'bg-orange-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Learn Algorithms
          <span className="block text-blue-600 mt-2">Through Visualization</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Master computer science algorithms with interactive visualizations, step-by-step explanations, 
          and hands-on practice. Perfect for students and developers of all levels.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">Interactive Learning</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md">
            <Zap className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Real-time Visualization</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md">
            <List className="w-5 h-5 text-orange-600" />
            <span className="text-gray-700">Step-by-step Guide</span>
          </div>
        </div>
      </div>

      {/* Algorithm Categories */}
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-12">
        {algorithmCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-lg ${getCategoryColors(category.color)} mr-4`}>
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-gray-600 mt-1">{category.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.algorithms.map((algorithm, algorithmIndex) => (
                <Link
                  key={algorithmIndex}
                  to={algorithm.path}
                  className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-200 hover:transform hover:scale-105 border border-gray-200 hover:border-gray-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{algorithm.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(algorithm.difficulty)}`}>
                      {algorithm.difficulty}
                    </span>
                    <span className="text-sm text-gray-500 font-mono bg-gray-200 px-2 py-1 rounded">
                      {algorithm.time}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-20 bg-white rounded-2xl shadow-xl p-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Algo-Viz?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Learning</h3>
            <p className="text-gray-600">
              Engage with algorithms through hands-on manipulation and real-time feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Visual Explanations</h3>
            <p className="text-gray-600">
              See exactly how algorithms work with step-by-step visual demonstrations.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Coverage</h3>
            <p className="text-gray-600">
              From basic data structures to advanced algorithms, we cover it all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;