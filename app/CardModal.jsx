'use client'

import React from 'react'

export default function CardModal({ card, onClose }) {
  if (!card) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-8 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{card.cardName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="text-8xl">
            {card.card}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Your birth card represents your core personality and life path.
          </p>
          
          <p className="text-sm text-gray-500">
            The {card.cardName} brings unique qualities and challenges to your life journey.
          </p>
        </div>
      </div>
    </div>
  );
}