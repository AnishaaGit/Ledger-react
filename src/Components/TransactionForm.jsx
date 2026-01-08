import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { useLedgerStore } from '../../store/useLedgerStore'

const TransactionForm = () => {
  const addTransaction = useLedgerStore((state) => state.addTransaction)

  const [currTransaction, setCurrTransaction] = useState({
    description: '',
    amount: 0,
    type: '',
  })

  function handleAddTransaction() {
    if(currTransaction.description.trim().length == 0) return;
    if(currTransaction.amount <= 0) return;

    addTransaction({
      description: currTransaction.description,
      amount: parseFloat(currTransaction.amount),
      type: currTransaction.type,
    })

    setCurrTransaction({
      description: '',
      amount: 0,
      type: 'expense',
    })
  }

  return (
    <div className="self-start max-w-md w-full rounded-2xl 
      bg-linear-to-br from-zinc-900 via-zinc-950 to-black 
      p-6 space-y-6 
      border border-zinc-800
      shadow-[0_0_40px_rgba(197,55,232,0.18)]">

      {/* Heading */}
      <h2 className="text-xl font-semibold text-center 
        bg-linear-to-r from-purple-400 to-purple-600 
        bg-clip-text text-transparent 
        drop-shadow-[0_0_12px_rgba(197,55,232,0.3)] tracking-wide">
        Add Transaction
      </h2>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-400">
          Description
        </label>
        <input
          value={currTransaction.description}
          onChange={(e) =>
            setCurrTransaction({
              ...currTransaction,
              description: e.target.value,
            })
          }
          type="text"
          placeholder="e.g. Grocery, Salary"
          className="rounded-lg bg-zinc-900/80 border border-zinc-700 
          px-3 py-2 text-zinc-100 placeholder-zinc-500 
          focus:outline-none focus:ring-2 focus:ring-purple-500/60 
          focus:border-purple-500 shadow-inner transition"
        />
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-zinc-400">
          Amount
        </label>
        <input
          value={currTransaction.amount}
          onChange={(e) =>
            setCurrTransaction({
              ...currTransaction,
              amount: e.target.value,
            })
          }
          type="number"
          placeholder="₹0.00"
          className="rounded-lg bg-zinc-900/80 border border-zinc-700 
          px-3 py-2 text-zinc-100 placeholder-zinc-500 
          focus:outline-none focus:ring-2 focus:ring-purple-500/60 
          focus:border-purple-500 shadow-inner transition"
        />
      </div>

      {/* Transaction Type */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
          <input
            checked={currTransaction.type === 'expense'}
            onChange={() =>
              setCurrTransaction({ ...currTransaction, type: 'expense' })
            }
            type="radio"
            name="type"
            className="accent-red-500 scale-110"
          />
          Expense
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
          <input
            checked={currTransaction.type === 'income'}
            onChange={() =>
              setCurrTransaction({ ...currTransaction, type: 'income' })
            }
            type="radio"
            name="type"
            className="accent-purple-500 scale-110"
          />
          Income
        </label>
      </div>

      {/* Button */}
      <button
        onClick={handleAddTransaction}
        className="w-full flex items-center justify-center gap-2 
        rounded-xl py-2.5 font-semibold text-black
        bg-linear-to-r from-purple-400 to-purple-600
        shadow-[0_0_25px_rgba(197,55,232,0.3)]
        hover:shadow-[0_0_40px_rgba(197,55,232,0.5)]
        hover:brightness-100 active:scale-[0.97] transition-all">
        <Plus size={16} />
        Add Transaction
      </button>
    </div>
  )
}

export default TransactionForm
