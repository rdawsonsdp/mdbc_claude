'use client'

import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = "You are a purpose-driven business strategist who uses Cardology to guide entrepreneurs. Use birth cards, yearly and planetary spreads, planetary cycles, and cardology knowledge to offer actionable insight into growth, alignment, and income potential. Speak with grounded clarity, sharp wit, and the energy of a million-dollar mindset."

export default function BusinessCoachChat({ 
  birthCard, 
  forecast, 
  profile,
  onClose, 
  onSaveConversation,
  existingMessages = [],
  conversationTitle = null
}) {
  const [messages, setMessages] = useState(existingMessages.length > 0 ? existingMessages : [
    {
      role: 'assistant',
      content: `Hey there, powerhouse! 💫 I'm your Cardology Business Coach, and I'm here to decode your ${birthCard?.cardName || 'birth card'} into million-dollar strategies.\n\nYour card isn't just pretty symbolism—it's your business blueprint. Let's turn those cosmic insights into cold, hard cash flow. What's your biggest business challenge right now?`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId] = useState(() => Date.now().toString())
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    // Simulate AI response with business coach personality
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: generateBusinessCoachResponse(input, birthCard, forecast)
      }
      const finalMessages = [...newMessages, aiResponse]
      setMessages(finalMessages)
      setIsLoading(false)
    }, 1000)
  }

  const generateBusinessCoachResponse = (question, card, forecast) => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('money') || lowerQuestion.includes('revenue') || lowerQuestion.includes('income')) {
      return `🎯 Money talk? I'm here for it! Your ${card.cardName} has specific wealth-building superpowers.\n\nBased on your yearly spread, your Result card ${forecast.result} suggests your income potential peaks when you align with these energies. Your Long Range ${forecast.longRange} is showing me the strategic direction for sustainable wealth.\n\nHere's the million-dollar question: Are you pricing your services based on your card's natural authority, or are you undervaluing your cosmic advantage? Let's fix that pricing strategy and get you paid what you're worth.`
    }
    
    if (lowerQuestion.includes('marketing') || lowerQuestion.includes('brand') || lowerQuestion.includes('audience')) {
      return `🚀 Marketing with your ${card.cardName}? This is where you get to shine!\n\nYour card's energy naturally attracts certain types of clients. Your Venus ${forecast.venus} reveals your magnetism style, while your Mercury ${forecast.mercury} shows how you should communicate your message.\n\nStop trying to be everything to everyone. Your card gives you permission to be polarizing, authentic, and magnetic to YOUR people. What's your current marketing message, and is it aligned with your card's natural charisma?`
    }
    
    if (lowerQuestion.includes('scale') || lowerQuestion.includes('grow') || lowerQuestion.includes('expand')) {
      return `📈 Ready to scale? Your ${card.cardName} has a specific growth pattern written in the stars.\n\nYour Jupiter ${forecast.jupiter} shows where expansion flows naturally, while your Saturn ${forecast.saturn} reveals the structure you need to sustain that growth. Your age ${forecast.age} is activating certain business energies right now.\n\nHere's the truth: Most entrepreneurs try to scale by doing MORE. Your card says otherwise. What's the ONE thing you need to amplify to 10x your impact? Let's decode your natural scaling strategy.`
    }
    
    if (lowerQuestion.includes('stress') || lowerQuestion.includes('burnout') || lowerQuestion.includes('overwhelm')) {
      return `🔥 Burnout is NOT a business strategy, and your ${card.cardName} knows it.\n\nYour Neptune ${forecast.neptune} is highlighting where you're leaking energy, while your Mars ${forecast.mars} shows your natural work rhythm. You're trying to force a pace that's out of alignment.\n\nSuccess without soul-crushing stress? That's not just possible—it's your birthright. Your card has a built-in sustainability mechanism. What part of your business feels heavy right now? Let's realign it with your natural energy.`
    }
    
    return `💎 Great question! Your ${card.cardName} has layers of business wisdom we haven't unlocked yet.\n\nLooking at your current planetary influences - Mercury ${forecast.mercury}, Venus ${forecast.venus}, Mars ${forecast.mars} - there's a specific pattern emerging for your next level of success.\n\nYour Long Range ${forecast.longRange} is your North Star for this year. Every business decision should be filtered through this energy. Tell me more about what you're building, and I'll show you how your cards are already pointing toward your breakthrough.`
  }

  const handleSaveConversation = () => {
    if (profile && onSaveConversation) {
      onSaveConversation(profile.id, conversationId, messages, conversationTitle)
      
      // Show success feedback
      const button = document.getElementById('save-conversation-btn')
      if (button) {
        const originalText = button.innerHTML
        button.innerHTML = '✨ Saved!'
        button.classList.add('sparkle-effect')
        setTimeout(() => {
          button.innerHTML = originalText
          button.classList.remove('sparkle-effect')
        }, 2000)
      }
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold">Cardology Business Coach</h2>
            {profile && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {profile.name} • {profile.birthCard?.cardName}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about scaling, marketing, money strategies..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-black dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
            {profile && (
              <button
                id="save-conversation-btn"
                type="button"
                onClick={handleSaveConversation}
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                title="Save Conversation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}