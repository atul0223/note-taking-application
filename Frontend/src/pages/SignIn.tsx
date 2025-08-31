import React from "react";
import FloatingInput from "../components/FloatingInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
export default function SignIn() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [settingOtp, setSettingOtp] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (value: string) => {
      setter(value);
      setError(""); // Clear error when user types
    };
  const login = async () => {
    setLoading(true);
    await axios
      .post(`${BACKEND_URL}/user/login`, { email }, { withCredentials: true })
      .then(() => {
        setLoading(false);
        setSettingOtp(true);
      })
      .catch((_error) => {
        setLoading(false);
        setError(_error.response?.data?.message);
      });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingOtp) {
      if (!email) {
        setError("Please fill out all fields before requesting OTP.");
        return;
      }
      login();
    } else {
      if (!otp) {
        setError("Please enter the OTP.");
        return;
      }

      setLoading(true);
      const res =await axios
        .post(
          `${BACKEND_URL}/user/verifyOtp`,
          { email, otp },
          { withCredentials: true }
        )
        .then(() => {
          setLoading(false);
          navigate("/");
        })
        .catch((_error) => {
          setLoading(false);
          setError(_error.response?.data?.message);
        });
        console.log(res);
        
    }
  };

  return (
    <div className="flex-col-12 flex pt-4  sm:pt-0 ">
      <div className="sm:w-5/12 w-full max-h-screen p-4 overflow-y-auto">
        <div className="w-full flex justify-center sm:justify-start mt-4 mb-5">
          <img src="/Logo.svg" alt="" className="sm:hidden block" />
          <img src="/logo2.svg" alt="" className="hidden sm:block ml-3" />
        </div>
        <div className="sm:mt-40 lg:ml-10 lg:mr-10 xl:ml-18 xl:mr-18">
          <h1 className="text-center sm:text-start sm:ml-4 font-bold text-3xl mb-2">
            Sign in
          </h1>
          <p className="text-center sm:text-start sm:ml-4 font-light text-neutral-500 font-stretch-125%">
            Please login to continue to your account
          </p>
          <div className="p-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <FloatingInput
                key="email"
                label="Email"
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
                error={!settingOtp ? error : ""}
                readOnly={settingOtp}
              />
              {settingOtp && (
                <>
                  <FloatingInput
                    key="otp"
                    label="OTP"
                    readOnly={false}
                    type="number"
                    value={otp}
                    onChange={handleChange(setOtp)}
                    error={error}
                  />
                  <p
                    className="text-blue-500  underline cursor-pointer   "
                    onClick={login}
                  >
                    Resend otp
                  </p>
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe" className="ml-2">
                    Keep me logged in
                  </label>
                </>
              )}

              <div className="rounded-xl overflow-hidden mt-1 mb-5">
                <button
                  type="submit"
                  className={`w-full h-12 ${
                    loading ? "bg-gray-500" : "bg-blue-500"
                  } text-white rounded-xl hover:bg-blue-600 transition`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : settingOtp ? "Sign up" : "Get OTP"}
                </button>
              </div>
            </form>
            <p className="font-light text-center">
              Need an account?{" "}
              <Link to="/SignUp" className="text-blue-500 font-bold underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden sm:block w-7/12 ">
        <div className="hidden sm:block w-full h-screen p-2">
          <img
            src="/pic2.svg"
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
