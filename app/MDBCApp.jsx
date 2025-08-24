'use client'

import React, { useState, useEffect } from 'react'
import { getBirthCard } from './utils/birthCardLookup'
import { calculateAge, getDaysUntilBirthday } from './utils/ageUtils'
import { useSavedProfiles } from './hooks/useSavedProfiles'
import OnboardingCarousel from './components/OnboardingCarousel'
import BusinessCoachChat from './components/BusinessCoachChat'
import CardModal from './CardModal'

export default function MDBCApp() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [birthCard, setBirthCard] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [currentProfile, setCurrentProfile] = useState(null)
  const [showCardModal, setShowCardModal] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState('')
  
  const { 
    profiles, 
    addProfile, 
    deleteProfile, 
    getProfile, 
    saveConversation,
    getConversations 
  } = useSavedProfiles()

  // Calculate planetary cycle dates
  const getPlanetaryDates = (birthdate, age) => {
    const birthDate = new Date(birthdate)
    const currentYear = new Date().getFullYear()
    const birthdayThisYear = new Date(currentYear, birthDate.getMonth(), birthDate.getDate())
    
    // Each planetary period is roughly 52 days
    const daysSinceBirthday = Math.floor((new Date() - birthdayThisYear) / (1000 * 60 * 60 * 24))
    const periodsElapsed = Math.floor(daysSinceBirthday / 52)
    
    const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
    const dates = {}
    
    planets.forEach((planet, index) => {
      const periodStart = new Date(birthdayThisYear)
      periodStart.setDate(periodStart.getDate() + (index * 52))
      dates[planet.toLowerCase()] = periodStart.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: '2-digit' 
      })
    })
    
    return dates
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (name && birthdate) {
      setIsLoading(true)
      setShowResult(false)
      
      setTimeout(() => {
        const card = getBirthCard(birthdate)
        setBirthCard(card)
        
        const age = calculateAge(birthdate)
        const daysUntil = getDaysUntilBirthday(birthdate)
        const planetaryDates = getPlanetaryDates(birthdate, age)
        
        const newForecast = {
          age,
          daysUntilBirthday: daysUntil,
          birthCard: card.card,
          longRange: 'K♥',
          pluto: '6♦',
          result: '4♠',
          support: '9♣',
          development: '7♥',
          mercury: 'K♥',
          venus: 'Q♦',
          mars: '6♣',
          jupiter: '4♠',
          saturn: '2♦',
          uranus: 'J♠',
          neptune: '8♣',
          planetaryDates
        }
        
        setForecast(newForecast)
        setCurrentProfile({ name, birthdate, birthCard: card, forecast: newForecast })
        setIsLoading(false)
        setShowResult(true)
      }, 1000)
    }
  }

  const handleSaveProfile = () => {
    if (currentProfile && birthCard && forecast) {
      const profile = addProfile(name, birthdate, birthCard, forecast)
      setCurrentProfile(profile)
      
      // Show success feedback with sparkle effect
      const button = document.getElementById('save-profile-btn')
      if (button) {
        const originalText = button.innerHTML
        button.innerHTML = '✨ Added to your Saved Profiles'
        button.classList.add('sparkle-effect')
        setTimeout(() => {
          button.innerHTML = originalText
          button.classList.remove('sparkle-effect')
        }, 3000)
      }
    }
  }

  const handleDeleteProfile = (profileId) => {
    deleteProfile(profileId)
    if (currentProfile?.id === profileId) {
      handleTryAnother()
    }
  }

  const handleLoadProfile = (profileId) => {
    const profile = getProfile(profileId)
    if (profile) {
      setName(profile.name)
      setBirthdate(profile.birthDate)
      setBirthCard(profile.birthCard)
      setForecast(profile.forecast)
      setCurrentProfile(profile)
      setShowResult(true)
      setSelectedProfile('')
    }
  }

  const handleTryAnother = () => {
    setShowResult(false)
    setName('')
    setBirthdate('')
    setBirthCard(null)
    setForecast(null)
    setCurrentProfile(null)
    setSelectedProfile('')
  }

  const handleSaveConversation = (profileId, conversationId, messages, title) => {
    saveConversation(profileId, conversationId, messages, title)
  }

  if (showOnboarding) {
    return (
      <OnboardingCarousel
        onComplete={() => setShowOnboarding(false)}
        onSkip={() => setShowOnboarding(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-12 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">My Daily Birth Card</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover your business blueprint and unlock your million-dollar potential
          </p>
        </header>

        {/* Enter Your Information Form */}
        {!showResult && (
          <div className="max-w-md mx-auto fade-in">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-center mb-6">Enter Your Information</h2>
              
              {/* Saved Profiles Dropdown */}
              {profiles.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Saved Profiles
                  </label>
                  <select
                    value={selectedProfile}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleLoadProfile(e.target.value)
                      }
                    }}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  >
                    <option value="">Select a saved profile...</option>
                    {profiles.map(profile => (
                      <option key={profile.id} value={profile.id}>
                        {profile.name} - {new Date(profile.birthDate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <form onSubmit={handleFormSubmit}>
                <div className="input-group">
                  <label htmlFor="name">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Name/Business Name
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-black"
                    placeholder="Enter your name or business name"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="birthdate">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Birth Date
                    </span>
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="text-black"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    <>
                      Show Me My Million Dollar Map
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResult && birthCard && (
          <div className="fade-in">
            {/* Profile Header */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="card p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Name/Business Name: {name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Born: {new Date(birthdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • Age: {forecast.age}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      id="save-profile-btn"
                      onClick={handleSaveProfile}
                      className="btn btn-secondary"
                    >
                      Save
                    </button>
                    {currentProfile?.id && (
                      <button
                        onClick={() => handleDeleteProfile(currentProfile.id)}
                        className="btn bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Birth Card Display */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="card p-8 text-center">
                <div className="mb-8">
                  <div 
                    className="playing-card inline-block cursor-pointer hover:scale-110 transition-all"
                    onClick={() => setShowCardModal(true)}
                  >
                    {birthCard.card}
                  </div>
                </div>
                
                <h3 className="text-3xl font-semibold mb-2">{birthCard.cardName}</h3>
                <p className="text-gray-600 dark:text-gray-400">Your Business Blueprint</p>
              </div>
            </div>

            {/* Yearly Strategic Outlook */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="card p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Yearly Strategic Outlook</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { name: 'Birth Card', value: forecast.birthCard },
                    { name: 'Long Range', value: forecast.longRange },
                    { name: 'Pluto', value: forecast.pluto },
                    { name: 'Result', value: forecast.result },
                    { name: 'Support', value: forecast.support },
                    { name: 'Development', value: forecast.development }
                  ].map((card) => (
                    <div key={card.name} className="text-center group">
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 transition-all hover:scale-105 cursor-pointer">
                        <div className="text-4xl mb-2 group-hover:animate-pulse">{card.value}</div>
                        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">{card.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 52-day Energetic Business Cycles */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="card p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Your 52-day Energetic Business Cycles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: 'Mercury', value: forecast.mercury, date: forecast.planetaryDates?.mercury },
                    { name: 'Venus', value: forecast.venus, date: forecast.planetaryDates?.venus },
                    { name: 'Mars', value: forecast.mars, date: forecast.planetaryDates?.mars },
                    { name: 'Jupiter', value: forecast.jupiter, date: forecast.planetaryDates?.jupiter },
                    { name: 'Saturn', value: forecast.saturn, date: forecast.planetaryDates?.saturn },
                    { name: 'Uranus', value: forecast.uranus, date: forecast.planetaryDates?.uranus },
                    { name: 'Neptune', value: forecast.neptune, date: forecast.planetaryDates?.neptune }
                  ].map((planet) => (
                    <div key={planet.name} className="text-center group">
                      <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-4 transition-all hover:scale-105 cursor-pointer">
                        <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                          {planet.date}
                        </div>
                        <div className="text-4xl mb-2 group-hover:animate-pulse">{planet.value}</div>
                        <div className="font-semibold text-gray-700 dark:text-gray-300">{planet.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
              <button
                onClick={() => setShowChat(true)}
                className="btn btn-primary flex-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Ask Your Business Coach
              </button>
              
              <button
                onClick={handleTryAnother}
                className="btn btn-secondary flex-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Another Profile
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        {showCardModal && birthCard && (
          <CardModal
            card={birthCard}
            onClose={() => setShowCardModal(false)}
          />
        )}

        {showChat && (
          <BusinessCoachChat
            birthCard={birthCard}
            forecast={forecast}
            profile={currentProfile}
            onClose={() => setShowChat(false)}
            onSaveConversation={handleSaveConversation}
          />
        )}
      </div>
    </div>
  )
}