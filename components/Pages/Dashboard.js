import { useRouter } from "next/router"
import { MainLayout } from "@/layouts";
import Link from "next/link"

const Dashboard = () => {
  const router = useRouter()
  return (
    <MainLayout>
      <div className="mx-auto px-6 py-6 space-y-6 w-screen md:w-[calc(100%-250px)] overflow-scroll pt-28">
        <div className="flex flex-wrap items-center justify-between p-4 bg-white space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <h1 className="uppercase font-bold text-red-500 text-2xl sm:text-lg">
              Driver Management Dashboard
            </h1>
          </div>
          <div className="w-full md:w-1/2  flex flex-wrap md:flex-nowrap space-y-4 md:space-x-4 md:space-y-0">
            <Link
              href="/driver-management"
              className="w-full text-xs p-2 bg-red-500 font-semibold text-white active:opacity-70"
            >
              <button className="w-full text-xs p-2 bg-red-500 font-semibold text-white active:opacity-70">
                <span>SEE REPORT DRIVER</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
