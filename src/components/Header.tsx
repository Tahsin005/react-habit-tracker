import { format, isToday } from "date-fns"
import { useHabits } from "../context/useHabits"
import { Button } from "./Button"
import { CheckCircle2, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { motion } from "framer-motion"

type HeaderProps = {
  visibleDates: Date[]
  onPrev: () => void
  onNext: () => void
}

export function Header({ visibleDates, onNext, onPrev }: HeaderProps) {
  const { habits } = useHabits()

  const doneToday = habits.filter(h =>
    h.completions.some(c => isToday(c)),
  ).length

  const progress = habits.length === 0 ? 0 : (doneToday / habits.length) * 100
  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-5 sm:p-6 rounded-3xl flex flex-col gap-5 sm:gap-6 shadow-2xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Habit Tracker
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-zinc-400 text-sm font-medium">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{doneToday} of {habits.length} achieved today</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 bg-zinc-900/30 p-1.5 rounded-full border border-zinc-800/50 sm:bg-transparent sm:p-0 sm:border-0">
          <Button onClick={onPrev} variant="secondary" className="w-9 h-9 sm:w-10 sm:h-10 p-0 rounded-full">
            <ChevronLeft size={18} />
          </Button>
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-800/50 rounded-full border border-zinc-700/50 text-[10px] sm:text-xs font-bold text-zinc-300">
            <Calendar size={14} className="text-violet-400 hidden xs:block" />
            {dateRange}
          </div>
          <Button
            onClick={onNext}
            disabled={visibleDates.some(d => isToday(d))}
            variant="secondary"
            className="w-9 h-9 sm:w-10 sm:h-10 p-0 rounded-full"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/30">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", bounce: 0, duration: 1 }}
          className="h-full bg-gradient-to-r from-violet-600 to-indigo-400"
        />
      </div>
    </motion.header>
  )
}
