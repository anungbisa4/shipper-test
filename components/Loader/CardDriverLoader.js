
import { UserCircleIcon } from "@heroicons/react/solid";

const arr = new Array(4).fill("1")

const CardDriverLoader = ({ item }) => {
  return (
    <div className="w-full h-[382px] bg-white">
      <div className="animate-pulse">
        <div className="p-4 border-b-2 flex text-sm space-x-2 justify-between items-center">
          <div className="flex text-xs space-x-2">
            <span className="bg-gray-300 w-10 h-5 block" />
            <span className="text-red-500 font-sans uppercase bg-gray-300 w-16" />
          </div>
          <span className="text-gray-400 bg-gray-300 w-8 h-5 block" />
        </div>
        <div className="p-4">
          <UserCircleIcon className="w-20 text-gray-400" />
          <div className="space-y-4 text-xs mt-6">
            {arr.map((item, index) => {
              return (
                <div className="space-y-1" key={index}>
                  <span className="bg-gray-300 w-10 h-4 block" />
                  <span className="bg-gray-300 w-20 h-4 block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDriverLoader;
