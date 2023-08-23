import React, { useContext, useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import ImageAvatar from "../../Images/webImages/avatar.webp"

import { AuthContext } from "../AdminDashbard/Dashboard"
import CurrentDateTime from "../pages/Dashboard/CurrentDateTime"
function DashboardHeader({ navToggle, setNavToggle, logOut }) {
  const userProfileData = useContext(AuthContext)
  const [avatarMenu, setAvatarMenu] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#navLinks") && avatarMenu == true) {
        setAvatarMenu(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <>
      <header
        className={`flex transition-all duration-300 w-full md:pl-[270px]     ${
          navToggle == false
            ? " bg-white bg-opacity-10 shadow-sm backdrop-blur-sm z-[90]"
            : " bg-transparent z-[33] "
        }   justify-between  md:justify-between p-2 px-8 items-center gap-2 md:z-[30] fixed top-[0px]  `}
      >
        <div className="hidden md:flex">
          <CurrentDateTime />
        </div>
        <div
          className={` w-full     md:justify-start flex gap-x-4 md:flex-row-reverse flex-row items-center transition-all duration-500 ease-out ${
            navToggle == false ? "flex" : "hidden"
          }`}
        >
          <div className="relative">
            <Avatar
              alt={userProfileData.firstName}
              src={
                userProfileData?.profile
                  ? userProfileData?.profile
                  : ImageAvatar
              }
              sx={{ cursor: "pointer" }}
            />
          </div>
          <p className="text-sm text-gray-300 font-semibold ">
            <span className="text-yellow-600 ">Hi</span> ,{" "}
            {userProfileData.firstName} {userProfileData.lastName}
          </p>
        </div>

        <div className="z-[100] flex items-center ">
          <input
            type="checkbox"
            id="menu"
            checked={navToggle}
            onChange={() => {
              setNavToggle(() => {
                return !navToggle
              })
            }}
          />
          <label htmlFor="menu" className="icon icon2 md:hidden   ">
            <div className="menu"></div>
          </label>
        </div>
      </header>
    </>
  )
}

export default DashboardHeader
