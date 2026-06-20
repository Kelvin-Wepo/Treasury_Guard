import React from 'react'

export default function StatCard({icon, label, value, sub, alert}){
  return (
    <div className={`card p-4 flex items-start gap-4 ${alert? 'ring-1 ring-red-100':''}`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${alert? 'bg-red-50':'bg-indigo-50'}`}>
        <div className="text-xl">{icon || '•'}</div>
      </div>
      <div>
        <div className="text-xs text-muted">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
        {sub && <div className="text-xs text-gray-400">{sub}</div>}
      </div>
    </div>
  )
}
