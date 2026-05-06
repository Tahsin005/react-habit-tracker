import { useHabits, type Habit } from "../context/useHabits"
import { Button } from "./Button"
import { format, isFuture, isSameDay, subDays } from "date-fns"
import { Check, Flame, Trash2, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type HabitListProps = {
  visibleDates: Date[]
}

export function HabitList({ visibleDates }: HabitListProps) {
  const { habits } = useHabits()

  if (habits.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 glass rounded-3xl gap-4"
      >
        <div className="w-16 h-16 bg-zinc-800/50 rounded-2xl flex items-center justify-center text-zinc-500">
          <Trophy size={32} />
        </div>
        <p className="text-zinc-500 font-medium">No habits yet. Let's build something great!</p>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="popLayout">
        {habits.map((habit, index) => (
          <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} index={index} />
        ))}
      </AnimatePresence>
    </div>
  )
}

type HabitItemProps = {
  habit: Habit
  visibleDates: Date[]
  index: number
}

function HabitItem({ habit, visibleDates, index }: HabitItemProps) {
  const { deleteHabit, toggleHabit } = useHabits()
  const streak = getStreak(habit.completions)

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className="glass p-4 sm:p-5 rounded-3xl flex flex-col gap-4 sm:gap-5 hover:border-zinc-700/50 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className={ habit.completions.length > 0 ? "text-violet-400" : "text-zinc-600" }>
            <Check size={24} strokeWidth={3} className="opacity-20 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-zinc-100">{habit.name}</span>
            {streak !== 0 && (
              <span className="text-xs font-black text-amber-400 flex items-center gap-1.5 uppercase tracking-widest">
                <Flame size={14} fill="currentColor" /> {streak} day streak
              </span>
            )}
          </div>
        </div>
        <Button
          onClick={() => deleteHabit(habit.id)}
          variant="ghost-destructive"
          className="w-10 h-10 p-0 rounded-full sm:opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={18} />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {visibleDates.map(date => {
          const isDone = habit.completions.some(d => isSameDay(date, d))
          const isFut = isFuture(date)
          
          return (
            <motion.button
              whileHover={!isFut ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isFut ? { scale: 0.95 } : {}}
              key={date.toISOString()}
              disabled={isFut}
              onClick={() => toggleHabit(habit.id, date)}
              className={twMerge(
                "flex flex-col items-center justify-center gap-1 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-bold transition-all border",
                isDone 
                  ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20" 
                  : "bg-zinc-800/30 border-zinc-700/30 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300",
                isFut && "opacity-20 cursor-not-allowed grayscale"
              )}
            >
              <span className="uppercase opacity-60">{format(date, "EEE")}</span>
              <span className="text-sm font-black">
                {isDone ? <Check size={14} strokeWidth={4} /> : format(date, "d")}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

function getStreak(completions: Date[]) {
  let streak = 0
  let date = new Date()

  while (completions.some(c => isSameDay(c, date))) {
    streak++
    date = subDays(date, 1)
  }

  return streak
}

import { twMerge } from "tailwind-merge"
