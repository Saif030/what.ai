import { logo } from '../assets/assets'
import { FaArrowRightLong } from "react-icons/fa6";
import { useClerk, useUser, UserButton } from '@clerk/react'

function NavBar() {
  const { openSignIn } = useClerk();
  const { isSignedIn, user , isLoaded } = useUser();

  return (
    <nav className="w-full h-22 flex items-center justify-between">
      <div><img src={logo} alt="logo" className="h-18 cursor-pointer" /></div>
      {isLoaded && !isSignedIn ? (
        <button onClick={() => openSignIn()} className="px-8 py-2 text-white text-md font-medium bg-blue-600 rounded-full flex items-center gap-2">
          Get Started <FaArrowRightLong size={16} />
        </button>
      ) : (
        <div className="flex items-center gap-2 sm:px-4 px-2 sm:py-2 py-1.5 bg-white rounded-full">
          <UserButton />
          <div className="hidden sm:block">
            <p className="sm:text-sm text-xs font-medium">{user?.fullName}</p>
            <p className="sm:text-xs text-xs text-gray-500">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar