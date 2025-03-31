import { useState } from "react";
import { LoginComponent } from "../components/LoginComponent";
import { RegisterComponent } from "../components/RegisterComponent";

export const SignupPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-base-100 to to-base-200 w-full h-screen">
      <div className={` rounded w-full md:w-2/5  lg:w-2/7 ${showLogin ? "flip-in-ver-right" : "flip-in-ver-left"} `}>
        {showLogin ? <LoginComponent setShowLogin={setShowLogin} /> : <RegisterComponent setShowLogin={setShowLogin} />}
      </div>
    </div>
  );
};
