import React, { createContext, useEffect, useState } from "react"
import DashboardHeader from "../AdminHeader/DashboardHeader"
import DashboardSide from "../DashboardSide/DashboardSide"
import { Routes, Route } from "react-router-dom"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import UserProfile from "../pages/Profile/UserProfile"
import ErrorPage from "../pages/ErrorPage"
import useFetch from "../useFetch"
import { Navigate } from "react-router-dom"
import PageLoader from "../loaders/pageLoader/PageLoader"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"

import Users from "../pages/Users/Users"

import Settings from "../pages/Settings/Settings"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
export const AuthContext = createContext()
function Dashboard() {
  const [jwtExpires, setJwtExpires] = useState(null)
  const [navToggle, setNavToggle] = useState(false)
  const [userData, setUserData] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const url = `${import.meta.env.VITE_REACT_API_URL}/api/requestData.php`
  const { isLoading, isError, data: personalData, fetchData } = useFetch(url)
  const myCallBack = () => {
    checkToken()
  }
  const logOut = () => {
    localStorage.removeItem("loadBalance")
    window.location = "../"
  }
  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const jwt = JSON.parse(localStorage.getItem("loadBalance"))

    if (jwt) {
      setJwtExpires(jwt.expireAt)
      fetchData(jwt.jwt, setUserData)
    } else {
      window.location = "../"
    }
  }

  //the function to check if the token has expired and log the user out of the system

  useEffect(() => {
    if (jwtExpires != null) {
      const intID = setInterval(() => {
        if (jwtExpires * 1000 < Date.now()) {
          setOpenDialog(true)
        }
      }, 1000)
      return () => {
        clearInterval(intID)
      }
    }
  }, [jwtExpires])

  return (
    <div className=" bg-[#222] bg-noiseBg">
      {isLoading && (
        <>
          <div className=" w-full h-screen flex justify-center items-center ">
            <PageLoader />
          </div>
        </>
      )}
      {isError && <Navigate to="../" replace={true} />}

      {!isLoading && !isError && userData && (
        <>
          {" "}
          <AuthContext.Provider value={userData}>
            {/* the modal to be triggerd when the token expires */}
            <Dialog
              open={openDialog}
              TransitionComponent={Transition}
              keepMounted
              aria-describedby="alert-dialog-slide-description"
              sx={{
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(3px)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <span className="text-sm text-lightBlack">
                    Hello, {userData.firstName} {userData.lastName} your token
                    has expired , please login again to continue
                  </span>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  onClick={() => {
                    window.location = "../"
                  }}
                  className="border-none bg-gray-900 p-2 px-3 text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-gray-950 "
                >
                  Ok
                </button>
              </DialogActions>
            </Dialog>

            <div className="w-full">
              <DashboardHeader
                navToggle={navToggle}
                setNavToggle={setNavToggle}
                logOut={logOut}
              />
            </div>
            <div className="w-full flex h-full ">
              <div className="">
                <DashboardSide
                  navToggle={navToggle}
                  setNavToggle={setNavToggle}
                  logOut={logOut}
                />
              </div>

              <div className=" w-full  md:ml-[260px] md:w-[calc(100%-260px)]   min-h-[calc(100vh-60px)] mt-[60px]">
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <>
                        <DashboardPage />
                      </>
                    }
                  />

                  <Route
                    path="/users/*"
                    element={
                      <>
                        <Users />
                      </>
                    }
                  />
                  <Route
                    path="/Settings/*"
                    element={
                      <>
                        <Settings />
                      </>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <>
                        <UserProfile myCallBack={myCallBack} />
                      </>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <>
                        <ErrorPage to="../dashboard" />
                      </>
                    }
                  />
                </Routes>
              </div>
            </div>
          </AuthContext.Provider>
        </>
      )}
    </div>
  )
}

export default Dashboard
