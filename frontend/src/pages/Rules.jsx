import React from 'react'
import StatCard from '../components/StatCard'

const sampleRules = [
  {id:1, name: 'Off-allowlist transfer', desc: 'Destination not on allowlist', severity: 'high'},
  {id:2, name: 'Large payout', desc: 'Single transfer > 1,000 USDC', severity: 'medium'},
  {id:3, name: 'Structuring', desc: 'Multiple near-threshold transfers', severity: 'medium'},
]

export default function Rules(){
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Rules & Risk</h2>
        <div className="text-sm text-muted">Create and tune detection rules that protect your treasury.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Active rules" value="12" sub="Real-time" />
        <StatCard label="Triggered today" value="3" sub="Needs review" alert />
        <StatCard label="Auto-resolved" value="8" sub="Auto cleared" />
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Detection rules</div>
          <button className="text-sm text-brand">Add rule</button>
        </div>

        <div className="space-y-3">
          {sampleRules.map(r=> (
            <div key={r.id} className="p-3 border rounded flex items-start justify-between">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-muted">{r.desc}</div>
              </div>
              <div className="text-sm">{r.severity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
