import React, { useEffect, useState } from "react"
import useSubmitData from "../useSubmitData/useSubmitData"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import DotMin from "../loaders/minDotLoader/DotMin"
function ForgotPassword() {
  const [serverResponse, setServerResponse] = useState([])
  const url = `${import.meta.env.VITE_REACT_API_URL}/api/reset-password.php`
  const [isSubmit, setIsSubmit] = useState(false)
  const { isLoading, isError, data, SubmitData } = useSubmitData(
    url,
    "",
    setServerResponse
  )
  useEffect(() => {
    const updateResponse = () => {
      setServerResponse(serverResponse)
      if (serverResponse?.status == false) {
        toast.error(serverResponse?.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsSubmit(false)
        return
      }
      if (serverResponse.status) {
        toast.success(serverResponse?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        return
      }
    }
    updateResponse()
  }, [serverResponse])
  const handleSubmit = (event) => {
    event.preventDefault()
    setServerResponse([])
    setIsSubmit(true)
    const form = document.getElementById("loginForm")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))
    SubmitData(formBody)
  }

  return (
    <>
      {serverResponse?.status && <Navigate to="../" replace={true} />}

      <div className="flex-1 bg-white/20  backdrop-blur-sm p-3 px-4 rounded-md ">
        <div className="">
          <h2 className="text-2xl font-bold text-gray-300  ">
            Forgot Password
          </h2>
        </div>
        <p className=" mt-4 p-3 bg-gray-100/40 text-gray-700  text-xs rounded-sm">
          To reset password , enter the phone number you used while registering
          your account{" "}
        </p>
        <div className="mt-3">
          <form
            method="post"
            onSubmit={() => handleSubmit(event)}
            id="loginForm"
          >
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm text-gray-200 "
              >
                Phone Number
              </label>
              <input
                type="phoneNumber"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-gray-400 dark:focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>

            <div className="mt-6 w-full">
              <button
                type="submit"
                disabled={isSubmit}
                className={`  text-white transition-all duration-300 ${
                  !isSubmit
                    ? "bg-gray-900 hover:bg-gray-800"
                    : "bg-gray-500 cursor-wait "
                }  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 
                      py-2.5 text-center  `}
              >
                {!isSubmit ? (
                  "Send New Password"
                ) : (
                  <div className="flex items-center justify-center gap-1 h-full ">
                    {" "}
                    <span>Sending </span> <DotMin />
                  </div>
                )}
              </button>
              <p className="text-[14px] mt-2">
                Back to{" "}
                <NavLink to={"../"}>
                  {" "}
                  <span className="text-gray-300">Sign In</span>{" "}
                </NavLink>{" "}
                ?{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
