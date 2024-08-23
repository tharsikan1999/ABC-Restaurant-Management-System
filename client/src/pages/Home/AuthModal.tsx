import { useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true); 

  if (!isOpen) return null; 

  return (
    <div 
      onClick={() => setIsOpen(false)} 
      className="absolute top-0 left-0 w-full h-full bg-slate-600 bg-opacity-70 flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()} className=" p-6 rounded-md">
        {isLogin ? (
          <Login toggleMode={() => setIsLogin(false)} />
        ) : (
          <Register toggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;
