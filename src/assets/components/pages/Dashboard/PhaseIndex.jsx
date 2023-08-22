import React from "react"
import PhaseController from "./PhaseController"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useFetch from "../../useFetch"
import PageLoader from "../../loaders/pageLoader/PageLoader"
function PhaseIndex() {
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [statusData, setStatusData] = useState([])

  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=getCurrentData`
  const { isLoading, isError, data: driverData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setStatusData)
  }
  useEffect(() => {
    fetchData(token, setStatusData)
    setIsDataLoading(false)
    setInterval(() => {
      fetchData(token, setStatusData)
    }, 2000)
  }, [])
  return (
    <>
      {isDataLoading && (
        <div className=" h-[120px] flex justify-center items-center w-full col-span-3">
          <PageLoader />
        </div>
      )}
      {!isDataLoading && (
        <>
          <PhaseController
            parentClass={`border-red-500 hover:bg-red-600`}
            ChildClass={`bg-red-600 `}
            id={1}
            switchStatus={statusData?.phaseStatus?.red}
            currentData={statusData?.data?.red}
            currentConsumers={statusData?.currentConsumers?.red}
            maxCurrent={statusData?.maxCurrent?.red}
          />

          <PhaseController
            parentClass={`border-yellow-500 hover:bg-yellow-600`}
            ChildClass={`bg-yellow-500 `}
            id={2}
            switchStatus={statusData?.phaseStatus?.yellow}
            currentData={statusData?.data?.yellow}
            currentConsumers={statusData?.currentConsumers?.yellow}
            maxCurrent={statusData?.maxCurrent?.yellow}
          />
          <PhaseController
            parentClass={`border-blue-500 hover:bg-blue-600`}
            ChildClass={`bg-blue-500 `}
            id={3}
            switchStatus={statusData?.phaseStatus?.blue}
            currentData={statusData?.data?.blue}
            currentConsumers={statusData?.currentConsumers?.blue}
            maxCurrent={statusData?.maxCurrent?.blue}
          />
        </>
      )}
    </>
  )
}

export default PhaseIndex
