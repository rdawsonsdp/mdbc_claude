'use client'

import React, { useState, useEffect } from 'react'
import { getBirthCard } from './utils/birthCardLookup'
import { calculateAge } from './utils/ageUtils'
import CardModal from './CardModal'
import GPTChat from './GPTChat'

export default function MDBCApp() {
  const [birthdate, setBirthdate] = useState('')
  const [birthCard, setBirthCard] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [showCardModal, setShowCardModal] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleBirthdateSubmit = (e) => {
    e.preventDefault()
    if (birthdate) {
      const card = getBirthCard(birthdate)
      setBirthCard(card)
      
      // Calculate age and get forecast
      const age = calculateAge(birthdate)
      // Here you would fetch the forecast based on card and age
      // For now, we'll set a placeholder
      setForecast({
        age,
        mercury: 'K♥',
        venus: 'Q♦',
        mars: '6♣',
        jupiter: '4♠',
        saturn: '2♦',
        uranus: 'J♠',
        neptune: '8♣',
        longRange: 'K♥',
        pluto: '6♦',
        result: '4♠'
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Daily Birth Card</h1>
      
      <form onSubmit={handleBirthdateSubmit} className="max-w-md mx-auto mb-8">
        <div className="mb-4">
          <label htmlFor="birthdate" className="block text-sm font-medium mb-2">
            Enter Your Birthdate
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Get My Birth Card
        </button>
      </form>

      {birthCard && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Your Birth Card</h2>
            <div className="flex items-center justify-center mb-4">
              <div 
                className="text-6xl cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setShowCardModal(true)}
              >
                {birthCard.card}
              </div>
            </div>
            <p className="text-center text-lg">{birthCard.cardName}</p>
          </div>

          {forecast && (
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Yearly Forecast (Age {forecast.age})</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Mercury:</span> {forecast.mercury}
                </div>
                <div>
                  <span className="font-medium">Venus:</span> {forecast.venus}
                </div>
                <div>
                  <span className="font-medium">Mars:</span> {forecast.mars}
                </div>
                <div>
                  <span className="font-medium">Jupiter:</span> {forecast.jupiter}
                </div>
                <div>
                  <span className="font-medium">Saturn:</span> {forecast.saturn}
                </div>
                <div>
                  <span className="font-medium">Uranus:</span> {forecast.uranus}
                </div>
                <div>
                  <span className="font-medium">Neptune:</span> {forecast.neptune}
                </div>
                <div>
                  <span className="font-medium">Long Range:</span> {forecast.longRange}
                </div>
                <div>
                  <span className="font-medium">Pluto:</span> {forecast.pluto}
                </div>
                <div>
                  <span className="font-medium">Result:</span> {forecast.result}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowChat(true)}
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
          >
            Ask AI About Your Reading
          </button>
        </div>
      )}

      {showCardModal && birthCard && (
        <CardModal
          card={birthCard}
          onClose={() => setShowCardModal(false)}
        />
      )}

      {showChat && (
        <GPTChat
          birthCard={birthCard}
          forecast={forecast}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  )
}