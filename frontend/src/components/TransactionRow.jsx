import React from 'react'
import RiskPill from './RiskPill'

export default function TransactionRow({t, onClick}){
  const flagged = t.status === 'Flagged'
  return (
    <div onClick={onClick} className={`card flex items-center justify-between gap-4 p-3 ${flagged? 'ring-1 ring-red-100':''} cursor-pointer`}> 
      <div className="w-28 text-xs text-muted">{t.time}</div>
      <div className="flex-1">
        <div className="text-sm font-medium">{t.to}</div>
        {t.sub && <div className="text-xs text-red-600">{t.sub}</div>}
      </div>
      <div className="w-40 text-right">
        <div className="font-mono">{t.amount} USDC</div>
        <div className="text-xs text-gray-400">Ksh {t.kes}</div>
      </div>
      <div className="w-36 text-right">
        {flagged ? <RiskPill level="high">Flagged</RiskPill> : <RiskPill level="settled">Settled</RiskPill>}
      </div>
      <div className="w-6 text-gray-300">›</div>
    </div>
  )
}
