import React from 'react'
import { useLedgerStore } from '../../store/useLedgerStore'
import { Trash } from 'lucide-react'

const TransactionList = () => {
  const allTransaction = useLedgerStore((state) => state.transactions)
  const deleteTransaction = useLedgerStore((state) => state.deleteTransaction)

  function handleTransactionDelete(id) {
    deleteTransaction(id)
  }

  if (allTransaction.length === 0) {
    return (
      <div
        className="self-start w-full rounded-2xl 
        bg-linear-to-br from-zinc-900 via-zinc-950 to-black 
        p-6 border border-zinc-800
        shadow-[0_0_30px_rgba(197,55,232,0.18)]"
      >
        <p className="text-md text-center text-zinc-400">
          No transactions yet
        </p>
      </div>
    )
  }

  return (
    <div
      className="self-start w-full rounded-2xl 
      bg-linear-to-br from-zinc-900 via-zinc-950 to-black 
      p-6 border border-zinc-800
      shadow-[0_0_40px_rgba(197,55,232,0.18)]"
    >
      {/* Heading */}
      <h2 className="mb-5 text-xl font-semibold text-center 
        bg-linear-to-r from-purple-400 to-purple-600 
        bg-clip-text text-transparent 
        drop-shadow-[0_0_12px_rgba(197,55,232,0.3)] tracking-wide">
        Transaction History
      </h2>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {allTransaction.map((trans) => {
          const isExpense = trans.type === 'expense'

          return (
            <div
              key={trans.id}
              className="flex items-center justify-between rounded-xl 
              bg-zinc-900/80 border border-zinc-800 
              px-4 py-3
              hover:border-zinc-700 hover:shadow-sm transition"
            >
              {/* Left info */}
              <div className="flex flex-col">
                <p className="font-medium text-zinc-100">
                  {trans.description}
                </p>
                <p className="text-xs text-zinc-500">
                  {new Date(trans.date).toLocaleDateString()}
                </p>
              </div>

              {/* Right info */}
              <div className="flex items-center gap-4">
                <p
                  className={`font-semibold tracking-wide ${
                    isExpense
                      ? 'text-red-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {isExpense ? '−' : '+'} ₹{Math.abs(trans.amount)}
                </p>

                <button
                  onClick={() => handleTransactionDelete(trans.id)}
                  className="text-zinc-500 hover:text-red-500 transition"
                >
                  <Trash size={17} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TransactionList
