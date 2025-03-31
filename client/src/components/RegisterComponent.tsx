import { useForm } from "react-hook-form";
import { UseAuthContext } from "../context/authContext";
import { createUserData, createUserSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";

export const RegisterComponent = ({ setShowLogin }: { setShowLogin: (value: boolean) => void }) => {
  const { registerUser, registerError, registerPending } = UseAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createUserData>({ resolver: zodResolver(createUserSchema) });

  const handleRegisterUser = (data: createUserData) => {
    if (registerError) reset();
    registerUser(data);
  };

  return (
    <>
      <div className="flex items-center flex-col text-center">
        <h1 className="text-4xl text-primary font-bold ">Welcome to Code Block</h1>
        <p className="text-sm text-neutral">Store, organize, and use code snippets with an ease!</p>
      </div>
      <form onSubmit={handleSubmit(handleRegisterUser)} className="flex flex-col p-2 items-center">
        <div className="flex flex-col gap-5 w-full p-5 mt-10">
          <div className="flex flex-col gap-2">
            <label className={`input  focus-within:outline-none   w-full ${registerError || (errors.email && " border-error ")} `}>
              <svg
                className={`size-6  ${registerError || errors.email ? "text-error" : " text-neutral/50"}  `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" fill="none" stroke="currentColor">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                className={`${registerError || (errors.email && "placeholder:text-error")} text-base-content`}
                {...register("email")}
                autoComplete="off"
                aria-autocomplete="none"
                type="input"
                placeholder="Email"
              />
            </label>
            {(errors.email?.message || registerError) && (
              <span className="text-xs text-error border border-error/50 p-1 rounded bg-error/10">
                {errors?.email?.message || registerError?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={`input  focus-within:outline-none   w-full ${registerError || (errors.password && " border-error ")} `}>
              <svg
                className={`size-6  ${registerError || errors.password ? "text-error" : "text-neutral/50"}  `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" fill="none" stroke="currentColor">
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                className={`${registerError || (errors.password && "placeholder:text-error")} text-base-content`}
                {...register("password")}
                autoComplete="off"
                aria-autocomplete="none"
                type="password"
                placeholder="Password"
              />
            </label>
            {errors.password?.message && (
              <span className="text-xs text-error border border-error/50 p-1 rounded bg-error/10">{errors.password.message}</span>
            )}
          </div>

          <button disabled={registerPending} type="submit" className="btn btn-primary w-full mt-5 ">
            {registerPending ? <span className="loading loading-spinner "></span> : <p>Register</p>}
          </button>
          <div className="divider text-neutral/50 text-sm my-0">OR</div>
          <p className="text-neutral text-sm text-center">
            Already have an account ?{" "}
            <span onClick={() => setShowLogin(true)} className="text-primary hover:cursor-pointer hover:underline">
              Login here
            </span>
          </p>
        </div>
      </form>
    </>
  );
};
