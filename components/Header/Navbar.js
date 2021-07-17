import { LogoIcon } from "@/components/Icons";
import Image from "next/image"
import { UserCircleIcon, MenuIcon } from "@heroicons/react/solid"

const Navbar = ({ setOpenSidebar }) => {
  return (
    <header className="fixed w-full text-gray-600 bg-white z-30 top-0">
      <div className="mx-auto flex p-5 items-center justify-between">
        <div className="flex justify-between items-center">
          <button className="outline-none" onClick={() => setOpenSidebar(true)}>
            <MenuIcon className="w-8 text-gray-400 sm:hidden mr-4" />
          </button>
          <Image
            src="/images/shipper-logo.png"
            layout="fixed"
            width={128}
            height={29}
          />
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center justify-center space-x-4">
          <div className="hidden sm:block transition duration-200 ease-in-out">
            <span>
              Hello,{" "}
              <strong className="text-red-500 text-sm font-bold">
                Shipper User
              </strong>
            </span>
          </div>
          <UserCircleIcon className="w-10 text-gray-400" />
        </nav>
      </div>
    </header>
  );
}

export default Navbar