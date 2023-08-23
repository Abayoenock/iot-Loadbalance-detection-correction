import React, { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGauge,
  faUsersGear,
  faUserGear,
  faBolt,
  faPowerOff,
  faCogs,
} from "@fortawesome/free-solid-svg-icons"
//import Logo from "../../Images/webImages/believeLogo.png"
import ImageWithBlurhash from "../ImageWithBlurhash"
import { Routes, Route, Link, NavLink } from "react-router-dom"
import "./activeLinkStyles.css"
import noiseImage from "../../Images/webImages/noise.png"
import { AuthContext } from "../AdminDashbard/Dashboard"
function DashboardSide({ navToggle, setNavToggle, logOut }) {
  const { role } = useContext(AuthContext)
  return (
    <>
      <aside
        className={` w-full transition-all duration-300 ${
          navToggle == false ? "-translate-x-full" : "translate-x-0"
        }  md:translate-x-0   md:w-[250px] fixed top-0 left-0 min-h-screen bg-black z-[30]`}
      >
        <div className="bg-noiseBg bg-repeat h-screen bg-opacity-40">
          <div className=" w-full p-2 px-4 flex items-center gap-2  border-opacity-5 ">
            <h1 className="text-white font-bold text-sm mt-[10px] flex gap-2 items-center  ">
              <FontAwesomeIcon icon={faBolt} className="text-4xl " />{" "}
              <span>
                {" "}
                3ϕ load balance <br /> detection & collection
              </span>
            </h1>
          </div>
          <ul className=" flex flex-col gap-0  w-full  mt-8 text-[15px] font-semibold">
            <NavLink
              to="./dashboard"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6  "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faGauge}
                  className=" text-xl opacity-70  "
                />{" "}
                Dashboard
              </li>
            </NavLink>
            {role == 0 && (
              <>
                <NavLink
                  to="./users"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "ActiveLink" : ""
                  }
                >
                  <li
                    className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
                    onClick={() => {
                      if (window.innerWidth <= 500) {
                        setNavToggle(() => {
                          return !navToggle
                        })
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUsersGear}
                      className=" text-xl  opacity-70  "
                    />{" "}
                    Users
                  </li>
                </NavLink>

                <NavLink
                  to="./profile"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "ActiveLink" : ""
                  }
                >
                  <li
                    className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
                    onClick={() => {
                      if (window.innerWidth <= 500) {
                        setNavToggle(() => {
                          return !navToggle
                        })
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUserGear}
                      className=" text-xl  opacity-70  "
                    />{" "}
                    Profile
                  </li>
                </NavLink>
                <NavLink
                  to="./settings"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "ActiveLink" : ""
                  }
                >
                  <li
                    className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
                    onClick={() => {
                      if (window.innerWidth <= 500) {
                        setNavToggle(() => {
                          return !navToggle
                        })
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCogs}
                      className=" text-xl  opacity-70  "
                    />{" "}
                    Settings
                  </li>
                </NavLink>
              </>
            )}

            <li
              className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
              onClick={() => {
                logOut()
              }}
            >
              <FontAwesomeIcon
                icon={faPowerOff}
                className=" text-xl  opacity-70  "
              />{" "}
              Log Out
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default DashboardSide
