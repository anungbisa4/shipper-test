import { useState } from "react"
import Navbar from "@/components/Header/Navbar";
import { Sidebar } from "@/components/Sidebar";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Navbar openSidebar={open} setOpenSidebar={setOpen} />
      <main>
        <div className="flex relative">
          <div>
            <Sidebar open={open} setOpen={setOpen} />
          </div>
          {children}
        </div>
      </main>
    </>
  );
}

export default MainLayout