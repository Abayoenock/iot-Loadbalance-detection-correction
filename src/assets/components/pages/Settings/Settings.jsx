import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import avatarImage from "../../../Images/webImages/avatar.webp"
import ImageWithBlurhashModal from "../../ImageWithBlurhashModal"
import "../Users/tableStyles.css"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
import {
  faAnglesRight,
  faTrashCan,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"

import DataTable from "react-data-table-component"
import useFetch from "../../useFetch"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import PageLoader from "../../loaders/pageLoader/PageLoader"
import useSubmitData from "../../useSubmitData/useSubmitData"
import MaxCurrents from "./maxCurrents"

const Settings = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [usersData, setUsersData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogLock, setOpenDialogLock] = useState(false)
  const [openDialogAdd, setOpenDialogAdd] = useState(false)
  const [openDialogEdit, setOpenDialogEdit] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUserDelete, setSelectedUserDelete] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)
  const [serverResponse, setServerResponse] = useState([])
  const { token } = useContext(AuthContext)
  const [consumerName, setConsumerName] = useState(null)
  const urlAdd = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=addConsumer`
  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    data: dataAdd,
    SubmitData,
  } = useSubmitData(urlAdd, token, setServerResponse)

  const urlEdit = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=editConsumer&consumerID=${selectedUserDelete}`
  const {
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    data: dataEdit,
    SubmitData: submitDataEdit,
  } = useSubmitData(urlEdit, token, setServerResponse)

  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=consumerHandler`
  const { isLoading, isError, data: driverData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setUsersData)
  }
  useEffect(() => {
    fetchData(token, setUsersData)
    console.log(usersData)
    setIsDataLoading(false)
  }, [])

  useEffect(() => {
    console.log(usersData)
  }, [usersData])
  const urlDelete = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=delete&tbl=consumer&col_Name=consumerID&dataID=${selectedUserDelete}`
  const [success, setSuccess] = useState([])
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    data,
    fetchData: fetchDataDelete,
  } = useFetch(urlDelete)
  const deleteUser = () => {
    fetchDataDelete(token, setSuccess)
    handleCloseDialog()
  }
  useEffect(() => {
    handleCloseDialog()
    if (success.valid) {
      toast.success(`${selectedUser?.consumerName} successfuly deleted `, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      mYcallBackFunction()
    } else if (success.valid == false) {
      toast.success(
        ` Failed to delete ${selectedUser?.consumerName} , please try again later `,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      )
    }
  }, [success])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialogLock = () => {
    setOpenDialogLock(false)
  }
  const handleClickOpenDialogLock = () => {
    setOpenDialogLock(true)
  }

  const handleCloseDialogAdd = () => {
    setOpenDialogAdd(false)
  }
  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false)
  }

  const handleChange = (state) => {
    setSelectedRows(state.selectedRows)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setServerResponse([])
    setIsSubmit(true)
    const form = document.getElementById("ConsumerForm")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))

    SubmitData(formBody)
  }
  const handleEdit = (event) => {
    event.preventDefault()
    setServerResponse([])
    setIsSubmit(true)
    const form = document.getElementById("ConsumerFormEdit")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))
    submitDataEdit(formBody)
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
        setOpenDialogAdd(false)
        setOpenDialogEdit(false)
        mYcallBackFunction()
        return
      }
    }
    updateResponse()
  }, [serverResponse])

  const columns = [
    {
      name: "Comsumer Name",
      selector: (row) => row["consumerName"],
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <FontAwesomeIcon
            icon={faEdit}
            className=" p-2 px-3 rounded-sm bg-gray-600 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700"
            onClick={() => {
              const user = usersData.filter((user) => {
                return user.consumerID === row.consumerID
              })
              setSelectedUserDelete(row.consumerID)
              setSelectedUser(user[0])
              setConsumerName(row.consumerName)
              setOpenDialogEdit(true)
            }}
          />

          <FontAwesomeIcon
            icon={faTrashCan}
            title="delete user"
            onClick={() => {
              const user = usersData.filter((user) => {
                return user.consumerID === row.consumerID
              })
              setSelectedUserDelete(row.consumerID)
              setSelectedUser(user[0])
              handleClickOpenDialog()
            }}
            className=" p-2 px-3 rounded-sm bg-red-400 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-red-500"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]
  return (
    <>
      {/* {isError && <Navigate to="../admin" replace={true} />} */}
      {isLoading && (
        <div className="flex w-full min-h-[calc(100vh-400px)] justify-center items-center">
          {" "}
          <PageLoader />
        </div>
      )}
      {!isLoading && (
        <div className=" w-full grid grid-cols-1 md:grid-cols-2">
          <div className="w-full flex flex-col h-fit  mt-6 px-8">
            {" "}
            <div className=" flex justify-end">
              {" "}
              <button
                className=" bg-gray-500 p-2 px-3 text-white text-sm rounded-sm transition-all duration-300 hover:-translate-x-1 hover:bg-gray-600"
                onClick={() => {
                  setOpenDialogAdd(true)
                }}
              >
                Add consumer <FontAwesomeIcon icon={faPlus} className="ml-2" />
              </button>
            </div>{" "}
            <DataTable
              title=" "
              columns={columns}
              data={usersData}
              pointerOnHover="false"
              pagination
              button="false"
              rtl="false"
              visible="false"
              striped="true"
              direction="auto"
              responsive="true"
              progressPending={isDataLoading}
            />
            <Dialog
              open={openDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialog}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(3px)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <DialogTitle
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.8)",
                }}
              >
                <span className=" font-semibold text-sm ">{`Delete  ${selectedUser?.consumerName}'s account`}</span>
              </DialogTitle>
              <DialogContent
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                <span className="text-sm text-gray-300">
                  Are you sure you want to delete {selectedUser?.consumerName}{" "}
                  from the system Keep in mind that this process can not be
                  reversed
                </span>
              </DialogContent>
              <DialogActions
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                <button
                  onClick={handleCloseDialog}
                  className="border-none bg-slate-700 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-800 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteUser}
                  className="border-none bg-gray-900 p-2 px-3 text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-gray-800 "
                >
                  Confirm
                </button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openDialogLock}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialogLock}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                color: "#fff",
                backgroundColor: "rgba(37,99,235,0.7)",
                backdropFilter: "blur(3px)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <DialogTitle>
                {" "}
                <p className=" font-semibold text-lg text-textColor">{`${
                  selectedUser?.status == 0 ? "Un block " : "Block"
                }    ${selectedUser?.firstName}'s account`}</p>{" "}
              </DialogTitle>
              <DialogContent>
                <p className="text-sm text-lightBlack">
                  {selectedUser?.status == 0
                    ? `Are you sure you want to allow ${selectedUser?.firstName} ${selectedUser?.lastName} to regain access back to the system ?`
                    : `Are you sure you want to block ${selectedUser?.firstName} ${selectedUser?.lastName}  access to the system ?`}
                </p>
              </DialogContent>
              <DialogActions>
                <button
                  onClick={handleCloseDialogLock}
                  className="border-none bg-slate-300 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteUser}
                  className="border-none bg-gray-500 p-2 px-3 text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-gray-600 "
                >
                  Confirm
                </button>
              </DialogActions>
            </Dialog>
            {/* dialog addd new consumer  */}
            <Dialog
              open={openDialogAdd}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialogAdd}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.2)",
                backdropFilter: "blur(3px)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                outline: "none",
                border: "none",
                "&:focus": {
                  outline: "none",
                  border: "none",
                },
              }}
            >
              <DialogTitle
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.8)",
                }}
              >
                {" "}
                <p className=" font-semibold text-sm ">
                  Add new consumer{" "}
                </p>{" "}
              </DialogTitle>
              <DialogContent
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                <form
                  action=""
                  method="post"
                  onSubmit={handleSubmit}
                  id="ConsumerForm"
                  className=" flex flex-col gap-3 pt-[20px]"
                >
                  <div className="relative z-0 w-[300px] group ">
                    <input
                      type="text"
                      name="consumerName"
                      id="ConsumerName"
                      className="block py-2 px-0 w-full text-[12px] text-gray-100 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="ConsumerName"
                      className="absolute text-xs text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                    >
                      Consumer Name
                    </label>
                  </div>
                  <div className=" flex justify-end">
                    <button
                      type="reset"
                      onClick={handleCloseDialogAdd}
                      className="border-none bg-slate-500 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-600 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="border-none bg-gray-900 p-2 px-3 text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-gray-800 "
                    >
                      Save
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            {/* dialog addd edit consumer  */}
            <Dialog
              open={openDialogEdit}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialogEdit}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.2)",
                backdropFilter: "blur(3px)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                outline: "none",
                border: "none",
                "&:focus": {
                  outline: "none",
                  border: "none",
                },
              }}
            >
              <DialogTitle
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.8)",
                }}
              >
                {" "}
                <p className=" font-semibold text-sm ">Edit consumer </p>{" "}
              </DialogTitle>
              <DialogContent
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
              >
                <form
                  action=""
                  method="post"
                  onSubmit={handleEdit}
                  id="ConsumerFormEdit"
                  className=" flex flex-col gap-3 pt-[20px]"
                >
                  <div className="relative z-0 w-[300px] group ">
                    <input
                      type="text"
                      name="consumerNameEdit"
                      id="ConsumerName"
                      className="block py-2 px-0 w-full text-[12px] text-gray-100 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer"
                      placeholder=" "
                      value={consumerName}
                      onChange={(e) => {
                        setConsumerName(e.currentTarget.value)
                      }}
                      required
                    />
                    <label
                      htmlFor="ConsumerName"
                      className="absolute text-xs text-gray-300  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-200  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                    >
                      Consumer Name
                    </label>
                  </div>
                  <div className=" flex justify-end">
                    <button
                      type="reset"
                      onClick={handleCloseDialogEdit}
                      className="border-none bg-slate-500 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-600 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="border-none bg-gray-900 p-2 px-3 text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-gray-800 "
                    >
                      Save
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <MaxCurrents />
        </div>
      )}
    </>
  )
}

export default Settings
