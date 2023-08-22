import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext, useEffect } from "react"
import { useState } from "react"
import useFetch from "../../useFetch"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useSubmitData from "../../useSubmitData/useSubmitData"
import { toast } from "react-toastify"
function MaxCurrents() {
  const [phases, setPhases] = useState({ red: 0, yellow: 0, blue: 0 })
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [usersData, setUsersData] = useState([])
  const { token } = useContext(AuthContext)
  const [serverResponse, setServerResponse] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  const urlAdd = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=editCurrents`
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    data: dataAdd,
    SubmitData,
  } = useSubmitData(urlAdd, token, setServerResponse)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=getCurrentData`
  const { isLoading, isError, data, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setUsersData)
  }

  useEffect(() => {
    fetchData(token, setUsersData)

    setIsDataLoading(false)
  }, [])
  useEffect(() => {
    if (usersData?.maxCurrent) {
      setPhases(usersData?.maxCurrent)
    }
  }, [usersData])
  const changeInput = (e) => {
    const { name, value } = e.target
    setPhases((prev) => {
      return { ...prev, [name]: value }
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setServerResponse([])
    setIsSubmit(true)
    const form = document.getElementById("currentsForm")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))
    console.log(formBody)
    SubmitData(formBody)
  }
  useEffect(() => {
    const updateResponse = () => {
      setServerResponse(serverResponse)
      if (!serverResponse?.success) {
        toast.error(serverResponse?.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setIsSubmit(false)

        return
      }
      if (serverResponse?.success) {
        toast.success(serverResponse?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setIsSubmit(false)

        return
      }
    }
    updateResponse()
  }, [serverResponse])
  return (
    <div className=" w-full mt-[40px] p-6 px-3">
      <form
        action=" "
        method="post"
        id="currentsForm"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 border-[1px] border-dashed border-gray-500 p-3"
      >
        <div className="w-full px-3 p-2 bg-blue-300 bg-opacity-50 text-xs text-gray-300 ">
          <FontAwesomeIcon icon={faExclamationCircle} /> You can change the
          maximum current on each phase , when the current is exceeded , you
          will get a notification from the system
        </div>
        <div className="relative z-0 w-full p-3 py-5  group bg-red-500 bg-opacity-20 ">
          <input
            type="number"
            step={0.1}
            min={"0"}
            name="red"
            id="red"
            className="block py-2 px-0 w-full text-[12px] text-gray-100 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer"
            placeholder=" "
            value={phases.red}
            onChange={changeInput}
            required
          />
          <label
            htmlFor="red"
            className="absolute text-xs text-gray-300  duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0]  peer-focus:text-gray-200  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
          >
            phase 1
          </label>
        </div>
        <div className="relative z-0 w-full p-3 py-5  group bg-yellow-500 bg-opacity-20 ">
          <input
            type="number"
            step={0.1}
            min={"0"}
            name="yellow"
            id="yellow"
            className="block py-2 px-0 w-full text-[12px] text-gray-100 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer"
            placeholder=" "
            value={phases.yellow}
            onChange={changeInput}
            required
          />
          <label
            htmlFor="yellow"
            className="absolute text-xs text-gray-300  duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0]  peer-focus:text-gray-200  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
          >
            phase 2
          </label>
        </div>
        <div className="relative z-0 w-full p-3 py-5  group bg-blue-500 bg-opacity-20 ">
          <input
            type="number"
            step={0.1}
            min={"0"}
            name="blue"
            id="blue"
            className="block py-2 px-0 w-full text-[12px] text-gray-100 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer"
            placeholder=" "
            value={phases.blue}
            onChange={changeInput}
            required
          />
          <label
            htmlFor="blue"
            className="absolute text-xs text-gray-300  duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0]  peer-focus:text-gray-200  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
          >
            phase 3
          </label>
        </div>
        <div className=" w-full">
          <button
            type="submit"
            className=" w-full border-none bg-gray-900 p-3 px-3 text-center text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-gray-950 "
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default MaxCurrents
