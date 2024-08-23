import { useState } from "react"
import Button from "../../components/common/Button"
import Login from "../../components/Login"
import AuthModal from "./AuthModal"

const HomePge = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full min-h-screen relative">
       <AuthModal  isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="max-w-max1366  mx-auto h-20 flex justify-between items-center">
         
            <p className=" text-slate-700 font-semibold text-2xl">ABC Restaurant</p>
            <Button text="Login" onClick={()=> setIsOpen(true)} />
        </div>
        
    </div>
  )
}

export default HomePge