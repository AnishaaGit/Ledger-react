import React from 'react'
import TransactionForm from './Components/TransactionForm'
import TransactionList from './Components/TransactionList'
import TotalAmount from './Components/TotalAmount'

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-950 to-black p-8">
      
      {/* ambient background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_60%)]" />

      <div className="max-w-6xl mx-auto space-y-10">

        {/* TOP: SUMMARY (FULL WIDTH) */}
        <TotalAmount />

        {/* BOTTOM: FORM + HISTORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <TransactionForm />
          <TransactionList />
        </div>

      </div>
    </div>
  )
}

export default App
