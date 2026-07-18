import { useState, useEffect } from 'react'
import { fetchToday, fetchMonthRituals, fetchCalendar } from './api/calendar'
import Sidebar from './components/Sidebar'
import MobileTopBar from './components/MobileTopBar'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import BentoCards from './components/BentoCards'
import MobileRitualList from './components/MobileRitualList'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768)
  const [today, setToday] = useState(null)
  const [calendar, setCalendar] = useState(null)
  const [monthRituals, setMonthRituals] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  useEffect(() => {
    document.body.style.opacity = '0'
    const timer = setTimeout(() => {
      document.body.style.transition = 'opacity 1s ease-out'
      document.body.style.opacity = '1'
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    fetchToday().then(setToday).catch(console.error)
  }, [])

  useEffect(() => {
    fetchCalendar(currentMonth + 1, currentYear).then(setCalendar).catch(console.error)
  }, [currentMonth, currentYear])

  useEffect(() => {
    fetchMonthRituals(currentMonth, currentYear).then(setMonthRituals).catch(console.error)
  }, [currentMonth, currentYear])

  const goPrevMonth = () => {
    setCurrentMonth(m => m === 0 ? 11 : m - 1)
    if (currentMonth === 0) setCurrentYear(y => y - 1)
  }

  const goNextMonth = () => {
    setCurrentMonth(m => m === 11 ? 0 : m + 1)
    if (currentMonth === 11) setCurrentYear(y => y + 1)
  }

  const goToday = () => {
    const now = new Date()
    setCurrentMonth(now.getMonth())
    setCurrentYear(now.getFullYear())
  }

  const goYear = (y) => setCurrentYear(y)

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-on-background overflow-x-hidden">
      <MobileTopBar onToggleMenu={() => setSidebarOpen(v => !v)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} today={today} monthRituals={monthRituals} />
      <main
        className={`flex-grow bg-surface-container-lowest transition-all duration-500 pt-14 md:pt-0 ${
          sidebarOpen ? 'md:ml-sidebar-width' : 'md:ml-0'
        }`}
      >
        <CalendarHeader
          onToggleSidebar={() => setSidebarOpen(v => !v)}
          sidebarOpen={sidebarOpen}
          month={currentMonth}
          year={currentYear}
          onPrevMonth={goPrevMonth}
          onNextMonth={goNextMonth}
          onToday={goToday}
          onYearChange={goYear}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(v => !v)}
        />
        <CalendarGrid calendar={calendar} />
        <MobileRitualList today={today} monthRituals={monthRituals} />
        <BentoCards today={today} monthRituals={monthRituals} />
      </main>
    </div>
  )
}

export default App
