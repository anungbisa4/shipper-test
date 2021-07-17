import { useState, useEffect } from "react";
import { HomeIcon, UserCircleIcon, CalendarIcon } from "@heroicons/react/outline";
import Link from "next/link"
import { OverlaySidebar } from "@/components/Dialog";
import { useRouter } from "next/router";

const link = [
  { url: "/", name: "Beranda", icon: (active) => <HomeIcon className={`w-5 mr-4 ${active}`} /> },
  {
    url: "/driver-management",
    name: "Driver Management",
    icon: (active) => <UserCircleIcon className={`w-5 mr-4 ${active}`} />
  },
  {
    url: "/pickup",
    name: "Pickup",
    icon: (active) => <CalendarIcon className={`w-5 mr-4 ${active}`} />
  },
];

const Sidebar = ({ open, setOpen }) => {
  const router = useRouter()
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  });

  return (
    <div
      className={`sidebar pt-24 bg-white w-[250px] space-y-6 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out h-screen z-20 ${
        open ? "translate-x-0" : ""
      }`}
    >
      <div className="flex flex-col">
        {link.map((item, index) => {
          return (
            <Link href={item.url}>
              <a className="py-3 px-4 flex relative items-center">
                {router.pathname === item.url && (
                  <span className="absolute left-0 top-0 w-0.5 h-full bg-red-500" />
                )}
                {item.icon(router.pathname === item.url ? "text-red-500" : "")}
                <span
                  className={
                    router.pathname === item.url
                      ? "text-red-500 font-semibold leading-tight"
                      : "leading-tight"
                  }
                >
                  {item.name}
                </span>
              </a>
            </Link>
          );
        })}
      </div>
      <OverlaySidebar open={open} setOpen={setOpen} />
    </div>
  );
}

export default Sidebar

