import React from "react"
import "./LevelSwitch.css"
import { useState } from "react"
import { useEffect } from "react"
function LevelSwitch({
  red,
  blue,
  yellow,
  setSelectedPhase,
  mYcallBackFunction,
  setPhase,
  setKeyManager,
}) {
  const [switchState, setSwitchState] = useState(!(red || blue || yellow))
  useEffect(() => {
    setSwitchState(!(red || blue || yellow))
  }, [red, blue, yellow])
  return (
    <label className="switch2">
      <input
        className="chk"
        type="checkbox"
        checked={switchState}
        onChange={() => {
          setSwitchState(!switchState)
          setSelectedPhase(0)
          setKeyManager((prev) => {
            return prev++
          })
          setPhase({ red: false, yellow: false, blue: false })
          mYcallBackFunction()
        }}
      />
      <span className="slider"></span>
    </label>
  )
}

export default LevelSwitch
