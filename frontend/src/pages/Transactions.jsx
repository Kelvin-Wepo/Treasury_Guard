import React from 'react'
import TransactionList from '../components/TransactionList'
import StatCard from '../components/StatCard'

export default function Transactions(){
  const stats = [
    { label: 'Total Outflow (30d)', value: '48,120', sub: 'USDC' },
    { label: 'Avg. Payment', value: '1,254', sub: 'USDC' },
    { label: 'Flagged', value: '3', sub: 'Needs review', alert: true },
    { label: 'Vendors', value: '18', sub: 'Approved' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <div className="text-sm text-muted">Browse, filter and review recent on-chain transactions.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s,i)=> <StatCard key={i} {...s} />)}
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Recent Transactions</div>
          <div className="text-sm text-muted">Showing latest 50</div>
        </div>
        <TransactionList />
      </div>
    </div>
  )
}
