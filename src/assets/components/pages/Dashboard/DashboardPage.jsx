import React, { useContext, useEffect, useRef, useState } from "react"

import { AuthContext } from "../../AdminDashbard/Dashboard"

import { LineChartAdmin } from "../../charts/LineChart/LineChartAdmin"
import Select from "react-select"
import SwitchBox from "../Switch/PowerSwitch/SwitchBox"
import RadioSwitch from "../Switch/RadioSwitch/RadioSwitch"
import PhaseIndex from "./PhaseIndex"
import useFetch from "../../useFetch"

function DashboardPage() {
  const { token, userId, firstName, lastName } = useContext(AuthContext)

  const [isDataLoading, setIsDataLoading] = useState(true)
  const [statusData, setStatusData] = useState([])

  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=consumerStatus`
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
    <div className=" p-6 px-6 ">
      <div className=" w-full grid  gap-3 grid-cols-1 md:grid-cols-3">
        <PhaseIndex />
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 gap-x-6">
        <div className=" row-start-1 md:row-start-1 md:col-start-2 md:col-span-2 md:px-4 px-2 min-h-[300px] md:h-full ">
          <LineChartAdmin />
        </div>

        {statusData.length > 0 &&
          statusData.map((consumer) => {
            return (
              <RadioSwitch
                key={consumer.consumerID}
                id={consumer.consumerID}
                red={consumer.red}
                yellow={consumer.yellow}
                blue={consumer.blue}
                keyS={consumer.key}
                consumerName={consumer.consumerName}
                mYcallBackFunction={mYcallBackFunction}
              />
            )
          })}
      </div>

      {/* <div className="w-[98%] mx-auto border-[1px] border-purple-300 border-dotted p-6  mt-5">
        <div className="w-full flex gap-3">
          <div className="flex flex-col text-[12px] w-fit  gap-2">
            <label htmlFor="Month">Month</label>
            <Select
              className="basic-single focus:border-purple-300"
              classNamePrefix="select"
              defaultValue={optionsMonth[new Date().getMonth() + 1]}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={true}
              name="Month"
              options={optionsMonth}
              onChange={(selected) => {
                setMonth(selected.value)
              }}
            />
          </div>
          <div className="flex flex-col text-[12px] w-fit  gap-2">
            <label htmlFor="Month">Year</label>
            <Select
              className="basic-single focus:border-purple-300"
              classNamePrefix="select"
              defaultValue={optionsYear[2]}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={true}
              name="Year"
              options={optionsYear}
              onChange={(selected) => {
                setYear(selected.value)
              }}
            />
          </div>
        </div>
        <div className="w-full ">
          <LineChartAdmin year={year} month={month} />
        </div>
      </div> */}
    </div>
  )
}

export default DashboardPage
