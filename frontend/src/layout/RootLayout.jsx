import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "../components/Navbar";
export default function RootLayout(){
    return(
      <>
      <Navbar/>
      <ToastContainer/>
      <Outlet/>
      </>
    )
  }