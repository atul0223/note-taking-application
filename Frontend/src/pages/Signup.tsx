import React from "react";
import FloatingInput from "../components/FloatingInput";
import axios from "axios";
import {BACKEND_URL} from "../config";
export default function Signup() {
  const [name, setName] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [settingOtp, setSettingOtp] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
      setter(value);
      setError(""); // Clear error when user types
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingOtp) {
      if (!name || !dob || !email) {
        setError("Please fill out all fields before requesting OTP.");
        return;
      }
      const res = axios.post(`${BACKEND_URL}/user/SignIn`, { username: name, dob, email }, { withCredentials: true });
      res.then(() => {
        
        
        setSettingOtp(true);
      }).catch((_error) => {
        setError(_error.response?.data?.message || "Failed to send OTP. Please try again.");
      });
      console.log(res);
      
    } else {
      if (!otp) {
        setError("Please enter the OTP.");
        return;
      } const res = axios.post(`${BACKEND_URL}/user/verifyOtp`, { email, otp }, { withCredentials: true });
      res.then(() => {
        
        
        setSettingOtp(true);
      }).catch((_error) => {
        setError("Failed to send OTP. Please try again.");
      });
      console.log(res);
      
      console.log("Form submitted:", { name, dob, email, otp });
    }
  };

  return (
    <div className="flex-col-12 flex pt-4  sm:pt-0 ">
      <div className="sm:w-5/12 w-full max-h-screen p-4 overflow-y-auto">
        <div className="w-full flex justify-center sm:justify-start mt-4 mb-5">
          <img src="/Logo.svg" alt="" className="sm:hidden block" />
          <img src="/logo2.svg" alt="" className="hidden sm:block ml-3" />
        </div>
        <div className="sm:mt-50 xl:mt-40 lg:ml-10 lg:mr-10 xl:ml-20 xl:mr-20">
          <h1 className="text-center sm:text-start sm:ml-4 font-bold text-3xl mb-2">
            Sign up
          </h1>
          <p className="text-center sm:text-start sm:ml-4 font-light text-neutral-500 font-stretch-125%">
            Sign up to enjoy the feature of HD
          </p>
          <div className="p-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <FloatingInput
                label="Your Name"
                value={name}
                onChange={handleChange(setName)}
               
              />
              <FloatingInput
                label="Date of Birth"
                type="date"
                value={dob}
                onChange={handleChange(setDob)}
              
              />
              <FloatingInput
                label="Email"
                type="email"
                value={email}
                onChange={handleChange(setEmail)}
               error={!settingOtp?error:""}
              />
              {settingOtp && (
                <FloatingInput
                  label="OTP"
                  type="text"
                  value={otp}
                  onChange={handleChange(setOtp)}
                  error={error}
                />
              )}

              <div className="rounded-xl overflow-hidden mt-5 mb-5">
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                >
                  {settingOtp ? "Sign up" : "Get OTP"}
                </button>
              </div>
            </form>
            <p className="font-light text-center">
              Already have an account??{" "}
              <a href="/login" className="text-blue-500 font-bold underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden sm:block w-7/12 ">
        <div className="hidden sm:block w-full h-screen">
          <img src="/pic.svg" alt="" className="w-full h-screen object-cover" />
        </div>
      </div>
    </div>
  );
}