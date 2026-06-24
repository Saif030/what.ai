import { logo } from '../assets/assets.js';
import { FaArrowRightLong } from "react-icons/fa6";
import { useClerk, useUser, UserButton } from '@clerk/react';

function NavBar() {
  const { openSignIn } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <nav className="w-full h-16 sm:h-20 lg:h-22 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Logo - responsive sizing */}
      <div>
        <img
          src={logo}
          alt="logo"
          className="h-10 sm:h-14 lg:h-18 cursor-pointer"
        />
      </div>

      {/* Auth section */}
      {isLoaded && !isSignedIn ? (
        <button
          onClick={() => openSignIn()}
          className="px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 text-white text-sm sm:text-base font-medium bg-blue-600 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <span className="hidden sm:inline">Get Started</span>
          <span className="sm:hidden">Start</span>
          <FaArrowRightLong size={14} className="sm:size-4" />
        </button>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full border border-gray-100 shadow-sm">
          <UserButton />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
            <p className="text-xs text-gray-500">{user?.emailAddresses?.[0]?.emailAddress}</p>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;