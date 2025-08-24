'use client'

import React, { useState } from 'react'

const slides = [
  {
    title: "Your Card Is Your Business Blueprint",
    subtitle: "You were born with the strategy. We're here to decode it.",
    description: "Your birth card reveals your strengths, blind spots, marketing style, and growth path. No fluff—just aligned, purpose-driven clarity to build your business without burnout."
  },
  {
    title: "Get Forecasts That Actually Mean Something",
    subtitle: "Your age activates new energies every year.",
    description: "Your yearly spread shows you exactly what to focus on right now—from what to build to what to release. It's business planning with divine timing."
  },
  {
    title: "Scale with Soul, Not Stress",
    subtitle: "Custom insights. Real results. Card-based strategy.",
    description: "You'll get your birth card profile, yearly forecast cards, and aligned actions that help you grow a business that actually loves you back. Let's get you decoded."
  }
]

export default function OnboardingCarousel({ onComplete, onSkip }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Skip button */}
          <div className="text-center mb-8">
            <button
              onClick={onSkip}
              className="text-white/70 hover:text-white text-sm underline transition-colors"
            >
              Skip
            </button>
          </div>

          {/* Slide content */}
          <div className="text-center text-white fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-200 font-medium">
              {slides[currentSlide].subtitle}
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed text-purple-100">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-16 space-x-6">
            {/* Previous button */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress indicator */}
          <div className="mt-8">
            <div className="max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-purple-200 mb-2">
                <span>{currentSlide + 1}</span>
                <span>{slides.length}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1">
                <div
                  className="bg-gradient-to-r from-pink-400 to-purple-400 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* CTA for final slide */}
          {currentSlide === slides.length - 1 && (
            <div className="text-center mt-12 fade-in">
              <button
                onClick={onComplete}
                className="btn btn-primary text-lg px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}