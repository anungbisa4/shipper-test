import { useState, useCallback } from "react"
import { SearchIcon } from "@heroicons/react/outline";
import { useSelector, useDispatch } from "react-redux";
import { searchDriver, setPage, getFirstPage } from "@/store/users/action";

import _debounce from "lodash/debounce";

const CardHeader = () => {
  const [value, setValue] = useState("")
  const { users } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleSearch = (value) => {
    dispatch(searchDriver(users.data, value));
  }

  const handleChange = useCallback((e) => {
    setValue(e.target.value)
    if (e.target.value === "") {
      dispatch(setPage("pageFirst"));
      return dispatch(getFirstPage(users.data));
    }
    delayQuery(e.target.value);
  }, [value])

  const delayQuery = useCallback(
    _debounce((q) => {
      console.log(q)
      if (q.length !== 1) {
        handleSearch(q);
      }
    }, 500)
  ,[]);
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSearch(value)
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-white space-y-4 md:space-y-0">
      <div className="w-full md:w-[calc(100%-340px)]">
        <h1 className="uppercase font-bold text-red-500 text-2xl sm:text-lg">
          Driver Management
        </h1>
        <p className="text-sm sm:text-[10px]">
          Data driver yang bekerja dengan Anda
        </p>
      </div>
      <div className="w-full md:w-[280px]  flex flex-wrap md:flex-nowrap space-y-4 md:space-x-4 md:space-y-0">
        <div className="w-full relative">
          <button
            name="search"
            onClick={() => handleSearch(value)}
            className="absolute flex items-center h-full ml-2 outline-none active:opacity-70"
          >
            <SearchIcon className="w-4 text-red-500" />
          </button>
          <input
            className="w-full text-xs p-2 pl-6 outline-none border-2"
            placeholder="Cari Driver (ex: jennifer)"
            onChange={handleChange}
            onKeyDown={handleKeydown}
          />
        </div>
        <button className="w-full text-xs p-2 bg-red-500 font-semibold text-white active:opacity-70">
          <span>TAMBAH DRIVER</span>
        </button>
      </div>
    </div>
  );
}

export default CardHeader