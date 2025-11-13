'use client'
import {Flame, Laptop, Briefcase, FlaskConical, HeartPulse, Trophy, BookMarked } from 'lucide-react';
import React from 'react'


const categories = [
    { name: 'Trending', icon: Flame },
    { name: 'Technology', icon: Laptop },
    { name: 'Business', icon: Briefcase },
    { name: 'Science', icon: FlaskConical },
    { name: 'Health', icon: HeartPulse },
    { name: 'Sports', icon: Trophy },
  ];

const CategoriesNavigation = ({ activeCategory, onCategoryChange }) => {
  

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => onCategoryChange(cat.name)}
                  className={`flex items-center gap-2 cursor-pointer whitespace-nowrap pb-2 px-1 border-b-2 transition-colors ${
                    activeCategory === cat.name
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};


export default CategoriesNavigation