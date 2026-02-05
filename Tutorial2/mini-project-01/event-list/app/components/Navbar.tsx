import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className=' p-5 h-[70px] bg-black w-full fixed absolute top-0 left-0 text-white flex justify-between items-center text-3xl font-bold'><h1>Cal To Cal</h1>
            <ul className='text-base font-normal flex gap-5 '><li className='hover:underline'><Link href="/">Home</Link></li><li className='hover:underline'><Link href="/about">About</Link></li><li className='hover:underline'><Link href="/stats">Stats</Link></li></ul>

        </div>
    )
}

export default Navbar