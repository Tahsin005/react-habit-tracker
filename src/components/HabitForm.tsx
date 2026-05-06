import { useState, type FormEvent } from "react"
import { Button } from "./Button"
import { useHabits } from "../context/useHabits"
import { Plus, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function HabitForm() {
  const [name, setName] = useState("")
  const { addHabit } = useHabits()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (name.trim() === "") return
    setName("")
    addHabit(name)
  }

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="flex gap-2 p-2 glass rounded-2xl group focus-within:border-violet-500/50 transition-all duration-300"
      onSubmit={handleSubmit}
    >
      <div className="flex-1 relative flex items-center">
        <Zap size={18} className="absolute left-4 text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full bg-transparent pl-12 pr-4 py-3 outline-none text-zinc-100 placeholder:text-zinc-600 font-medium"
          placeholder="What's your next goal?"
        />
      </div>
      <Button
        disabled={name.trim() === ""}
        className="rounded-xl px-6 py-2 shadow-xl shadow-violet-500/10"
      >
        <Plus size={20} strokeWidth={3} />
        <span className="hidden sm:inline">Create Habit</span>
      </Button>
    </motion.form>
  )
}
