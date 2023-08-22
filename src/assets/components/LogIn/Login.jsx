import React, { useState } from "react"
import LottiePlayer from "../lottiePlayer/LottiePlayer"
import powerGeneration from "../../Lotties/powerGeneration.json"
import powerLine from "../../Lotties/powerLine.json"
import { Route, Routes } from "react-router-dom"
import LoginForm from "./LoginForm"

import ForgotPassword from "./ForgotPassword"

function Login() {
  return (
    <div className=" w-screen   overflow-x-hidden ">
      <div className="  w-full ">
        <div className="flex w-full  h-screen overflow-y-hidden relative">
          <div className=" bg-cover block w-full relative">
            <div className=" relative flex flex-col h-full px-20  ">
              <div className=" absolute md:-bottom-16 bottom-0 ">
                <LottiePlayer src={powerGeneration} />
              </div>
              <div className=" w-[400px] absolute left-6 top-3 ">
                <LottiePlayer src={powerLine} />
              </div>
              <div className=" hidden md:block w-[400px] absolute right-6 top-3 ">
                <LottiePlayer src={powerLine} />
              </div>
            </div>
          </div>
          <div className="bg-black bg-noiseBg bg-opacity-80 backdrop-blur-[0.3px]  w-full h-full absolute top-0 left-0"></div>

          <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  items-center w-full max-w-md px-6   ">
            {/* login form */}
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
