import React from 'react'

const Navbar = () => {
  return (
  <nav className='flex justify-between bg-slate-800 text-white py-2'>
    <div className="logo">
    <span className="font-bold text-xl mx-8">iTask </span>
    </div>
    <ul className="flex">
      <li className="mx-4 hover:font-bold transition-all duration-300">Home</li>
      <li className="mx-4 hover:font-bold transition-all duration-300">YourTasks</li>
      
    </ul>
  </nav>
  )
}

export default Navbar
