import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MobileTopBar from './components/MobileTopBar'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import BentoCards from './components/BentoCards'
import MobileRitualList from './components/MobileRitualList'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
      <MobileTopBar onToggleMenu={() => setSidebarOpen(v => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main
        className={`flex-grow bg-surface-container-lowest transition-all duration-500 ${
          sidebarOpen ? 'md:ml-sidebar-width' : 'md:ml-0'
        }`}
      >
        <CalendarHeader onToggleSidebar={() => setSidebarOpen(v => !v)} sidebarOpen={sidebarOpen} />
        <CalendarGrid />
        <MobileRitualList />
        <BentoCards />
      </main>
    </div>
  )
}

export default App
