import React, { useContext, useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useFetch from "../../useFetch"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      color: "rgba(255, 255, 255, 0.6)",
      labels: {
        color: "rgba(255, 255, 255, 0.6)", // Change dataset label text color
      },
    },
    title: {
      display: true,
      text: "Feeding statistics",
      color: "rgba(255, 255, 255, 0.6)",
    },
  },
  scales: {
    y: {
      beginAtZero: true, // Set the minimum value on the y-axis to 0
      title: {
        display: true,
        text: "water in Ltrs and food in kgs", // Label for the y-axis
        color: "rgba(255, 255, 255, 0.6)",
      },
      grid: {
        color: "rgba(255, 255, 255, 0.5)", // Change Y-axis grid color
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)", // Change Y-axis label text color
      },
    },
    x: {
      title: {
        display: true,
        text: "Days", // Label for the x-axis
        color: "rgba(255, 255, 255, 0.6)",
      },
      grid: {
        color: "rgba(255, 255, 255, 0.5)", // Change x-axis grid color
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.6)", // Change x-axis label text color
      },
    },
  },
}

export function LineChartAdmin() {
  const [phaseData, setphaseData] = useState([])
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=graphData`
  const { isLoading, isError, data, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setphaseData)

    const intID = setInterval(() => {
      fetchData(token, setphaseData)
    }, 2000)
    return () => {
      clearInterval(intID)
    }
  }, [])

  //   useEffect(() => {
  //     console.log(phaseData)
  //   }, [phaseData])

  const labels = phaseData.map((data, index) => index)
  const dataChart = {
    labels,
    datasets: [
      {
        label: "Phase 1",
        data: phaseData.map((data) => data.red),
        borderColor: "rgb(239, 68 ,68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Phase 2",
        data: phaseData.map((data) => data.yellow),
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.7)",
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Phase 3",
        data: phaseData.map((data) => data.blue),
        borderColor: "rgb(59, 130 ,246)",
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  }

  return (
    <>
      <Line options={options} data={dataChart} />
    </>
  )
}
