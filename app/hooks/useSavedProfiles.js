'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'mdbc_saved_profiles'
const CONVERSATIONS_KEY = 'mdbc_conversations'

export function useSavedProfiles() {
  const [profiles, setProfiles] = useState([])
  const [conversations, setConversations] = useState({})

  // Load profiles from localStorage
  useEffect(() => {
    const savedProfiles = localStorage.getItem(STORAGE_KEY)
    const savedConversations = localStorage.getItem(CONVERSATIONS_KEY)
    
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles))
    }
    
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations))
    }
  }, [])

  // Save profiles to localStorage
  const saveProfiles = (newProfiles) => {
    setProfiles(newProfiles)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfiles))
  }

  // Save conversations to localStorage
  const saveConversations = (newConversations) => {
    setConversations(newConversations)
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(newConversations))
  }

  // Add a new profile
  const addProfile = (name, birthDate, birthCard, forecast) => {
    const newProfile = {
      id: Date.now().toString(),
      name,
      birthDate,
      birthCard,
      forecast,
      createdAt: new Date().toISOString()
    }
    
    const updatedProfiles = [...profiles, newProfile]
    saveProfiles(updatedProfiles)
    return newProfile
  }

  // Delete a profile
  const deleteProfile = (id) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id)
    saveProfiles(updatedProfiles)
    
    // Also delete conversations for this profile
    const updatedConversations = { ...conversations }
    delete updatedConversations[id]
    saveConversations(updatedConversations)
  }

  // Get profile by ID
  const getProfile = (id) => {
    return profiles.find(profile => profile.id === id)
  }

  // Save conversation for a profile
  const saveConversation = (profileId, conversationId, messages, title = null) => {
    const updatedConversations = {
      ...conversations,
      [profileId]: {
        ...conversations[profileId],
        [conversationId]: {
          id: conversationId,
          messages,
          title: title || `Conversation ${new Date().toLocaleDateString()}`,
          updatedAt: new Date().toISOString()
        }
      }
    }
    
    saveConversations(updatedConversations)
  }

  // Get conversations for a profile
  const getConversations = (profileId) => {
    return conversations[profileId] || {}
  }

  // Delete a conversation
  const deleteConversation = (profileId, conversationId) => {
    const updatedConversations = { ...conversations }
    if (updatedConversations[profileId]) {
      delete updatedConversations[profileId][conversationId]
      saveConversations(updatedConversations)
    }
  }

  // Rename a conversation
  const renameConversation = (profileId, conversationId, newTitle) => {
    const updatedConversations = {
      ...conversations,
      [profileId]: {
        ...conversations[profileId],
        [conversationId]: {
          ...conversations[profileId][conversationId],
          title: newTitle
        }
      }
    }
    
    saveConversations(updatedConversations)
  }

  return {
    profiles,
    conversations,
    addProfile,
    deleteProfile,
    getProfile,
    saveConversation,
    getConversations,
    deleteConversation,
    renameConversation
  }
}