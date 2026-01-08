import React, { useEffect, useState } from 'react'
import { useLedgerStore } from '../../store/useLedgerStore'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const TotalAmount = () => {
  const [summaryObj, setSummaryObj] = useState({})
  const transaction = useLedgerStore((state) => state.transactions)
  const summary = useLedgerStore((state) => state.totalSummary)

  const [activeIndex, setActiveIndex] = useState(-1)

  const data = [
    {
      name: 'Income',
      value: summaryObj.totalIncome || 0,
    },
    {
      name: 'Expense',
      value: summaryObj.totalExpense || 0,
    },
  ]

  const COLORS = ['#088c01', '#9c0c0c']

  useEffect(() => {
    setSummaryObj(summary())
  }, [transaction])

  return (
    <div
      className="rounded-2xl 
      bg-linear-to-br from-zinc-900 via-zinc-950 to-black 
      border border-zinc-800 
      p-6 space-y-6
      shadow-[0_0_40px_rgba(168,85,247,0.25)]"
    >
      {/* Heading */}
      <h3
        className="text-2xl font-semibold text-center 
        bg-linear-to-r from-purple-400 to-purple-600 
        bg-clip-text text-transparent 
        drop-shadow-[0_0_12px_rgba(197,55,232,0.6)] tracking-wide"
      >
        Financial Summary
      </h3>

      {/* Chart */}
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  opacity={activeIndex === -1 || activeIndex === index ? 1 : 0.3}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: '#09090b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                color: '#e4e4e7',
              }}
              labelStyle={{ color: '#a1a1aa' }}
              itemStyle={{ color: '#e4e4e7' }}

              formatter={(value, name) => [`₹${value}`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        {/* Expense */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-400">
            Expense
          </p>
          <p className="mt-1 font-semibold text-red-400">
            − ₹{summaryObj.totalExpense || 0}
          </p>
        </div>

        {/* Income */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-400">
            Income
          </p>
          <p className="mt-1 font-semibold text-emerald-400">
            + ₹{summaryObj.totalIncome || 0}
          </p>
        </div>

        {/* Balance */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-400">
            Balance
          </p>
          <p
            className={`mt-1 font-semibold ${
              summaryObj.totalBalance < 0
                ? 'text-red-400'
                : 'text-purple-400'
            }`}
          >
            ₹{summaryObj.totalBalance || 0}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TotalAmount
