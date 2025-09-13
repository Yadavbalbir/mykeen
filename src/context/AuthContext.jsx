import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email, password) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setUser({ id: 1, email, name: email.split('@')[0] })
      setIsLoading(false)
    }, 1000)
  }

  const signup = async (name, email, password) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setUser({ id: 1, email, name })
      setIsLoading(false)
    }, 1000)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}