import React, { useState } from "react"
import "./radioswitch.css"
import LockCheckBox from "../lockCheckBox/LockCheckBox"
import { useEffect } from "react"
import { AuthContext } from "../../../AdminDashbard/Dashboard"
import { useContext } from "react"
import useFetch from "../../../useFetch"
import LevelSwitch from "../LevelSwitch/LevelSwitch"
function RadioSwitch({
  id,
  red,
  yellow,
  blue,
  keyS,
  mYcallBackFunction,
  consumerName,
}) {
  const [phase, setPhase] = useState({ red: red, yellow: yellow, blue: blue })
  const [respLock, setRespLock] = useState(true)
  const [selectedPhase, setSelectedPhase] = useState(null)
  const [keyManager, setKeyManager] = useState(0)
  useEffect(() => {
    setPhase({ red: red, yellow: yellow, blue: blue })
  }, [red, yellow, blue])

  const [statusData, setStatusData] = useState([])
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=changeSwitchLine&consumerID=${id}&selectedPhase=${selectedPhase} `
  const { isLoading, isError, data, fetchData } = useFetch(url)
  const ChangeSwitchStatus = () => {
    fetchData(token, setStatusData)
    setRespLock(true)
    //mYcallBackFunction()
  }

  useEffect(() => {
    console.log(selectedPhase)
    ChangeSwitchStatus()
  }, [selectedPhase])

  return (
    <div
      className={`w-full flex gap-6 flex-col border-[1px] border-dotted border-gray-700 p-2 px-2 transition-all duration-300 ${
        phase.red && "border-red-500"
      } ${phase.yellow && "border-yellow-500"}  ${
        phase.blue && "border-blue-700"
      }`}
    >
      <div
        className={` p-2  bg-opacity-20 backdrop-blur-sm relative  transition-all duration-300 ${
          phase.red && "bg-red-500"
        } ${phase.yellow && "bg-yellow-500"}  ${phase.blue && "bg-blue-500"}  `}
      >
        {" "}
        <span className="text-sm font-semibold -rotate-90 text-white">
          {consumerName}
        </span>
        <div className=" absolute top-1 right-0">
          <LockCheckBox
            setRespLock={setRespLock}
            respLock={respLock}
            key={id}
            id={id}
          />
        </div>
      </div>
      <div
        className={`px-4 ${respLock && "pointer-events-none"} `}
        title="Unlock first"
      >
        <form
          id="changeLineForm"
          className="radio-input"
          key={keyS + keyManager}
        >
          <div className="glass">
            <div
              className={`glass-inner relative transition-all duration-300  ${
                phase.red && "border-red-500"
              } ${phase.yellow && "border-yellow-500"}  ${
                phase.blue && "border-blue-500"
              } `}
            >
              {" "}
            </div>
          </div>
          <div className="selector">
            <div className="choice">
              <div>
                <input
                  type="radio"
                  id={`one${id}`}
                  name={`number-selector${id}`}
                  value="one"
                  className="choice-circle one"
                  defaultChecked={phase.red}
                  onChange={() => {
                    setPhase({ red: true, yellow: false, blue: false })
                    setSelectedPhase(1)
                  }}
                />
                <div className="ball ball1"></div>
              </div>
              <label className="choice-name" htmlFor={`one${id}`}>
                ϕ 1
              </label>
            </div>
            <div className="choice">
              <div>
                <input
                  type="radio"
                  id={`two${id}`}
                  name={`number-selector${id}`}
                  value="two"
                  className="choice-circle two"
                  defaultChecked={phase.yellow}
                  onChange={() => {
                    setPhase({ red: false, yellow: true, blue: false })
                    setSelectedPhase(2)
                  }}
                />
                <div className="ball ball2"></div>
              </div>
              <label className="choice-name" htmlFor={`two${id}`}>
                ϕ 2
              </label>
            </div>
            <div className="choice">
              <div>
                <input
                  type="radio"
                  id={`three${id}`}
                  name={`number-selector${id}`}
                  value="three"
                  className="choice-circle three"
                  defaultChecked={phase.blue}
                  onChange={() => {
                    setPhase({ red: false, yellow: false, blue: true })
                    setSelectedPhase(3)
                  }}
                />
                <div className="ball ball3"></div>
              </div>
              <label className="choice-name" htmlFor={`three${id}`}>
                {" "}
                ϕ 3
              </label>
            </div>
          </div>
        </form>
        <div className=" w-full flex justify-end">
          <LevelSwitch
            red={red}
            blue={blue}
            yellow={yellow}
            setSelectedPhase={setSelectedPhase}
            mYcallBackFunction={mYcallBackFunction}
            setPhase={setPhase}
            setKeyManager={setKeyManager}
          />
        </div>
      </div>
    </div>
  )
}

export default RadioSwitch
