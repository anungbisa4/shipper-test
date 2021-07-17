import { useRouter } from "next/router"
const Pickup = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col h-screen justify-center items-center font-bold text-red-500">
      PICKUP IS UPCOMING
      <button onClick={() => router.back()} className="border-2 border-red-500 py-2 px-8 mt-8">Back</button>
    </div>
  )
}

export default Pickup