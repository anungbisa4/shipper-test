import { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image"

import { DotsHorizontalIcon, UserCircleIcon } from "@heroicons/react/solid";

const CardDriver = ({ item }) => {
  return (
    <div className="bg-white drop-shadow-sm">
      <div className="p-4 border-b-2 flex text-sm space-x-2 justify-between items-center">
        <div className="flex text-xs space-x-2">
          <span className="text-gray-400">Driver ID</span>
          <span className="text-red-500 font-sans uppercase">
            {item.login.salt}
          </span>
        </div>
        <button className="outline-none">
          <DotsHorizontalIcon className="w-5 text-gray-400" />
        </button>
      </div>
      <div className="p-4">
        <div className="overflow-hidden rounded-full w-20 h-20 drop-shadow-md ring-4 ring-red-500">
          <Image
            src={item.picture.medium}
            alt={item.gender}
            layout="fixed"
            width={80}
            height={80}
          />
        </div>
        {/* <UserCircleIcon className="w-20 text-gray-400" /> */}
        <div className="space-y-4 text-xs mt-6">
          <div>
            <label>Nama Driver</label>
            <p className="font-semibold text-sm">
              {item.name.first}, {item.name.last}
            </p>
          </div>
          <div>
            <label>Telepon</label>
            <p className="font-semibold text-sm font-sans">{item.phone}</p>
          </div>
          <div>
            <label>Email</label>
            <p className="font-semibold text-sm line-clamp-1">{item.email}</p>
          </div>
          <div>
            <label>Tanggal Lahir</label>
            <p className="font-semibold text-sm font-sans">
              {dayjs(item.dob.date).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDriver;
