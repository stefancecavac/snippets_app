import { useForm } from "react-hook-form";
import { UseAuthContext } from "../context/authContext";
import { createUserData } from "../types";
import { useEffect } from "react";

export const LoginComponent = ({ setShowLogin }: { setShowLogin: (value: boolean) => void }) => {
  const { loginUser, loginError, loginPending } = UseAuthContext();
  const { register, handleSubmit, reset } = useForm<createUserData>();

  const handleLoginUser = (data: createUserData) => {
    loginUser(data);
  };

  useEffect(() => {
    if (loginError) reset();
  }, [loginError, reset]);

  return (
    <form onSubmit={handleSubmit(handleLoginUser)} className="flex flex-col p-2 items-center">
      <div className="flex flex-col gap-5 w-full p-5 mt-10">
        <label className={`input  focus-within:outline-none   w-full ${loginError && " border-error "} `}>
          <svg className={`size-6  ${loginError ? "text-error" : " text-neutral/50"}  `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" fill="none" stroke="currentColor">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input
            className={`${loginError && "placeholder:text-error"} text-base-content`}
            {...register("email")}
            autoComplete="off"
            aria-autocomplete="none"
            type="input"
            placeholder={`${loginError ? `${loginError.message}` : "Email"} `}
          />
        </label>

        <label className={`input  focus-within:outline-none   w-full ${loginError && " border-error "} `}>
          <svg className={`size-6  ${loginError ? "text-error" : "text-neutral/50"}  `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" fill="none" stroke="currentColor">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            className={`${loginError && "placeholder:text-error"} text-base-content`}
            {...register("password")}
            autoComplete="off"
            aria-autocomplete="none"
            type="password"
            placeholder={`${loginError ? `${loginError.message}` : "Password"} `}
          />
        </label>

        <button disabled={loginPending} type="submit" className="btn btn-primary w-full mt-5 ">
          {loginPending ? <span className="loading loading-spinner "></span> : <p>Login</p>}
        </button>
        <div className="divider text-neutral/50 text-sm my-0">OR</div>
        <p className="text-neutral text-sm text-center">
          dont have an account ?{" "}
          <span onClick={() => setShowLogin(false)} className="text-primary hover:cursor-pointer hover:underline">
            Register here
          </span>
        </p>
      </div>
    </form>
  );
};
