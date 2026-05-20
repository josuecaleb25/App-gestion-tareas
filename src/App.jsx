import AppRouter from './routes'
import { useThemeApply } from './hooks/useTheme'
import './App.css'

function App() {
  useThemeApply()
  return <AppRouter />
}

export default App