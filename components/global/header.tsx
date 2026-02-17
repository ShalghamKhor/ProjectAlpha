"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
         
          <span className="text-2xl font-bold tracking-wide">ItemLending</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-yellow-400 transition">Home</a>
          <a href="/User" className="hover:text-yellow-400 transition">Account</a>
          <a href="/contract" className="hover:text-yellow-400 transition">Contracts</a>
          <a href="/about" className="hover:text-yellow-400 transition">About</a>
          <a href="/contact" className="hover:text-yellow-400 transition">Contact</a>
        </nav>

        {/* Search + Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center bg-gray-800 px-2 py-1 rounded-md">
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={16}
              height={16}
              className="opacity-70 mr-1"
            />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-gray-200"
            />
          </div>
    

        </div>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Image
            src={menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
            alt="Menu"
            width={26}
            height={26}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-gray-800 px-6 py-4 space-y-2">
          <a href="/" className="block hover:text-yellow-400">Home</a>
          <a href="/User" className="block hover:text-yellow-400">Members</a>
          <a href="/items" className="block hover:text-yellow-400">Items</a>
          <a href="/about" className="block hover:text-yellow-400">About</a>
          <a href="/contact" className="block hover:text-yellow-400">Contact</a>
        </nav>
      )}
    </header>
  );
}