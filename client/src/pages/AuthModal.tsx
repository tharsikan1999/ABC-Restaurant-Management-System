import { useState } from "react";
import Login from "../components/form/Login";
import Register from "../components/form/Register";

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
      className="fixed top-0 overflow-y-auto left-0 w-full z-20 h-full bg-slate-600 bg-opacity-70 flex items-center justify-center"
    >
      <div onClick={(e) => e.stopPropagation()} className=" p-6 rounded-md">
        {isLogin ? (
          <Login toggleMode={() => setIsLogin(false)} setIsOpen={setIsOpen} />
        ) : (
          <Register toggleMode={() => setIsLogin(true)} setIsOpen={setIsOpen} />
        )}
      </div>
    </div>
  );
}

export default AuthModal;
