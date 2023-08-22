import React from "react"
import "./powerSwitch.css"
import { useState } from "react"
import { useEffect } from "react"
import useFetch from "../../../useFetch"
import { useContext } from "react"
import { AuthContext } from "../../../AdminDashbard/Dashboard"
function SwitchBox({ id, state, setRespLock }) {
  const [switchLocation, SetSwitchLocation] = useState(state)

  useEffect(() => {
    console.log(state)
    SetSwitchLocation(state)
  }, [state])

  const [statusData, setStatusData] = useState([])

  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=changeSwitchStatus&phaseID=${id}&location=${switchLocation} `
  const { isLoading, isError, data, fetchData } = useFetch(url)
  const ChangeSwitchStatus = () => {
    fetchData(token, setStatusData)
    setRespLock(true)
  }

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={switchLocation}
        onChange={() => {
          SetSwitchLocation((state) => {
            return !state
          })
          ChangeSwitchStatus()
        }}
      />
      <div className="button">
        <div className="light"></div>
        <div className="dots"></div>
        <div className="characters"></div>
        <div className="shine"></div>
        <div className="shadow"></div>
      </div>
    </label>
  )
}

export default SwitchBox
