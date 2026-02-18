import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 mb-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        
        {/* Left: Social media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Social Media</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 hover:text-yellow-400 transition">
              <Image src="/icons/facebook.svg" alt="Facebook" width={20} height={20} />
              Facebook
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-400 transition">
              <Image src="/icons/instagram.svg" alt="Instagram" width={18} height={18} />
              Instagram
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-400 transition">
              <Image src="/icons/twitter.svg" alt="X" width={18} height={18} />
              X (Twitter)
            </li>
          </ul>
        </div>

        {/* Center: Logo */}
        <div className="flex flex-col items-center justify-center text-center">
         
          <div className="text-2xl font-bold text-orange-400 mt-2">ItemLending</div>
          <p className="text-sm mt-1">Lend and Borrow Smarter</p>
        </div>

        {/* Right: Info links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Information</h2>
          <ul className="space-y-2">
            <li className="hover:orange-600 transition">Get Started</li>
            <li className="hover:text-orange-600 transition">Categories</li>
            <li className="hover:text-orange-600 transition">Quick Start</li>
            <li className="hover:text-orange-600 transition">Helpdesk</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} ItemLending. All rights reserved.
      </div>
    </footer>
  )
}