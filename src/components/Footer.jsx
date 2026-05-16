const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 md:px-12 lg:px-16 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo & Description */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tighter">
            Wanderlust
          </h1>
          <p className="mt-4 max-w-xl mx-auto md:mx-0 text-base md:text-lg">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white mb-4 tracking-widest text-sm font-semibold">NEWSLETTER</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <div className="flex items-center bg-gray-900 border border-gray-800 focus-within:border-gray-600 transition-all px-4 py-3 w-full">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-transparent outline-none flex-1 text-sm text-gray-200"
              />
              <button className="text-white hover:translate-x-1 transition-transform cursor-pointer">
                ↗
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white mb-4 tracking-widest text-sm font-semibold">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li className="hover:text-white transition-colors cursor-pointer">Home</li>
              <li className="hover:text-white transition-colors cursor-pointer">Destinations</li>
              <li className="hover:text-white transition-colors cursor-pointer">My Bookings</li>
              <li className="hover:text-white transition-colors cursor-pointer">My Profile</li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white mb-4 tracking-widest text-sm font-semibold">SUPPORT</h3>
            <ul className="space-y-3">
              <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white mb-4 tracking-widest text-sm font-semibold">CONTACT US</h3>
            <ul className="space-y-3">
              <li className="hover:text-white transition-colors cursor-pointer">786 901 1622</li>
              <li className="hover:text-white transition-colors cursor-pointer">info@wandarland.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs md:text-sm order-2 md:order-1 text-gray-500">
            © 2026 Wanderlust. All rights reserved.
          </p>

          <div className="flex gap-6 order-1 md:order-2 text-white text-xl">
            <span className="hover:text-gray-400 transition-colors cursor-pointer">𝕏</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">in</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">◎</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;