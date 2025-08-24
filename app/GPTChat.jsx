'use client'

import React, { useState } from 'react'

export default function GPTChat({ birthCard, forecast, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I can help you understand your birth card (${birthCard?.cardName}) and your yearly forecast. What would you like to know?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (in production, this would call an API)
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: generateResponse(input, birthCard, forecast)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (question, card, forecast) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('meaning') || lowerQuestion.includes('what does')) {
      return `The ${card.cardName} represents leadership, passion, and emotional depth. People with this birth card are often natural leaders who inspire others through their enthusiasm and charisma.`;
    }
    
    if (lowerQuestion.includes('forecast') || lowerQuestion.includes('year')) {
      return `Your current age is ${forecast.age}, and this year's forecast shows ${forecast.longRange} as your Long Range card. This suggests a year focused on personal relationships and emotional fulfillment. Your Result card ${forecast.result} indicates potential for stability and material success.`;
    }
    
    if (lowerQuestion.includes('mercury') || lowerQuestion.includes('venus') || lowerQuestion.includes('mars')) {
      return `Your planetary periods this year show different influences throughout the year. Mercury (${forecast.mercury}) affects communication and learning, Venus (${forecast.venus}) influences relationships and values, and Mars (${forecast.mars}) impacts your energy and drive.`;
    }
    
    return `That's an interesting question about your ${card.cardName}. Each birth card has unique qualities and your yearly forecast provides insights into the energies affecting you this year. Feel free to ask about specific aspects like your card's meaning, yearly forecast, or planetary influences.`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">AI Card Reading Assistant</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your birth card or forecast..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}