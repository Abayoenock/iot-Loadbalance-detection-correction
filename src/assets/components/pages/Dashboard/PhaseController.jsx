import React, { useState } from "react"
import SwitchBox from "../Switch/PowerSwitch/SwitchBox"
import LockCheckBox from "../Switch/lockCheckBox/LockCheckBox"

function PhaseController({
  id,
  parentClass,
  ChildClass,
  switchStatus,
  currentData = 0,
  maxCurrent = 0,
  currentConsumers = 0,
}) {
  const [respLock, setRespLock] = useState(true)
  return (
    <div
      className={` relative p-1 border-[1px] flex flex-col gap-2 transition-all duration-300   border-dotted hover:scale-105 hover:cursor-pointer hover:border-dashed  hover:bg-opacity-10 ${parentClass} `}
    >
      <div
        className={`p-2  px-6 text-white font-bold bg-opacity-30 ${ChildClass} flex justify-between items-center`}
      >
        Phase 1 ϕ
        <span className="p-2 py-1 text-gray-300 bg-gray-600 rounded-md font-semibold ">
          {" "}
          {currentConsumers}{" "}
        </span>
      </div>
      <div
        className={`flex gap-4 text-gray-300  px-5 p-2  ${
          respLock && "pointer-events-none"
        }`}
      >
        <SwitchBox
          id={id}
          state={switchStatus == 1 ? true : false}
          setRespLock={setRespLock}
          respLock={respLock}
        />
        <div className=" flex flex-col gap-2">
          <div className=" flex flex-col gap-1  ">
            <p className=" text-xs text-gray-400">Current in A</p>
            <h1 className="text-[30px]">{currentData}</h1>
          </div>
          <div className=" flex flex-col gap-1 text-gray-500  ">
            <p className=" text-xs ">Max Current in A</p>
            <h1 className="text-[14px]">{maxCurrent}</h1>
          </div>
        </div>
      </div>

      <div className=" absolute bottom-[30px] right-[30px]">
        <LockCheckBox
          setRespLock={setRespLock}
          key={id}
          id={`phase` + id}
          respLock={respLock}
        />
      </div>
    </div>
  )
}

export default PhaseController
