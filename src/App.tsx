import { useState } from "react"
import { HabitForm } from "./components/HabitForm"
import { HabitList } from "./components/HabitList"
import { Header } from "./components/Header"
import { HabitProvider } from "./context/HabitProvider"
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns"
import { motion } from "framer-motion"

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0)

  const week = addWeeks(new Date(), weekOffset)
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  })

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl flex flex-col gap-6 sm:gap-8"
      >
        <HabitProvider>
          <Header
            visibleDates={visibleDates}
            onNext={() => setWeekOffset(o => o + 1)}
            onPrev={() => setWeekOffset(o => o - 1)}
          />
          
          <div className="flex flex-col gap-4">
            <HabitForm />
            <HabitList visibleDates={visibleDates} />
          </div>
        </HabitProvider>
      </motion.div>
      
      <footer className="mt-12 text-zinc-600 text-sm font-medium">
        Built with passion for progress
      </footer>
    </div>
  )
}
