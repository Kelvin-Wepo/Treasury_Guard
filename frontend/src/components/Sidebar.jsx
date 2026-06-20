import React from 'react'
import { NavLink } from 'react-router-dom'

const Item = ({to, children, onClick}) => (
  <NavLink onClick={onClick} to={to} className={({isActive})=>`flex items-center space-x-3 px-3 py-2 rounded ${isActive? 'bg-indigo-600 text-white':'text-gray-600 hover:bg-gray-100'}`}>
    <span className="w-6" />
    <span>{children}</span>
  </NavLink>
)

export default function Sidebar({ isOpen=false, onClose=()=>{} }){
  const nav = [
    {to: '/dashboard/1', label: 'Dashboard'},
    {to: '/transactions', label: 'Transactions'},
    {to: '/vendors', label: 'Vendors'},
    {to: '/rules', label: 'Rules & Risk'},
    {to: '/dashboard/1', label: 'Alerts', badge: 2},
    {to: '/approvals', label: 'Approvals'},
    {to: '/settings', label: 'Settings'},
  ]

  return (
    <>
      <aside className="w-60 bg-[var(--sidebar)] text-white hidden md:flex flex-col">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded flex items-center justify-center font-bold">TG</div>
            <div>
              <div className="font-semibold text-white">Treasury Guard</div>
              <div className="text-xs text-slate-300 mt-1">On Avalanche</div>
            </div>
          </div>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          {nav.map(item=> (
            <NavLink key={item.label} to={item.to} className={({isActive})=>`flex items-center justify-between px-3 py-2 rounded-lg ${isActive? 'bg-indigo-600 bg-opacity-90 text-white':'text-slate-300 hover:bg-white/5'}`}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/6 rounded flex items-center justify-center text-xs">⌁</div>
                <div>{item.label}</div>
              </div>
              {item.badge ? <div className="bg-red-600 text-white px-2 py-0.5 rounded text-xs">{item.badge}</div> : null}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 space-y-3">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-xs text-slate-200">Wallet (Avalanche C-Chain)</div>
            <div className="font-mono mt-1">0x8f3a...7cDe <span className="inline-block ml-2 w-2 h-2 bg-green-400 rounded-full" title="Active"/></div>
          </div>

          <div className="bg-white p-3 rounded-lg text-slate-900">
            <div className="text-xs text-slate-500">USDC Balance</div>
            <div className="text-2xl font-semibold">12,458.74</div>
            <div className="text-xs text-slate-400">Ksh 1,865,310</div>
          </div>

          <div className="text-sm text-slate-400">Need help? <button className="underline">Chat with support</button></div>
        </div>

        <div className="p-4 text-xs text-slate-500 border-t border-white/5">Powered by <span className="ml-1 font-semibold">Avalanche</span></div>
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden ${isOpen? 'block':'hidden'}`}>
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
        <div className="fixed left-0 top-0 bottom-0 w-72 bg-[var(--sidebar)] text-white p-4 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-lg">Treasury Guard</div>
            <button onClick={onClose} className="p-1 rounded hover:bg-white/5">✕</button>
          </div>
          <nav className="space-y-1">
            {nav.map(item=> (
              <NavLink key={item.label} onClick={onClose} to={item.to} className={({isActive})=>`flex items-center justify-between px-3 py-2 rounded-lg ${isActive? 'bg-indigo-600 text-white':'text-slate-300 hover:bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/6 rounded flex items-center justify-center text-xs">⌁</div>
                  <div>{item.label}</div>
                </div>
                {item.badge ? <div className="bg-red-600 text-white px-2 py-0.5 rounded text-xs">{item.badge}</div> : null}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 text-xs text-slate-400">Powered by Avalanche</div>
        </div>
      </div>
    </>
  )
}
