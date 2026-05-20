import { useState } from 'react'
import OnboardingPage from './features/auth/pages/OnboardingPage'
import LoginPage from './features/auth/pages/LoginPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('onboarding')

  if (currentPage === 'onboarding') {
    return <OnboardingPage onComplete={() => setCurrentPage('login')} />
  }

  if (currentPage === 'login') {
    return <LoginPage />
  }

  return null
}

export default App