"use client"; 
import { authClient } from '@/lib/auth-client';
import { Avatar } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiMenuAlt3, HiX } from "react-icons/hi"; 

const Navbar = () => {
  const { data: session } = authClient.useSession(); 
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className='bg-white border-b border-gray-100 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          <div className='flex-shrink-0'>
            <Link href="/">
              <Image 
                src={'/assets/Wanderlast.png'} 
                width={130} 
                height={40} 
                alt='logo'
                className='object-contain'
              />
            </Link>
          </div>

          <div className='hidden md:flex items-center space-x-8'>
            <Link href="/" className='text-gray-600 hover:text-cyan-500 font-medium transition-colors'>Home</Link>
            <Link href="/destinations" className='text-gray-600 hover:text-cyan-500 font-medium transition-colors'>Destinations</Link>
            <Link href="/my-bookings" className='text-gray-600 hover:text-cyan-500 font-medium transition-colors'>My Bookings</Link>
            <Link href="/add-destination" className='text-gray-600 hover:text-cyan-500 font-medium transition-colors'>Add Destination</Link>
          </div>

          <div className='hidden md:flex items-center space-x-5'>
            {user?.name ? (
              <>
                <Link href="/profile" className='text-gray-600 font-medium'>Profile</Link>
                <Avatar>
                  <Avatar.Image alt={user.name} src={user.image}/>
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
                <button 
                  onClick={handleSignOut}
                  className='px-5 py-2 text-red-500 font-semibold border border-red-500 rounded-lg hover:bg-red-50 transition-all'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className='px-5 py-2 text-cyan-500 font-semibold border border-cyan-500 rounded-lg hover:bg-cyan-50 transition-all'>Login</Link>
                <Link href="/signup" className='px-5 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 shadow-md shadow-cyan-100 transition-all'>Sign Up</Link>
              </>
            )}
          </div>

          <div className='md:hidden flex items-center'>
            <button 
              onClick={toggleMenu}
              className='text-gray-600 hover:text-cyan-500 focus:outline-none transition-all'
            >
              {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden bg-white border-t border-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className='px-4 pt-2 pb-6 space-y-2 shadow-inner'>
          <Link href="/" className='block px-3 py-3 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-md' onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/destinations" className='block px-3 py-3 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-md' onClick={() => setIsOpen(false)}>Destinations</Link>
          <Link href="/my-bookings" className='block px-3 py-3 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-md' onClick={() => setIsOpen(false)}>My Bookings</Link>
          <Link href="/add-destination" className='block px-3 py-3 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-md' onClick={() => setIsOpen(false)}>Add Destination</Link>
          
          <div className='pt-4 flex flex-col gap-3'>
            {user?.name ? (
              <>
                <Link href="/profile" className='block text-center py-3 font-medium border rounded-md' onClick={() => setIsOpen(false)}>Profile</Link>
                <div className="flex justify-center py-2">
                  <Avatar>
                    <Avatar.Image alt={user.name} src={user.image} />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </div>
                <button 
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className='block w-full text-center py-3 font-semibold bg-red-50 text-red-600 border border-red-200 rounded-md shadow-sm'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className='block text-center py-3 font-medium bg-gray-50 border rounded-md' onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/signup" className='block text-center py-3 font-semibold bg-cyan-500 text-white rounded-md shadow-lg shadow-cyan-100' onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;