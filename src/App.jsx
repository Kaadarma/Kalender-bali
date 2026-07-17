import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MobileTopBar from './components/MobileTopBar'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import BentoCards from './components/BentoCards'
import MobileRitualList from './components/MobileRitualList'

function App() {
  useEffect(() => {
    document.body.style.opacity = '0'
    const timer = setTimeout(() => {
      document.body.style.transition = 'opacity 1s ease-out'
      document.body.style.opacity = '1'
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-on-background overflow-x-hidden">
      <MobileTopBar />
      <Sidebar />
      <main className="flex-grow md:ml-sidebar-width bg-surface-container-lowest transition-all duration-500">
        <CalendarHeader />
        <CalendarGrid />
        <MobileRitualList />
        <BentoCards />
      </main>
    </div>
  )
}

export default App
