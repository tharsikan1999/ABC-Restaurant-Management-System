import { useState } from "react"
import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  return (
    <div className="w-full min-h-screen relative">
       
    <div className="max-w-max1366  mx-auto w-full flex  flex-col z">
       <div className=" h-20 flex justify-between items-center">
         <p className=" text-slate-700 font-semibold text-2xl cursor-pointer" onClick={()=>navigate("/")}>ABC Restaurant</p>
         <div className=" h-full flex items-center space-x-5">
         <Button text="Add User" onClick={()=> setIsOpen(true)} />
         <Button text="Add Item" onClick={()=> setIsContactOpen(true)} />
         </div>
       </div>
     
    </div>
    </div>
  )
}

export default Dashboard