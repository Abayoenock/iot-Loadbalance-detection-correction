import React, { useState, useEffect } from "react"
const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000) // Update the time every second

    return () => clearInterval(interval)
  }, [])

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return date.toLocaleDateString(undefined, options)
  }

  const formatTime = (date) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }
    return date.toLocaleTimeString(undefined, options)
  }

  return (
    <div className="w-full  flex gap-2 items-center  text-gray-300  ">
      <p className="text-[10px] font-semibold">{formatDate(currentDateTime)}</p>
      <p className="text-xl font-semibold">{formatTime(currentDateTime)}</p>
    </div>
  )
}

export default CurrentDateTime
